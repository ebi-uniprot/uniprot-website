---
title: Why don't all UniProtKB/Swiss-Prot annotations have evidence?
type: help
categories: faq
---

The annotations which are missing evidence were created before we started to manually curate information with evidence attribution in UniProtKB/Swiss-Prot. The manual attribution of evidence to these existing annotations was not possible due to the huge amount of existing data. Therefore we wrote a program to automatically add the evidence based on how provenance information was previously curated in Swiss-Prot including the `By similarity`, `Probable` and `Potential` qualifiers that marked information that was not experimental as well as the [Cited for](https://www.uniprot.org/help/publications_section) section of literature citations which indicates the type of information retrieved from a given reference. This allowed the attribution of evidence to a substantial fraction of annotations in Swiss-Prot but not to all annotations. The remaining annotations without evidence must be updated and retrofitted manually, which is an ongoing process.

The website's search engine handles annotations without evidence by assigning them a "default evidence" that depends on the annotation type. For example, some annotation types such as "Disease" are only annotated when there is experimental evidence so this annotation type will always be assigned an experimental evidence. For annotation types where several types of evidence attribution are possible, we use the type that occurs most often as the default.

# See also

-   [Evidence attribution](https://www.uniprot.org/help/evidences)

Related terms: retrofit
