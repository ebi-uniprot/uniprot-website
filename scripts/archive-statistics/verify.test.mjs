/* eslint-disable no-console, import/no-extraneous-dependencies */

/**
 * Tests for the archive data verifier. Run with:
 *   node --test scripts/archive-statistics/verify.test.mjs
 * (a bare directory argument is run as a module rather than expanded on Node
 * 22+; jest is scoped to src/, so these use Node's built-in test runner.)
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { JSDOM } from 'jsdom';

import { isSafeResourceUrl } from './capture.mjs';
import {
  formatLargeNumber,
  getEmbeddedData,
  historyMax,
  parseTick,
  verifyArchive,
  verifyDocument,
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

test('isSafeResourceUrl only applies address rules to IP literals', () => {
  // A hostname that merely starts like an IPv6 unique-local prefix is fine:
  // refusing it silently drops that font/image from the archive.
  assert.equal(isSafeResourceUrl('https://fdn.example.com/f.woff2'), true);
  assert.equal(isSafeResourceUrl('https://fc-assets.example.org/a.png'), true);
  assert.equal(isSafeResourceUrl('https://www.uniprot.org/x.css'), true);
  // Literals are blocked — including IPv4-mapped and CGNAT.
  assert.equal(isSafeResourceUrl('http://127.0.0.1/x'), false);
  assert.equal(
    isSafeResourceUrl('http://169.254.169.254/latest/meta-data'),
    false
  );
  assert.equal(isSafeResourceUrl('http://100.64.0.1/x'), false);
  assert.equal(isSafeResourceUrl('http://[::1]/x'), false);
  assert.equal(isSafeResourceUrl('http://[fe80::1]/x'), false);
  assert.equal(isSafeResourceUrl('http://[::ffff:127.0.0.1]/x'), false);
  assert.equal(isSafeResourceUrl('http://[::ffff:7f00:1]/x'), false);
  // …as are non-http(s) schemes and junk.
  assert.equal(isSafeResourceUrl('file:///etc/passwd'), false);
  assert.equal(isSafeResourceUrl('not a url'), false);
});

test('historyMax accumulates per release date, like the page', () => {
  const history = {
    results: [
      { statisticsType: 'REVIEWED', releaseDate: '2024-01-01', entryCount: 10 },
      { statisticsType: 'REVIEWED', releaseDate: '2024-01-01', entryCount: 5 },
      {
        statisticsType: 'UNREVIEWED',
        releaseDate: '2024-01-01',
        entryCount: 7,
      },
      { statisticsType: 'REVIEWED', releaseDate: '2024-06-01', entryCount: 12 },
    ],
  };
  // Two rows for one (type, date) sum rather than the last one winning: the
  // chart plots the sum, so overwriting would compute a max below the real one
  // and fail a correct archive.
  assert.equal(historyMax(history, 'reviewed'), 15);
  assert.equal(historyMax(history, 'unreviewed'), 7);
  assert.equal(historyMax(history, 'combined'), 22); // 15 + 7 on 2024-01-01
  assert.ok(Number.isNaN(historyMax(undefined, 'reviewed')));
});

// ── Minimal fixture: one of each family/chart the verifier reads ──

const N = formatLargeNumber;

/**
 * @param {object} [opts]
 * @param {boolean} [opts.reviewedOnlyName] Give `reviewed` a superkingdom name
 *   that `combined` does not list. The page renders the UNION of names across
 *   datasets (merge() in statistics/utils.ts), so a correct archive then has
 *   more rows/slices than the combined payload has items.
 */
function groundTruth(opts = {}) {
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
  // Backs the "Number of isoforms" table (AbstractSectionTable): two columns
  // reading two accessors off the same item.
  const seqStats = (f) => ({
    categoryName: 'SEQUENCE_STATS',
    label: 'Sequence stats',
    totalCount: 70 * f,
    items: [{ name: 'ISOFORMS', count: 40 * f, entryCount: 30 * f }],
  });
  // Backs the "Top Journal" tab group, whose count column StatsTable labels
  // "Citations", not "Count" (StatisticsPage.tsx passes countLabel="Citations").
  const topJournal = (f) => ({
    categoryName: 'TOP_JOURNAL',
    label: 'Top journal',
    totalCount: 90 * f,
    items: [
      { name: 'J Biol Chem', count: 60 * f, entryCount: 50 * f },
      { name: 'Nature', count: 30 * f, entryCount: 25 * f },
    ],
  });
  // Backs the "Sequence corrections" line (ReviewedSequenceCorrections).
  const misc = (f) => ({
    categoryName: 'MISCELLANEOUS',
    label: 'Miscellaneous',
    totalCount: 8123 * f,
    items: [
      { name: 'SEQUENCE_CORRECTION', count: 8123 * f, entryCount: 8123 * f },
    ],
  });
  const build = (f, skNames, scMax) => ({
    results: [
      pub(f),
      superkingdom(skNames, f),
      seqCount(scMax),
      seqStats(f),
      topJournal(f),
      misc(f),
    ],
  });
  return {
    statistics: {
      combined: build(3, ['Bacteria', 'Archaea', 'Other'], 300000),
      reviewed: build(
        1,
        opts.reviewedOnlyName
          ? ['Bacteria', 'Archaea', 'Viruses']
          : ['Bacteria', 'Archaea'],
        2200
      ),
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

  // Columnar SUPERKINGDOM table (3 dataset columns). Rows are the UNION of
  // names across datasets — what merge() renders — which is not necessarily
  // what the combined payload lists.
  const unionNames = [
    ...new Set(
      DS.flatMap((ds) => cat(ds, 'SUPERKINGDOM').items.map((i) => i.name))
    ),
  ];
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
  const columnarHeading = opts.renameHeading
    ? 'Taxonomic distribution of the sequences by kingdom' // not in the registry
    : 'Taxonomic distribution of the sequences across kingdoms';
  const columnar = `<h3>${columnarHeading}</h3><div class="side-by-side"><table><thead>${colHeaders}</thead><tbody>${colRows}</tbody></table></div>`;

  // Tabbed TOP_JOURNAL group: same shape, but the count column is headed
  // "Citations". A verifier that only recognises "Count" leaves it unchecked.
  const journalPanels = DS.map((ds, i) => {
    const c = cat(ds, 'TOP_JOURNAL');
    const rows = c.items
      .map((it, r) => {
        const citations =
          opts.mutateCitations && ds === 'combined' && r === 0
            ? '999,999,999'
            : N(it.count);
        return `<tr><td>${it.name}</td><td>${citations}</td><td>${N(it.entryCount)}</td></tr>`;
      })
      .join('');
    return `<h4 class="archived-tabs__label">${LABELS[i]}</h4><div class="archived-tabs__panel"><table><thead><tr><th>Journal</th><th>Citations</th><th>Entries with journal</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }).join('');
  const journals = `<h3>Top Journal</h3><div class="archived-tabs">${journalPanels}</div>`;

  // "Miscellaneous statistics" card: ReviewedSequenceCorrections renders its
  // <h3> and text as a bare fragment, so the Encoded Locations content below is
  // its DOM sibling — a check scoped to the whole card cannot tell them apart.
  const correction = cat('reviewed', 'MISCELLANEOUS').items.find(
    (i) => i.name === 'SEQUENCE_CORRECTION'
  );
  const shownCorrection = opts.correctionsElsewhere
    ? N(correction.count + 1) // wrong value here…
    : N(correction.count);
  const miscCard =
    `<div><h2>Miscellaneous statistics</h2>` +
    `<h3>Sequence corrections</h3>Number of Reviewed (Swiss-Prot) entries with at least one sequence correction: <span>${shownCorrection}</span>` +
    `<h3>Encoded Locations</h3><p>Mitochondrion: ${N(correction.count)}</p>` + // …but the right one still appears in the same card
    `</div>`;

  // Row-per-dataset table (AbstractSectionTable): one row per dataset, one
  // column per (item, accessor).
  const rowsBody = DS.map((ds, i) => {
    const it = cat(ds, 'SEQUENCE_STATS').items[0];
    const cells = [N(it.count), N(it.entryCount)]
      .slice(0, opts.dropColumn ? 1 : 2)
      .map((v) => `<td>${opts.zeroRows ? '0' : v}</td>`)
      .join('');
    return `<tr><td>${LABELS[i]}</td>${cells}</tr>`;
  }).join('');
  const rowsTable = `<h3>Number of isoforms</h3><table><thead><tr><th>Section</th><th>Isoforms</th><th>Entries with isoforms</th></tr></thead><tbody>${rowsBody}</tbody></table>`;

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

  return `<!DOCTYPE html><html><body><main>${tabbed}${journals}${columnar}${rowsTable}${miscCard}${chart}${pie}</main>${dataBlock}</body></html>`;
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
  // A capture whose data never populated renders every cell as 0 — the page's
  // `data.X?.[accessor] || 0` — which a traceability-only check waves through.
  ['all-zero rows table', { zeroRows: true }],
  ['dropped rows column', { dropColumn: true }],
  // The count column is headed "Citations" (countLabel), not "Count" — a
  // verifier that only looks for "Count" skips the whole column silently.
  ['mutated custom-labelled count column', { mutateCitations: true }],
  // The right number is still present in the same card, just not on the
  // Sequence corrections line — a card-wide text match waves this through.
  [
    'sequence correction value only in a sibling',
    { correctionsElsewhere: true },
  ],
];

for (const [name, opts] of CORRUPTIONS) {
  test(`fixture: ${name} is flagged`, () => {
    const gt = groundTruth();
    const result = verifyArchive(buildFixture(gt, opts), gt);
    assert.equal(result.ok, false, `expected ${name} to fail verification`);
    assert.ok(result.mismatches.length > 0);
  });
}

test('fixture: table heading no registry entry covers is warned about', () => {
  const gt = groundTruth();
  const result = verifyArchive(buildFixture(gt, { renameHeading: true }), gt);
  const warnings = result.checks.filter(
    (c) => !c.ok && c.severity === 'warning'
  );
  assert.ok(
    warnings.some((w) =>
      w.detail.includes('Taxonomic distribution of the sequences by kingdom')
    ),
    `expected a warning naming the unrecognised heading, got ${JSON.stringify(warnings)}`
  );
});

test('fixture: a name only in reviewed does not fail a correct archive', () => {
  // Rows and pie slices come from merge()'s union, so there are 4 of each while
  // the combined payload lists 3 items. Comparing against combined alone would
  // reject this perfectly good archive and write no file at all.
  const gt = groundTruth({ reviewedOnlyName: true });
  const result = verifyArchive(buildFixture(gt), gt);
  assert.equal(result.ok, true, JSON.stringify(result.mismatches, null, 2));
  // The pie must still be *identified*: falling back to a warning would quietly
  // drop the slice checks rather than fail, which is its own coverage hole.
  assert.ok(
    !result.checks.some((c) => !c.ok && c.detail.includes('could not map pie')),
    'expected the pie to be matched against the union, not skipped'
  );
});

test('verifyDocument on a pre-parsed document matches verifyArchive', () => {
  const gt = groundTruth();
  const html = buildFixture(gt);
  const viaString = verifyArchive(html, gt);
  const viaDocument = verifyDocument(new JSDOM(html).window.document, gt);
  assert.deepEqual(viaDocument.checks, viaString.checks);
  assert.equal(viaDocument.ok, viaString.ok);
});

test('fixture: a blank archive cannot pass vacuously', () => {
  // The checks are driven by what is found in the DOM, so before the structure
  // anchors a document containing nothing ran ZERO checks and reported OK —
  // i.e. a gutted capture would have sailed through the fail-closed gate.
  const gt = groundTruth();
  const result = verifyArchive(
    '<!DOCTYPE html><html><body><main></main></body></html>',
    gt
  );
  assert.equal(result.ok, false, 'an empty document must not verify');
  assert.ok(
    result.mismatches.some((m) => m.name.startsWith('structure:')),
    `expected a structure mismatch, got ${JSON.stringify(result.mismatches)}`
  );
});
