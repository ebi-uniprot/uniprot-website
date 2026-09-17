---
title: UniProtKB return fields for cross-references
type: help
categories: Text_search,Technical,Website,help
---

Each protein entry in UniProtKB has links to [cross-referenced databases](https://www.uniprot.org/help/cross-references_in_uniprotkb), there are currently links to over 180 cross-referenced databases, a comprehensive list can be found [here](https://www.uniprot.org/database?query=*). 

Cross-references can be queried using the [UniProt website REST API](https://www.uniprot.org/api-documentation/uniprotkb) using the relevant results fields.
For a complete list of results fields please see: https://rest.uniprot.org/configure/uniprotkb/result-fields

Cross references are described by ‘label’, ‘name’ and ‘id’
- ‘label’ is the name of the cross-reference that is shown on the website, TSV or Excel format.
- ‘name’ is the full designation of the cross-reference within the API
- ‘id’ is the database group/label for that cross-reference


Example for the cross reference database MGI
```json
{
  "label": "MGI",
  "name": "xref_mgi",
  "isMultiValueCrossReference": true,
  "id": "organism-specific/mgi"
}
```

Optionally, these cross-reference description objects might also include the `isMultiValueCrossReference` field with a value of `true`, highlighting the fact that there exists a version of this field with multiple values, usually secondary IDs, that can be accessed by appending `_full` to the name of the field in a query.

For example, for Ensembl, one can request `xref_ensembl` for primary IDs or `xref_ensembl_full` for primary and secondary IDs

Example: [A0JNW5 Ensembl cross-references](https://rest.uniprot.org/uniprotkb/A0JNW5.tsv?fields=xref_ensembl)

Return field for primary IDs `xref_ensembl`:

```
ENST00000279907.12 [A0JNW5-1];ENST00000356828.7 [A0JNW5-2];
```

Return field for primary and secondary IDs `xref_ensembl_full`:

```
"ENST00000279907.12; ENSP00000279907.7; ENSG00000111647.13. [A0JNW5-1]";"ENST00000356828.7; ENSP00000349285.3; ENSG00000111647.13. [A0JNW5-2]";
```

A complete list of non cross-reference results fields (column names) for UniProtKB can be found [here](https://www.uniprot.org/help/return_fields).
