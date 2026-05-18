#!/usr/bin/env -S npx tsx

/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
/**
 * High-fidelity counterpart to transformer-gap/analyze.py.
 *
 * The Python script projects what the transformer SHOULD produce by mirroring
 * its dispatch logic. This TS script does the real thing: it imports
 * `uniFireToPrecomputedConverter` and runs it on every JSON under
 * downloads/unifire/, then diffs the actual output against the corresponding
 * downloads/precomputed/*.json.
 *
 * The transformer pulls in frontend code transitively (React components, CSS
 * modules, Sentry). To run it in plain Node we pre-register lightweight stubs
 * in require.cache for the heavyweight dependencies that are NOT exercised by
 * the transformer's runtime path:
 *
 *   - shared/utils/logging         (only Sentry-importing module)
 *   - uniparc/adapters/uniParcConverter  (drags in EntryTypeIcon -> SCSS)
 *   - uniparc/utils/subEntry       (drags in react-router-dom + app config)
 *
 * The stubs only need to satisfy the bindings imported at module-load time.
 * The transformer never calls them; the broader sub-entry converter file is
 * loaded only because it exports `constructPredictionEvidences`.
 *
 * Usage:
 *   npx tsx transformer-gap/analyze.ts
 *   npx tsx transformer-gap/analyze.ts --verbose
 *   npx tsx transformer-gap/analyze.ts --out gap-ts.json
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// 1. Stub heavyweight modules BEFORE the transformer is required.
// ---------------------------------------------------------------------------

const SRC = path.resolve(__dirname, '..', 'src');

type LogEntry = { msg: unknown; ctx?: unknown };
const transformerWarnings: LogEntry[] = [];
const transformerErrors: LogEntry[] = [];

function preloadStub(absPath: string, exports: Record<string, unknown>) {
  require.cache[absPath] = {
    id: absPath,
    filename: absPath,
    loaded: true,
    exports,
    paths: [],
    children: [],
    parent: null,
  } as any;
}

preloadStub(path.join(SRC, 'shared/utils/logging.ts'), {
  warn: (msg: unknown, ctx: unknown) => transformerWarnings.push({ msg, ctx }),
  error: (msg: unknown, ctx: unknown) => transformerErrors.push({ msg, ctx }),
  debug: () => {},
});

preloadStub(path.join(SRC, 'uniparc/adapters/uniParcConverter.ts'), {
  default: () => null,
  databaseToEntryType: new Map<string, unknown>(),
});

preloadStub(path.join(SRC, 'uniparc/utils/subEntry.ts'), {
  isSourceDatabase: () => false,
});

// ---------------------------------------------------------------------------
// 2. Now the real transformer can be required safely.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-require-imports, import/no-dynamic-require
const transformerModule = require(
  path.join(SRC, 'uniparc/adapters/uniFireToUniProtkbConverter.ts')
);
const uniFireToPrecomputedConverter: (data: any) => any =
  transformerModule.default;
const { isValidUniFireModel } = transformerModule as {
  isValidUniFireModel: (data: unknown) => boolean;
};

// ---------------------------------------------------------------------------
// 3. Corpus + analysis.
// ---------------------------------------------------------------------------

type Counter = Record<string, number>;
const bump = (c: Counter, key: string, by = 1) => {
  c[key] = (c[key] ?? 0) + by;
};

function topLevelFields(obj: Record<string, unknown>): string[] {
  return Object.keys(obj);
}

function commentShapeKeys(c: Record<string, unknown>): string[] {
  const shapeKeys = [
    'texts',
    'subcellularLocations',
    'reaction',
    'physiologicalReactions',
    'cofactors',
    'interactions',
    'diseases',
    'events',
    'isoforms',
    'note',
  ];
  const out: string[] = [];
  for (const k of shapeKeys) {
    if (k in c) out.push(k);
  }
  for (const k of Object.keys(c)) {
    if (k === 'commentType' || k === 'molecule') continue;
    if (!shapeKeys.includes(k)) out.push(`other:${k}`);
  }
  return out;
}

function collectEvidenceSources(node: unknown, into: Counter): void {
  if (Array.isArray(node)) {
    for (const v of node) collectEvidenceSources(v, into);
    return;
  }
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (typeof o.evidenceCode === 'string' && typeof o.source === 'string') {
      bump(into, o.source);
    }
    for (const v of Object.values(o)) collectEvidenceSources(v, into);
  }
}

function readJson(p: string): any {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function fmtCounter(c: Counter, indent = '    '): string {
  const entries = Object.entries(c).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  if (entries.length === 0) return `${indent}(none)`;
  const width = Math.max(...entries.map(([k]) => k.length));
  return entries
    .map(([k, v]) => `${indent}${k.padEnd(width)}  ${v}`)
    .join('\n');
}

function safeRun(
  data: any,
  accession: string
):
  | { ok: true; result: any; warnings: LogEntry[]; errors: LogEntry[] }
  | { ok: false; error: unknown; warnings: LogEntry[]; errors: LogEntry[] } {
  const wStart = transformerWarnings.length;
  const eStart = transformerErrors.length;
  try {
    const result = uniFireToPrecomputedConverter(data);
    return {
      ok: true,
      result,
      warnings: transformerWarnings.slice(wStart),
      errors: transformerErrors.slice(eStart),
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      warnings: transformerWarnings.slice(wStart),
      errors: transformerErrors.slice(eStart),
    };
  }
}

// ---------------------------------------------------------------------------
// 4. Main.
// ---------------------------------------------------------------------------

const { values: args } = parseArgs({
  options: {
    downloads: { type: 'string', default: path.join(__dirname, 'downloads') },
    out: { type: 'string' },
    verbose: { type: 'boolean', default: false },
  },
});

const unifireDir = path.join(args.downloads as string, 'unifire');
const precomputedDir = path.join(args.downloads as string, 'precomputed');

type Pair = { accession: string; unifire?: string; precomputed?: string };
const pairs = new Map<string, Pair>();

if (fs.existsSync(unifireDir)) {
  for (const f of fs.readdirSync(unifireDir)) {
    if (!f.endsWith('.json')) continue;
    const acc = path.basename(f, '.json');
    pairs.set(acc, { accession: acc, unifire: path.join(unifireDir, f) });
  }
}
if (fs.existsSync(precomputedDir)) {
  for (const f of fs.readdirSync(precomputedDir)) {
    if (!f.endsWith('.json')) continue;
    const acc = path.basename(f, '.json');
    const existing = pairs.get(acc) ?? { accession: acc };
    existing.precomputed = path.join(precomputedDir, f);
    pairs.set(acc, existing);
  }
}

if (pairs.size === 0) {
  console.error(`No JSON files found under ${args.downloads}`);
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Aggregates
// ---------------------------------------------------------------------------

let nUnifireOnly = 0;
let nPrecomputedOnly = 0;
let nBoth = 0;
let nValidationFailures = 0;
let nTransformerThrows = 0;

const unifireAnnotationTypeFreq: Counter = {};
const unknownAnnotationTypes: Counter = {};

const realCommentsByType: Counter = {};
const realFeaturesByType: Counter = {};
const realXrefsByDb: Counter = {};
let realKeywordTotal = 0;
let realAlternativeNamesTotal = 0;
let realRecommendedTotal = 0;
const realEvidenceSources: Counter = {};

const precompTopFieldFreq: Counter = {};
const precompCommentsByType: Counter = {};
const precompCommentShapes: Record<string, Counter> = {};
const precompFeaturesByType: Counter = {};
let precompKeywordTotal = 0;
const precompKeywordFieldFreq: Counter = {};
const precompXrefsByDb: Counter = {};
const precompEvidenceSources: Counter = {};
let precompHasRecommended = 0;
let precompHasAlternative = 0;

let nPairs = 0;
let deltaComments = 0;
let deltaFeatures = 0;
let deltaKeywords = 0;
let deltaXrefs = 0;
const unreachableCommentTypes: Counter = {};
const unreachableFeatureTypes: Counter = {};
const structuredShapesUnreachable: Record<string, Counter> = {};
const extraXrefDbs: Counter = {};
const resolvedEvidenceSources: Counter = {};
const untransformedFields: Counter = {};

const TRANSFORMER_PRODUCES = new Set([
  'entryType',
  'primaryAccession',
  'uniProtkbId',
  'annotationScore',
  'comments',
  'features',
  'keywords',
  'proteinDescription',
  'uniProtKBCrossReferences',
  'extraAttributes',
]);
const TRANSFORMER_EVIDENCE_SOURCES = new Set(['ARBA', 'UniRule']);

const perPair: Array<Record<string, unknown>> = [];
const failures: Array<{ accession: string; reason: string }> = [];

for (const { accession, unifire, precomputed } of Array.from(
  pairs.values()
).sort((a, b) => a.accession.localeCompare(b.accession))) {
  if (unifire && !precomputed) nUnifireOnly += 1;
  if (!unifire && precomputed) nPrecomputedOnly += 1;
  if (unifire && precomputed) nBoth += 1;

  let realOutput: any | null = null;

  if (unifire) {
    const data = readJson(unifire);
    for (const p of (data.predictions as any[]) ?? []) {
      bump(unifireAnnotationTypeFreq, p.annotationType ?? '<missing>');
    }
    if (!isValidUniFireModel(data)) {
      nValidationFailures += 1;
      failures.push({
        accession,
        reason: 'isValidUniFireModel returned false',
      });
    } else {
      const run = safeRun(data, accession);
      if (!run.ok) {
        nTransformerThrows += 1;
        failures.push({
          accession,
          reason: `transformer threw: ${
            run.error instanceof Error ? run.error.message : String(run.error)
          }`,
        });
      } else {
        realOutput = run.result;
        for (const w of run.warnings) {
          const extra = (w.ctx as any)?.extra;
          if (extra?.annotationType) {
            bump(unknownAnnotationTypes, extra.annotationType);
          }
        }
        for (const c of (realOutput.comments as any[]) ?? []) {
          bump(realCommentsByType, c.commentType ?? '<unknown>');
        }
        for (const f of (realOutput.features as any[]) ?? []) {
          bump(realFeaturesByType, f.type ?? '<unknown>');
        }
        for (const x of (realOutput.uniProtKBCrossReferences as any[]) ?? []) {
          bump(realXrefsByDb, x.database ?? '<unknown>');
        }
        realKeywordTotal += ((realOutput.keywords as any[]) ?? []).length;
        const altNames = realOutput.proteinDescription?.alternativeNames;
        if (Array.isArray(altNames))
          realAlternativeNamesTotal += altNames.length;
        if (realOutput.proteinDescription?.recommendedName) {
          realRecommendedTotal += 1;
        }
        collectEvidenceSources(realOutput, realEvidenceSources);
      }
    }
  }

  let precompData: any | null = null;
  if (precomputed) {
    precompData = readJson(precomputed);
    for (const f of topLevelFields(precompData)) bump(precompTopFieldFreq, f);
    for (const c of (precompData.comments as any[]) ?? []) {
      const ct = c.commentType ?? '<unknown>';
      bump(precompCommentsByType, ct);
      precompCommentShapes[ct] ??= {};
      for (const shape of commentShapeKeys(c)) {
        bump(precompCommentShapes[ct], shape);
      }
    }
    for (const ftr of (precompData.features as any[]) ?? []) {
      bump(precompFeaturesByType, ftr.type ?? '<unknown>');
    }
    for (const k of (precompData.keywords as any[]) ?? []) {
      precompKeywordTotal += 1;
      for (const field of ['id', 'category', 'name', 'evidences']) {
        if (field in k) bump(precompKeywordFieldFreq, field);
      }
    }
    for (const x of (precompData.uniProtKBCrossReferences as any[]) ?? []) {
      bump(precompXrefsByDb, x.database ?? '<unknown>');
    }
    collectEvidenceSources(precompData, precompEvidenceSources);
    if (precompData.proteinDescription?.recommendedName)
      precompHasRecommended += 1;
    if (precompData.proteinDescription?.alternativeNames?.length)
      precompHasAlternative += 1;
  }

  if (realOutput && precompData) {
    nPairs += 1;

    const realNComments = ((realOutput.comments as any[]) ?? []).length;
    const preNComments = ((precompData.comments as any[]) ?? []).length;
    const realNFeatures = ((realOutput.features as any[]) ?? []).length;
    const preNFeatures = ((precompData.features as any[]) ?? []).length;
    const realNKeywords = ((realOutput.keywords as any[]) ?? []).length;
    const preNKeywords = ((precompData.keywords as any[]) ?? []).length;
    const realNXrefs = ((realOutput.uniProtKBCrossReferences as any[]) ?? [])
      .length;
    const preNXrefs = ((precompData.uniProtKBCrossReferences as any[]) ?? [])
      .length;

    deltaComments += preNComments - realNComments;
    deltaFeatures += preNFeatures - realNFeatures;
    deltaKeywords += preNKeywords - realNKeywords;
    deltaXrefs += preNXrefs - realNXrefs;

    const realCommentTypes = new Set<string>();
    for (const c of (realOutput.comments as any[]) ?? [])
      realCommentTypes.add(c.commentType);
    for (const c of (precompData.comments as any[]) ?? []) {
      const ct = c.commentType ?? '<unknown>';
      if (!realCommentTypes.has(ct)) bump(unreachableCommentTypes, ct);
      // Structured shapes the transformer can never produce.
      structuredShapesUnreachable[ct] ??= {};
      for (const shape of commentShapeKeys(c)) {
        if (shape !== 'texts') bump(structuredShapesUnreachable[ct], shape);
      }
    }

    const realFeatureTypes = new Set<string>();
    for (const f of (realOutput.features as any[]) ?? [])
      realFeatureTypes.add(f.type);
    for (const f of (precompData.features as any[]) ?? []) {
      if (!realFeatureTypes.has(f.type)) bump(unreachableFeatureTypes, f.type);
    }

    for (const x of (precompData.uniProtKBCrossReferences as any[]) ?? []) {
      if (x.database && x.database !== 'GO') bump(extraXrefDbs, x.database);
    }

    const sources: Counter = {};
    collectEvidenceSources(precompData, sources);
    for (const [src, n] of Object.entries(sources)) {
      if (!TRANSFORMER_EVIDENCE_SOURCES.has(src)) {
        bump(resolvedEvidenceSources, src, n);
      }
    }

    for (const f of topLevelFields(precompData)) {
      if (!TRANSFORMER_PRODUCES.has(f)) bump(untransformedFields, f);
    }

    if (args.verbose) {
      perPair.push({
        accession,
        realComments: realNComments,
        precomputedComments: preNComments,
        realFeatures: realNFeatures,
        precomputedFeatures: preNFeatures,
        realKeywords: realNKeywords,
        precomputedKeywords: preNKeywords,
        realXrefs: realNXrefs,
        precomputedXrefs: preNXrefs,
        precomputedExtraTopFields: topLevelFields(precompData).filter(
          (f) => !TRANSFORMER_PRODUCES.has(f)
        ),
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Render report.
// ---------------------------------------------------------------------------

const out = (s = '') => process.stdout.write(`${s}\n`);
const section = (title: string) => {
  out();
  out('='.repeat(78));
  out(`  ${title}`);
  out('='.repeat(78));
};

section('1. Corpus (TS analyzer — calls real uniFireToPrecomputedConverter)');
out(`  pairs (both files):        ${nBoth}`);
out(`  unifire-only:              ${nUnifireOnly}`);
out(`  precomputed-only:          ${nPrecomputedOnly}`);
out(`  total accessions:          ${pairs.size}`);
out(`  validation failures:       ${nValidationFailures}`);
out(`  transformer threw:         ${nTransformerThrows}`);

section('2. UniFire annotationType frequency (raw)');
const annTypeRows = Object.entries(unifireAnnotationTypeFreq).sort(
  (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
);
const annWidth = Math.max(...annTypeRows.map(([k]) => k.length), 1);
for (const [k, v] of annTypeRows) {
  const known = unknownAnnotationTypes[k] ? 'NO  (silently dropped)' : 'yes';
  out(`  ${k.padEnd(annWidth)}  ${String(v).padStart(5)}  ${known}`);
}

if (Object.keys(unknownAnnotationTypes).length) {
  out('\n  *** Unknown UniFire annotation types reported via logging.warn ***');
  out(fmtCounter(unknownAnnotationTypes));
}

section('3. Real transformer output (aggregated over UniFire corpus)');
out('  commentsByType:');
out(fmtCounter(realCommentsByType));
out('\n  featuresByType:');
out(fmtCounter(realFeaturesByType));
out('\n  uniProtKBCrossReferences (by database):');
out(fmtCounter(realXrefsByDb));
out(`\n  keywords total:                 ${realKeywordTotal}`);
out(`  alternativeNames total:         ${realAlternativeNamesTotal}`);
out(`  recommendedName present in:     ${realRecommendedTotal} outputs`);
out('\n  evidence sources emitted by transformer:');
out(fmtCounter(realEvidenceSources));

section('4. Precomputed structural inventory');
out('  top-level fields seen (frequency):');
out(fmtCounter(precompTopFieldFreq));
out('\n  commentsByType:');
out(fmtCounter(precompCommentsByType));
out('\n  comment shapes (per commentType):');
for (const ct of Object.keys(precompCommentShapes).sort()) {
  const shapes = Object.entries(precompCommentShapes[ct]).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  out(`    ${ct}: ${shapes.map(([s, n]) => `${s}=${n}`).join(', ')}`);
}
out('\n  featuresByType:');
out(fmtCounter(precompFeaturesByType));
out(`\n  keyword total:               ${precompKeywordTotal}`);
out('  keyword field presence:');
out(fmtCounter(precompKeywordFieldFreq));
out('\n  uniProtKBCrossReferences (by database):');
out(fmtCounter(precompXrefsByDb));
out('\n  evidence sources seen anywhere:');
out(fmtCounter(precompEvidenceSources));
out(`\n  proteinDescription.recommendedName present: ${precompHasRecommended}`);
out(`  proteinDescription.alternativeNames present: ${precompHasAlternative}`);

section('5. Gap analysis (paired accessions only — real diff)');
out(`  pairs analysed: ${nPairs}`);
if (nPairs) {
  out(
    `\n  Δ comments (precomputed - transformer): ${deltaComments >= 0 ? '+' : ''}${deltaComments}`
  );
  out(
    `  Δ features:                              ${deltaFeatures >= 0 ? '+' : ''}${deltaFeatures}`
  );
  out(
    `  Δ keywords:                              ${deltaKeywords >= 0 ? '+' : ''}${deltaKeywords}`
  );
  out(
    `  Δ xrefs:                                 ${deltaXrefs >= 0 ? '+' : ''}${deltaXrefs}`
  );

  out('\n  comment types in precomputed never present in transformer output:');
  out(fmtCounter(unreachableCommentTypes));

  out('\n  feature types in precomputed never present in transformer output:');
  out(fmtCounter(unreachableFeatureTypes));

  out('\n  structured comment shapes the transformer CANNOT emit:');
  const ssEntries = Object.entries(structuredShapesUnreachable).filter(
    ([, c]) => Object.keys(c).length
  );
  if (ssEntries.length === 0) {
    out('    (none)');
  } else {
    for (const [ct, shapes] of ssEntries.sort((a, b) =>
      a[0].localeCompare(b[0])
    )) {
      const rendered = Object.entries(shapes)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([s, n]) => `${s}=${n}`)
        .join(', ');
      out(`    ${ct}: ${rendered}`);
    }
  }

  out('\n  cross-reference databases beyond GO:');
  out(fmtCounter(extraXrefDbs));

  out('\n  evidence sources in precomputed that the transformer never emits:');
  out(fmtCounter(resolvedEvidenceSources));

  out('\n  top-level precomputed fields the transformer never produces:');
  out(fmtCounter(untransformedFields));
}

section('6. React adaptation checklist');
const checklist: string[] = [];
if (precompKeywordTotal) {
  const idN = precompKeywordFieldFreq.id ?? 0;
  const catN = precompKeywordFieldFreq.category ?? 0;
  checklist.push(
    `Keywords: handle absent \`id\`/\`category\`. Precomputed has id on ` +
      `${idN}/${precompKeywordTotal} keywords, category on ` +
      `${catN}/${precompKeywordTotal}. UniFire-derived keywords will have neither.`
  );
}
for (const [ct, shapes] of Object.entries(structuredShapesUnreachable)) {
  if (!Object.keys(shapes).length) continue;
  const shapeList = Object.keys(shapes).sort().join(', ');
  checklist.push(
    `Comment renderer for '${ct}': handle BOTH structured (${shapeList}) ` +
      `and free-text \`texts\` shapes.`
  );
}
if (Object.keys(extraXrefDbs).length) {
  const top = Object.entries(extraXrefDbs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([db, n]) => `${db}(${n})`)
    .join(', ');
  checklist.push(
    `Cross-references: UniFire-derived entries only carry \`GO\`. ` +
      `Precomputed entries also carry: ${top}.`
  );
}
if (Object.keys(resolvedEvidenceSources).length) {
  const top = Object.entries(resolvedEvidenceSources)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([s, n]) => `${s}(${n})`)
    .join(', ');
  checklist.push(
    `Evidence tags: UniFire-derived entries only emit \`ARBA\`/\`UniRule\`. ` +
      `Precomputed entries also have resolved sources: ${top}.`
  );
}
if (Object.keys(untransformedFields).length) {
  const top = Object.entries(untransformedFields)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([f, n]) => `${f}(${n})`)
    .join(', ');
  checklist.push(
    `Top-level fields in precomputed but NEVER produced by transformer: ${top}.`
  );
}
if (Object.keys(unknownAnnotationTypes).length) {
  checklist.push(
    `*** UniFire annotation types unknown to UniFireAnnotationTypeToSection ` +
      `(silently dropped today): ` +
      `${Object.keys(unknownAnnotationTypes).sort().join(', ')}.`
  );
}
if (nValidationFailures || nTransformerThrows) {
  checklist.push(
    `*** Transformer failures observed in corpus: ${nValidationFailures} ` +
      `validation failures, ${nTransformerThrows} thrown exceptions. ` +
      `See failures section for details.`
  );
}
if (checklist.length === 0) {
  out('  (no actionable items derived from this corpus)');
} else {
  checklist.forEach((item, i) =>
    out(`  ${String(i + 1).padStart(2)}. ${item}\n`)
  );
}

if (failures.length) {
  section('7. Transformer failures (per accession)');
  for (const f of failures) {
    out(`  ${f.accession}: ${f.reason}`);
  }
}

if (args.verbose && perPair.length) {
  section('8. Per-pair detail (verbose)');
  for (const row of perPair) {
    out(JSON.stringify(row));
  }
}

// Machine-readable bundle for --out.
const bundle = {
  corpus: {
    pairs: nBoth,
    unifireOnly: nUnifireOnly,
    precomputedOnly: nPrecomputedOnly,
    totalAccessions: pairs.size,
    validationFailures: nValidationFailures,
    transformerThrows: nTransformerThrows,
  },
  unifireAnnotationTypeFreq,
  unknownAnnotationTypes,
  real: {
    commentsByType: realCommentsByType,
    featuresByType: realFeaturesByType,
    xrefsByDb: realXrefsByDb,
    keywordTotal: realKeywordTotal,
    alternativeNamesTotal: realAlternativeNamesTotal,
    recommendedTotal: realRecommendedTotal,
    evidenceSources: realEvidenceSources,
  },
  precomputed: {
    topFieldFreq: precompTopFieldFreq,
    commentsByType: precompCommentsByType,
    commentShapes: precompCommentShapes,
    featuresByType: precompFeaturesByType,
    keywordTotal: precompKeywordTotal,
    keywordFieldPresence: precompKeywordFieldFreq,
    xrefsByDb: precompXrefsByDb,
    evidenceSources: precompEvidenceSources,
    hasRecommended: precompHasRecommended,
    hasAlternative: precompHasAlternative,
  },
  gap: {
    pairCount: nPairs,
    deltaComments,
    deltaFeatures,
    deltaKeywords,
    deltaXrefs,
    unreachableCommentTypes,
    unreachableFeatureTypes,
    structuredShapesUnreachable,
    extraXrefDbs,
    resolvedEvidenceSources,
    untransformedFields,
  },
  checklist,
  failures,
  perPair: args.verbose ? perPair : [],
};

if (args.out) {
  fs.writeFileSync(args.out as string, JSON.stringify(bundle, null, 2));
  console.error(`\nWrote JSON report to ${args.out}`);
}
