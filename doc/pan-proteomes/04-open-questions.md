# Decisions and open questions

The three membership-related asks for the PP team are in
[Phase 2 — what to ask for](./03-phase-2-cluster-membership.md#what-to-ask-the-pp--backend-team-for).

## Decided

| Question | Decision | Where it lands |
| --- | --- | --- |
| **Species resolution** — who maps a strain-level UniProtKB taxid to the species taxid? | Client, if it is ever needed. The entry page's Taxonomic lineage section already fetches `/taxonomy/{taxonId}` (`SelfLoadingTaxonomyLineage`, `src/shared/components/entry/TaxonomyView.tsx:129`), which returns the lineage with `taxonId` and `rank`; the card does the same and takes `rank === 'species'`. Not needed for the Phase 1 contract, whose lookup (endpoint 6) is global by UPI/accession. | Phase 1 card, as a fallback only |
| **`panproteomeTaxon`** — will the Proteomes API carry PP id + counts? | Second call for now (endpoints 1 and 2). Flagged as a future improvement: fold PP id and cluster counts into `panproteomeTaxon`. | Phase 1 `PanProteomeSummary` |
| **FTP host** | `ftp.uniprot.org` is canonical and is what production links. `ftp.ebi.ac.uk` for development (we are at EBI). Implement as a build-time base in `src/shared/config/ftpUrls.ts` with a dev override. Note: `ftpUrls` is shared, so switching the base changes every FTP link in the site, not only PP — confirm before merging. | Phase 1 files |
| **Versioning** | Current release only. No UniSave-style history. | Phase 1 contract |
| **Matrix at scale** (`pp562`: 2,215 proteome columns) | Flag in implementation: the per-proteome breakdown on the card must collapse / paginate; endpoint 4 is cursor-paginated; any future matrix explorer must be server-paginated in both dimensions. | Phase 1 card + contract; later matrix explorer |
| **Ineligible proteomes** — explain why a proteome has no PP? | No. A proteome without a PP renders nothing. | — |
| **Naming** ("pan proteome cluster" next to UniRef's "cluster") | Fine for now; review once implemented. | Phase 1 card copy |
| **`proteomesCount` vs member count** | Both fields always shown together, always labelled with the unit — "Proteomes in cluster: 7 of 7" and "Proteins in cluster: 12" — never "size" or "count" alone. Applies to the card, the members table header, the API field names (`proteomesCount`, `memberCount`) and the mocks. | Phase 1 and Phase 2 card |

## Still open

1. **Protein Frequency rounding.** `README` says "rounded to the nearest integer"; workflow FAQ 5
   says "rounded up". It affects the core/accessory boundary we label. Ask the PP team.
