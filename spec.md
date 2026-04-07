# Spec: Transform UniFire endpoint data to Partial\<UniProtkbUIModel\>

## Purpose

When loading annotations from UniFIRE:

https://rest.uniprot.org/uniprotkb/unifire/run?id=UPI000012C942&taxId=2725997

It returns data shaped as `UniFireModel`:

```json
{
  "accession": "UPI000012C942:2725997",
  "predictions": [
    {
      "evidence": ["UR000024230"],
      "annotationType": "comment.function",
      "annotationValue": "Molecular chaperone that interacts specifically with outer membrane proteins, thus maintaining the solubility of early folding intermediates during passage through the periplasm"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "comment.similarity",
      "annotationValue": "Belongs to the skp family"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "comment.subcellular_location",
      "annotationValue": "Periplasm"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "comment.subunit",
      "annotationValue": "Homotrimer"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "keyword",
      "annotationValue": "Chaperone"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "keyword",
      "annotationValue": "Periplasm"
    },
    {
      "evidence": ["ARBA00018026"],
      "annotationType": "protein.recommendedName.fullName",
      "annotationValue": "Chaperone protein Skp"
    },
    {
      "evidence": ["UR000024230"],
      "annotationType": "protein.recommendedName.fullName",
      "annotationValue": "Chaperone protein skp"
    }
  ]
}
```

The objective is to create a new transformation function that converts `UniFireModel` into `Partial<UniProtkbUIModel>`. This supports the long-term goal of refactoring `src/uniparc/components/sub-entry/SubEntry.tsx` so that it can accept data from either:

- https://rest.uniprot.org/uniprotkb/unifire/run?id=UPI0000000001&taxId=10245 (`UniFireModel`)
- https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/precomputed/UPI0000000001/10245 (`UniProtkbUIModel`)

The approach mirrors `uniProtKbConverter` in UniProtKB entry pages:

```ts
const [transformedData, pageTitle] = useMemo(() => {
  if (!data || !databaseInfoMaps) {
    return [];
  }
  const transformedData = uniProtKbConverter(data, databaseInfoMaps);
  return [transformedData, generatePageTitle(transformedData)];
}, [data, databaseInfoMaps]);
```

Always expect data to be provided to the new transformer (no need to handle undefined input).

## File Location

The new transformer function should be created in `src/uniparc/adapters/`, alongside the existing `uniParcSubEntryConverter.ts`.

## Return Type

`Partial<UniProtkbUIModel>` — only sections that have data from UniFire predictions will be present.

## Dependencies

- **Reuse** `constructPredictionEvidences` from `src/uniparc/adapters/uniParcSubEntryConverter.ts` to convert string evidence arrays into `Evidence[]` objects.
- **No `databaseInfoMaps` parameter** — UniFire data does not populate cross-references.

## Section Alignment

The transformer should populate sections keyed by `EntrySection` (from `src/uniprotkb/types/entrySection.ts`), aligning the UniParc sub-entry page with UniProtKB entry pages. Section differences for the UniParc sub-entry context:

| UniProtKB EntrySection | UniParc Sub-Entry Behaviour |
| :--- | :--- |
| `Function` | Populated from UniFire `comment.*` and `feature.*` predictions |
| `NamesAndTaxonomy` | Populated from `protein.recommendedName.fullName` predictions |
| `SubCellularLocation` | Populated from relevant `comment.*` and `feature.*` predictions |
| `Expression` | Populated from `comment.induction` predictions |
| `ProteinProcessing` | Populated from relevant `comment.*` and `feature.*` predictions |
| `Interaction` | Populated from `comment.subunit` predictions |
| `FamilyAndDomains` | Populated from relevant `comment.*` and `feature.*` predictions |
| `Sequence` | Sequence only (no isoforms) |
| `Structure` | Not populated from UniFire |
| `DiseaseVariants` | Not present in UniParc sub-entry page |
| `PhenotypesVariants` | Not present in UniParc sub-entry page |
| `ExternalLinks` | Not populated from UniFire |
| `SimilarProteins` | Not populated from UniFire |

Additionally, the UniParc sub-entry page has a **KeywordsAndGO** section (`SubEntrySection.KeywordsAndGO = 'keywords_and_go'`) that does not exist in `EntrySection`. For UniFire data, this section serves as a catchall for `keyword` predictions. The precomputed endpoint will provide richer keyword/GO data that populates the standard entry page sections.

## Annotation Type → UIModel Mappings

The full set of known annotation types is defined in `src/uniparc/config/UniFireAnnotationTypeToSection.ts`. Each prediction must be transformed into the correct type within the target section's `UIModel` structure.

### `comment.*` predictions → `FreeTextComment` in `commentsData`

A prediction like:

```json
{ "evidence": ["UR000024230"], "annotationType": "comment.function", "annotationValue": "Molecular chaperone..." }
```

Becomes a `FreeTextComment`:

```ts
{
  commentType: 'FUNCTION',             // from annotationTypeToSection[type].freeTextType
  texts: [{
    value: 'Molecular chaperone...',   // from annotationValue
    evidences: [{                      // from constructPredictionEvidences(evidence)
      evidenceCode: 'ECO:0000256',
      source: 'UniRule',
      id: 'UR000024230'
    }]
  }]
}
```

Multiple predictions with the same `commentType` should be grouped into the same `Comment[]` array entry in the `commentsData` Map, keyed by `CommentType`.

### `feature.*` predictions → `FeatureDatum` in `featuresData`

A prediction like:

```json
{ "evidence": ["UR000024230"], "annotationType": "feature.SIGNAL", "annotationValue": "", "start": 1, "end": 20 }
```

Becomes a `FeatureDatum`:

```ts
{
  type: 'Signal',                       // from annotationTypeToSection[type].featureType
  description: '',                      // from annotationValue
  location: {
    start: { value: 1, modifier: 'EXACT' },   // from prediction.start
    end: { value: 20, modifier: 'EXACT' }      // from prediction.end
  },
  evidences: [{                         // from constructPredictionEvidences(evidence)
    evidenceCode: 'ECO:0000256',
    source: 'UniRule',
    id: 'UR000024230'
  }]
}
```

### `keyword` predictions → `Keyword` in `keywordData`

A prediction like:

```json
{ "evidence": ["UR000024230"], "annotationType": "keyword", "annotationValue": "Chaperone" }
```

Becomes a `Keyword`:

```ts
{
  name: 'Chaperone',                    // from annotationValue
  evidences: [{                         // from constructPredictionEvidences(evidence)
    evidenceCode: 'ECO:0000256',
    source: 'UniRule',
    id: 'UR000024230'
  }]
  // id: undefined — not available from UniFire
  // category: undefined — not available from UniFire
}
```

Keywords cannot be grouped into `KeywordUIModel[]` by category since UniFire does not provide category data. Store them in a single uncategorized group. Downstream components will need to handle the absence of `id` and `category` gracefully (out of scope for this task).

### `protein.recommendedName.fullName` → `NamesAndTaxonomyUIModel`

A prediction like:

```json
{ "evidence": ["ARBA00018026"], "annotationType": "protein.recommendedName.fullName", "annotationValue": "Chaperone protein Skp" }
```

Populates `NamesAndTaxonomyUIModel.proteinNamesData.recommendedName.fullName`:

```ts
{
  value: 'Chaperone protein Skp',       // from annotationValue
  evidences: [{                         // from constructPredictionEvidences(evidence)
    evidenceCode: 'ECO:0000256',
    source: 'ARBA',
    id: 'ARBA00018026'
  }]
}
```

**Duplicate handling:** When multiple predictions share the same `protein.recommendedName.fullName` annotation type, use the first one.

## Non-Goals

- Do not update components
- Do not delete code — only add a new function to perform the transformation

## Edge Cases & Error Handling

| Scenario | Expected Behaviour |
| :--- | :--- |
| Input does not conform to `UniFireModel` | Validate the input shape first. Raise an error with the parameters of that UniParc entry. |
| Unknown `annotationType` encountered | Degrade gracefully — skip the prediction and return everything that could be transformed. Log a warning via `logging.warn` so it is captured by Sentry. |
| Transformer fails partway through | Still return everything that could be transformed. Do not throw away good data. |
| Duplicate `protein.recommendedName.fullName` predictions | Use the first one encountered. Known UniFire issue — will be reported upstream. |

Logging pattern (from `src/shared/utils/logging`):

```ts
import * as logging from '../../../shared/utils/logging';

logging.warn('Unknown UniFire annotation type encountered', {
  extra: { annotationType: prediction.annotationType, accession: data.accession },
});
```

## Acceptance Criteria

- [ ] Create new transformation function in `src/uniparc/adapters/`
- [ ] Function accepts `UniFireModel` and returns `Partial<UniProtkbUIModel>`
- [ ] `comment.*` predictions are transformed to `FreeTextComment` objects in the correct section's `commentsData`
- [ ] `feature.*` predictions are transformed to `FeatureDatum` objects in the correct section's `featuresData`
- [ ] `keyword` predictions are transformed to `Keyword` objects (name + evidences only)
- [ ] `protein.recommendedName.fullName` predictions populate `NamesAndTaxonomyUIModel.proteinNamesData`
- [ ] Unknown annotation types are skipped with a `logging.warn` call
- [ ] Input validation checks conformance to `UniFireModel`
- [ ] Partial failures do not discard successfully transformed data
- [ ] Reuses `constructPredictionEvidences` from `uniParcSubEntryConverter.ts`

## Tests

- [ ] Create tests for the new transformation function in a `__tests__/` directory alongside the adapter
- [ ] Test transformation of each annotation type category (`comment.*`, `feature.*`, `keyword`, `protein.recommendedName.fullName`)
- [ ] Test unknown annotation type triggers `logging.warn` and is skipped
- [ ] Test duplicate `protein.recommendedName.fullName` uses first prediction
- [ ] Test partial failure still returns successfully transformed predictions
- [ ] Test input validation
