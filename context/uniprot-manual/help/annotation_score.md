---
title: Annotation score
type: help
categories: UniProtKB,manual
---

The annotation score provides a heuristic measure of the annotation content of a UniProtKB entry or proteome. This score **cannot** be used as a measure of the accuracy of the annotation as we cannot define the 'correct annotation' for any given protein.

The annotation score is computed in the following way:

- Different UniProtKB annotation types (e.g. [protein names](https://www.uniprot.org/help/protein_names), [gene names](https://www.uniprot.org/help/gene_name), [functional annotations (comments)](https://www.uniprot.org/help/general_annotation) and [sequence annotations (features)](https://www.uniprot.org/help/sequence_annotation), [GO annotations](https://www.uniprot.org/help/gene-ontology), [cross-references](https://www.uniprot.org/help/cross_references_section)) are scored either by presence or by number of occurrences. Annotations with experimental [evidence](https://www.uniprot.org/help/evidences) score higher than equivalent predicted/inferred annotations, thereby favoring expert [literature-based curation](https://www.uniprot.org/help/biocuration) over [automatic annotation](https://www.uniprot.org/help/automatic_annotation).

- The score of an individual entry is the sum of the scores of its annotations.

- The score of a proteome is the sum of the scores of the entries that are part of the proteome.

The open-ended interval obtained for these absolute numbers is translated into a **5-point-system**

by splitting it into 5 sub-intervals. Scores in the first interval are represented by "1 point out of 5", those in the second by "2 points out of 5", etc. An annotation score of 5 points is therefore associated with the best-annotated entries, and a 1-point-score denotes an entry with rather basic annotation.

There are several contexts in which annotation scores can be used:

- [UniProtKB](https://www.uniprot.org/help/uniprotkb)  
  The annotation scores can help you to get a quick idea of the relative level of annotation of the entries in your search results. Please note that search results are not ranked by the annotation score, but by a query score that considers not only the annotation scores of the entries that match your query, but also how often (and where) your query term(s) appear in a matching entry and across the whole database, and the importance of a term according to the total number of terms. For this reason, the best ranked entries are not necessarily those with the highest annotation scores.

- [UniRef](https://www.uniprot.org/help/uniref)  
  UniProt is using annotation scores to select the representative member of a UniRef cluster.

- [Reference proteomes](https://www.uniprot.org/proteomes)  
  UniProt is using annotation scores to assist the selection of [reference proteomes](https://www.uniprot.org/proteomes).

Please note that the annotation score **cannot** be used as a measure of the accuracy of the annotation - as we cannot define the 'correct annotation' for any given protein.

# See also

- [Introducing Annotation Scores in UniProt (UniProt blog)](https://insideuniprot.blogspot.com/2014/10/)
