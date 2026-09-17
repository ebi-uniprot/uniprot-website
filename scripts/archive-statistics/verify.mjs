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
 *  - COVERAGE is asserted, not assumed: every check below is driven by what it
 *    FINDS in the DOM, so on its own a gutted capture yields fewer checks and
 *    still "passes". A registry of the views the page renders is therefore
 *    matched against the embedded source — anything the data says must be on
 *    the page, and is not, is a mismatch (see `checkRegistryCoverage`).
 *  - Anchor only on capture-owned / semantic markup (`.archived-tabs`,
 *    `.archived-tabs__label`, `.archived-charts`, `<figcaption>`, `data-key`,
 *    `.x-axis`/`.y-axis`/`.domain`, `<thead>` headers, section headings h2–h4).
 *    SingleFile hashes CSS-module class names, so those are never used.
 *  - TABLES (many rows, one per item): for each (category, dataset) scope,
 *    assert every source RAW value (count / entryCount / totalCount), formatted
 *    exactly as the page formats it, is present, and that the row count matches
 *    the source item count. This catches dropped/duplicated rows, wrong values,
 *    and dataset swaps without per-row name matching. Derived cells (Percent,
 *    per-entry average) are recomputed from the source and reported as
 *    WARNINGS: they are cosmetic, but a disagreement means the page and the
 *    payload are telling different stories. They are also taken out of the
 *    pool the raw values are matched against, where they would otherwise be
 *    free to satisfy a *missing* raw value.
 *  - TABLES (one row per dataset, a handful of columns): here the registry
 *    names the statistic behind each column, so every cell is compared to its
 *    own source value. Presence alone would not do: those cells render as
 *    `… || 0`, so a capture whose data never populated is all zeros and every
 *    zero would "trace back" to something.
 *  - A table whose heading matches no registry entry is reported as a warning
 *    rather than skipped, so a UI rename cannot quietly shrink coverage.
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

/**
 * Format a source value, or null when the source does not have one. Callers
 * report the null as a mismatch: a payload that changed shape should fail the
 * gate with something readable, not crash the whole run on
 * `undefined.toString()`.
 */
function fmt(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? formatLargeNumber(value)
    : null;
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
const DATASET_KEYS = ['combined', 'reviewed', 'unreviewed'];

// ── View registry: section heading text → what it renders ──
// Headings are hardcoded UI titles (StatisticsPage.tsx), not category labels.

const TABBED = {
  Publication: { category: 'PUBLICATION' },
  'Sequence annotations (features)': { category: 'FEATURES' },
  'General annotation (comments)': { category: 'COMMENTS' },
  'Cross-references': { category: 'CROSS_REFERENCE' },
  // StatsTable renders `{countLabel || 'Count'}`, so a group passing a custom
  // countLabel needs it here or its count column goes unverified.
  'Top Journal': { category: 'TOP_JOURNAL', countLabel: 'Citations' },
  'Most represented species': { category: 'TOP_ORGANISM' },
  'Encoded Locations': {
    category: 'MISCELLANEOUS',
    transform: 'encodedLocations',
  },
  // The table is verified; the AminoAcidBarPlot SVG is knowingly not.
  'Amino acid composition': { category: 'SEQUENCE_AMINO_ACID' },
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
// Row-per-dataset tables (AbstractSectionTable). `columns` lists the statistic
// behind each numeric column, in the order StatisticsPage.tsx passes them as
// `tableData`, so every cell can be compared to its own source value rather
// than merely traced back to *some* source value. `accessor` defaults to
// 'entryCount'; `totalCount` marks a column rendering the category total.
const ROWS = {
  'Total number of entries in this release of UniProtKB': {
    category: 'AUDIT',
    columns: [
      { name: 'ENTRY' },
      { name: 'ANNOTATION_UPDATED' },
      { name: 'UPDATED_SEQUENCE' },
    ],
  },
  'Total number of new entries in this release of UniProtKB': {
    category: 'AUDIT',
    columns: [{ name: 'NEW_ENTRY' }, { name: 'NEW_ENTRY_AND_NEW_SEQUENCE' }],
  },
  'Number of fragments': {
    category: 'SEQUENCE_STATS',
    columns: [{ name: 'FRAGMENT' }],
  },
  'Number of isoforms': {
    category: 'SEQUENCE_STATS',
    columns: [{ name: 'ISOFORMS', accessor: 'count' }, { name: 'ISOFORMS' }],
  },
  'Amino acids in this release': {
    category: 'SEQUENCE_STATS',
    columns: [{ name: 'AMINO_ACID_TOTAL', accessor: 'count' }],
  },
  // UniqueReferencesTable passes `excludeUniProtKB`, so this one has no
  // UniProtKB row — which is why the expected rows are per-entry, not global.
  'Unique references': {
    category: 'MISCELLANEOUS',
    columns: [{ name: 'UNIQUE_CITATION_ID', accessor: 'count' }],
    excludeUniProtKB: true,
  },
  'Total number of species represented in this release of UniProtKB': {
    category: 'TOTAL_ORGANISM',
    columns: [{ totalCount: true }],
  },
};

// The taxonomy pie groups, identified by their slice names rather than by a
// heading: both groups render under the same "Taxonomic distribution" heading.
const PIE_CATEGORIES = ['SUPERKINGDOM', 'EUKARYOTA'];

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

/**
 * Names of a category across ALL three datasets. Views built with `merge()`
 * (src/uniprotkb/components/statistics/utils.ts) render one row/slice per
 * distinct name across uniprotkb+reviewed+unreviewed, which is not necessarily
 * what the combined payload lists — comparing against combined alone fails a
 * correct archive whenever a name appears only in reviewed or unreviewed.
 */
function unionItemNames(stats, categoryName) {
  const names = new Set();
  for (const ds of ['combined', 'reviewed', 'unreviewed']) {
    for (const item of indexByCategory(stats[ds]).get(categoryName)?.items ||
      []) {
      names.add(item.name);
    }
  }
  return names;
}

/** All raw formatted strings a category+dataset should surface (count + entryCount). */
function expectedValues(category, { fields } = {}) {
  if (!category) {
    return [];
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

/**
 * Which raw columns a tabbed table renders, from its <thead>. `countLabel`
 * is the registry's expected heading for the count column — StatsTable renders
 * `{countLabel || 'Count'}`, so "Top Journal" labels it "Citations".
 */
function rawFieldsFromHead(table, countLabel) {
  const headers = [...table.querySelectorAll('thead th')].map((th) =>
    norm(th.textContent)
  );
  const fields = {
    count: headers.some((h) => h === (countLabel || 'Count')),
    entryCount: headers.some((h) => /^Entries with/i.test(h)),
    headers,
    matched: true,
  };
  if (!fields.count && !fields.entryCount) {
    fields.count = fields.entryCount = true; // unknown layout → require both
    fields.matched = false;
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

const bodyRows = (table) => [...table.querySelectorAll('tbody tr')];
const rowCells = (tr) =>
  [...tr.querySelectorAll('td')].map((td) => norm(td.textContent));

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

/**
 * Assert the anchors every other check is driven by are actually present.
 * Without this the verifier passes vacuously: it only reports what it FINDS
 * disagreeing with the source, so a blank or gutted document yields zero checks
 * and an "OK" verdict. Anchors, not a minimum check count — there is no
 * threshold to re-tune as the registry grows.
 */
function checkArchiveStructure(doc, push) {
  for (const [what, selector] of [
    ['tab groups', '.archived-tabs'],
    ['chart groups', '.archived-charts'],
    ['tables', 'table'],
  ]) {
    const n = doc.querySelectorAll(selector).length;
    push('error', `structure:${what}`, n > 0, `${n} ${what} found`);
  }
}

/**
 * The views the SOURCE says this page must show, as registry keys the checks
 * below mark off as they match them.
 *
 * Gating on the embedded data rather than on the registry alone is what makes
 * this safe to assert: a document is only ever required to render what its own
 * payload actually contains, so a payload missing a category (or a fixture
 * carrying a handful of them) is not failed for a view that would have had
 * nothing to display — while a real archive, whose payload has everything, is
 * required to render everything.
 */
function requiredViews(stats) {
  const combined = indexByCategory(stats.combined);
  const hasItems = (categoryName, transform) =>
    Boolean(
      applyTransform(combined.get(categoryName), transform)?.items?.length
    );
  const required = [];
  for (const [heading, spec] of Object.entries(TABBED)) {
    if (hasItems(spec.category, spec.transform)) {
      required.push(`tabs:${heading}`);
    }
  }
  for (const [heading, categoryName] of Object.entries(COLUMNAR)) {
    if (hasItems(categoryName)) {
      required.push(`columnar:${heading}`);
    }
  }
  for (const [heading, spec] of Object.entries(ROWS)) {
    const category = combined.get(spec.category);
    // Several row tables read the same category, so the category alone does
    // not say which of them has data — the columns' own statistics do.
    const hasData = spec.columns.some((column) =>
      column.totalCount
        ? typeof category?.totalCount === 'number'
        : Boolean(category?.items.some((it) => it.name === column.name))
    );
    if (hasData) {
      required.push(`rows:${heading}`);
    }
  }
  for (const [heading, spec] of Object.entries(CHART_GROUPS)) {
    const hasData =
      spec.chart === 'history'
        ? Boolean(stats.__history?.results?.length)
        : hasItems(spec.category);
    if (hasData) {
      required.push(`chart:${heading}`);
    }
  }
  for (const categoryName of PIE_CATEGORIES) {
    if (unionItemNames(stats, categoryName).size) {
      required.push(`pie:${categoryName}`);
    }
  }
  return required;
}

/**
 * Fail on any view the source has data for that nothing in the document
 * matched — the check that turns "I found no disagreement" into "I looked at
 * everything there was to look at". Rendering one twice is a mismatch too: it
 * means two views were identified as the same thing, so one of them is not
 * being verified as itself.
 */
function checkRegistryCoverage(stats, found, push) {
  for (const key of requiredViews(stats)) {
    const n = found.get(key) || 0;
    push(
      'error',
      `coverage:${key}`,
      n === 1,
      n === 1
        ? 'rendered once'
        : n === 0
          ? 'the source has this data but the document has no such view'
          : `${n} views in the document match this one registry entry`
    );
  }
}

/**
 * AUDIT→ENTRY entryCount for a dataset: what StatsTable divides by for its
 * per-entry average column (getNumberReleaseEntries, statistics/utils.ts).
 */
function numberReleaseEntries(stats, ds) {
  const entry = indexByCategory(stats[ds])
    .get('AUDIT')
    ?.items.find((it) => it.name === 'ENTRY');
  return typeof entry?.entryCount === 'number' ? entry.entryCount : NaN;
}

/** `toFixed(2)` with the page's "too small to show" special case. */
const twoDecimals = (value) => {
  const text = value.toFixed(2);
  return text === '0.00' ? '<0.01' : text;
};

/**
 * Walk a tabbed table's rows once, recomputing the DERIVED cells (Percent,
 * per-entry average) and returning everything else as the pool the raw-value
 * check matches against.
 *
 * Mirrors StatsTable.tsx: the Count and average columns are dropped when every
 * item's count equals its entryCount, and only the amino-acid table (with more
 * than one item) has a Percent column. Rows are matched to their source item by
 * first cell (`label || name`), not by column index — the abbreviation <td> is
 * rendered per row, so indices shift from row to row.
 */
function readTabbedRows(table, category, categoryName, releaseEntries) {
  const hasOnlyEntryCounts = category.items.every(
    (it) => it.count === it.entryCount
  );
  const hasPercent =
    category.items.length > 1 &&
    categoryName === 'SEQUENCE_AMINO_ACID' &&
    typeof category.totalCount === 'number';
  const canAverage = Number.isFinite(releaseEntries) && releaseEntries > 0;
  const byLabel = new Map(
    category.items.map((it) => [norm(it.label || it.name), it])
  );
  const pool = [];
  const mismatches = [];
  let checked = 0;
  let unmatched = 0;
  for (const tr of bodyRows(table)) {
    const cells = rowCells(tr);
    const item = byLabel.get(norm(tr.querySelector('td,th')?.textContent));
    if (!item || typeof item.count !== 'number') {
      unmatched += 1;
      pool.push(...cells);
      continue;
    }
    const expected = [];
    if (!hasOnlyEntryCounts && canAverage) {
      expected.push(twoDecimals(item.count / releaseEntries));
    }
    if (hasPercent) {
      expected.push(
        `${twoDecimals((item.count / category.totalCount) * 100)}%`
      );
    }
    const remaining = [...cells];
    for (const value of expected) {
      checked += 1;
      const at = remaining.indexOf(value);
      if (at < 0) {
        mismatches.push(`${norm(item.label || item.name)} → ${value}`);
      } else {
        remaining.splice(at, 1); // not available to satisfy a raw value
      }
    }
    pool.push(...remaining);
  }
  return {
    pool,
    derived: {
      checked,
      mismatches,
      unmatched,
      // Say so rather than skipping in silence: no AUDIT/ENTRY in the payload
      // means the averages on screen cannot be recomputed at all.
      averagesUncheckable: !hasOnlyEntryCounts && !canAverage,
    },
  };
}

function checkTabbedGroups(doc, stats, push, mark) {
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
    mark(`tabs:${heading}`);
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
      const { pool, derived } = readTabbedRows(
        table,
        category,
        spec.category,
        numberReleaseEntries(stats, ds)
      );
      const fields = rawFieldsFromHead(table, spec.countLabel);
      // A registry entry that no longer matches the rendered <thead> means we
      // are guessing which columns to verify — say so rather than leaving a
      // column silently unchecked (the failure mode a custom countLabel caused).
      push(
        'warning',
        `${heading}:${ds}:columns`,
        fields.matched,
        fields.matched
          ? 'count/entry columns identified from <thead>'
          : `no count or entry-count column recognised (headers: ${JSON.stringify(fields.headers)}) — verifying all raw values`
      );
      if (derived.checked || derived.mismatches.length) {
        push(
          'warning',
          `${heading}:${ds}:derived`,
          derived.mismatches.length === 0,
          derived.mismatches.length
            ? `${derived.mismatches.length} derived cell(s) not found where recomputed from source, e.g. ${derived.mismatches.slice(0, 3).join(', ')}`
            : `${derived.checked} derived cell(s) match a recomputation`
        );
      }
      if (derived.averagesUncheckable) {
        push(
          'warning',
          `${heading}:${ds}:derived-averages`,
          false,
          'no AUDIT/ENTRY entryCount in the source — per-entry averages not checked'
        );
      }
      if (derived.unmatched) {
        push(
          'warning',
          `${heading}:${ds}:rows-matched`,
          false,
          `${derived.unmatched} row(s) could not be matched to a source item by name — their derived cells are unchecked`
        );
      }
      const missing = missingValues(expectedValues(category, { fields }), pool);
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

function checkColumnarTables(doc, stats, push, mark) {
  for (const table of doc.querySelectorAll('table')) {
    if (table.closest('.archived-tabs')) {
      continue;
    }
    const heading = nearestHeading(table);
    const categoryName = COLUMNAR[heading];
    if (!categoryName) {
      continue;
    }
    mark(`columnar:${heading}`);
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
      const expected = [];
      const withoutSource = [];
      for (const it of category.items) {
        const text = fmt(it.entryCount);
        if (text === null) {
          withoutSource.push(it.name);
        } else {
          expected.push(text);
        }
      }
      if (withoutSource.length) {
        push(
          'error',
          `${heading}:${ds}:source`,
          false,
          `${withoutSource.length} source item(s) have no numeric entryCount, e.g. ${withoutSource.slice(0, 3).join(', ')}`
        );
      }
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
    // One row per distinct name across datasets — the union, which is what
    // merge() renders and is not always what the combined payload lists.
    const union = unionItemNames(stats, categoryName);
    if (union.size) {
      push(
        'error',
        `${heading}:rows`,
        rowsEls.length === union.size,
        `${rowsEls.length} rows vs ${union.size} union items`
      );
    }
  }
}

function checkRowTables(doc, stats, push, mark) {
  for (const table of doc.querySelectorAll('table')) {
    if (table.closest('.archived-tabs')) {
      continue;
    }
    const heading = nearestHeading(table);
    if (!Object.hasOwn(ROWS, heading)) {
      continue; // reported by checkUnregisteredTables
    }
    const spec = ROWS[heading];
    mark(`rows:${heading}`);
    // Which datasets the table shows, asserted rather than inferred: the loop
    // below verifies the rows it FINDS, so a dropped row would otherwise take
    // its cells' checks away with it and leave the table looking clean.
    const expectedLabels = spec.excludeUniProtKB
      ? DATASET_LABELS.slice(1)
      : DATASET_LABELS;
    const labels = bodyRows(table)
      .map((tr) => norm(tr.querySelector('td,th')?.textContent))
      .filter((label) => datasetKey(label));
    const okLabels =
      labels.length === expectedLabels.length &&
      expectedLabels.every((expected, i) => labels[i] === expected);
    push(
      'error',
      `${heading}:rows`,
      okLabels,
      okLabels
        ? `${labels.length} dataset row(s) in order`
        : `dataset rows were ${JSON.stringify(labels)}, expected ${JSON.stringify(expectedLabels)}`
    );
    for (const tr of bodyRows(table)) {
      const cells = [...tr.querySelectorAll('td,th')].map((c) =>
        norm(c.textContent)
      );
      // First cell is the section label; `excludeUniProtKB` tables simply have
      // no UniProtKB row, and any other leading cell is not a dataset row.
      const ds = datasetKey(cells[0]);
      if (!ds) {
        continue;
      }
      const values = cells.slice(1);
      push(
        'error',
        `${heading}:${ds}:columns`,
        values.length === spec.columns.length,
        `${values.length} column(s) vs ${spec.columns.length} in the registry`
      );
      const category = indexByCategory(stats[ds]).get(spec.category);
      if (!category) {
        push(
          'error',
          `${heading}:${ds}`,
          false,
          `no source category ${spec.category}/${ds}`
        );
        continue;
      }
      spec.columns.forEach((column, i) => {
        const accessor = column.accessor || 'entryCount';
        // Reproduces AbstractSectionTable's `data.<dataset>?.[accessor] || 0`:
        // a statistic absent for this dataset legitimately shows 0, but a
        // non-zero source value displayed as 0 (a capture whose data never
        // populated) is a mismatch — which a "traces back to some source
        // value" check would wave through.
        const expected = column.totalCount
          ? fmt(category.totalCount)
          : fmt(
              category.items.find((it) => it.name === column.name)?.[
                accessor
              ] || 0
            );
        const actual = values[i];
        const label = column.totalCount
          ? 'totalCount'
          : `${column.name}.${accessor}`;
        if (expected === null) {
          push(
            'error',
            `${heading}:${ds}:${label}`,
            false,
            `source has no numeric ${label} to compare ${JSON.stringify(actual ?? null)} against`
          );
          return;
        }
        push(
          'error',
          `${heading}:${ds}:${label}`,
          actual === expected,
          actual === expected
            ? `shows ${expected}`
            : `displayed ${JSON.stringify(actual ?? null)}, source ${expected}`
        );
      });
    }
  }
}

/**
 * Any non-tabbed table whose heading matches no registry entry is going
 * completely unverified — say so rather than skipping in silence, so a renamed
 * heading in the UI cannot quietly shrink what this gate covers. It lives in
 * its own pass because checkRowTables and checkColumnarTables each walk every
 * table, and so would flag each other's.
 */
function checkUnregisteredTables(doc, push) {
  const reported = new Set();
  for (const table of doc.querySelectorAll('table')) {
    if (table.closest('.archived-tabs')) {
      continue;
    }
    const heading = nearestHeading(table);
    if (
      Object.hasOwn(ROWS, heading) ||
      Object.hasOwn(COLUMNAR, heading) ||
      reported.has(heading)
    ) {
      continue;
    }
    reported.add(heading);
    push(
      'warning',
      `table:${heading}`,
      false,
      `Unrecognised table heading "${heading}" — table not verified`
    );
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
  // ReviewedSequenceCorrections renders <h3> + text as a bare fragment, so
  // parentElement is the whole "Miscellaneous statistics" card — matching in
  // there would pass on any unrelated number (e.g. an Encoded Locations count).
  // Read only the nodes between this heading and the next one.
  let text = '';
  for (
    let node = heading?.nextSibling;
    node && !/^H[1-4]$/.test(node.tagName || '');
    node = node.nextSibling
  ) {
    text += node.textContent || '';
  }
  text = norm(text);
  const expected = fmt(item.count);
  if (expected === null) {
    push(
      'error',
      'Sequence corrections:value',
      false,
      'source SEQUENCE_CORRECTION has no numeric count'
    );
    return;
  }
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

function checkLineCharts(doc, stats, push, mark) {
  for (const group of doc.querySelectorAll('.archived-tabs')) {
    const heading = nearestHeading(group);
    const chart = CHART_GROUPS[heading];
    if (!chart) {
      continue;
    }
    mark(`chart:${heading}`);
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
        const cat = indexByCategory(stats[ds]).get(chart.category);
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

/**
 * Per-dataset max of the counts the history chart actually plots. Mirrors
 * processResults() in HistoricalReleasesEntries.tsx: counts ACCUMULATE per
 * (statisticsType, releaseDate) rather than overwrite, and every row also
 * accumulates into UNIPROTKB — so more than one row for a date raises the
 * plotted max, and computing it any other way would fail a correct archive.
 */
export function historyMax(history, ds) {
  if (!history?.results) {
    return NaN;
  }
  const byType = {
    UNIPROTKB: new Map(),
    REVIEWED: new Map(),
    UNREVIEWED: new Map(),
  };
  const add = (map, date, count) => map.set(date, (map.get(date) || 0) + count);
  for (const r of history.results) {
    const map = byType[r.statisticsType];
    if (!map) {
      continue; // unknown type: the page would throw, we just don't plot it
    }
    add(map, r.releaseDate, r.entryCount);
    add(byType.UNIPROTKB, r.releaseDate, r.entryCount);
  }
  const key =
    { reviewed: 'REVIEWED', unreviewed: 'UNREVIEWED' }[ds] || 'UNIPROTKB';
  const counts = [...byType[key].values()];
  return counts.length ? Math.max(...counts) : NaN;
}

function checkPies(doc, stats, push, mark) {
  for (const group of doc.querySelectorAll('.archived-charts')) {
    const figures = [...group.querySelectorAll('figure')];
    const keys0 = [...(figures[0]?.querySelectorAll('g[data-key]') || [])].map(
      (g) => g.getAttribute('data-key')
    );
    // Every figure shows the union of names with per-dataset values, so
    // identify and compare against the union across datasets.
    const candidate = PIE_CATEGORIES.find((cn) => {
      const names = unionItemNames(stats, cn);
      return keys0.length && keys0.every((k) => names.has(k));
    });
    if (!candidate) {
      // An ERROR, not a warning: "I could not tell what this chart is" leaves
      // every slice check below unrun, which is precisely the silent loss of
      // coverage this gate exists to prevent (a pie stripped of its data-keys
      // lands here).
      push(
        'error',
        'pie',
        false,
        `could not map pie (keys: ${keys0.slice(0, 4).join(', ') || 'none'})`
      );
      continue;
    }
    mark(`pie:${candidate}`);
    const names = unionItemNames(stats, candidate);
    // One figure per dataset, in order: the slice checks below are per figure,
    // so a dropped figure simply takes its own checks with it, and a figure is
    // only ever named by its caption — never compared against it.
    const captions = figures.map((fig) =>
      norm(fig.querySelector('figcaption')?.textContent)
    );
    const okFigures =
      captions.length === DATASET_KEYS.length &&
      DATASET_KEYS.every((key, i) => datasetKey(captions[i]) === key);
    push(
      'error',
      `pie:${candidate}:figures`,
      okFigures,
      okFigures
        ? 'one figure per dataset, in order'
        : `figure captions were ${JSON.stringify(captions)}`
    );
    figures.forEach((fig) => {
      const ds = norm(fig.querySelector('figcaption')?.textContent || '');
      const slices = [...fig.querySelectorAll('g[data-key]')];
      push(
        'error',
        `pie:${candidate}:${ds}:slices`,
        slices.length === names.size,
        `${slices.length} slices vs ${names.size} union items`
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
 * Verify an already-parsed archive. Prefer this over `verifyArchive` when the
 * caller has a document in hand: an archive with inlined fonts and images runs
 * to tens of MB, and a second JSDOM parse doubles peak memory and runtime.
 * @param {Document} document
 * @param {{ statistics: {combined,reviewed,unreviewed}, history? }} groundTruth
 */
export function verifyDocument(document, groundTruth) {
  const stats = {
    combined: groundTruth.statistics.combined,
    reviewed: groundTruth.statistics.reviewed,
    unreviewed: groundTruth.statistics.unreviewed,
    __history: groundTruth.history,
  };
  const checks = [];
  const push = (severity, name, ok, detail) =>
    checks.push({ severity, name, ok, detail });
  // Registry keys the checks below matched in the document, counted so that
  // neither a missing view nor a duplicated one goes unnoticed.
  const found = new Map();
  const mark = (key) => found.set(key, (found.get(key) || 0) + 1);

  checkArchiveStructure(document, push);
  checkTabbedGroups(document, stats, push, mark);
  checkColumnarTables(document, stats, push, mark);
  checkRowTables(document, stats, push, mark);
  checkUnregisteredTables(document, push);
  checkSequenceCorrections(document, stats, push);
  checkLineCharts(document, stats, push, mark);
  checkPies(document, stats, push, mark);
  checkRegistryCoverage(stats, found, push);

  const mismatches = checks.filter((c) => !c.ok && c.severity === 'error');
  return { ok: mismatches.length === 0, checks, mismatches };
}

/**
 * @param {string} html
 * @param {{ statistics: {combined,reviewed,unreviewed}, history? }} groundTruth
 */
export function verifyArchive(html, groundTruth) {
  return verifyDocument(new JSDOM(html).window.document, groundTruth);
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
  const result = verifyDocument(document, embedded);
  printVerifyReport(result);
  process.exit(result.ok ? 0 : 1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.stack || String(error));
    process.exit(1);
  });
}
