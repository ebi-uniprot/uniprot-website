---
title: Why can it make sense to use UniRef for BLAST searches?
type: help
categories: faq
---

UniRef, especially UniRef90 and UniRef50, decreases sequence redundancy compared to UniProtKB and UniParc, while maintaining complete coverage of the sequence space.

This helps to minimize the time required for [BLAST](https://www.uniprot.org/blast) or other similarity search programs to run, and removes many redundant results, thus making the output more concise.

Searching against UniRef helps ensure that the hits in the result are both distinct and meaningful at the corresponding identity level. Combining BLAST with UniRef cluster expansion as on the UniProt website has shown to increase the sensitivity when looking for more remote similarities. Please see [Suzek et al (2014)](https://academic.oup.com/bioinformatics/article/31/6/926/214968) for details.

# What sequences are considered when running BLAST against a UniRef database?

The sequences used for the BLAST search against a UniRef database are the representative sequences, not the [seeds](https://www.uniprot.org/help/uniref_seed).
