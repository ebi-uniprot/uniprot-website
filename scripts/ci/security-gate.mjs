#!/usr/bin/env node
/**
 * Turns the GitLab security scanners from "reports something" into "fails the
 * pipeline", which is the only thing that emails anyone or turns the GitHub
 * commit status red. The analyzers themselves always exit 0 and the template
 * jobs are `allow_failure: true`, so without this a scan with findings is
 * indistinguishable from a clean one.
 *
 * There is deliberately no exception list here. Noise is removed at source, by
 * rule and by path, in `.gitlab/sast-ruleset.toml` and `SAST_EXCLUDED_PATHS` —
 * both declarative, both reviewable in a diff, neither growing as the code
 * changes. The first SAST run produced 60 findings (1 Critical, 4 High, 55
 * Medium); with those two in place it leaves 0 Critical and 0 High, so failing
 * on Critical/High is a gate rather than a wall. GitLab's own "dismiss
 * vulnerability" UI is not an alternative: dismissals live in GitLab's database
 * and never appear in the report artifact this reads.
 *
 * Fail-closed. A missing or unparseable report, or a scanner that reported a
 * non-success status, is a failure — not a pass. A scanner that silently stops
 * running produces no report, and "I could not check" must not be reported the
 * same way as "I checked and it is fine" (same reasoning as
 * scripts/archive-statistics).
 *
 *   node scripts/ci/security-gate.mjs             # check (what CI runs)
 *   node scripts/ci/security-gate.mjs a.json      # check specific reports
 *
 * Env:
 *   SECURITY_GATE_SEVERITIES  minimum severity to block on, as a comma-separated
 *                             list; the least severe entry sets the threshold and
 *                             anything above it blocks too. Default
 *                             "Critical,High" — the same as "High". Empty or
 *                             unrecognised values are an error rather than a
 *                             silently disarmed gate.
 *   SECURITY_GATE_OPTIONAL    comma-separated report filenames allowed to be
 *                             absent (use only for a scanner you know is off)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_REPORTS = [
  'gl-sast-report.json',
  'gl-secret-detection-report.json',
  'gl-dependency-scanning-report.json',
];

// Ascending. Anything unrecognised sorts lowest so an unknown severity can
// never accidentally satisfy a blocking threshold.
export const SEVERITY_ORDER = [
  'Info',
  'Unknown',
  'Low',
  'Medium',
  'High',
  'Critical',
];

export const severityRank = (severity) => {
  const index = SEVERITY_ORDER.indexOf(severity);
  return index === -1 ? 0 : index;
};

/**
 * Turns the configured severities into a threshold rank. A list rather than a
 * single value because "Critical,High" reads naturally, but it is treated as
 * "the least severe of these, and anything worse" — matching on exact names
 * would mean SECURITY_GATE_SEVERITIES=High let Critical findings through.
 * Throws rather than returning a default: a gate that blocks on nothing while
 * exiting 0 is the failure mode this whole script exists to prevent.
 */
export const parseSeverities = (raw) => {
  const severities = (raw ?? '')
    .split(',')
    .map((severity) => severity.trim())
    .filter(Boolean);
  if (severities.length === 0) {
    throw new Error(
      'SECURITY_GATE_SEVERITIES is empty — refusing to run a gate that blocks on nothing'
    );
  }
  const unknown = severities.filter(
    (severity) => !SEVERITY_ORDER.includes(severity)
  );
  if (unknown.length > 0) {
    throw new Error(
      `SECURITY_GATE_SEVERITIES contains unrecognised severities: ${unknown.join(', ')}. ` +
        `Known severities: ${SEVERITY_ORDER.join(', ')}`
    );
  }
  return {
    severities,
    minimumRank: Math.min(...severities.map(severityRank)),
  };
};

export const describe = (vulnerability) => ({
  severity: vulnerability.severity ?? 'Unknown',
  rule:
    vulnerability.identifiers?.[0]?.value ?? vulnerability.name ?? 'unknown',
  file: vulnerability.location?.file ?? '',
  line: vulnerability.location?.start_line ?? null,
  package: vulnerability.location?.dependency?.package?.name ?? null,
});

/**
 * Pure core, so the tests can drive it without touching the filesystem.
 * `reports` is [{ file, report | error }].
 */
export const evaluate = ({ reports, minimumRank }) => {
  const problems = [];
  const findings = [];

  for (const { file, report, error } of reports) {
    if (error) {
      problems.push(`${file}: ${error}`);
      continue;
    }
    // `vulnerabilities` is required by the report schema, so its absence means
    // this is not a report — a stub, an error document, or a schema change.
    // Reading that as "0 findings" would be the fail-open this script exists to
    // avoid.
    if (!Array.isArray(report?.vulnerabilities)) {
      problems.push(
        `${file}: no "vulnerabilities" array — not a scanner report, so nothing was actually checked`
      );
      continue;
    }
    const status = report.scan?.status;
    if (status && status !== 'success') {
      problems.push(`${file}: scanner reported status "${status}"`);
    }
    for (const vulnerability of report.vulnerabilities) {
      findings.push({ ...describe(vulnerability), report: file });
    }
  }

  const blocking = findings.filter(
    (finding) => severityRank(finding.severity) >= minimumRank
  );

  return { findings, blocking, problems };
};

export const summarise = (findings) => {
  const counts = {};
  for (const finding of findings) {
    counts[finding.severity] = (counts[finding.severity] ?? 0) + 1;
  }
  return [...SEVERITY_ORDER]
    .reverse()
    .filter((severity) => counts[severity])
    .map((severity) => `${severity}: ${counts[severity]}`)
    .join(', ');
};

const loadReports = (files, optional) =>
  files.map((file) => {
    if (!fs.existsSync(file)) {
      return optional.includes(path.basename(file))
        ? { file, report: { vulnerabilities: [] } }
        : {
            file,
            error:
              'report not found — the scanner did not run, or its artifact did not reach this job',
          };
    }
    try {
      const report = JSON.parse(fs.readFileSync(file, 'utf8'));
      // `null` and arrays are valid JSON; reject them here so the failure is a
      // clear message rather than a TypeError stack.
      if (
        report === null ||
        typeof report !== 'object' ||
        Array.isArray(report)
      ) {
        return { file, error: 'is not a JSON object' };
      }
      return { file, report };
    } catch (error) {
      return { file, error: `could not be parsed (${error.message})` };
    }
  });

const describeLocation = (finding) =>
  finding.package ?? `${finding.file}${finding.line ? `:${finding.line}` : ''}`;

const main = () => {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  const reportFiles = args.length > 0 ? args : DEFAULT_REPORTS;
  let severities;
  let minimumRank;
  try {
    ({ severities, minimumRank } = parseSeverities(
      process.env.SECURITY_GATE_SEVERITIES ?? 'Critical,High'
    ));
  } catch (error) {
    console.error(`security-gate: ${error.message}`);
    process.exit(1);
  }
  const optional = (process.env.SECURITY_GATE_OPTIONAL ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);

  const reports = loadReports(reportFiles, optional);
  const { findings, blocking, problems } = evaluate({ reports, minimumRank });

  for (const { file, report, error } of reports) {
    if (error || !Array.isArray(report?.vulnerabilities)) {
      console.log(`  ${file}: ${error ?? 'not a scanner report'}`);
    } else {
      const summary = summarise(report.vulnerabilities.map(describe));
      console.log(
        `  ${file}: ${report.vulnerabilities.length} finding(s)${summary ? ` — ${summary}` : ''}`
      );
    }
  }

  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`security-gate: ${problem}`);
    }
    console.error(
      'security-gate: failing closed — an unchecked scanner is not a clean one.'
    );
    process.exit(1);
  }

  if (blocking.length === 0) {
    console.log(
      `security-gate: ${findings.length} finding(s), none at ${SEVERITY_ORDER[minimumRank]} or above.`
    );
    return;
  }

  console.error(
    `\nsecurity-gate: ${blocking.length} finding(s) at ${SEVERITY_ORDER[minimumRank]} or above:`
  );
  for (const finding of blocking) {
    console.error(
      `  ${finding.severity} ${finding.rule} — ${describeLocation(finding)}`
    );
  }
  console.error(
    '\nFix them, or — if a whole rule does not apply to this codebase — disable it\n' +
      'in .gitlab/sast-ruleset.toml with a comment saying why.'
  );
  process.exit(1);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
