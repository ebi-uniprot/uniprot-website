---
title: What is a UniRef seed sequence compared to a representative sequence?
type: help
categories: UniRef,faq
---

A [UniRef](https://www.uniprot.org/help/uniref) **seed** is the sequence that has been used as the template to recruit other sequences by the clustering algorithm. The seed sequence is the longest member of a cluster.

However, the longest sequence is not always the most informative one. There is often more biologically relevant information (name, function, cross-references) available on other cluster members. All the proteins in a cluster are therefore ranked as follows to select the most biologically relevant **representative sequence** for the cluster:

1.  Quality of the entry: [manually reviewed entries](https://www.uniprot.org/help/manual_curation) (i.e. from UniProtKB/Swiss-Prot) are preferred;
2.  Annotation score: entries that have higher UniProtKB [annotation scores](https://www.uniprot.org/help/annotation_score) are preferred. This also means that UniProtKB entries will always take precedence over entries that are in [UniParc](https://www.uniprot.org/help/uniparc) but not in UniProtKB;
3.  Organism: entries from [reference proteomes](https://www.uniprot.org/help/reference_proteome) and model organisms are preferred; and,
4.  Length of the sequence: longest sequence is preferred.

Notes:

-   The cluster is defined by the identity relationship of its members to the seed, **not** to the representative sequence. This does not imply that all sequences within a cluster have the same identity percentage among themselves.
-   In some rare cases, a member is more similar to the representative of another cluster than to the representative of its own cluster, but never more similar to any other cluster’s seed.
