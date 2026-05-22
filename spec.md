# Spec: Transform UniFireModel to UniParcPrecomputedModel

## Purpose

UniParc sequence annotation pages (SAPs) are essentially UniProtKB entry pages. They are populated by one of two data sources:

1. **Precomputed endpoint** — returns `UniParcPrecomputedModel` directly. Available for RefSeq source entries only.
2. **UniFire endpoint** — returns `UniFireModel`, which needs transformation. Used on demand for all non-RefSeq entries (permanent path, not a temporary fallback).

When a user visits a SAP, the page first checks whether precomputed data exists. If so, it uses that. If not, it fetches from UniFire on demand.

Both sources feed into a shared downstream pipeline:

```
Precomputed endpoint  →  UniParcPrecomputedModel  ──→  uniProtKbConverter  ──→  render SAP
UniFire endpoint      →  UniParcPrecomputedModel  ──↗
```

This task creates the `UniFireModel → UniParcPrecomputedModel` transformation so that both data sources converge at the same type. From that point forward, a single pipeline (reusing or adapting `uniProtKbConverter` and UniProtKB's section components) handles rendering. This minimises code duplication and aligns SAPs with the mature UniProtKB entry page architecture.

UniFire-derived `UniParcPrecomputedModel` instances will be thinner than precomputed ones (e.g. keywords without `id`/`category`, subcellular locations as free text, unresolved evidence sources). This is the permanent reality for non-RefSeq entries, not a temporary compromise, so the downstream rendering must handle it gracefully by design.

The `UniParcPrecomputedModel` type (from `src/uniparc/types/precomputed.ts`) is:

```ts
type UniParcPrecomputedModel = Omit<
  UniProtkbAPIModel,
  'uniProtkbId' | 'entryType' | 'proteinExistence'
> & {
  entryType: 'AA';
  uniProtkbId: null;
};
```

This is an API-model shape — flat `comments[]`, `features[]`, `keywords[]` arrays, not section-keyed UIModel objects.

### Example endpoints

- UniFire: https://rest.uniprot.org/uniprotkb/unifire/run?id=UPI000012C942&taxId=2725997
- Precomputed: https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/precomputed/UPI0000000001/10245

## File Location

`src/uniparc/adapters/`, alongside the existing `uniParcSubEntryConverter.ts`.

## Return Type

`UniParcPrecomputedModel` — UniFire-derived instances are permanently thinner than precomputed ones (no keyword ids/categories, flat-text subcellular locations, generic evidence sources). This is by design for non-RefSeq entries.

## Dependencies

- **Reuse** `constructPredictionEvidences` from `src/uniparc/adapters/uniParcSubEntryConverter.ts` to convert string evidence arrays into `Evidence[]` objects.
- **No `databaseInfoMaps`** needed — UniFire data does not populate cross-references.

## Fixed Fields

Every output from this converter has these fixed values:

```ts
{
  entryType: 'AA',
  uniProtkbId: null,
  annotationScore: 0,
  primaryAccession: '...',  // derived from UniFireModel.accession, colon → hyphen
}
```

The `primaryAccession` is derived from `UniFireModel.accession` (e.g. `'UPI000002A2F6:9606'` becomes `'UPI000002A2F6-9606'`).

## Annotation Type → Output Field Mappings

The known annotation types are defined in `src/uniparc/config/UniFireAnnotationTypeToSection.ts`. Each prediction maps to a flat array on the output object.

### `comment.*` predictions → `comments[]`

Each `comment.*` prediction becomes a `FreeTextComment` appended to the flat `comments` array:

```
Input:
  { evidence: ["ARBA00002651"], annotationType: "comment.function",
    annotationValue: "The gamma-CTF peptides..." }

Output (in comments[]):
  { commentType: 'FUNCTION',
    texts: [{ value: 'The gamma-CTF peptides...',
              evidences: [{ evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00002651' }] }] }
```

The `commentType` comes from `annotationTypeToSection[type].freeTextType`.

**Note on subcellular locations:** The precomputed endpoint returns structured `SubcellularLocationComment` objects with SL-* identifiers and topology. UniFire only provides flat text (e.g. `"Cell membrane; Single-pass type I membrane protein"`), so the converter produces `FreeTextComment` for these. The downstream `UniParcPrecomputedModel → UniProtkbUIModel` converter will need to handle both comment shapes.

### `feature.*` predictions → `features[]`

Each `feature.*` prediction becomes a `FeatureDatum` appended to the flat `features` array:

```
Input:
  { evidence: ["UR000976770"], annotationType: "feature.DISULFID", start: 73, end: 117 }

Output (in features[]):
  { type: 'Disulfide bond',
    description: '',
    location: { start: { value: 73, modifier: 'EXACT' },
                end: { value: 117, modifier: 'EXACT' } },
    evidences: [{ evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000976770' }] }
```

The `type` comes from `annotationTypeToSection[type].featureType`.

### `keyword` predictions → `keywords[]`

Each `keyword` prediction becomes a `Keyword` appended to the flat `keywords` array:

```
Input:
  { evidence: ["ARBA00023087"], annotationType: "keyword", annotationValue: "Amyloid" }

Output (in keywords[]):
  { name: 'Amyloid',
    evidences: [{ evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023087' }] }
```

UniFire does not provide keyword `id` or `category`, so these fields will be absent. The precomputed endpoint provides full keyword data. The downstream converter and rendering components will need to handle both cases.

### `protein.recommendedName.fullName` → `proteinDescription.recommendedName`

```
Input:
  { evidence: ["ARBA00021782"], annotationType: "protein.recommendedName.fullName",
    annotationValue: "Amyloid-beta precursor protein" }

Output (in proteinDescription):
  { recommendedName: {
      fullName: { value: 'Amyloid-beta precursor protein',
                  evidences: [{ evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00021782' }] } } }
```

**Duplicate handling:** If multiple predictions share this annotation type, use the first one.

### `protein.alternativeName.fullName` → `proteinDescription.alternativeNames`

Each prediction becomes an entry in `proteinDescription.alternativeNames[]`:

```
Input:
  { evidence: ["ARBA00032275"], annotationType: "protein.alternativeName.fullName",
    annotationValue: "ABPP" }

Output (in proteinDescription.alternativeNames[]):
  { fullName: { value: 'ABPP',
                evidences: [{ evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00032275' }] } }
```

### `xref.GO` predictions → `uniProtKBCrossReferences[]`

Each `xref.GO` prediction becomes a cross-reference:

```
Input:
  { evidence: ["UR000976770", "UR000976774"], annotationType: "xref.GO",
    annotationValue: "GO:0008201" }

Output (in uniProtKBCrossReferences[]):
  { database: 'GO', id: 'GO:0008201',
    evidences: [{ evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000976770' },
                { evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000976774' }] }
```

### `extraAttributes`

Compute `countByCommentType` and `countByFeatureType` from the transformed data:

```ts
extraAttributes: {
  countByCommentType: { FUNCTION: 1, 'SUBCELLULAR LOCATION': 11, SIMILARITY: 1 },
  countByFeatureType: { 'Disulfide bond': 5 }
}
```

## Differences Between UniFire-derived and Precomputed Data

These differences are permanent — UniFire is the long-term path for non-RefSeq entries. The downstream converter (`UniParcPrecomputedModel → UniProtkbUIModel`) and rendering components must handle both flavours gracefully as a design requirement.

| Field | Precomputed (RefSeq only) | UniFire-derived (all other entries) |
| :--- | :--- | :--- |
| `keywords[].id` | Present (e.g. `'KW-0034'`) | Absent |
| `keywords[].category` | Present (e.g. `'Cellular component'`) | Absent |
| Subcellular location comments | Structured `SubcellularLocationComment` with SL-* ids and topology | `FreeTextComment` with flat text |
| Evidence sources | Resolved (e.g. `PROSITE-ProRule`, `PRU01217`) | Generic (`UniRule`, `UR*` ids) |
| Additional comments (e.g. CAUTION) | May include extra annotations from precomputation | Only what UniFire returns |

## Non-Goals

- Do not update components or the downstream `UniParcPrecomputedModel → UniProtkbUIModel` converter
- Do not delete code — only add a new function

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
| :--- | :--- |
| Input does not conform to `UniFireModel` | Validate input shape. Raise an error with the accession. |
| Unknown `annotationType` encountered | Skip the prediction, return everything else. Log via `logging.warn` (captured by Sentry). |
| Transformer fails on a single prediction | Skip it, keep going. Do not throw away successfully transformed predictions. |
| Duplicate `protein.recommendedName.fullName` | Use the first one. Known UniFire issue — will be reported upstream. |

Logging pattern (from `src/shared/utils/logging`):

```ts
import * as logging from '../../../shared/utils/logging';

logging.warn('Unknown UniFire annotation type encountered', {
  extra: { annotationType: prediction.annotationType, accession: data.accession },
});
```

## Acceptance Criteria

- [ ] New transformation function in `src/uniparc/adapters/` that accepts `UniFireModel` and returns `UniParcPrecomputedModel`
- [ ] Fixed fields set: `entryType: 'AA'`, `uniProtkbId: null`, `annotationScore: 0`, `primaryAccession` derived from accession
- [ ] `comment.*` predictions → `FreeTextComment` objects in flat `comments[]` array
- [ ] `feature.*` predictions → `FeatureDatum` objects in flat `features[]` array
- [ ] `keyword` predictions → `Keyword` objects in flat `keywords[]` (name + evidences only)
- [ ] `protein.recommendedName.fullName` → `proteinDescription.recommendedName`
- [ ] `protein.alternativeName.fullName` → `proteinDescription.alternativeNames[]`
- [ ] `xref.GO` → `uniProtKBCrossReferences[]`
- [ ] `extraAttributes` computed with `countByCommentType` and `countByFeatureType`
- [ ] Unknown annotation types skipped with `logging.warn`
- [ ] Input validation checks conformance to `UniFireModel`
- [ ] Partial failures do not discard successfully transformed data
- [ ] Reuses `constructPredictionEvidences` from `uniParcSubEntryConverter.ts`

## Tests

- [ ] Tests in `__tests__/` directory alongside the adapter
- [ ] Test output has correct fixed fields (`entryType`, `uniProtkbId`, `annotationScore`, `primaryAccession`)
- [ ] Test `comment.*` transformation (function, subcellular location, similarity)
- [ ] Test `feature.*` transformation (disulfide bond, region)
- [ ] Test `keyword` transformation (name + evidences, no id/category)
- [ ] Test `protein.recommendedName.fullName` transformation (first one used)
- [ ] Test `protein.alternativeName.fullName` transformation (all collected)
- [ ] Test `xref.GO` transformation
- [ ] Test `extraAttributes` counts are computed correctly
- [ ] Test unknown annotation type triggers `logging.warn` and is skipped
- [ ] Test partial failure still returns successfully transformed predictions
- [ ] Test input validation
- [ ] Use `unifireModelData` mock as input
