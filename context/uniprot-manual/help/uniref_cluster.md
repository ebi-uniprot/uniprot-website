---
title: What is a UniRef cluster?
type: help
categories: UniRef,faq
---

A UniRef cluster is a set of UniProtKB plus selected UniParc sequences that have a specific minimum percent of sequence identity, and a minimum of 80% overlap with the longest sequence (a.k.a. [seed sequence](https://www.uniprot.org/help/uniref_seed)) of the cluster. One exception to the 80% rule is UniRef100 where identical substrings of 11 or more amino acids are merged.

For example, UniRef50 contains sequences clusters where all members are at least 50% identical to the seed sequence. Each cluster indicates:

- the seed sequence (longest sequence),
- the representative sequence (biologically relevant, best annotated, sequence),
- the list of accessions for the member proteins,
- cross-references to UniRef clusters (at the 2 other levels of identity) containing the representative sequence,
- the lowest common taxonomy of all members, and
- common Gene Ontology terms, if any.

For a full list of properties see this example: [P99999](https://www.uniprot.org/uniref/UniRef100_P99999) ([XML](https://rest.uniprot.org/uniref/UniRef100_P99999.xml)).
