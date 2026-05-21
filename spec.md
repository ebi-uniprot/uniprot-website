# Spec & Plan: UniParc sub-entry rendering via the UniProtKB pipeline

> **Single source of truth.** Supersedes the original "Transform UniFireModel to
> UniParcPrecomputedModel" spec — the convergence type changed from
> `UniParcPrecomputedModel` to `UniProtkbAPIModel` ("Approach B", §2).
>
> **Status:** in progress — Phases 1–3 complete (2026-05-20); all 7 section components verified reusable; Phases 4–6 not
> started. Phases 1–2 ("the transformation branch") are intended to merge as a
> standalone PR *before* any component work (Phase 3+).
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

**Spike evidence (performed during planning):**
- `uniProtKbConverter` converts lifted data from both sources with no structural failure.
- **All 7 annotation-driven UniProtKB section components** render from
  UniFire-converted data with **zero component changes** — verified by spike (§5).
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
Omit<UniProtkbAPIModel, 'uniProtkbId' | 'entryType' | 'proteinExistence'>
  & { entryType: 'AA'; uniProtkbId: null }
```
The precomputed endpoint's **wire type** only — not a convergence target.

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
(`{ section; freeTextType?; subSectionLabel?; featureType? }`); named export
`groupTypesBySection`. The `freeTextType`/`featureType` fields are **adapter**
data (used by the converter); `section`/`subSectionLabel` + `groupTypesBySection`
are **display** data — the display half dies in Phase 5.

---

## 5. Rendering layer — current state

### `SubEntryMain.tsx` — `src/uniparc/components/sub-entry/SubEntryMain.tsx`
Generic dispatcher (22 lines): maps `Object.values(UniParcSubEntryConfig)`
calling `sectionContent(transformedData)`, each wrapped in `Suspense` +
`ErrorBoundary`. Not UniFire-coupled — only its prop type changes (Phase 3).

### `UniParcSubEntryConfig.tsx` — `src/uniparc/config/UniParcSubEntryConfig.tsx`
`Record<EntrySection, { id; label; sectionContent: (data) => JSX.Element }>`.
11 sections:

| Section | Current component | Source | Migrate? |
|---|---|---|---|
| Function | `UniFireInferredSection` | annotations | ✅ → `FunctionSection` |
| SubcellularLocation | `UniFireInferredSection` | annotations | ✅ → `SubcellularLocationSection` |
| Expression / ProteinProcessing / Interaction | `UniFireInferredSection` | annotations | ✅ → UniProtKB component — verified ✅ |
| FamilyAndDomains | `SubEntryFamilyAndDomains` | annotations | ✅ → UniProtKB component — verified ✅ |
| NamesAndTaxonomy | `SubEntryNamesAndTaxonomySection` | mixed | ✅ → `NamesAndTaxonomySection` |
| Structure / Sequence / SimilarProteins | bespoke | `data.entry` | ✗ entry-driven — no change |
| KeywordsAndGO | `SubEntryKeywordsSection` | raw `unifire` | ✅ likely removable (Phase 5) |

### `UniFireInferredSection.tsx`
UniFire-tailored: reads raw `data.unifire?.predictions`, filters by
`annotationType`. **Deleted in Phase 5.**

### UniProtKB section components (reuse targets) — all verified ✅

All seven annotation-driven section components are **pure props components** (no
context argument, no `Entry.tsx` entanglement) and render UniFire-converted data
with no modification — verified by spike: each mounted on a `UniProtkbUIModel`
converted from UniFire data and confirmed to render its **actual content**, not
just "not throw". Five were exercised with the UniFire mock; Expression and
Interaction were confirmed with synthetic `comment.induction` / `comment.subunit`
predictions, since the mock has neither. Each lives in
`src/uniprotkb/components/entry/`.

| Section | Component | Props |
|---|---|---|
| Function | `FunctionSection` | `data: FunctionUIModel`, `primaryAccession`, `sequence?`, `communityReferences: Reference[]` |
| SubcellularLocation | `SubcellularLocationSection` | `data: SubcellularLocationUIModel`, `sequence?` |
| Expression | `ExpressionSection` | `data: UIModel`, `primaryAccession` |
| ProteinProcessing | `ProteinProcessingSection` | `data: UIModel`, `primaryAccession`, `sequence?` |
| Interaction | `InteractionSection` | `data: UIModel`, `primaryAccession` |
| FamilyAndDomains | `FamilyAndDomainsSection` | `data: UIModel`, `primaryAccession`, `sequence?`, `uniParcID?`, `hasPhylogenomicXrefs?` |
| NamesAndTaxonomy | `NamesAndTaxonomySection` | `data: NamesAndTaxonomyUIModel`, `primaryAccession`, `communityReferences: Reference[]`, `references?` |

Notes:
- `data` is `annotations[EntrySection.X]`, cast to the section subtype where the
  prop is narrower than the declared `UIModel`.
- `SubcellularLocationSection`'s viz early-returns on `!lineage` — `organism`
  must be supplied (Phase 3).
- Each section also fires its **own** `useDataApi` fetch for supplementary data
  (ProteinProcessing → `proteomicsPtm`; Function → GO ribbon / `CommunityCurated`;
  etc.), keyed off `primaryAccession`. They degrade gracefully when the fetch
  misses (the converted prop data still renders) — see Open Q1.

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

### Phase 4 — Migrate sections one at a time
`UniParcSubEntryConfig` dispatches per-section, so old and new coexist. All seven
target components are **verified reusable** (§5) — Phase 4 is mechanical: per
section, rewrite its `sectionContent` to render the UniProtKB component fed
`annotations[EntrySection.X]`, then verify.
- Annotation sections: Function, SubcellularLocation, Expression,
  ProteinProcessing, Interaction, FamilyAndDomains, NamesAndTaxonomy — see §5 for
  the component + props of each.
- **Function (4a)** ✅ done — `<FunctionSection>`.
- **SubcellularLocation (4b)** ✅ done — `<SubcellularLocationSection>`.
  `SubEntry.tsx` supplements `organism` from the UniParc cross-reference
  (`subEntryDataPerDatabase.organism`, a `TaxonomyDatum`), flattening its
  `Lineage` objects to the `string[]` lineage that `UniProtkbAPIModel.organism`
  (`UniProtKBSimplifiedTaxonomy`) requires. `SubcellularLocationWithVizView`
  returns `null` (dropping the SL comments) on a *falsy* `lineage` — but an
  empty `[]` is truthy, so when the xref carries no lineage the SL content
  still renders; only the SwissBioPics virus-detection is then degraded.
  **Open:** confirm whether the UniParc xref API populates `organism.lineage`
  (a real `rest.uniprot.org` xref response would settle it; if it never does,
  consider fetching the taxonomy lineage by `taxonId`).
- Entry-driven sections (Structure, Sequence, SimilarProteins) — no change.
- Example: `<FunctionSection data={annotations[EntrySection.Function] as FunctionUIModel}
  primaryAccession={entry.primaryAccession} sequence={entry.sequence?.value}
  communityReferences={[]} />`.
- **Verify each with a render test:** `customRender` the section and `jest.mock`
  `useDataApi` to return `{ loading: false, data: undefined }` — otherwise the
  section sits on its own supplementary fetch's `<Loader/>` and renders nothing.
  Assert the converted content actually appears, not merely that it "did not
  throw" (the all-sections spike initially missed empty Expression/Interaction
  because the UniFire mock lacked induction/subunit predictions).

### Phase 5 — Remove the UniFire-specific rendering layer
- Delete `UniFireInferredSection.tsx`; delete the display half of
  `UniFireAnnotationTypeToSection` (`groupTypesBySection`, `section`/`subSectionLabel`);
  keep/relocate the adapter half.
- **Keep `SubEntryKeywordsSection` (the `KeywordsAndGO` config entry) as-is** —
  it is the one annotation section **not** migrated to a UniProtKB component.
  UniFire keywords have no `category`, so `uniProtKbConverter` cannot section
  them (verified: 0 of 33 placed); the bespoke catch-all stays. Do **not** delete
  it. Verify it doesn't depend on the deleted display-half of
  `UniFireAnnotationTypeToSection`.

### Phase 6 — Precomputed endpoint branch (after Phases 3–5)
Fetch → `UniParcPrecomputedModel` → thin lift to `UniProtkbAPIModel` (placeholders,
same as the UniFire converter) → same pipeline. Optionally tighten
`UniParcPrecomputedModel` (`Omit`→`Pick`). No new rendering work.

---

## 7. Open questions

1. **Supplementary fetches.** Every reused section component fires its own
   `useDataApi` request keyed off the accession — `proteomicsPtm`
   (ProteinProcessing), GO ribbon / GO-CAM / `CommunityCurated` (Function), etc.
   For a UniParc accession these mostly miss; the components degrade gracefully
   (the converted data still renders), but decide whether to suppress the
   requests/widgets. (Phase 3/4)
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

- ~~Not all section components standalone-reusable~~ — **RESOLVED:** all seven
  annotation-driven section components verified reusable with zero changes (§5).
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
