/**
 * Tests for the security gate. Run with:
 *   node --test scripts/ci/security-gate.test.mjs
 * Offline and deterministic — `evaluate` is pure, so no report files are read.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  evaluate,
  parseSeverities,
  severityRank,
  summarise,
} from './security-gate.mjs';

const sast = (rule, file, severity = 'Medium', line = 1) => ({
  name: rule,
  severity,
  identifiers: [{ type: 'semgrep_id', name: rule, value: rule }],
  location: { file, start_line: line },
});

const dependency = (pkg, cve, severity = 'High') => ({
  name: cve,
  severity,
  cve,
  location: { file: 'pnpm-lock.yaml', dependency: { package: { name: pkg } } },
});

const check = (vulnerabilities, severities = 'Critical,High') =>
  evaluate({
    reports: [
      {
        file: 'gl-sast-report.json',
        report: { scan: { status: 'success' }, vulnerabilities },
      },
    ],
    minimumRank: parseSeverities(severities).minimumRank,
  });

// ── severity handling ──

test('unknown severities rank lowest, so they cannot satisfy a threshold', () => {
  assert.equal(severityRank('nonsense'), 0);
  assert.ok(severityRank('Critical') > severityRank('High'));
  assert.ok(severityRank('High') > severityRank('Medium'));
});

test('the configured severities are a threshold, not an exact-match list', () => {
  // The bug this guards: exact-name matching meant SECURITY_GATE_SEVERITIES=High
  // let Critical findings through, which is the opposite of what it reads as.
  const { blocking } = check(
    [sast('rule.one', 'src/a.ts', 'Critical')],
    'High'
  );
  assert.equal(blocking.length, 1);
});

test('the threshold is the least severe entry given', () => {
  assert.equal(
    parseSeverities('Critical,High').minimumRank,
    severityRank('High')
  );
  assert.equal(parseSeverities('High').minimumRank, severityRank('High'));
  assert.equal(
    parseSeverities(' Medium , Critical ').minimumRank,
    severityRank('Medium')
  );
});

test('an empty severity list is an error, not a disarmed gate', () => {
  // A CI variable defined but left blank must not silently turn the gate into a
  // no-op while the pipeline goes green.
  assert.throws(() => parseSeverities(''), /empty/);
  assert.throws(() => parseSeverities('  ,  '), /empty/);
  assert.throws(() => parseSeverities(undefined), /empty/);
});

test('an unrecognised severity name is an error', () => {
  assert.throws(() => parseSeverities('Sever'), /unrecognised/);
  assert.throws(() => parseSeverities('Critical,Hgh'), /unrecognised/);
});

test('findings at a blocking severity block', () => {
  const { findings, blocking } = check([
    sast('rule.one', 'src/a.ts', 'High'),
    sast('rule.two', 'src/b.ts', 'Critical'),
  ]);
  assert.equal(findings.length, 2);
  assert.equal(blocking.length, 2);
});

test('findings below the blocking severities are reported but do not block', () => {
  const { findings, blocking } = check([
    sast('rule.one', 'src/a.ts', 'Medium'),
    sast('rule.two', 'src/b.ts', 'Low'),
  ]);
  assert.equal(findings.length, 2);
  assert.equal(blocking.length, 0);
});

test('a finding with an unrecognised severity never blocks', () => {
  const { blocking } = check([sast('rule.one', 'src/a.ts', 'Whatever')]);
  assert.equal(blocking.length, 0);
});

test('a vulnerable dependency blocks and is identified by package', () => {
  const { blocking } = check([
    dependency('axios', 'CVE-2025-0001', 'Critical'),
  ]);
  assert.equal(blocking.length, 1);
  assert.equal(blocking[0].package, 'axios');
});

test('summarise counts by severity, highest first', () => {
  assert.equal(
    summarise([
      { severity: 'Medium' },
      { severity: 'Critical' },
      { severity: 'Medium' },
    ]),
    'Critical: 1, Medium: 2'
  );
});

// ── failing closed ──

test('a missing report is a problem, not a pass', () => {
  const { problems } = evaluate({
    reports: [{ file: 'gl-sast-report.json', error: 'report not found' }],
    minimumRank: parseSeverities('Critical').minimumRank,
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /gl-sast-report\.json/);
});

test('a report with no vulnerabilities array is a problem, not zero findings', () => {
  // A stub or error document must not read as "checked and clean".
  const { problems, findings } = evaluate({
    reports: [
      { file: 'gl-sast-report.json', report: { scan: { status: 'success' } } },
    ],
    minimumRank: parseSeverities('Critical').minimumRank,
  });
  assert.equal(findings.length, 0);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /vulnerabilities/);
});

test('a scanner reporting a non-success status is a problem', () => {
  const { problems } = evaluate({
    reports: [
      {
        file: 'gl-sast-report.json',
        report: { scan: { status: 'failure' }, vulnerabilities: [] },
      },
    ],
    minimumRank: parseSeverities('Critical').minimumRank,
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /status "failure"/);
});

test('findings from every report are considered together', () => {
  const { findings } = evaluate({
    reports: [
      {
        file: 'gl-sast-report.json',
        report: { vulnerabilities: [sast('r', 'a.ts')] },
      },
      {
        file: 'gl-dependency-scanning-report.json',
        report: { vulnerabilities: [dependency('axios', 'CVE-1')] },
      },
    ],
    minimumRank: parseSeverities('Critical,High').minimumRank,
  });
  assert.equal(findings.length, 2);
});
