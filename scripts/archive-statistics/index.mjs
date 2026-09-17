#!/usr/bin/env node

/* eslint-disable no-console, import/no-extraneous-dependencies */

/**
 * Archive the UniProtKB statistics page (https://www.uniprot.org/uniprotkb/statistics)
 * as a single, completely standalone HTML file — trivial to host or share.
 *
 * It writes one file:
 *   <out>/uniprotkb-statistics-<release>.html
 *
 * The file is a static snapshot of the page (all CSS/fonts/images inlined, no
 * JavaScript) with the underlying REST-API JSON embedded in a non-executable
 * <script type="application/json" id="archived-statistics-data"> block, so the
 * data survives even if the rendered page ever fails and nothing else is needed
 * alongside the file.
 *
 * Usage:
 *   node scripts/archive-statistics/index.mjs [options]
 * Run with --help to list the options (defined once in OPTIONS below).
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs, styleText } from 'node:util';

import { captureStatisticsPage } from './capture.mjs';

// A release number is interpolated into the output filename, so keep it to
// characters that cannot escape --out. The release-mismatch guard in main()
// only fires when the API returns an x-uniprot-release header, so this cannot
// be left to that check alone.
const RELEASE_PATTERN = /^[\w.]+$/;

export const DEFAULT_API = 'https://rest.uniprot.org';
const DEFAULT_URL = 'https://www.uniprot.org/uniprotkb/statistics';

// Single source of truth for CLI options: drives both parseArgs and --help.
// prettier-ignore
const OPTIONS = [
  { name: 'release',      type: 'string',  default: 'current',   usage: '--release <current|version>', help: 'release to archive (default: current)' },
  { name: 'url',          type: 'string',  default: DEFAULT_URL, usage: '--url <url>',                  help: 'statistics page URL (default: production)' },
  { name: 'api',          type: 'string',  default: DEFAULT_API, usage: '--api <base>',                 help: 'REST API base (default: https://rest.uniprot.org)' },
  { name: 'out',          type: 'string',  default: './archive', usage: '--out <dir>',                  help: 'output directory for the .html file (default: ./archive)' },
  { name: 'browser-path', type: 'string',                        usage: '--browser-path <path>',       help: 'Chrome/Chromium executable for Playwright' },
  { name: 'channel',      type: 'string',                        usage: '--channel <name>',            help: 'Playwright browser channel (e.g. chrome)' },
  { name: 'no-verify',    type: 'boolean', default: false,       usage: '--no-verify',                 help: 'skip the post-capture data verification gate' },
  { name: 'help',         type: 'boolean', default: false, short: 'h', usage: '-h, --help',            help: 'show this help' },
];

const argsConfig = {
  options: Object.fromEntries(
    OPTIONS.map(({ name, type, default: def, short }) => [
      name,
      {
        type,
        ...(def !== undefined && { default: def }),
        ...(short && { short }),
      },
    ])
  ),
};

const defaultLog = (msg) => console.log(msg);

const fetchOptions = { headers: { Accept: 'application/json' } };

/** Fetch JSON, returning both the parsed body and response headers. */
const fetchJson = async (url) => {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`
    );
  }
  return { data: await response.json(), headers: response.headers };
};

// allDatabases carries the release headers (see src/shared/contexts/UniProtData.tsx).
const databasesUrl = (api) => `${api}/configure/uniprotkb/allDatabases`;

/** Statistics endpoint builders — mirror src/uniprotkb/config/apiUrls/statistics.ts */
const statisticsUrls = (api, release) => ({
  all: `${api}/statistics/releases/${release}`,
  reviewed: `${api}/statistics/releases/${release}/reviewed`,
  unreviewed: `${api}/statistics/releases/${release}/unreviewed`,
  history: `${api}/statistics/history/entry`,
});

/**
 * Resolve the release to archive and fetch the allDatabases response (whose
 * headers carry the current release, mirroring src/shared/contexts/UniProtData.tsx).
 */
export const resolveRelease = async (api, requested) => {
  const { data, headers } = await fetchJson(databasesUrl(api));
  const headerRelease = headers.get('x-uniprot-release');
  const headerReleaseDate = headers.get('x-uniprot-release-date');
  const releaseNumber =
    requested && requested !== 'current' ? requested : headerRelease;
  if (!releaseNumber) {
    throw new Error(
      'Could not determine release number (no x-uniprot-release header)'
    );
  }
  return {
    releaseNumber,
    headerRelease,
    headerReleaseDate,
    allDatabases: data,
  };
};

/** The filename an archive for `release` is written as. */
export const archiveFileName = (release) =>
  `uniprotkb-statistics-${release}.html`;

/** Fetch the four statistics payloads for a release. */
const fetchStatistics = async (urls) => {
  const [all, reviewed, unreviewed, history] = await Promise.all([
    fetchJson(urls.all),
    fetchJson(urls.reviewed),
    fetchJson(urls.unreviewed),
    fetchJson(urls.history),
  ]);
  return {
    all: all.data,
    reviewed: reviewed.data,
    unreviewed: unreviewed.data,
    history: history.data,
  };
};

// Neutralise values interpolated into the HTML comment banner: strip angle
// brackets and collapse `--` so an API header value cannot close the comment.
const commentSafe = (value) =>
  String(value ?? '')
    .replace(/[<>]/g, '')
    .replace(/-{2,}/g, '-');

/**
 * Insert `block` immediately before the last occurrence of `tag`, or return
 * null if the tag is absent. Last, not first: `</body>` can also appear inside
 * an inlined stylesheet or data URI, and splicing into one of those would
 * corrupt the resource.
 */
const spliceBefore = (html, tag, block) => {
  const at = html.lastIndexOf(tag);
  return at === -1 ? null : `${html.slice(0, at)}${block}\n${html.slice(at)}`;
};

/** Prepend an archival banner comment (after the doctype, to avoid quirks mode). */
const withBanner = (html, meta) => {
  const banner = `<!--\n  UniProtKB statistics — archival snapshot\n  Release:      ${commentSafe(meta.releaseNumber)} (${commentSafe(meta.headerReleaseDate) || 'unknown date'})\n  Captured:     ${commentSafe(meta.capturedAt)}\n  Source page:  ${commentSafe(meta.sourceUrl)}\n  Data API:     ${commentSafe(meta.api)}\n\n  Static, self-contained capture (JavaScript removed). Interactive features are\n  frozen and the Reviewed/Unreviewed tab tables are stacked as static sections.\n  The underlying JSON data is embedded in this file (script id "archived-statistics-data").\n  Links to uniprot.org are absolute and may age out over time.\n-->\n`;
  // Anchor on the real start tag (`<html>` / `<html lang=…`) rather than the
  // bare substring, and insert by index so `$` sequences in the banner are not
  // treated as special replacement patterns.
  const at = html.search(/<html[\s>]/i);
  return at === -1
    ? banner + html
    : `${html.slice(0, at)}${banner}${html.slice(at)}`;
};

/** Capture metadata for the embedded data block's `metadata` section. */
const buildMetadata = (meta, sources, stats) => ({
  ...meta,
  sources,
  categories: {
    combined: stats.all.results?.length ?? null,
    reviewed: stats.reviewed.results?.length ?? null,
    unreviewed: stats.unreviewed.results?.length ?? null,
    historyPoints: stats.history.results?.length ?? null,
  },
});

/**
 * Fold the raw JSON payloads into the HTML as a non-executable data block, so a
 * single index.html is shareable on its own (page + data). Injected AFTER
 * SingleFile (which strips executable scripts); `<` is escaped so the JSON can
 * never terminate the <script> tag. Read it back with
 * `JSON.parse(document.getElementById('archived-statistics-data').textContent)`.
 */
export const embedData = (html, payload) => {
  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  const block = `<script type="application/json" id="archived-statistics-data">${json}</script>`;
  // With compressHTML SingleFile omits the optional end tags, so appending at
  // the end of the document is the normal path here (content after an omitted
  // </body> is still parsed into the body); the splices cover a capture made
  // with compression off.
  return (
    spliceBefore(html, '</body>', block) ??
    spliceBefore(html, '</html>', block) ??
    `${html}\n${block}`
  );
};

const printHelp = (log) => {
  const width = Math.max(...OPTIONS.map((o) => o.usage.length));
  const lines = [
    'Archive the UniProtKB statistics page as a single self-contained HTML file.',
    '',
    'Usage: node scripts/archive-statistics/index.mjs [options]',
    ...OPTIONS.map((o) => `  ${o.usage.padEnd(width)}  ${o.help}`),
  ];
  log(lines.join('\n'));
};

/**
 * @param {string[]} [argv] CLI arguments (defaults to this process's).
 * @param {object} [deps]
 * @param {typeof captureStatisticsPage} [deps.capture] Page capture, injectable
 *   so tests can drive the orchestration — the release guards, the fail-closed
 *   verification gate and the output path — without a browser.
 * @param {(msg: string) => void} [deps.log] Progress logger.
 */
export const main = async (
  argv = process.argv.slice(2),
  { capture = captureStatisticsPage, log = defaultLog } = {}
) => {
  const step = (msg) => log(styleText(['bgBlue', 'whiteBright'], ` ${msg} `));
  const { values } = parseArgs({ ...argsConfig, args: argv });
  if (values.help) {
    printHelp(log);
    return;
  }

  if (values.release !== 'current' && !RELEASE_PATTERN.test(values.release)) {
    throw new Error(
      `Invalid --release "${values.release}": expected "current" or a release number such as 2026_02.`
    );
  }

  const api = values.api.replace(/\/$/, '');
  const capturedAt = new Date().toISOString();

  step('Resolving release');
  const release = await resolveRelease(api, values.release);
  log(
    ` release: ${styleText('green', release.releaseNumber)} (${release.headerReleaseDate || '?'})`
  );
  // The live page only ever serves the current release, so that is the only one
  // we can capture and label truthfully. Refuse a mismatched --release rather
  // than write a file whose HTML and embedded data disagree.
  if (
    release.headerRelease &&
    release.headerRelease !== release.releaseNumber
  ) {
    throw new Error(
      `Requested release ${release.releaseNumber} but the live page serves ${release.headerRelease}; ` +
        'only the current release can be captured. Re-run with --release current.'
    );
  }

  const meta = {
    releaseNumber: release.releaseNumber,
    headerRelease: release.headerRelease,
    headerReleaseDate: release.headerReleaseDate,
    capturedAt,
    sourceUrl: values.url,
    api,
  };
  const urls = statisticsUrls(api, release.releaseNumber);
  const sources = { ...urls, allDatabases: databasesUrl(api) };

  step('Fetching raw JSON data packages');
  const stats = await fetchStatistics(urls);

  step('Capturing self-contained HTML');
  const html = await capture({
    url: values.url,
    browserExecutablePath: values['browser-path'],
    channel: values.channel,
    release: release.releaseNumber,
    releaseDate: release.headerReleaseDate,
    log: (msg) => log(` ${msg}`),
  });

  // Single self-contained file: rendered page + embedded raw JSON.
  const doc = embedData(withBanner(html, meta), {
    metadata: buildMetadata(meta, sources, stats),
    databases: release.allDatabases,
    statistics: {
      combined: stats.all,
      reviewed: stats.reviewed,
      unreviewed: stats.unreviewed,
    },
    history: stats.history,
  });

  // Fail closed: verify the displayed data matches the source before writing, so
  // a bad capture (e.g. a chart frozen mid-transition) is never shipped.
  if (!values['no-verify']) {
    step('Verifying archived data matches source');
    const { verifyArchive, printVerifyReport } = await import('./verify.mjs');
    const result = verifyArchive(doc, {
      statistics: {
        combined: stats.all,
        reviewed: stats.reviewed,
        unreviewed: stats.unreviewed,
      },
      history: stats.history,
    });
    printVerifyReport(result, log);
    if (!result.ok) {
      throw new Error(
        `Archived data does not match source (${result.mismatches.length} mismatch(es)) — not writing the file. Pass --no-verify to override.`
      );
    }
  }

  await mkdir(values.out, { recursive: true });
  const outFile = join(values.out, archiveFileName(release.releaseNumber));
  await writeFile(outFile, doc);

  step('Done');
  log(
    ` wrote ${styleText('green', outFile)} (${(doc.length / 1024).toFixed(0)} KB, data embedded)`
  );
};

// Only run as a CLI, so importing this module for tests does not execute it
// (same guard as verify.mjs).
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main().catch((error) => {
    console.error(styleText(['red', 'bold'], error.stack || String(error)));
    process.exit(1);
  });
}
