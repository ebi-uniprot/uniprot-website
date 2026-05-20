# Renderer Spec: rendering `UniParcPrecomputedModel` from two sources

> **Companion to:** [`spec.md`](./spec.md) (transformer contract) and [`transformer-gap/transformer-audit.md`](./transformer-gap/transformer-audit.md) (empirical findings).
> **Audience:** anyone wiring `UniParcPrecomputedModel` into the React SAP renderer.
> **Status:** descriptive — no code changes are mandated by this document on its own.

## 1. Why this document exists

A `UniParcPrecomputedModel` may arrive at the renderer from one of two pipelines:

1. **Precomputed** endpoint — used for RefSeq entries. Returns the model directly.
2. **UniFire** endpoint — used for all other (non-RefSeq) entries. Returns `UniFireModel`, which `uniFireToPrecomputedConverter` (`src/uniparc/adapters/uniFireToPrecomputedConverter.ts`) transforms into the same `UniParcPrecomputedModel` type.

Although the two paths converge on one type, the **content shapes are not identical**. UniFire-derived instances are permanently thinner than precomputed ones, and the asymmetry is two-directional for some fields (see §6). The renderer therefore cannot assume either source is a strict subset of the other; every field documented below must be handled in both flavours.

The shape inventory in §2–§7 was derived from `transformer-gap/analyze.ts` over a 289-file UniFire corpus paired with 250 precomputed files. Counts are reproducible from `npx tsx transformer-gap/analyze.ts`.

## 2. Comment renderer contract — per `commentType`

For every comment type the renderer must accept both shapes listed below. The shape it receives depends on the source pipeline; on a single page only one source is ever in play, but the same renderer code paths handle both deployments.

Counts below are total comment-object counts across the corpus (precomputed: 250 files; UniFire-derived: 289 files, post Step-4 consolidation).

| `commentType` | Precomputed shape (object count) | UniFire-derived shape (object count) | Renderer must |
| :--- | :--- | :--- | :--- |
| `COFACTOR` | `cofactors[]` (structured: `name`, `cofactorCrossReference.{database,id}`, `evidences`) — 2 | `texts[]` (free-text, e.g. `"Name=FAD; Xref=ChEBI:CHEBI:57692"`) — 2 | Render both. See §2.1. |
| `FUNCTION` | `texts[]` — 231 | `texts[]` — 246 (one comment per entry that has any FUNCTION prediction; `texts[]` length ≥ 1) | Render `texts[]`. No shape divergence. |
| `PATHWAY` | `texts[]` — 1 | `texts[]` — 1 | Render `texts[]`. No shape divergence. |
| `SIMILARITY` | `texts[]` — 235 | `texts[]` — 251 | Render `texts[]`. No shape divergence. |
| `SUBCELLULAR LOCATION` | `subcellularLocations[]` (structured: `location.{value,id,evidences}`); **one comment per location**, so `subcellularLocations[]` has length 1 in 412/412 observed comments — 412 comments | `texts[]` (free-text, e.g. `"Cell membrane; Single-pass type I membrane protein"`); **one comment per entry**, post Step-4 consolidation — 256 comments | Render both. See §2.2. |
| `SUBUNIT` | `texts[]` — 207 | `texts[]` — 214 | Render `texts[]`. No shape divergence. |
| `CATALYTIC ACTIVITY` | not present in the 250-file precomputed sample | `texts[]` — 19 | Render `texts[]` when present. Open question for the renderer team: whether precomputed emits this `commentType` outside the sampled corpus, and if so in what shape (`reaction`-style is plausible for UniProtKB but unverified here). Confirm before committing renderer behaviour. |

The transformer (`uniFireToPrecomputedConverter`) runs a post-loop consolidation pass that merges every `FreeTextComment` of the same `commentType` into one comment whose `texts[]` array contains an entry per source prediction, in declaration order. As a result, UniFire-derived `comments[]` carries **at most one** `FreeTextComment` per `commentType`.

### 2.1 COFACTOR — accept both `cofactors[]` and `texts[]`

Precomputed shape:

```json
{
  "commentType": "COFACTOR",
  "cofactors": [
    {
      "name": "FAD",
      "evidences": [{ "evidenceCode": "ECO:0000256", "source": "PIRNR", "id": "PIRNR003726" }],
      "cofactorCrossReference": { "database": "ChEBI", "id": "CHEBI:57692" }
    }
  ]
}
```

UniFire-derived shape:

```json
{
  "commentType": "COFACTOR",
  "texts": [
    {
      "value": "Name=FAD; Xref=ChEBI:CHEBI:57692",
      "evidences": [{ "evidenceCode": "ECO:0000256", "source": "ARBA", "id": "ARBA00012345" }]
    }
  ]
}
```

The renderer should branch on the presence of `cofactors` vs `texts`. The free-text form is human-readable as-is; an enhancement (parsing `Name=…; Xref=…` into the structured form on the transformer side) is listed in the audit §3.C as optional and not currently worth the complexity (corpus shows 2 occurrences total).

### 2.2 SUBCELLULAR LOCATION — accept both `subcellularLocations[]` and `texts[]`

Cardinality differs between the two sources (see §3 for details). The renderer must iterate `comments[]`, collect everything with `commentType: 'SUBCELLULAR LOCATION'`, then render each `location.value` (precomputed) or each `texts[i].value` (UniFire). For a single source-of-truth display, group by `commentType`.

Precomputed shape — each entry has one `SubcellularLocationComment` per location, with `subcellularLocations[]` of length 1 in 412/412 observed comments. Multiple locations on a single accession show up as multiple comment objects:

```json
[
  {
    "commentType": "SUBCELLULAR LOCATION",
    "subcellularLocations": [
      {
        "location": {
          "value": "Cell membrane",
          "id": "SL-0039",
          "evidences": [{ "evidenceCode": "ECO:0000256", "source": "ARBA", "id": "ARBA00004251" }]
        }
      }
    ]
  },
  {
    "commentType": "SUBCELLULAR LOCATION",
    "subcellularLocations": [
      {
        "location": {
          "value": "Cell projection, growth cone",
          "id": "SL-0288",
          "evidences": [{ "evidenceCode": "ECO:0000256", "source": "ARBA", "id": "ARBA00004624" }]
        }
      }
    ]
  }
]
```

Topology data, when present, lives alongside `location` inside each entry (see `src/uniparc/__mocks__/uniparcPrecomputedModelData.ts` for an example with `topology`). The renderer should treat `topology` as optional.

UniFire-derived shape — exactly one `FreeTextComment` per entry that has any subcellular-location prediction, with `texts[]` of length N (one entry per UniFire `comment.subcellular_location` prediction):

```json
{
  "commentType": "SUBCELLULAR LOCATION",
  "texts": [
    {
      "value": "Cell membrane",
      "evidences": [{ "evidenceCode": "ECO:0000256", "source": "ARBA", "id": "ARBA00004251" }]
    },
    {
      "value": "Cell projection, growth cone",
      "evidences": [{ "evidenceCode": "ECO:0000256", "source": "UniRule", "id": "UR000123456" }]
    }
  ]
}
```

The renderer must accept both. UniFire never carries `SL-*` identifiers or topology metadata — links into the Subcellular Location vocabulary are only possible when the source is precomputed.

Parsing the `"A; B; C"` free-text form into a synthetic `subcellularLocations[]` is listed in the audit §3.B as a possible future enhancement; defer until the renderer surfaces a need.

## 3. Comment cardinality is asymmetric

In the precomputed source, all subcellular locations for an entry are consolidated into **one** `SubcellularLocationComment` whose `subcellularLocations[]` array carries them all. UniFire emits **one comment per prediction**, so an entry with 8 subcellular locations becomes 8 separate `FreeTextComment` objects of `commentType: 'SUBCELLULAR LOCATION'`.

Across 250 paired accessions: 412 SUBCELLULAR LOCATION comments in precomputed vs 632 free-text comments in UniFire output. The overall comment delta (Δ comments = −164 precomputed minus transformer at 250 pairs) is explained almost entirely by this consolidation. See audit §7.

**Implications for the renderer:**

- Do not assume one comment per type. Iterate the `comments[]` array, grouping by `commentType` if a single section header per type is desired.
- For `SUBCELLULAR LOCATION` specifically, when the source is UniFire-derived the renderer is likely to need a post-collection step that visually consolidates multiple `FreeTextComment` entries of the same type into one section.
- The cardinality is purely a representation issue. The underlying information content is the same.

The audit notes (§7) an optional transformer-side enhancement: a post-processing pass that merges all `SUBCELLULAR LOCATION` free-text comments into one with a `texts[]` of length N. That would match cardinality with precomputed without changing shape (still `texts` vs `subcellularLocations`). It is **not** scheduled and the renderer should not assume it.

## 4. Keywords — thin and content-asymmetric

### 4.1 Field thinness

| Field | Precomputed | UniFire-derived |
| :--- | :--- | :--- |
| `name` | present (e.g. `"Amyloid"`) | present |
| `evidences` | present | present |
| `id` | present (e.g. `"KW-0034"`) | **absent** |
| `category` | present (e.g. `"Cellular component"`) | **absent** |

The renderer must treat `id` and `category` as optional. UI affordances that depend on them (e.g. linking to the keyword vocabulary, grouping keywords by category) need a fallback when the source is UniFire-derived: typically rendering the name as plain text rather than a link, and dropping or genericising the category-based grouping.

### 4.2 Content asymmetry (bidirectional)

Even at the same accession, the **set** of keywords differs between the two sources. Empirical observation across 250 pairs (audit §7.5):

- 5 paired accessions have keywords in precomputed that are absent in UniFire (e.g. `UPI000000003C-111125` gains `Isopeptide bond`, `Ubl conjugation`). These come from rule paths that only run at precomputation.
- 1 paired accession has keywords in UniFire that precomputed strips (e.g. `UPI0000000004-10245` carries `Host-virus interaction`, `Viral attachment to host cell`, `Viral envelope protein`, `Virus entry into host cell` from UniFire which precomputed drops).

The renderer therefore cannot assume "UniFire ⇒ subset of precomputed" or vice versa. There is no fix-up at the transformer layer; the transformer faithfully maps every `keyword` prediction it receives. **The renderer must accept either source producing keywords the other does not.**

## 5. Evidence sources — UniFire is thinner

The `evidence` tag/popover on each comment, feature, keyword, xref, or EC-number entry surfaces an `Evidence.source` value. The sources observed across the corpus:

| Source | Precomputed (count) | UniFire-derived (count) | Notes |
| :--- | ---: | ---: | :--- |
| `ARBA` | 2470 | 3334 | Both. |
| `UniRule` | 0 | 1571 | UniFire-only. UniFire emits `UR*` IDs which the transformer labels `UniRule`. Precomputed does not surface this source — it appears to resolve `UR*` IDs into more specific sources before output. |
| `RuleBase` | 1397 | 0 | Precomputed-only. |
| `PIRNR` | 77 | 0 | Precomputed-only. |
| `PROSITE-ProRule` | 10 | 0 | Precomputed-only. |

**Implications for the renderer:**

- Evidence-tag/popover code must handle all five source labels. UniFire-derived entries will only ever exhibit `ARBA` and `UniRule`.
- The current source-prefix mapping in `constructPredictionEvidences` (in `uniParcSubEntryConverter.ts`) is a binary "starts with `ARBA` → ARBA, otherwise → UniRule" rule. Today this is correct because UniFire only emits `ARBA*` and `UR*` IDs. The audit §5 lists an optional refactor to an extensible prefix table; defer until a UniFire mislabel actually surfaces.

## 6. Cross-references — `GO` only from UniFire, none from precomputed

The transformer maps each `xref.GO` UniFire prediction to a `uniProtKBCrossReferences[]` entry with `database: 'GO'`. The 250-pair precomputed corpus contains **zero** `uniProtKBCrossReferences` of any database.

This asymmetry is intentional (audit §6). The renderer needs to handle:

- Empty `uniProtKBCrossReferences` from the precomputed path.
- Non-empty `uniProtKBCrossReferences` from the UniFire path, all `database === 'GO'`.

If the precomputed pipeline starts emitting cross-references again in the future, the renderer should already work without changes; today it must not assume the array is non-empty.

## 7. EC numbers — both sources can populate them

After the Step 1 fix (audit §3.A), the transformer maps `protein.recommendedName.ecNumber` UniFire predictions to `proteinDescription.recommendedName.ecNumbers[]`. The shape matches what precomputed already produces — `ValueWithEvidence[]` with `value` (e.g. `"2.1.1.57"`) and `evidences`.

**Important per-entry asymmetry** (illustrated by `UPI0000000018-10245`):

- UniFire EC predictions carry evidences like `[ARBA00011923, UR000001535]`. The transformer emits ecNumbers with `source: 'ARBA'` and `source: 'UniRule'`.
- Precomputed EC numbers for the same accession carry evidences like `[ARBA00011923, PIRNR003726]` (source `ARBA` and `PIRNR`).

The `value` matches; the evidence set differs. The renderer must not assume identical evidence arrays even when the EC value is identical.

## 8. Features — symmetric in this corpus

`features[]` parity is `Δ = 0` across all corpus sizes sampled. UniFire's feature predictions (`feature.ACT_SITE`, `feature.DISULFID`, `feature.REGION`, etc.) round-trip through the transformer to the same `FeatureDatum` shape precomputed uses. No special renderer handling is required for the UniFire path beyond the standard precomputed renderer.

## 9. Summary checklist for the renderer team

When wiring `UniParcPrecomputedModel` into the SAP renderer, verify the following code paths exist or are intentionally deferred:

- [ ] `SUBCELLULAR LOCATION` comment renderer handles both `subcellularLocations[]` (structured) and `texts[]` (free-text). §2.2.
- [ ] `COFACTOR` comment renderer handles both `cofactors[]` (structured) and `texts[]` (free-text). §2.1.
- [ ] Comment iteration tolerates multiple `FreeTextComment` entries of the same `commentType`, especially `SUBCELLULAR LOCATION`. §3.
- [ ] Keyword renderer treats `id` and `category` as optional and degrades gracefully when absent. §4.1.
- [ ] No assumption that keyword sets are equal or one-way subsets between the two sources. §4.2.
- [ ] Evidence-tag/popover accepts `ARBA`, `UniRule`, `RuleBase`, `PIRNR`, `PROSITE-ProRule`. §5.
- [ ] Empty `uniProtKBCrossReferences` is valid (precomputed); GO-only is valid (UniFire). §6.
- [ ] `proteinDescription.recommendedName.ecNumbers` is rendered identically regardless of source; evidence content may differ per source even for the same EC value. §7.

## 10. What this spec does not cover

- Layout, ordering, headings, or styling of any section — out of scope.
- The precomputed-side pipeline. This document treats precomputed output as a fixed external observation.
- Future enhancements that would equalise the shapes (parsing UniFire free-text into structured forms, consolidating multi-prediction comments). These are listed in the audit §3.B, §3.C, and §7 as optional and explicitly deferred.

When the renderer wiring work begins, treat any divergence from the contract above as a renderer bug, not a transformer bug, unless the source-corpus assumptions in §1 prove wrong.
