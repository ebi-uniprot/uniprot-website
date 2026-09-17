---
title: What is the difference between the GO annotation included in the UniProtKB entry view, and the information accessible via the link "Complete set of GO annotations"?
type: help
categories: UniProtKB,Ontology,Release,faq
---

GO annotations are displayed in the [Function](https://www.uniprot.org/help/function_section) and [Subcellular location](https://www.uniprot.org/help/subcellular_location_section) sections of UniProtKB entries. Annotation filtering is applied here, as GO is just one type of information that a UniProtKB entry displays and some well-characterized proteins can have many GO annotations. Therefore annotated terms are displayed in the UniProtKB entry based on their granularity and evidence code quality (with manual annotations preferred over automatic predictions). Annotations that have been made to isoform identifiers, or use any of the GO annotation qualifiers (NOT, contributes_to, colocalizes_with) are also removed. In addition, some parts of a GO annotation are not included in the UniProtKB entry: for example, an annotation's 'with/from' field contents is not displayed; this field supplies additional supporting evidence for an annotation.

UniProt is [released every eight weeks](https://www.uniprot.org/help/synchronization), with each release including an updated display of GO annotation data. However at each UniProt release, the GO annotation dataset provided is approximately three months older than that displayed on the [QuickGO browser](https://www.ebi.ac.uk/QuickGO/), which updates its annotation display weekly. Therefore differences in GO annotation displays on these websites can sometimes be attributed to such an update time lag.

# See also

- [What are the differences between UniProtKB keywords and the GO terms?](https://www.uniprot.org/help/keywords_vs_go)
- [Gene Ontology (GO)](https://www.uniprot.org/help/gene-ontology)
- [How frequently is UniProt released? What is the synchronization delay with other databases?](https://www.uniprot.org/help/synchronization)
