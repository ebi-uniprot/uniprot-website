---
title: Cross-references for isoform sequences
type: help
categories: UniProtKB,Cross-references,manual
---

Some of the resources to which we link contain information that is specific to an [isoform sequence](https://www.uniprot.org/help/alternative_products). Where this is known, we indicate the corresponding UniProtKB isoform sequence identifier in cross-references as described below.

# Text format

The UniProtKB isoform sequence identifier is shown in square brackets at the end of the DR line as an optional field:

    DR   ResourceAbbreviation; ResourceIdentifier(; AdditionalField)+. [IsoId]

Examples:

    DR   Ensembl; ENST00000281772; ENSP00000281772; ENSG00000144445. [A0AUZ9-1]
    DR   Ensembl; ENST00000418791; ENSP00000405724; ENSG00000144445. [A0AUZ9-2]
    DR   Ensembl; ENST00000452086; ENSP00000401408; ENSG00000144445. [A0AUZ9-3]
    DR   Ensembl; ENST00000457374; ENSP00000393432; ENSG00000144445. [A0AUZ9-3]

    DR   UCSC; uc008jdz.3; mouse. [P00520-1]
    DR   UCSC; uc033hmk.1; mouse. [P00520-2]
    DR   UCSC; uc033hml.1; mouse. [P00520-3]
