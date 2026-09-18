/* eslint-disable import/no-extraneous-dependencies */

/**
 * Tests for the archive CLI's orchestration. Run with:
 *   node --test scripts/archive-statistics/index.test.mjs
 *
 * Deliberately narrow. Every capture is already gated by verify.mjs, so these
 * cover only what that gate structurally CANNOT see:
 *  - the embedded JSON block, which the gate never reads (index.mjs passes the
 *    in-memory stats as ground truth, not the block embedData just wrote);
 *  - the release guards, which run before the browser launches;
 *  - the fail-closed gate itself — that a failed verification writes no file,
 *    and that only --no-verify gets past it.
 *
 * `capture` is injected so none of this needs a browser or the network.
 */

import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';

import { JSDOM } from 'jsdom';

import { embedData, main } from './index.mjs';
import { getEmbeddedData } from './verify.mjs';

// ── Fakes ──

const EMPTY_CATEGORY = { results: [] };

/**
 * A stand-in for the REST API on an ephemeral port. A real server rather than a
 * globalThis.fetch stub so the actual fetch path, the x-uniprot-release headers
 * and non-2xx handling are all exercised. Counts requests so a test can assert
 * the CLI bailed out before touching the network at all.
 */
const startApi = async ({ release = '2026_03' } = {}) => {
  let requests = 0;
  const server = createServer((req, res) => {
    requests += 1;
    res.setHeader('Content-Type', 'application/json');
    if (req.url.includes('allDatabases')) {
      if (release) {
        res.setHeader('x-uniprot-release', release);
        res.setHeader('x-uniprot-release-date', '02-September-2026');
      }
      res.end(JSON.stringify({ results: [] }));
      return;
    }
    res.end(JSON.stringify(EMPTY_CATEGORY));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    requests: () => requests,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
};

// A document with none of the anchors the verifier reads — so verification must
// reject it. Stands in for any capture that came back gutted.
const blankCapture = async () =>
  '<!DOCTYPE html><html><body><main></main></body></html>';

const tmpDirs = [];
const outDir = async () => {
  const dir = await mkdtemp(join(tmpdir(), 'archive-statistics-test-'));
  tmpDirs.push(dir);
  return dir;
};
const filesIn = async (dir) => readdir(dir).catch(() => []);

after(async () => {
  await Promise.all(
    tmpDirs.map((d) => rm(d, { recursive: true, force: true }))
  );
});

const silent = () => {};

// ── The embedded data block (never read by the capture-time gate) ──

test('embedData round-trips through getEmbeddedData', () => {
  const payload = {
    metadata: { releaseNumber: '2026_03' },
    statistics: [1, 2],
  };
  const html = embedData('<!DOCTYPE html><html><body></body></html>', payload);
  const { document } = new JSDOM(html).window;
  assert.deepEqual(getEmbeddedData(document), payload);
});

test('embedData escapes < so the payload cannot terminate the script', () => {
  // Without the < escaping this closes the block early and the rest of the
  // JSON lands in the body as markup — which the capture-time gate would not
  // notice, because it verifies the tables against the in-memory stats.
  const hostile = '</script><script>alert(1)</script>';
  const payload = { metadata: { note: hostile } };
  const html = embedData('<!DOCTYPE html><html><body></body></html>', payload);
  const { document } = new JSDOM(html).window;
  assert.equal(document.querySelectorAll('script').length, 1);
  assert.equal(getEmbeddedData(document).metadata.note, hostile);
});

// ── Guards that run before the browser launches ──

test('--release with path traversal is rejected before any network call', async () => {
  const api = await startApi();
  const out = await outDir();
  try {
    await assert.rejects(
      main(['--api', api.url, '--out', out, '--release', '../../evil'], {
        capture: blankCapture,
        log: silent,
      }),
      /Invalid --release/
    );
    assert.deepEqual(await filesIn(out), [], 'must not write anything');
    assert.equal(api.requests(), 0, 'must reject before fetching');
  } finally {
    await api.close();
  }
});

test('a release the live page does not serve is refused', async () => {
  const api = await startApi({ release: '2026_03' });
  const out = await outDir();
  let captured = 0;
  try {
    await assert.rejects(
      main(['--api', api.url, '--out', out, '--release', '2026_01'], {
        capture: async () => {
          captured += 1;
          return blankCapture();
        },
        log: silent,
      }),
      /only the current release can be captured/
    );
    assert.equal(captured, 0, 'must refuse before capturing');
    assert.deepEqual(await filesIn(out), []);
  } finally {
    await api.close();
  }
});

// ── The fail-closed gate, pinned in both directions ──

test('a capture that fails verification writes no file', async () => {
  const api = await startApi();
  const out = await outDir();
  try {
    await assert.rejects(
      main(['--api', api.url, '--out', out], {
        capture: blankCapture,
        log: silent,
      }),
      /does not match source/
    );
    assert.deepEqual(
      await filesIn(out),
      [],
      'the whole point of the gate: nothing ships'
    );
  } finally {
    await api.close();
  }
});

test('--no-verify writes the file despite a failing capture', async () => {
  const api = await startApi();
  const out = await outDir();
  try {
    await main(['--api', api.url, '--out', out, '--no-verify'], {
      capture: blankCapture,
      log: silent,
    });
    assert.deepEqual(await filesIn(out), ['uniprotkb-statistics-2026_03.html']);
    // …and it is still a complete archive: page plus embedded source data.
    const html = await readFile(
      join(out, 'uniprotkb-statistics-2026_03.html'),
      'utf8'
    );
    const data = getEmbeddedData(new JSDOM(html).window.document);
    assert.equal(data.metadata.releaseNumber, '2026_03');
  } finally {
    await api.close();
  }
});
