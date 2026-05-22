# Spec & Plan: UniParc sub-entry rendering via the UniProtKB pipeline

> **Single source of truth.** Supersedes the original "Transform UniFireModel to
> UniParcPrecomputedModel" spec — the convergence type changed from
> `UniParcPrecomputedModel` to `UniProtkbAPIModel` ("Approach B", §2).
>
> **Status:** Phases 1–6 complete (2026-05-21) — UniParc sub-entry annotations
> render through the UniProtKB pipeline for **both** the UniFire and precomputed
> sources. Phases 1–2 ("the transformation branch") are intended to merge as a
> standalone PR *before* any component work (Phase 3+); see §6 for the
> recommended PR slicing.
>
> **Post-completion review (2026-05-21):** a best-practices review plus a
> data-loss audit found eight follow-ups (§12.1–12.8) where the abstraction
> leaked, a workaround stands in for a fix, or the converter is incomplete. The
> audit confirmed **no data is lost for any entry in the corpus** (289 UniFire +
> 250 precomputed files); the items do **not** block the feature (the stated
> objective is met) but should be resolved before this is considered done. See
> **§12**.
>
> Self-contained: assumes no prior context. Verify file paths / line numbers
> against the codebase before editing — line numbers drift.

---

## 1. Goal

UniParc sequence annotation pages (SAPs) are essentially UniProtKB entry pages.
They are populated by one of two data sources:

1. **Precomputed endpoint** — returns `UniParcPrecomputedModel` directly.
   Available for RefSeq-source entries only.
2. **UniFire endpoint** — returns `UniFireModel` (flat `annotationType` /
   `annotationValue` predictions), transformed on demand. The **permanent** path
   for all non-RefSeq entries — not a temporary fallback.

When a user visits a SAP the page checks for precomputed data; if absent it
fetches UniFire on demand. Both sources must render through **one pipeline**,
**reusing the existing UniProtKB section components** rather than a parallel
UniParc-specific rendering stack.

UniFire-derived data is permanently thinner than precomputed (keywords without
`id`/`category`, generic evidence sources). Downstream rendering must handle
this gracefully by design.

### Example endpoints
- UniFire: `https://rest.uniprot.org/uniprotkb/unifire/run?id=UPI000012C942&taxId=2725997`
- Precomputed: `https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/precomputed/UPI0000000001/10245`

---

## 2. Approach ("Approach B") & why

```
UniFire predictions ─► uniFireToUniProtkbConverter ──┐
                                                     ├─► UniProtkbAPIModel ─► uniProtKbConverter ─► UniProtkbUIModel ─► UniProtKB section components
precomputed endpoint ─► UniParcPrecomputedModel ─────┘   (+ organism/sequence
                        (lift — Phase 6)                  from the UniParc entry)
```

Both sources converge at **`UniProtkbAPIModel`** — the input type of
`uniProtKbConverter`, the only producer of the `UniProtkbUIModel` that UniProtKB
section components consume. Reusing `uniProtKbConverter` means **no new
section-distribution logic and no parallel rendering stack.**

**Why not converge on `UniParcPrecomputedModel`** (the original spec): that type
cannot feed `uniProtKbConverter` — it has `uniProtkbId: null` and no
`proteinExistence`. Converging there would force either a brand-new
`UniParcPrecomputedModel → UniProtkbUIModel` converter (reimplementing
section-ization) or modifying core UniProtKB code. `UniParcPrecomputedModel` is
kept only as the precomputed endpoint's **wire type**, lifted to
`UniProtkbAPIModel` in Phase 6.

**Why not converge on `UniProtkbUIModel` directly:** it is the section-keyed
*post-conversion* structure; hand-building it means reimplementing
`uniProtKbConverter` and coupling to an internal (unstable) type.

**Spike evidence (performed during planning) — partly revised by Phase 4/6:**
- `uniProtKbConverter` converts lifted data from both sources with no structural failure.
- The spike claimed all 7 section components were drop-in reusable. **Phase 4 +
  the visual check revised this:** 5 migrate cleanly (Function,
  SubcellularLocation, Expression, ProteinProcessing, Interaction);
  NamesAndTaxonomy and FamilyAndDomains are *hybrids* (entry-intrinsic data +
  annotations) kept bespoke; and the components fire supplementary fetches that
  needed gating. See §5.
- A flattened free-text `SUBCELLULAR LOCATION` comment passes `uniProtKbConverter`
  without error but renders **empty** — hence the structured-comment rule (§3).
- One latent bug found in `subcellularLocationConverter.ts` (Phase 1).

---

## 3. The UniFire → `UniProtkbAPIModel` transformation

Implemented by `uniFireToUniProtkbConverter` in
`src/uniparc/adapters/uniFireToUniProtkbConverter.ts` (✅ Phase 2). It reuses
`constructPredictionEvidences` from `uniParcSubEntryConverter.ts` to convert
string evidence ids into `Evidence[]`. No `databaseInfoMaps` needed.

### Fixed fields

```ts
{
  entryType: 'AA',
  uniProtkbId: '',        // placeholder — UniParc data has no UniProtKB ID
  proteinExistence: '',   // placeholder — UniFire has no PE level
  annotationScore: 0,
  primaryAccession: '...' // UniFireModel.accession, colon → hyphen
}
```

`uniProtkbId`/`proteinExistence` are empty-string **placeholders**: `UniProtkbAPIModel`
requires them as `string`, but UniParc data has neither. Empty string is the
honest "not applicable" and renders as nothing if it ever leaks. `entryType: 'AA'`
is the honest discriminator for "automatic-annotation entry, not a real UniProtKB
entry". **`UniProtkbAPIModel` itself is never modified** — adapt at the boundary,
do not weaken the destination type. `primaryAccession`: e.g. `'UPI000002A2F6:9606'`
→ `'UPI000002A2F6-9606'`.

### `comment.*` predictions → `comments[]`

`commentType` comes from `annotationTypeToSection[type].freeTextType`. **Two cases:**

**Structured comment types** — `SUBCELLULAR LOCATION`, `COFACTOR`,
`CATALYTIC ACTIVITY` — emit their **structured shape**, one comment per
prediction (not consolidated). A `FreeTextComment` for these would be silently
dropped by the UniProtKB renderers, which read the structured fields. UniFire's
flat `annotationValue` maps to the single required text field of each:

```ts
'SUBCELLULAR LOCATION' → { commentType, subcellularLocations: [{ location: { value, evidences } }] }
'COFACTOR'             → { commentType, cofactors: [{ name: value, evidences }] }
'CATALYTIC ACTIVITY'   → { commentType, reaction: { name: value, evidences } }
```

**All other comment types** — `FUNCTION`, `CAUTION`, `SIMILARITY`,
`ACTIVITY REGULATION`, `PATHWAY`, `MISCELLANEOUS`, … — emit `FreeTextComment`,
and are **consolidated by `commentType`** (multiple predictions of one type
collapse into a single comment with a flat `texts[]`, in declaration order):

```
Input:  { evidence: ["ARBA00002651"], annotationType: "comment.function",
          annotationValue: "The gamma-CTF peptides..." }
Output: { commentType: 'FUNCTION',
          texts: [{ value: 'The gamma-CTF peptides...',
                    evidences: [{ evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00002651' }] }] }
```

### `feature.*` predictions → `features[]`

`type` comes from `annotationTypeToSection[type].featureType`. Requires both
`start` and `end`; a feature prediction missing either is silently skipped.

```
Input:  { evidence: ["UR000976770"], annotationType: "feature.DISULFID", start: 73, end: 117 }
Output: { type: 'Disulfide bond', description: '',
          location: { start: { value: 73, modifier: 'EXACT' },
                      end:   { value: 117, modifier: 'EXACT' } },
          evidences: [{ evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000976770' }] }
```

### `keyword` predictions → `keywords[]`

```
Input:  { evidence: ["ARBA00023087"], annotationType: "keyword", annotationValue: "Amyloid" }
Output: { name: 'Amyloid', evidences: [...] }
```

UniFire provides no keyword `id` or `category` — those fields are absent
(permanently, by design — see §differences).

### `protein.recommendedName.fullName` → `proteinDescription.recommendedName`

First prediction wins (known UniFire duplicate issue — reported upstream).

### `protein.alternativeName.fullName` → `proteinDescription.alternativeNames[]`

Each prediction appended in order.

### `protein.recommendedName.ecNumber` → `recommendedName.ecNumbers[]`

Accumulated and merged into `recommendedName`. `ProteinNames` requires a
non-optional `fullName`, so ecNumbers can only attach when a
`recommendedName.fullName` was also predicted; otherwise they are dropped with a
`logging.warn` (empirically, no corpus entry has ecNumbers without a fullName).

### `xref.GO` predictions → `uniProtKBCrossReferences[]`

```
Input:  { evidence: ["UR000976770","UR000976774"], annotationType: "xref.GO", annotationValue: "GO:0008201" }
Output: { database: 'GO', id: 'GO:0008201', evidences: [...] }
```

(No `properties` — see the §6 Phase 1 latent-bug note; the consuming GO-xref code
must be null-safe.)

### `extraAttributes`

`countByCommentType` and `countByFeatureType` computed from the transformed
output. Free-text types count 1 per `commentType` (consolidated); structured
types count one per prediction.

### Edge cases & error handling

| Scenario | Behaviour |
| :--- | :--- |
| Input not a valid `UniFireModel` | `isValidUniFireModel` guard fails → `logging.error` + throw with accession |
| Unknown `annotationType` | Skip prediction, keep the rest, `logging.warn` |
| A single prediction's transform throws | Skip it (per-prediction try/catch), keep successfully transformed predictions, `logging.warn` |
| Duplicate `protein.recommendedName.fullName` | Use the first |

Logging: `import * as logging from '../../shared/utils/logging'` →
`logging.warn(msg, { extra: { annotationType, accession } })`.

### UniFire-derived vs precomputed data (permanent differences)

| Field | Precomputed (RefSeq) | UniFire-derived (all others) |
| :--- | :--- | :--- |
| `keywords[].id` / `.category` | Present | Absent |
| Subcellular location | Structured `SubcellularLocationComment` with SL-* ids + topology | Structured, but `location.value` only (no SL-* id, no topology) |
| Evidence sources | Resolved (e.g. `PROSITE-ProRule`) | Generic (`UniRule`, `UR*` ids) |

Both sources now emit the **same comment shapes** — Phase 2 normalises UniFire's
structured comments — so downstream consumers never branch on provenance.

---

## 4. Key types & entry points

### `UniProtkbAPIModel` — `src/uniprotkb/adapters/uniProtkbConverter.ts` (~line 68)
UniProtKB API response shape. **Do not modify.** Required: `primaryAccession`,
`uniProtkbId: string`, `proteinExistence: string`, `entryType: string`,
`annotationScore: AnnotationScoreValue` (`0|1|2|3|4|5`). Optional: `proteinDescription?`,
`organism?`, `comments?: Comment[]`, `keywords?`, `features?`,
`uniProtKBCrossReferences?`, `sequence?`, `extraAttributes?`, etc.

### `uniProtKbConverter` — same file (~line 175)
`(data: UniProtkbAPIModel, databaseInfoMaps: DatabaseInfoMaps) => UniProtkbUIModel`.
`UniProtkbUIModel` is section-keyed (`[EntrySection.Function]: UIModel`, …);
the per-section type is declared `UIModel` but the converter produces specific
subtypes — section components need a cast (`as FunctionUIModel`).

### `UniParcPrecomputedModel` — `src/uniparc/types/precomputed.ts`
```ts
Pick<UniProtkbAPIModel,
  'comments' | 'extraAttributes' | 'features' | 'keywords'
  | 'primaryAccession' | 'proteinDescription'>
  & { entryType: 'AA'; uniProtkbId: null; annotationScore: 0 }
```
The precomputed endpoint's **wire type** only — not a convergence target. The
`Pick` set is the union of top-level keys across the 250-file corpus.
`annotationScore` is always `0.0` for precomputed entries — typed as the literal
`0`, and not rendered on sub-entry pages.

### UniFire types — `src/uniparc/adapters/uniParcSubEntryConverter.ts` (~line 23)
```ts
type Prediction = { evidence: string[]; annotationType: string;
                    annotationValue?: string; start?: number; end?: number };
type UniFireModel = { accession: string; predictions: Prediction[] | ModifiedPrediction[] };
```
`constructPredictionEvidences(evidences: string[] | undefined): Evidence[]` — same file.

### `uniFireToUniProtkbConverter` — `src/uniparc/adapters/uniFireToUniProtkbConverter.ts` (✅ Phase 2)
`(data: unknown) => UniProtkbAPIModel`. Exports `isValidUniFireModel` (runtime
guard) and `ValidUniFireModel`. Pure — no entry/`databaseInfoMaps` argument
(organism/sequence supplementation happens at page assembly, Phase 3).

### Structured comment types — `src/uniprotkb/types/commentTypes.ts`
`SubcellularLocationComment` (`subcellularLocations: [{ location, topology?, orientation? }]`),
`CofactorComment` (`cofactors: [{ name, evidences?, cofactorCrossReference? }]`),
`CatalyticActivityComment` (`reaction: { name, reactionCrossReferences?, ecNumber?, evidences? }`).

### `UniFireAnnotationTypeToSection` — `src/uniparc/config/UniFireAnnotationTypeToSection.ts`
Default export `annotationTypeToSection: Record<string, SectionObject>`
(`{ section; freeTextType?; featureType? }`) — the adapter map
`uniFireToUniProtkbConverter` uses to turn a UniFire `annotationType` into a
comment/feature. Its former "display half" (`subSectionLabel`,
`groupTypesBySection`) was removed once the bespoke UniFire display layer was
gone.

---

## 5. Rendering layer — current state (post-migration)

### `SubEntryMain.tsx` — `src/uniparc/components/sub-entry/SubEntryMain.tsx`
Generic dispatcher: maps `Object.values(UniParcSubEntryConfig)` calling
`sectionContent(transformedData, annotations)`, each wrapped in `Suspense` +
`ErrorBoundary`. Prop type `{ transformedData; annotations? }`.

### `UniParcSubEntryConfig.tsx` — 11 sections, three kinds

| Kind | Sections |
|---|---|
| **Migrated** → UniProtKB component, fed `annotations[X]` | Function, SubcellularLocation, Expression, ProteinProcessing, Interaction |
| **Bespoke hybrid** — entry-intrinsic data + `annotations` | NamesAndTaxonomy, FamilyAndDomains |
| **Bespoke entry-driven** — from `transformedData` | Structure, Sequence, SimilarProteins, KeywordsAndGO |

`sectionContent: (entryData: UniParcSubEntryUIModel, annotations?:
UniProtkbUIModel) => JSX.Element | null`. A migrated section's body is
`annotations ? <XSection …/> : null` (Function additionally gates on
`hasAnnotationContent`). `UniFireInferredSection` and `SubEntryFeaturesView` were
deleted in Phase 5.

### The 5 migrated UniProtKB section components — props

| Section | Component | Props |
|---|---|---|
| Function | `FunctionSection` | `data: FunctionUIModel`, `primaryAccession`, `sequence?`, `communityReferences: Reference[]` |
| SubcellularLocation | `SubcellularLocationSection` | `data: SubcellularLocationUIModel`, `sequence?` |
| Expression | `ExpressionSection` | `data: UIModel`, `primaryAccession` |
| ProteinProcessing | `ProteinProcessingSection` | `data: UIModel`, `primaryAccession`, `sequence?` |
| Interaction | `InteractionSection` | `data: UIModel`, `primaryAccession` |

`data` is `annotations[EntrySection.X]`, cast to the section subtype where the
prop is narrower than the declared `UIModel`. NamesAndTaxonomy and
FamilyAndDomains are bespoke hybrids (see Phase 4) — not in this table.

**Reuse caveats — found in the visual check, not the spikes:**
- The components are **not pure** — each fires its own `useDataApi` supplementary
  fetch keyed off `primaryAccession` (ProteinProcessing → proteomics PTM;
  Function → GO-CAM via `GoCam`; Interaction → IntAct via `InteractionViewer`).
  Each is now gated on `isUniProtKBAccession()` so it does not 400/404 on a
  UniParc accession (Phase 6).
- `FunctionSection`'s `hasContent` guard is fooled by metadata fields — gated
  upstream with `hasAnnotationContent` (Phase 6).
- `SubcellularLocationSection`'s viz early-returns on `!lineage` — `organism`
  must be supplied (Phase 4).

---

## 6. Phased plan

```
Phase 1 (independent) ───────────────────────────────────┐
Phase 2 ──► Phase 3 ──► Phase 4 (per-section) ──► Phase 5
Phase 6 (after Phases 3–5) ───────────────────────────────┘
```

Phases 1 & 2 = "the transformation branch" — merge as a standalone PR before
Phase 3.

### Phase 1 — Null-safety fix in `subcellularLocationConverter` ✅ DONE (2026-05-20)
- `src/uniprotkb/adapters/subcellularLocationConverter.ts` (`getAndPrepareSubcellGoXrefs`):
  `xref.properties?.GoTerm.startsWith('C:')` → `xref.properties?.GoTerm?.startsWith('C:')`.
  A GO xref with a `properties` object lacking `GoTerm` previously crashed the
  whole conversion.
- Regression test added to `subcellularLocationConverter.spec.ts` (verified
  fail-before / pass-after).

### Phase 2 — Retarget the UniFire converter ✅ DONE (2026-05-20)
- Renamed `uniFireToPrecomputedConverter.ts` → `uniFireToUniProtkbConverter.ts`
  (+ spec). Output type `UniParcPrecomputedModel` → `UniProtkbAPIModel`.
- Empty-string `uniProtkbId`/`proteinExistence` placeholders; `entryType: 'AA'`.
- Structured comments for the 3 structured types (§3); free-text + consolidation
  unchanged for the rest.
- `UniFireAnnotationTypeToSection` was **not** modified — a `switch` in the
  converter's `buildComment` helper detects structured types.
- Tests: `uniFireToUniProtkbConverter.spec.ts` updated + COFACTOR / CATALYTIC /
  structured-SL coverage added.
- **Deferred (deliberate):** organism/sequence supplementation → Phase 3 (it
  reads the UniParc entry — page-assembly work); `UniParcPrecomputedModel →
  UniProtkbAPIModel` lift and `Omit`→`Pick` tightening → Phase 6.

### Phase 3 — Page assembly ✅ DONE (2026-05-20)
- `SubEntry.tsx` computes `annotations: UniProtkbUIModel | undefined` in a
  `useMemo`: `uniFireToUniProtkbConverter(uniFireData.data)` → `uniProtKbConverter`,
  with `databaseInfoMaps` from `useDatabaseInfoMaps()`. The `useMemo` runs
  **before** `uniParcSubEntryConverter()` — that converter *mutates*
  `uniFireData.data.predictions` into the `ModifiedPrediction` shape, which
  `uniFireToUniProtkbConverter`'s validation would then reject. The conversion is
  wrapped in try/catch (degrade to no annotations rather than crash the page).
- `SubEntryMain` now takes `annotations?` **alongside** the existing
  `transformedData` — additive, NOT the full `{ entry, annotations }` composite.
  `UniFireInferredSection` still needs the `UniParcSubEntryUIModel`, so the old
  prop stays until Phase 5; the slim-down to `{ entry, annotations }` happens
  there. `UniParcSubEntryConfig`'s `sectionContent` is now
  `(entryData: UniParcSubEntryUIModel, annotations?: UniProtkbUIModel) => JSX.Element`
  — existing per-section arrows are unchanged (they ignore the 2nd arg).
- `databaseInfoMaps` — via `useDatabaseInfoMaps()` (a `DatabaseInfoMapsContext`
  consumer), already in scope for UniParc pages; guarded for `undefined`.
- **Deferred to Phase 4b:** organism/sequence supplementation. It is only
  consumed by the SubcellularLocation viz (`SubcellularLocationWithVizView`
  early-returns on `!lineage`), which is not rendered until Phase 4 — so it is
  done when that section migrates.
- **Verified:** eslint + `tsc` clean; `src/uniparc` suite 102/102 with 52
  snapshots **unchanged** — page renders identically (no section consumes
  `annotations` yet; Phase 4 migrates them).

### Phase 4 — Migrate sections one at a time ✅ DONE (2026-05-20)
**Five** annotation sections in `UniParcSubEntryConfig` now render the UniProtKB
section component fed `annotations[EntrySection.X]` (was `UniFireInferredSection`
/ the bespoke `SubEntry*Section`s). Each `sectionContent` is
`(data, annotations) => annotations ? <XSection … /> : null`.
- **Function** → `<FunctionSection>` · **SubcellularLocation** →
  `<SubcellularLocationSection>` · **Expression** → `<ExpressionSection>` ·
  **ProteinProcessing** → `<ProteinProcessingSection>` · **Interaction** →
  `<InteractionSection>`.
- **NamesAndTaxonomy and FamilyAndDomains are NOT migrated** — kept as bespoke
  components (`SubEntryNamesAndTaxonomySection`, `SubEntryFamilyAndDomainsSection`)
  reworked on 2026-05-21 into **source-agnostic hybrids**. Each renders two
  parts: an *entry-intrinsic* part from `data` (NamesAndTaxonomy → the
  cross-reference's imported protein/gene/organism; FamilyAndDomains → the
  entry's InterPro `sequenceFeatures`) — present on every entry — **plus** the
  annotation-derived part read from the converted `annotations` (predicted
  names; DOMAIN/SIMILARITY comments, features and keywords). Reading from
  `annotations` (not raw `data.unifire`) means both the UniFire and precomputed
  branches are covered — the corpus shows `SIMILARITY` comments and predicted
  protein names in ~90–95% of entries on *both* sources. They join
  KeywordsAndGO / Structure / Sequence / SimilarProteins as non-migrated
  sections. (The original `SubEntry` nav logic was the tell — only these two
  had *entry-driven* `disabled` checks.)
- **SubcellularLocation** also needed `organism` supplemented — `SubEntry.tsx`
  takes it from the UniParc cross-reference (`subEntryDataPerDatabase.organism`,
  a `TaxonomyDatum`), flattening its `Lineage` objects to the `string[]` lineage
  `UniProtkbAPIModel.organism` (`UniProtKBSimplifiedTaxonomy`) requires. The xref
  often carries no lineage → `[]`; this originally **crashed** the viz's
  `isVirus` (now fixed — see the visual-check note, finding b). **Known
  limitation:** SwissBioPics virus-detection is degraded for lineage-less
  entries; fetch the taxonomy lineage by `taxonId` if that ever matters.
- Entry-driven sections (Structure, Sequence, SimilarProteins) — unchanged.
  `KeywordsAndGO` stays bespoke (`SubEntryKeywordsSection`, see Phase 5 / Q4).
- The bespoke `UniFireInferredSection`, `SubEntryFamilyAndDomainsSection` and
  `SubEntryNamesAndTaxonomySection` are now orphaned — Phase 5 deletes them.
- **Verified:** `tsc` + ESLint clean; the migration-comparison harness reports
  0 dropped / 0 misplaced across 3426 values / 289 corpus entries; full suite
  green (237 suites, 1491 tests).

### Phase 5 — Remove the UniFire-specific rendering layer ✅ DONE (2026-05-20)
Deleted (all verified orphaned first): `UniFireInferredSection.tsx`,
`SubEntryFamilyAndDomainsSection.tsx`, `SubEntryNamesAndTaxonomySection.tsx`,
`SubEntryFeaturesView.tsx` (a helper, orphaned once its only two consumers
went), and the temporary `migration-comparison.spec.tsx` harness.
- **`UniFireAnnotationTypeToSection.ts`** — at Phase 5 only the converter's
  adapter map (`annotationTypeToSection`) was strictly needed, but
  `groupTypesBySection` / `subSectionLabel` were briefly retained for the
  in-page-nav and the bespoke sections. Phase 6 drove the nav off
  `annotations[section]` and the reworked hybrids off the converted
  `annotations`, so both were removed — the file is now just the adapter map.
- **`SubEntryMain` kept as `{ transformedData, annotations? }`** — *not* slimmed
  to `{ entry, annotations }`: `KeywordsAndGO` still needs `transformedData.unifire`
  and the entry-driven sections need `entry`/`subEntry`.
- **`SubEntryKeywordsSection` (`KeywordsAndGO`) kept** — the one annotation
  section not migrated (UniFire keywords have no `category`; see Q4).
- **Verified:** `tsc` + ESLint clean; `src/uniparc` suite 99/99 (7 suites).
- `transformer-gap/downloads/` no longer feeds anything in `src/` — safe to
  drop from the repo whenever convenient.

### Phase 6 — Precomputed endpoint branch ✅ DONE (2026-05-21)
Fetch → `UniParcPrecomputedModel` → thin lift to `UniProtkbAPIModel` → same
pipeline. No new rendering work — the Phase-4 sections consume `annotations`
source-agnostically.
- **Lift** — `precomputedToUniProtkbConverter` fills the `uniProtkbId` and
  `proteinExistence` placeholders (a `UniParcPrecomputedModel` already *is* a
  `UniProtkbAPIModel` otherwise). Validated against all 250 real precomputed
  responses in `transformer-gap/downloads/precomputed/` — every one lifts +
  `uniProtKbConverter`s cleanly.
- **URL** — `apiUrls.precomputed.precomputed(upi, taxId)` →
  `{apiPrefix}/uniprotkb/precomputed/<upi>/<taxId>` (path params; **HTTP 404 =
  no precomputed data**). Precomputed follows the environment-dependent
  `apiPrefix` (so it points at wwwdev under `start:dev`). **Temporary:** during
  the dev rollout UniFire's `run` service is only on `rest.uniprot.org`, so
  `unifire.ts` pins that host rather than `apiPrefix` (otherwise `start:dev`
  would 404 it against wwwdev). Once everything converges on `rest.uniprot.org`,
  drop the pin and build it from `apiPrefix` like the rest.
- **Selection (`SubEntry.tsx`)** — precomputed is **preferred** (a cheap fetch
  of already-computed data); UniFire (which *runs* the pipeline) is the
  **fallback**, gated `runUniFire && precomputedResolved && !hasPrecomputed`.
  `annotations` is built from whichever resolved — precomputed first.
- **In-page-nav** `disabled` for the 5 migrated sections is driven off the
  resolved `annotations` via `annotationSectionHasContent` — source-agnostic
  (precomputed or UniFire), mirroring `Entry.tsx` (`hasContent`, and
  `subcellularLocationSectionHasContent` for SL). NamesAndTaxonomy and
  FamilyAndDomains keep their original entry-driven nav checks.
  `UniFireAnnotationTypeToSection` is now **just the adapter map** the converter
  uses — `groupTypesBySection` and `subSectionLabel` are gone. The reworked
  bespoke hybrids consume the converted `annotations` (UIModels), not the raw
  UniFire prediction shape, so they no longer need that display config.
- **Audit follow-ups done (2026-05-21):** `showUniFireOption` is now gated on
  `precomputedResolved && !hasPrecomputed`, so the UniFire "Generate
  annotations" control/status is hidden for precomputed entries — it had been
  showing a misleading "No predictions generated". `UniParcPrecomputedModel`
  tightened `Omit`→`Pick` (the 7 fields the endpoint actually returns, per the
  250-file corpus). Redundant `key` props dropped from `UniParcSubEntryConfig`.
- **Visual check (`yarn start:dev`)** — in progress; surfaced and fixed four
  things the automated checks could not: (a) UniFire URL host (pinned to
  `rest.uniprot.org`); (b) `SubcellularLocationWithVizView.isVirus` crashed on
  an empty `lineage` — `withOrganism` produces `lineage: []` when the xref has
  no lineage, so `isVirus` now treats an empty lineage as non-virus rather than
  reading `undefined.scientificName`; (c) `uniParcSubEntryConverter` mutates the
  UniFire object's `.predictions`, so it is now passed a shallow clone — keeping
  `uniFireData.data` raw for the `annotations` useMemo (the mutation otherwise
  made the memo log spurious "Invalid UniFireModel" errors on a strict-mode
  re-run); (d) the migrated sections fire supplementary accession-keyed fetches
  (`ProteinProcessingSection` → proteomics PTM, `GoCam` → GO-CAM,
  `InteractionViewer` → the IntAct `<interaction-viewer>`) that 400/404 on the
  fabricated `UPI…-taxId` accession. Each fetching component now self-guards on
  the new `isUniProtKBAccession()` helper (`regexes.ts`) — the check lives with
  the component that fetches, not its parent. The spikes/harness mocked
  `useDataApi`, so these fetches were never exercised in testing; (e) a
  no-prediction entry rendered no Names & Taxonomy at all — see Phase 4:
  NamesAndTaxonomy was wrongly migrated as an annotation section and has been
  reverted to the bespoke entry-driven `SubEntryNamesAndTaxonomySection`;
  (f) `getSubEntryProteomes` crashed on a `sources` xref property with no
  proteome segment (empty `proteomeId` → `getEntryPath` throws) — now guarded
  (a pre-existing bug re-exposed by the (e) revert); (g) FamilyAndDomains
  vanished on no-prediction entries — same class as (e): it is a hybrid (entry
  InterPro `sequenceFeatures` + predictions) and has likewise been reverted to
  the bespoke `SubEntryFamilyAndDomainsSection` (see Phase 4); (h) the migrated
  `FunctionSection` rendered an empty Card — `hasContent` counts metadata fields
  and `functionConverter` always sets `entryType`, so its own guard never fired;
  the Function `sectionContent` now gates on `hasAnnotationContent` (renderable
  fields only) and the in-page-nav uses the same check; (i) the two hybrid
  sections' nav items were wrongly disabled — the nav check ignored their
  entry-intrinsic half; now mirrors each component's render condition; (j) the
  FamilyAndDomains rework initially dropped `keywordData`, losing precomputed
  "Domain"-category keywords — `KeywordView` added back.
- **Verified:** `tsc` + ESLint clean; `src/uniparc` suite 102/102.

---

## 7. Open questions

1. ~~**Supplementary fetches.**~~ **RESOLVED:** the reused section components
   each fire their own accession-keyed `useDataApi` request (`proteomicsPtm`,
   GO-CAM, IntAct). For a UniParc accession these 400/404 — each fetching
   component now self-guards on `isUniProtKBAccession()` (Phase 6 /
   visual-check note d).
2. `FunctionSection` emits its own `<HTMLHead><meta name="description">` —
   reconcile with the sub-entry page's own meta description.
3. ~~Does the precomputed endpoint exist yet?~~ **RESOLVED:** it exists
   (`…/uniprotkb/precomputed/{upi}/{taxId}` — see §1). Phase 6 is no longer
   backend-gated — only sequenced after Phases 3–5.
4. ~~UniFire keyword placement.~~ **RESOLVED:** UniFire keywords have no
   `category`, so `uniProtKbConverter` cannot section them — the bespoke
   `SubEntryKeywordsSection` (catch-all) is **kept** rather than migrated
   (Phase 5). Resolving keyword→category in the converter remains a possible
   future enhancement but is not needed for parity. The migration-comparison
   harness confirms 0 keyword drops with the section kept.

## 8. Out of scope

- Modifying `UniProtkbAPIModel` itself (placeholders are the boundary adaptation).
- The UniProtKB entry page. New backend endpoints.

## 9. Risks

- **Section components were not as "pure" / reusable as the spikes suggested.**
  The spikes/harness mocked `useDataApi`, masking three things the visual check
  later caught: (1) several section components fire supplementary accession-keyed
  fetches (now gated — Phase 6 / visual-check note); (2) NamesAndTaxonomy and
  FamilyAndDomains are hybrids — entry-intrinsic data, not pure annotations —
  and were reverted to bespoke (Phase 4); (3) `FunctionSection`'s `hasContent`
  guard is fooled by metadata so it rendered an empty Card (Phase 6). Five
  sections reuse cleanly; treat "reusable" claims as render-only.
- **Placeholder leakage** — low (section components consume per-section
  `UIModel`s, not top-level `uniProtkbId`/`proteinExistence`); verify any new
  `SubEntryMain`-level wrapper.

## 10. Commands & conventions

- `yarn test` — lint + types + unit. Individual: `yarn test:lint`,
  `yarn test:types`, `yarn test:unit`. One jest file:
  `node_modules/.bin/jest <path> --coverage=false`.
- If `yarn` fails with a lockfile error (seen in the dev sandbox), run the
  tools directly: `node_modules/.bin/eslint src`, `node_modules/.bin/tsc`,
  `node_modules/.bin/jest --coverage`.
- Functional components + TypeScript; Airbnb ESLint; no `console.log`; no
  non-null assertions; inline `type` imports; CSS Modules.
- Tests in `__tests__/` as `*.spec.ts(x)`; mock data in `__mocks__/`; wrap
  components with `customRender` from `src/shared/__test-helpers__/customRender`.

## 11. Fixtures

- `databaseInfoMaps` mock — `src/uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps.ts`.
- UniProtKB entry mock (P21802) — `src/uniprotkb/__mocks__/uniProtKBEntryModelData.ts`.
- Precomputed mock — `src/uniparc/__mocks__/uniparcPrecomputedModelData.ts`.
- UniFire mock — `src/uniparc/__mocks__/unifireModelData.ts`.
- `uniProtKbConverter` output contains `Map`s — JSON-serialising needs a
  replacer (`value instanceof Map ? Object.fromEntries(value) : value`).

---

## 12. Review follow-ups (post-completion, 2026-05-21)

A best-practices review of the shipped implementation found six items where the
abstraction leaked or a workaround substitutes for a root-cause fix. The feature
meets the §1 objective (always-UniParc data + precomputed-else-UniFire), so none
of these block it — but they are the difference between "works" and "won't
quietly rot". Resolve them before treating the work as complete. Ordered by
priority; check off as done.

### 12.1 — Fabricated accession leaks provenance into shared components — **HIGH** — ✅ DONE (2026-05-21)

- [x] **Problem.** `uniFireToUniProtkbConverter.ts:323` synthesises
  `primaryAccession: data.accession.replaceAll(':', '-')` (e.g.
  `UPI000002A2F6-9606`) — a string that is neither a UniParc nor a UniProtKB
  accession. It exists only to satisfy the type. It then leaks: the reused
  section components fire accession-keyed supplementary fetches, and the fix
  scattered `isUniProtKBAccession()` into **three shared UniProtKB components**
  (`InteractionViewer.tsx`, `ProteinProcessingSection.tsx`, `GoCam.tsx`). That
  couples shared UniProtKB code to the knowledge that non-UniProtKB callers
  exist — the wrong direction. It also contradicts the §3 claim that
  *"downstream consumers never branch on provenance"* (they now do). It is a
  latent-regression trap: the next supplementary-fetch component added to a
  UniProtKB section will silently 404 on UniParc sub-entries until someone
  remembers to add the guard.
- **Resolution.** Move the gate to the *caller*. Have `UniParcSubEntryConfig`
  pass an explicit prop (e.g. `enableSupplementaryData={false}`, or a
  provenance/`source` prop) into the migrated section components, and remove the
  `isUniProtKBAccession()` sniffing from the three shared components. The shared
  components should not know UniParc exists.
- **Done (2026-05-21).** Added an optional `enableExternalData?: boolean`
  prop (defaults to `true`) to `FunctionSection`, `InteractionSection` and
  `ProteinProcessingSection` — a positive, behaviour-oriented name (not
  `notUniProtKB`: a negated, caller-identity name would re-leak provenance into
  the shared API). `UniParcSubEntryConfig` passes `false` for all
  three; the UniProtKB entry page is unchanged (default). `FunctionSection`
  forwards it to `GoCam`, which gates its GO-CAM `useDataApi`;
  `InteractionSection` gates the `<InteractionViewer>` render (so the lazy chunk
  is not even loaded when disabled); `ProteinProcessingSection` gates its
  proteomics-PTM `useDataApi`. `InteractionViewer` is back to a pure
  `<interaction-viewer>` wrapper. The `isUniProtKBAccession` /
  `reEntireUniProtKBAccession` helpers in `regexes.ts` were removed — no shared
  UniProtKB component knows UniParc exists any more. `tsc` + ESLint clean; the
  UniProtKB entry page (`EntryMain.spec`) and `src/uniparc` suites pass with
  snapshots unchanged.

### 12.2 — `annotations` `useMemo` catch swallows errors silently — **HIGH** — ✅ DONE (2026-05-21)

- [x] **Problem.** `SubEntry.tsx:244` — `} catch { return undefined; }` has no
  logging. The comment claims *"the converters log and throw"*, but
  `uniProtKbConverter` is **also** inside that `try` and is not one of the
  converters that log. If it throws, annotations vanish with zero telemetry.
  For a scientific database, silently-missing annotations is a serious failure
  mode. (Related: §9 Risk on silent degradation; the per-prediction
  `logging.warn` skips and the EC-number drop are other silent data-loss paths
  — acceptable, but this one has no signal at all.)
- **Resolution.** Add a `logging.error` (with the accession in `extra`) inside
  that catch before returning `undefined`.
- **Done (2026-05-21).** The catch now binds the error and calls
  `logging.error` with the message and `extra: { accession, source }` (`source`
  = `precomputed` | `unifire`) before degrading to `undefined`; the misleading
  "the converters log and throw" comment is replaced with an accurate one.
  `accession` was added to the `useMemo` dependency array (exhaustive-deps).
  `tsc` + ESLint clean; `src/uniparc` suite passes (102 tests, snapshots
  unchanged).

### 12.3 — Asymmetric input validation: precomputed is unguarded — **MEDIUM** — ✅ DONE (2026-05-21)

- [x] **Problem.** `uniFireToUniProtkbConverter` runtime-validates input via
  `isValidUniFireModel` (hand-rolled type guard — the project's deliberate
  choice). `precomputedToUniProtkbConverter.ts` just spreads `...data` with no
  guard. The "validated against 250 corpus responses" in §6 is design-time, not
  runtime. Both feed the same `uniProtKbConverter`; a malformed-but-non-throwing
  precomputed payload would render wrong output silently.
- **Resolution.** Give `precomputedToUniProtkbConverter` a light runtime guard
  for parity with the UniFire branch (same hand-rolled style — no schema
  library), or document explicitly why precomputed input is trusted.
- **Done (2026-05-21).** Added `isValidPrecomputedModel(data): data is
  UniParcPrecomputedModel` — a hand-rolled guard mirroring `isValidUniFireModel`.
  Light by design (a precomputed payload already *is* a `UniProtkbAPIModel`
  shape): it checks a string `primaryAccession` and that `comments` / `features`
  / `keywords` are arrays when present — the fields that would break
  `uniProtKbConverter`. `precomputedToUniProtkbConverter` now takes `unknown`
  and, on invalid input, `logging.error`s and throws (same contract as the
  UniFire converter; the `SubEntry.tsx` try/catch — see §12.2 — degrades to no
  annotations). Guard exported; 6 new tests cover throw-and-log and the guard's
  accept/reject cases. `tsc` + ESLint clean; `src/uniparc` suite 108/108.

### 12.4 — `KeywordsAndGO` is not source-agnostic — **MEDIUM** — ✅ DONE (2026-05-21)

- [x] **Problem.** `UniParcSubEntryConfig.tsx:163` —
  `sectionContent: ({ unifire }) => <SubEntryKeywordsSection data={unifire} />`,
  and the nav `disabled` check at `SubEntry.tsx:421` reads
  `transformedData.unifire?.predictions`. For a **precomputed** entry there is
  no `unifire`, so this section never renders and its nav item is permanently
  disabled. §7 Q4 reasons only about the UniFire side. This is probably correct
  behaviour (precomputed keywords are categorised, so they flow through the
  sectioned components) — but it is an **undocumented asymmetry**.
- **Resolution.** Either (a) confirm and document that `KeywordsAndGO` is a
  UniFire-only catch-all by design, **and** verify no precomputed keyword/GO
  xref is silently dropped — specifically a precomputed keyword whose category
  maps to a section the sub-entry page does not render (e.g. Disease); or
  (b) make the section source-agnostic by reading uncategorised keywords/GO
  from the resolved `annotations`.
- **Done (2026-05-21) — chose (a).** The section is a UniFire-only catch-all
  **by design** — the `SubEntrySection` enum member was renamed
  `KeywordsAndGO` → `UniFireKeywordsAndGO` to make that explicit at every use
  site (the enum *value* / DOM anchor stays `keywords_and_go` — provenance
  belongs in the identifier, not the URL fragment), and the rationale is
  documented in `subEntrySection.ts` and `UniParcSubEntryConfig.tsx`. Verified
  against the 250-file precomputed corpus (`transformer-gap/downloads/precomputed/`):
  - **0** precomputed keywords lack a `category`; **0** lack an `id` (1749
    keyword entries across all 250 files). Unlike UniFire keywords, every
    precomputed keyword can therefore be sectioned by `uniProtKbConverter` —
    there is no "orphaned keyword" case to catch.
  - The 7 categories that occur — PTM (714), Cellular component (633),
    Molecular function (221), Biological process (74), Domain (59),
    Developmental stage (33), Ligand (15) — all map to a section the sub-entry
    renders from `annotations`, and each of those components renders
    `keywordData`:

    | Category | Section converter | Sub-entry component (renders `keywordData`) |
    | :--- | :--- | :--- |
    | Molecular function / Biological process / Ligand | `functionConverter` | `FunctionSection` ✅ |
    | Cellular component | `subcellularLocationConverter` | `SubcellularLocationSection` ✅ |
    | Developmental stage | `expressionConverter` | `ExpressionSection` ✅ |
    | PTM | `proteinProcessingConverter` | `ProteinProcessingSection` ✅ |
    | Domain | `familyAndDomainsConverter` | `SubEntryFamilyAndDomains` ✅ |

  - **0** precomputed files carry `uniProtKBCrossReferences` — there are no
    precomputed GO xrefs at all.

  So no precomputed keyword or GO xref is dropped: precomputed never
  legitimately needs `UniFireKeywordsAndGO`, and it correctly renders nothing /
  disables its nav item for that branch.
- **Residual latent risk (documented, not fixed).** Three keyword categories
  *would* be dropped if a precomputed response ever carried them, because they
  map to sections the sub-entry does not render from `annotations`:
  `Coding sequence diversity` and `Technical term` → `sequenceConverter`
  (the sub-entry's Sequence section is the bespoke `SubEntrySequenceSection`,
  which does not read `annotations`); `Disease` → `diseaseAndDrugs`
  (the sub-entry has no Diseases & Variants section at all). None of the three
  appear in the 250-file corpus. Tracked in §12.8.

### 12.5 — `uniParcSubEntryConverter` mutates its input — **MEDIUM** — ✅ DONE (2026-05-21)

- [x] **Problem.** `uniParcSubEntryConverter` reassigns
  `uniFireData.data.predictions`, so `SubEntry.tsx:363` passes a shallow clone
  (`{ ...uniFireData.data }`) and relies on `useMemo` ordering to keep the raw
  object intact for the `annotations` memo. A shallow clone protects only the
  top-level `.predictions` reassignment, not deeper mutation, and correctness
  now depends on a comment staying accurate. Recorded in §6 as visual-check
  note (c) — a workaround, not a fix.
- **Resolution.** Make `uniParcSubEntryConverter` pure (do not mutate the
  passed-in UniFire object — build a new `predictions` array). Then drop the
  shallow-clone workaround and its explanatory comment in `SubEntry.tsx`.
- **Done (2026-05-21).** `uniParcSubEntryConverter` is now pure — instead of
  reassigning `uniFireData.predictions`, it builds a new `UniFireModel`
  (`{ ...uniFireData, predictions: modifiedPredictions }`) and returns that.
  `SubEntry.tsx` passes the raw `uniFireData.data || undefined` straight
  through — the shallow-clone workaround and its comment are gone, and the
  `annotations` `useMemo`'s "computed before … that converter mutates …" note
  was removed (the ordering dependency no longer exists). New spec
  `uniParcSubEntryConverter.spec.ts` asserts the UniFire input is not mutated
  (regression guard). `tsc` + ESLint clean; `src/uniparc` suite 110/110,
  snapshots unchanged.

### 12.6 — "One pipeline" framing vs. the three-kinds-of-section reality — **LOW (doc/process)**

- [ ] **Problem.** The spec headline is "one pipeline", but the end state is
  three kinds of section (5 migrated, 2 hybrid, 4 entry-driven) and 2 of 11
  sections were migrated then reverted (§6 Phase 4 / visual-check notes e, g).
  The convergence correctly applies only to pure-annotation sections — but the
  migrate-then-revert round-trip shows the upfront analysis under-modelled
  "annotation data vs entry-intrinsic data", and the tell (entry-driven nav
  `disabled` checks) was visible beforehand.
- **Resolution.** Documentation only — no code change. Reword §2/§5 so the
  scope of the convergence is stated precisely ("one pipeline for the five
  pure-annotation sections", not the whole page), so the next reader is not
  misled. Captured as a lesson in §9 Risks already; this is about the framing.

### 12.7 — Converter completeness: dead Names & Taxonomy rows — **MEDIUM**

Found by a data-loss audit (2026-05-21) comparing the pre-refactor branch
(`branch.diff`) against the shipped code, cross-checked against the corpus
(289 UniFire files + 250 precomputed files in `transformer-gap/downloads/`).

**No data is lost for any entry in the corpus** — every annotation type that
actually occurs is handled and rendered, and the precomputed branch is purely
additive. But there is a latent gap.

- [ ] **Problem.** The pre-refactor `SubEntryNamesAndTaxonomySection` read **8**
  protein/gene name types straight from the raw UniFire predictions. The
  reworked section (`SubEntryNamesAndTaxonomySection.tsx:81–99`) reads them from
  the converted `annotations` instead — but `uniFireToUniProtkbConverter`
  implements only **3** of the 8:
  - ✅ handled: `protein.recommendedName.fullName`,
    `protein.recommendedName.ecNumber`, `protein.alternativeName.fullName`.
  - ❌ **dropped** (no code path — fall through to the `annotationTypeToSection`
    lookup, which has only `comment.*`/`feature.*` keys → logged
    `"Unknown UniFire annotation type"` and skipped):
    `protein.recommendedName.shortName`, `protein.alternativeName.shortName`,
    `protein.alternativeName.ecNumber`, `gene.name.primary`,
    `gene.name.synonym`.

  The section still builds `recommendedShortNamePrediction`,
  `alternativeECPrediction`, `geneNamePrediction`, `geneNameSynonymsPrediction`
  and still renders the **"Short names"**, **"Alternative EC number"**,
  **"Gene Name"** (predicted) and **"Synonyms"** rows — all now permanently
  empty for the UniFire branch. The page advertises affordances it can never
  fill.

  Not a *visible* loss today: none of the 5 dropped types appear in the 289-file
  UniFire corpus, so the Phase-4 harness's "0 dropped" was correct for the data
  it saw. (The harness also predates the 2026-05-21 NamesAndTaxonomy rework and
  was then deleted — this path was never under test.) It is a silent-loss trap:
  the moment UniFire emits one of these, it vanishes with only a `logging.warn`.

- **Resolution.** Pick one and make the converter and the UI agree:
  1. **Implement the 5 mappings** in `uniFireToUniProtkbConverter` — `gene.name.*`
     → `genes[]` (`geneName` / `synonyms`); `protein.*.shortName` → the relevant
     `shortNames`; `protein.alternativeName.ecNumber` → the alternative name's
     `ecNumbers`. Then add `genes` to the `UniParcPrecomputedModel` `Pick` only
     if a precomputed response is ever found to carry it (the 250-file corpus
     has none). Add converter test coverage for each.
  2. **Or**, if UniFire is confirmed never to emit them for UniParc sub-entries,
     delete the four dead rows from `SubEntryNamesAndTaxonomySection` so the page
     carries no false affordances.

  Option 1 is preferred — it restores parity with the pre-refactor behaviour and
  is a few lines per type.

### 12.8 — Related side-findings (low / pre-existing)

- [ ] **`feature.feature.CHAIN` key.** `UniFireAnnotationTypeToSection.ts` has a
  key with a doubled `feature.` prefix — a real `feature.CHAIN` prediction would
  never match it and would be dropped as an unknown type. No `CHAIN` feature in
  the corpus, and the pre-refactor `groupTypesBySection` had the same key (so
  **not a regression**), but fix the typo while in the file.
- [ ] **Precomputed keyword categories — latent only.** Every keyword category
  in the 250-file precomputed corpus (Biological process, Cellular component,
  Developmental stage, Domain, Ligand, Molecular function, PTM) maps to a
  section the sub-entry renders from `annotations`, so no loss is observed. But
  a precomputed keyword in a category that maps elsewhere (e.g. `Disease` →
  Diseases & Variants, which the sub-entry does not render) would be silently
  dropped. Related to §12.4 — verify if the precomputed corpus ever widens.
