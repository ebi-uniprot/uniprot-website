#!/usr/bin/env node

/* eslint-disable no-console, import/no-extraneous-dependencies */

/**
 * Verify that the data DISPLAYED on an archived (static HTML) UniProtKB
 * statistics page is faithful to the SOURCE data it was derived from.
 *
 * The archive embeds its own source JSON (`<script type="application/json"
 * id="archived-statistics-data">`), so verification is self-contained and needs
 * no network or browser: parse the displayed values out of the HTML and compare
 * them to that ground truth.
 *
 * Strategy (kept decoupled from the live React components so it doesn't rot):
 *  - Anchor only on capture-owned / semantic markup (`.archived-tabs`,
 *    `.archived-tabs__label`, `.archived-charts`, `<figcaption>`, `data-key`,
 *    `.x-axis`/`.y-axis`/`.domain`, `<thead>` headers, section headings h2–h4).
 *    SingleFile hashes CSS-module class names, so those are never used.
 *  - TABLES: for each (category, dataset) scope, assert every source RAW value
 *    (count / entryCount / totalCount), formatted exactly as the page formats it,
 *    is present, and that the row count matches the source item count. This
 *    catches dropped/duplicated rows, wrong values, and dataset swaps without
 *    per-row name matching. Derived cells (%, averages) are not required to match
 *    (warnings only) — they depend on reproducing D3/rounding exactly.
 *  - CHARTS: only invariants are checkable from static SVG. The high-value ones
 *    are the sequence-length and history line plots (their data is NOT in any
 *    table), where a y-axis whose top tick is below the source max means the
 *    chart was frozen mid-D3-transition (the bug this tool was built to catch).
 *
 * Usage (standalone re-verify of any archived file, offline):
 *   node scripts/archive-statistics/verify.mjs <file.html>
 */

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { JSDOM } from 'jsdom';

// ── Number formatting (ported verbatim from franklin-sites/src/utils.tsx) ──

/** Format a number the way the page does (comma-grouped; e-notation passthrough). */
export function formatLargeNumber(x) {
  const string = x.toString();
  if (string.includes('e')) {
    return string;
  }
  const [integer, decimal] = x.toString().split('.');
  const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return [integer, decimal].filter((el) => typeof el !== 'undefined').length ===
    2
    ? `${integerWithCommas}.${decimal}`
    : integerWithCommas;
}

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

/** Parse a D3 axis tick label to a number: "300,000", "2,200", "260M", "600k", "0.0". */
export function parseTick(text) {
  const t = norm(text).replace(/,/g, '');
  const m = t.match(/^(-?[\d.]+)\s*([kKMGTP])?$/);
  if (!m) {
    return NaN;
  }
  const value = Number(m[1]);
  const unit = { k: 1e3, K: 1e3, M: 1e6, G: 1e9, T: 1e12, P: 1e15 }[m[2]] || 1;
  return value * unit;
}

/** Map a dataset label ("UniProtKB" / "Reviewed (Swiss-Prot)" / "unreviewed") to a source key. */
function datasetKey(label) {
  const l = norm(label).toLowerCase();
  if (l.startsWith('uniprotkb')) {
    return 'combined';
  }
  if (l.includes('unreviewed')) {
    return 'unreviewed';
  }
  if (l.includes('reviewed')) {
    return 'reviewed';
  }
  return null;
}

const DATASET_LABELS = [
  'UniProtKB',
  'Reviewed (Swiss-Prot)',
  'Unreviewed (TrEMBL)',
];

// ── View registry: section heading text → what it renders ──
// Headings are hardcoded UI titles (StatisticsPage.tsx), not category labels.

const TABBED = {
  Publication: { category: 'PUBLICATION' },
  'Sequence annotations (features)': { category: 'FEATURES' },
  'General annotation (comments)': { category: 'COMMENTS' },
  'Cross-references': { category: 'CROSS_REFERENCE' },
  'Top Journal': { category: 'TOP_JOURNAL' },
  'Most represented species': { category: 'TOP_ORGANISM' },
  'Encoded Locations': {
    category: 'MISCELLANEOUS',
    transform: 'encodedLocations',
  },
  'Amino acid composition': { category: 'SEQUENCE_AMINO_ACID', bars: true },
};
const CHART_GROUPS = {
  'Sequence size': { category: 'SEQUENCE_COUNT', chart: 'seqLength' },
  'Total number of entries per release over time': { chart: 'history' },
};
const COLUMNAR = {
  'Total number of entries per protein existence (PE) annotation':
    'PROTEIN_EXISTENCE',
  'Taxonomic distribution of the sequences across kingdoms': 'SUPERKINGDOM',
  'Taxonomic distribution of the sequences within eukaryota': 'EUKARYOTA',
  'Frequency of occurrence of species': 'ORGANISM_FREQUENCY',
  'Repartition of the sequences by size (excluding fragments)':
    'SEQUENCE_RANGE',
  'Frequency of journal citations': 'JOURNAL_FREQUENCY',
};
const ROWS = {
  'Total number of entries in this release of UniProtKB': { category: 'AUDIT' },
  'Total number of new entries in this release of UniProtKB': {
    category: 'AUDIT',
  },
  'Number of fragments': { category: 'SEQUENCE_STATS' },
  'Number of isoforms': { category: 'SEQUENCE_STATS' },
  'Amino acids in this release': { category: 'SEQUENCE_STATS' },
  'Unique references': { category: 'MISCELLANEOUS', transform: 'uniqueRefs' },
  'Total number of species represented in this release of UniProtKB': {
    category: 'TOTAL_ORGANISM',
    totalCountOnly: true,
  },
};

const MISC_EXCLUDE = new Set([
  'UNIQUE_AUTHOR',
  'SEQUENCE_CORRECTION',
  'UNIQUE_CITATION_ID',
]);
function applyTransform(category, transform) {
  if (!category) {
    return category;
  }
  if (transform === 'encodedLocations') {
    return {
      ...category,
      items: category.items.filter((i) => !MISC_EXCLUDE.has(i.name)),
    };
  }
  if (transform === 'uniqueRefs') {
    return {
      ...category,
      items: category.items.filter((i) => i.name === 'UNIQUE_CITATION_ID'),
    };
  }
  return category;
}

// ── Source indexing ──

function indexByCategory(payload) {
  const map = new Map();
  for (const c of payload?.results || []) {
    map.set(c.categoryName, c);
  }
  return map;
}

/** All raw formatted strings a category+dataset should surface (count + entryCount, or totalCount). */
function expectedValues(category, { totalCountOnly, fields } = {}) {
  if (!category) {
    return [];
  }
  if (totalCountOnly) {
    return [formatLargeNumber(category.totalCount)];
  }
  // Only require fields the table actually has a column for (gate on <thead>).
  const wantCount = !fields || fields.count;
  const wantEntry = !fields || fields.entryCount;
  const out = [];
  for (const item of category.items) {
    if (wantCount && typeof item.count === 'number') {
      out.push(formatLargeNumber(item.count));
    }
    if (wantEntry && typeof item.entryCount === 'number') {
      out.push(formatLargeNumber(item.entryCount));
    }
  }
  return out;
}

/** Which raw columns a tabbed table renders, from its <thead>. */
function rawFieldsFromHead(table) {
  const headers = [...table.querySelectorAll('thead th')].map((th) =>
    norm(th.textContent)
  );
  const fields = {
    count: headers.some((h) => h === 'Count'),
    entryCount: headers.some((h) => /^Entries with/i.test(h)),
  };
  if (!fields.count && !fields.entryCount) {
    fields.count = fields.entryCount = true; // unknown layout → require both
  }
  return fields;
}

// ── DOM helpers ──

export function getEmbeddedData(doc) {
  const el = doc.getElementById('archived-statistics-data');
  if (!el) {
    throw new Error('No embedded data block (#archived-statistics-data) found');
  }
  return JSON.parse(el.textContent);
}

function nearestHeading(el) {
  let node = el;
  while (node) {
    let sib = node.previousElementSibling;
    while (sib) {
      if (/^H[1-4]$/.test(sib.tagName)) {
        return norm(sib.textContent);
      }
      const h = sib.querySelector?.('h1,h2,h3,h4');
      if (h) {
        return norm(h.textContent);
      }
      sib = sib.previousElementSibling;
    }
    node = node.parentElement;
  }
  return null;
}

const cellsOf = (table) =>
  [...table.querySelectorAll('tbody td')].map((td) => norm(td.textContent));
const bodyRows = (table) => [...table.querySelectorAll('tbody tr')];

/** Multiset containment: every expected string present (with multiplicity) in rendered. */
function missingValues(expected, rendered) {
  const pool = new Map();
  for (const r of rendered) {
    pool.set(r, (pool.get(r) || 0) + 1);
  }
  const missing = [];
  for (const e of expected) {
    const n = pool.get(e) || 0;
    if (n <= 0) {
      missing.push(e);
    } else {
      pool.set(e, n - 1);
    }
  }
  return missing;
}

// ── Checks ──

function checkTabbedGroups(doc, stats, push) {
  for (const group of doc.querySelectorAll('.archived-tabs')) {
    const heading = nearestHeading(group);
    const chart = CHART_GROUPS[heading];
    if (chart) {
      continue; // handled by chart checks
    }
    const spec = TABBED[heading];
    if (!spec) {
      push(
        'warning',
        `tab-group:${heading}`,
        false,
        `Unrecognised tab group heading "${heading}"`
      );
      continue;
    }
    const panels = [...group.querySelectorAll('.archived-tabs__panel')];
    const labels = [...group.querySelectorAll('.archived-tabs__label')].map(
      (l) => norm(l.textContent)
    );
    // Dataset order / swap check.
    const okOrder = DATASET_LABELS.every(
      (expected, i) => norm(labels[i] || '') === expected
    );
    push(
      'error',
      `${heading}:labels`,
      okOrder,
      okOrder
        ? 'datasets UniProtKB/Reviewed/Unreviewed in order'
        : `labels were ${JSON.stringify(labels)}`
    );

    panels.forEach((panel, i) => {
      const ds = datasetKey(labels[i]);
      const category = applyTransform(
        indexByCategory(stats[ds]).get(spec.category),
        spec.transform
      );
      const table = panel.querySelector('table');
      if (!category || !table) {
        push(
          'error',
          `${heading}:${ds}`,
          false,
          `missing ${!category ? 'source category' : 'table'} for ${spec.category}/${ds}`
        );
        return;
      }
      const rendered = cellsOf(table);
      const missing = missingValues(
        expectedValues(category, { fields: rawFieldsFromHead(table) }),
        rendered
      );
      push(
        'error',
        `${heading}:${ds}:values`,
        missing.length === 0,
        missing.length
          ? `${missing.length} source value(s) not displayed, e.g. ${missing.slice(0, 3).join(', ')}`
          : `all ${category.items.length} items' raw values present`
      );
      const rows = bodyRows(table).length;
      push(
        'error',
        `${heading}:${ds}:rows`,
        rows === category.items.length,
        `${rows} rows vs ${category.items.length} source items`
      );
    });
  }
}

function checkColumnarTables(doc, stats, push) {
  for (const table of doc.querySelectorAll('table')) {
    if (table.closest('.archived-tabs')) {
      continue;
    }
    const heading = nearestHeading(table);
    const categoryName = COLUMNAR[heading];
    if (!categoryName) {
      continue;
    }
    const headers = [...table.querySelectorAll('thead th')].map((th) =>
      norm(th.textContent)
    );
    const rowsEls = bodyRows(table);
    for (const label of DATASET_LABELS) {
      const col = headers.findIndex((h) => h === label);
      const ds = datasetKey(label);
      const category = indexByCategory(stats[ds]).get(categoryName);
      if (col < 0 || !category) {
        push(
          'error',
          `${heading}:${ds}`,
          false,
          col < 0
            ? `no "${label}" column (headers: ${JSON.stringify(headers)})`
            : `no source category ${categoryName}/${ds}`
        );
        continue;
      }
      const rendered = rowsEls.map((tr) =>
        norm(tr.querySelectorAll('td')[col]?.textContent || '')
      );
      const expected = category.items.map((it) =>
        formatLargeNumber(it.entryCount)
      );
      const missing = missingValues(expected, rendered);
      push(
        'error',
        `${heading}:${ds}:values`,
        missing.length === 0,
        missing.length
          ? `${missing.length} entryCount(s) not in ${label} column, e.g. ${missing.slice(0, 3).join(', ')}`
          : `all ${category.items.length} entryCounts present`
      );
    }
    // One row per distinct name across datasets = the combined (union) item count.
    const combined = indexByCategory(stats.combined).get(categoryName);
    if (combined) {
      push(
        'error',
        `${heading}:rows`,
        rowsEls.length === combined.items.length,
        `${rowsEls.length} rows vs ${combined.items.length} union items`
      );
    }
  }
}

function checkRowTables(doc, stats, push) {
  for (const table of doc.querySelectorAll('table')) {
    if (table.closest('.archived-tabs')) {
      continue;
    }
    const heading = nearestHeading(table);
    const spec = ROWS[heading];
    if (!spec) {
      continue;
    }
    for (const tr of bodyRows(table)) {
      const cells = [...tr.querySelectorAll('td,th')].map((c) =>
        norm(c.textContent)
      );
      const ds = datasetKey(cells[0]);
      if (!ds) {
        continue; // e.g. excludeUniProtKB — first cell not a known dataset label handled below
      }
      const category = applyTransform(
        indexByCategory(stats[ds]).get(spec.category),
        spec.transform
      );
      if (!category) {
        push(
          'error',
          `${heading}:${ds}`,
          false,
          `no source category ${spec.category}/${ds}`
        );
        continue;
      }
      const allowed = new Set(
        spec.totalCountOnly
          ? [formatLargeNumber(category.totalCount)]
          : expectedValues(category)
      );
      const numeric = cells.slice(1).filter((c) => /\d/.test(c));
      const bad = numeric.filter((c) => !allowed.has(c) && c !== '0');
      push(
        'error',
        `${heading}:${ds}:values`,
        bad.length === 0,
        bad.length
          ? `displayed value(s) not found in ${spec.category}/${ds}: ${bad.slice(0, 3).join(', ')}`
          : `${numeric.length} value(s) trace to source`
      );
    }
  }
}

function checkSequenceCorrections(doc, stats, push) {
  const heading = [...doc.querySelectorAll('h2,h3,h4')].find(
    (h) => norm(h.textContent) === 'Sequence corrections'
  );
  const item = indexByCategory(stats.reviewed)
    .get('MISCELLANEOUS')
    ?.items.find((i) => i.name === 'SEQUENCE_CORRECTION');
  if (!item) {
    return;
  }
  const text = norm(heading?.parentElement?.textContent || '');
  const expected = formatLargeNumber(item.count);
  push(
    'error',
    'Sequence corrections:value',
    text.includes(expected),
    text.includes(expected)
      ? `shows ${expected}`
      : `expected ${expected} not found`
  );
}

function yAxisMax(svg) {
  const ticks = [...svg.querySelectorAll('.y-axis text')]
    .map((t) => parseTick(t.textContent))
    .filter((n) => Number.isFinite(n));
  return { ticks, max: ticks.length ? Math.max(...ticks) : NaN };
}

function checkLineCharts(doc, stats, push) {
  for (const group of doc.querySelectorAll('.archived-tabs')) {
    const heading = nearestHeading(group);
    const chart = CHART_GROUPS[heading];
    if (!chart) {
      continue;
    }
    const panels = [...group.querySelectorAll('.archived-tabs__panel')];
    const labels = [...group.querySelectorAll('.archived-tabs__label')].map(
      (l) => norm(l.textContent)
    );
    panels.forEach((panel, i) => {
      const ds = datasetKey(labels[i]);
      const svg = panel.querySelector('svg');
      if (!svg) {
        push('error', `${heading}:${ds}`, false, 'no chart svg');
        return;
      }
      const hasLine = svg.querySelectorAll('path:not(.domain)').length >= 1;
      push(
        'error',
        `${heading}:${ds}:path`,
        hasLine,
        hasLine ? 'data line present' : 'no data path (empty chart)'
      );
      const { ticks, max } = yAxisMax(svg);
      push(
        'error',
        `${heading}:${ds}:axis`,
        ticks.length > 1,
        ticks.length > 1
          ? `${ticks.length} y-ticks`
          : 'degenerate y-axis (≤1 tick)'
      );

      let sourceMax = NaN;
      if (chart.chart === 'seqLength') {
        const cat = indexByCategory(stats[ds]).get('SEQUENCE_COUNT');
        sourceMax = cat ? Math.max(...cat.items.map((it) => it.count)) : NaN;
      } else if (chart.chart === 'history') {
        sourceMax = historyMax(stats.__history, ds);
      }
      if (Number.isFinite(sourceMax) && Number.isFinite(max)) {
        // The y-axis domain is [0, maxCount] (no .nice() for the seq-length plot),
        // so D3's top *tick* sits just below the max — a correct chart lands at
        // ~0.8-1.0x. A chart frozen mid-D3-transition has an axis scaled to a
        // small fraction of the real max; flag that (and grossly-over cases).
        const ratio = max / sourceMax;
        push(
          'error',
          `${heading}:${ds}:ymax`,
          ratio >= 0.5 && ratio <= 3,
          ratio >= 0.5 && ratio <= 3
            ? `y-axis top ${max} vs source max ${sourceMax} (ratio ${ratio.toFixed(2)})`
            : `y-axis top ${max} vs source max ${sourceMax} (ratio ${ratio.toFixed(2)}) — chart frozen mid-transition?`
        );
      }
    });
  }
}

/** Per-dataset max of accumulated entry counts over history (UNIPROTKB = REVIEWED + UNREVIEWED per releaseDate). */
function historyMax(history, ds) {
  if (!history?.results) {
    return NaN;
  }
  const byType = { reviewed: new Map(), unreviewed: new Map() };
  for (const r of history.results) {
    const key = r.statisticsType === 'REVIEWED' ? 'reviewed' : 'unreviewed';
    byType[key].set(r.releaseDate, r.entryCount);
  }
  if (ds === 'reviewed') {
    return Math.max(...byType.reviewed.values());
  }
  if (ds === 'unreviewed') {
    return Math.max(...byType.unreviewed.values());
  }
  // combined: sum reviewed + unreviewed per date
  let m = 0;
  for (const [date, rev] of byType.reviewed) {
    m = Math.max(m, rev + (byType.unreviewed.get(date) || 0));
  }
  return m;
}

function checkPies(doc, stats, push) {
  for (const group of doc.querySelectorAll('.archived-charts')) {
    const figures = [...group.querySelectorAll('figure')];
    const keys0 = [...(figures[0]?.querySelectorAll('g[data-key]') || [])].map(
      (g) => g.getAttribute('data-key')
    );
    // Every figure shows the union of names (combined) with per-dataset values, so
    // identify and compare against the combined category.
    const candidate = ['SUPERKINGDOM', 'EUKARYOTA'].find((cn) => {
      const names = new Set(
        (indexByCategory(stats.combined).get(cn)?.items || []).map(
          (i) => i.name
        )
      );
      return keys0.length && keys0.every((k) => names.has(k));
    });
    if (!candidate) {
      push(
        'warning',
        'pie',
        false,
        `could not map pie (keys: ${keys0.slice(0, 4).join(', ')})`
      );
      continue;
    }
    const cat = indexByCategory(stats.combined).get(candidate);
    const names = new Set(cat.items.map((i) => i.name));
    figures.forEach((fig) => {
      const ds = norm(fig.querySelector('figcaption')?.textContent || '');
      const slices = [...fig.querySelectorAll('g[data-key]')];
      push(
        'error',
        `pie:${candidate}:${ds}:slices`,
        slices.length === cat.items.length,
        `${slices.length} slices vs ${cat.items.length} items`
      );
      const keys = new Set(slices.map((g) => g.getAttribute('data-key')));
      const missing = [...names].filter((n) => !keys.has(n));
      push(
        'error',
        `pie:${candidate}:${ds}:keys`,
        missing.length === 0,
        missing.length
          ? `missing slices: ${missing.slice(0, 3).join(', ')}`
          : 'slice names match items'
      );
    });
  }
}

// ── Orchestration ──

/**
 * @param {string} html
 * @param {{ statistics: {combined,reviewed,unreviewed}, history? }} groundTruth
 */
export function verifyArchive(html, groundTruth) {
  const { document } = new JSDOM(html).window;
  const stats = {
    combined: groundTruth.statistics.combined,
    reviewed: groundTruth.statistics.reviewed,
    unreviewed: groundTruth.statistics.unreviewed,
    __history: groundTruth.history,
  };
  const checks = [];
  const push = (severity, name, ok, detail) =>
    checks.push({ severity, name, ok, detail });

  checkTabbedGroups(document, stats, push);
  checkColumnarTables(document, stats, push);
  checkRowTables(document, stats, push);
  checkSequenceCorrections(document, stats, push);
  checkLineCharts(document, stats, push);
  checkPies(document, stats, push);

  const mismatches = checks.filter((c) => !c.ok && c.severity === 'error');
  return { ok: mismatches.length === 0, checks, mismatches };
}

export function printVerifyReport(result, log = console.log) {
  const errors = result.checks.filter((c) => !c.ok && c.severity === 'error');
  const warnings = result.checks.filter(
    (c) => !c.ok && c.severity === 'warning'
  );
  const passed = result.checks.filter((c) => c.ok).length;
  log(` ${passed}/${result.checks.length} checks passed`);
  for (const w of warnings) {
    log(` warning: ${w.name}: ${w.detail}`);
  }
  for (const e of errors) {
    log(` MISMATCH: ${e.name}: ${e.detail}`);
  }
  log(
    result.ok
      ? ' data verification: OK'
      : ` data verification: FAILED (${errors.length} mismatch(es))`
  );
}

// ── CLI: re-verify any archived file against its own embedded data ──

async function main(argv) {
  const file = argv[0];
  if (!file || file === '--help' || file === '-h') {
    console.log(
      'Usage: node scripts/archive-statistics/verify.mjs <archived-file.html>'
    );
    console.log(
      'Re-checks an archived statistics page against its own embedded source data.'
    );
    process.exit(file ? 0 : 1);
  }
  const html = await readFile(file, 'utf8');
  const { document } = new JSDOM(html).window;
  const embedded = getEmbeddedData(document);
  const result = verifyArchive(html, embedded);
  printVerifyReport(result);
  process.exit(result.ok ? 0 : 1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.stack || String(error));
    process.exit(1);
  });
}
