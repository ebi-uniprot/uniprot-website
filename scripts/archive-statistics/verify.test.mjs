/* eslint-disable no-console, import/no-extraneous-dependencies */

/**
 * Tests for the archive data verifier. Run with:
 *   node --test scripts/archive-statistics/
 * (jest is scoped to src/, so these use Node's built-in test runner.)
 */

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

import { JSDOM } from 'jsdom';

import {
  formatLargeNumber,
  getEmbeddedData,
  parseTick,
  verifyArchive,
} from './verify.mjs';

// ── Unit tests for the pure helpers ──

test('formatLargeNumber matches franklin formatting', () => {
  assert.equal(formatLargeNumber(0), '0');
  assert.equal(formatLargeNumber(1000), '1,000');
  assert.equal(formatLargeNumber(1234567), '1,234,567');
  assert.equal(formatLargeNumber(149234636), '149,234,636');
  assert.equal(formatLargeNumber(37.8), '37.8');
  assert.equal(formatLargeNumber('1.72e-14'), '1.72e-14'); // scientific passthrough
});

test('parseTick handles comma and SI formats', () => {
  assert.equal(parseTick('0'), 0);
  assert.equal(parseTick('300,000'), 300000);
  assert.equal(parseTick('2,200'), 2200);
  assert.equal(parseTick('600k'), 600000);
  assert.equal(parseTick('260M'), 260000000);
  assert.equal(parseTick('0.0'), 0);
  assert.ok(Number.isNaN(parseTick('n/a')));
});

// ── Minimal fixture: one of each family/chart the verifier reads ──

const N = formatLargeNumber;

function groundTruth() {
  const pub = (f) => ({
    categoryName: 'PUBLICATION',
    label: 'Publication',
    totalCount: 1200 * f,
    items: [
      { name: 'journal article', count: 1000 * f, entryCount: 800 * f },
      { name: 'submitted', count: 200 * f, entryCount: 150 * f },
    ],
  });
  const superkingdom = (names, f) => ({
    categoryName: 'SUPERKINGDOM',
    label: 'Superkingdom',
    totalCount: 999 * f,
    items: names.map((name, i) => ({
      name,
      count: (i + 1) * 111 * f,
      entryCount: (i + 1) * 111 * f,
    })),
  });
  const seqCount = (max) => ({
    categoryName: 'SEQUENCE_COUNT',
    label: 'Sequence Count',
    totalCount: max * 2,
    items: [
      { name: '100', count: Math.round(max / 3), entryCount: 0 },
      { name: '200', count: max, entryCount: 0 },
      { name: '300', count: Math.round(max / 2), entryCount: 0 },
    ],
  });
  const build = (f, skNames, scMax) => ({
    results: [pub(f), superkingdom(skNames, f), seqCount(scMax)],
  });
  return {
    statistics: {
      combined: build(3, ['Bacteria', 'Archaea', 'Other'], 300000),
      reviewed: build(1, ['Bacteria', 'Archaea'], 2200),
      unreviewed: build(2, ['Bacteria', 'Archaea', 'Other'], 320000),
    },
  };
}

const LABELS = ['UniProtKB', 'Reviewed (Swiss-Prot)', 'Unreviewed (TrEMBL)'];
const DS = ['combined', 'reviewed', 'unreviewed'];

/** Build a minimal archive HTML from ground truth, applying optional corruptions. */
function buildFixture(gt, opts = {}) {
  const cat = (ds, name) =>
    gt.statistics[ds].results.find((r) => r.categoryName === name);

  // Tabbed PUBLICATION group: 3 panels, each a table with Count + Entries-with columns.
  const tabbedPanels = DS.map((ds, i) => {
    const c = cat(ds, 'PUBLICATION');
    const rows = c.items
      .map((it, r) => {
        if (opts.dropRow && ds === 'combined' && r === 0) return '';
        const count =
          opts.mutateCell && ds === 'combined' && r === 0
            ? '999,999,999'
            : N(it.count);
        return `<tr><td>${it.name}</td><td>${count}</td><td>${N(it.entryCount)}</td></tr>`;
      })
      .join('');
    const label = opts.swapLabels
      ? LABELS[i === 1 ? 2 : i === 2 ? 1 : 0]
      : LABELS[i];
    return `<h4 class="archived-tabs__label">${label}</h4><div class="archived-tabs__panel"><table><thead><tr><th>Publication type</th><th>Count</th><th>Entries with publication type</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }).join('');
  const tabbed = `<h3>Publication</h3><div class="archived-tabs">${tabbedPanels}</div>`;

  // Columnar SUPERKINGDOM table (3 dataset columns; rows = combined/union names).
  const unionNames = cat('combined', 'SUPERKINGDOM').items.map((i) => i.name);
  const colHeaders = `<tr><th>Taxonomy</th>${LABELS.map((l) => `<th>${l}</th>`).join('')}</tr>`;
  const colRows = unionNames
    .map((name) => {
      const cells = DS.map((ds) => {
        const it = cat(ds, 'SUPERKINGDOM').items.find((x) => x.name === name);
        return `<td>${it ? N(it.entryCount) : '0'}</td>`;
      }).join('');
      return `<tr><td>${name}</td>${cells}</tr>`;
    })
    .join('');
  const columnar = `<h3>Taxonomic distribution of the sequences across kingdoms</h3><div class="side-by-side"><table><thead>${colHeaders}</thead><tbody>${colRows}</tbody></table></div>`;

  // Sequence-size line-plot group: 3 panels each with a y-axis + data path.
  const chartPanels = DS.map((ds, i) => {
    const max = Math.max(
      ...cat(ds, 'SEQUENCE_COUNT').items.map((it) => it.count)
    );
    const top = opts.shrinkAxis && ds === 'combined' ? 1000 : max;
    const ticks = `<text>0</text><text>${N(Math.round(top / 2))}</text><text>${N(top)}</text>`;
    return `<h4 class="archived-tabs__label">${LABELS[i]}</h4><div class="archived-tabs__panel"><svg><g class="y-axis">${ticks}</g><path class="line" d="M0,0L1,1"/><path class="domain" d="M0,0"/></svg></div>`;
  }).join('');
  const chart = `<h2>Sequence size</h2><div class="archived-tabs">${chartPanels}</div>`;

  // Pie group (SUPERKINGDOM): 3 figures, each with the union slice names.
  const pieFigs = ['UniProtKB', 'reviewed', 'unreviewed']
    .map((capn) => {
      const slices = unionNames
        .filter(
          (n) => !(opts.removeSlice && capn === 'UniProtKB' && n === 'Bacteria')
        )
        .map((n) => `<g data-key="${n}"><path/></g>`)
        .join('');
      return `<figure><figcaption>${capn}</figcaption><svg><g>${slices}</g></svg></figure>`;
    })
    .join('');
  const pie = `<h3>Taxonomic distribution across kingdoms (pie)</h3><div class="archived-charts">${pieFigs}</div>`;

  const dataBlock = `<script type="application/json" id="archived-statistics-data">${JSON.stringify(
    gt
  ).replace(/</g, '\\u003c')}</script>`;

  return `<!DOCTYPE html><html><body><main>${tabbed}${columnar}${chart}${pie}</main>${dataBlock}</body></html>`;
}

test('fixture: clean archive verifies OK', () => {
  const gt = groundTruth();
  const result = verifyArchive(buildFixture(gt), gt);
  assert.equal(result.ok, true, JSON.stringify(result.mismatches, null, 2));
  assert.ok(result.checks.length > 10, 'ran a meaningful number of checks');
});

const CORRUPTIONS = [
  ['dropped table row', { dropRow: true }],
  ['mutated table cell', { mutateCell: true }],
  ['swapped dataset labels', { swapLabels: true }],
  ['shrunk chart y-axis (mid-transition)', { shrinkAxis: true }],
  ['removed a pie slice', { removeSlice: true }],
];

for (const [name, opts] of CORRUPTIONS) {
  test(`fixture: ${name} is flagged`, () => {
    const gt = groundTruth();
    const result = verifyArchive(buildFixture(gt, opts), gt);
    assert.equal(result.ok, false, `expected ${name} to fail verification`);
    assert.ok(result.mismatches.length > 0);
  });
}

// ── Guarded smoke test against a real archive, if one is present ──

test('real archive verifies OK (if present)', (t) => {
  const file = fileURLToPath(
    new URL('../../archive/uniprotkb-statistics-2026_02.html', import.meta.url)
  );
  if (!existsSync(file)) {
    t.skip('no archive/uniprotkb-statistics-2026_02.html on disk');
    return;
  }
  const html = readFileSync(file, 'utf8');
  const embedded = getEmbeddedData(new JSDOM(html).window.document);
  const result = verifyArchive(html, embedded);
  assert.equal(
    result.ok,
    true,
    result.mismatches.map((m) => `${m.name}: ${m.detail}`).join('\n')
  );
});
