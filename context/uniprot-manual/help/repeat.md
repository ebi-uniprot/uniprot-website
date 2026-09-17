---
title: Repeat
type: help
categories: Family_and_domains,manual
---

This subsection of the 'Family and Domains' section indicates the positions and types of repeated sequence motifs or repeated domains within the protein.

Repeats vary from short amino acid repetitions, such as the polyglutamine tracts of the Huntington disease gene product huntingtin, to large repetitions containing multiple domains, such as in the cytoskeletal protein titin. One likely reason for their evolutionary success is that repeat-containing proteins are relatively cheap to evolve. That is, large and thermodynamically stable proteins may arise by the simple expedient of intragenic duplications rather than the more complex processes of de novo alpha-helix and beta-sheet creation.

# 1. Annotation of specific repeated sequence motifs

Certain repeats may be restricted to, or typical of, a specific protein or protein family. When these repeats have a specific name, that name is applied to each such repeat:  
Examples: [Q03763](https://www.uniprot.org/uniprotkb/Q03763#family_and_domains), [P20811](https://www.uniprot.org/uniprotkb/P20811#family_and_domains)

When no standard name exists, the ['Region'](https://www.uniprot.org/help/region) subsection is used to describe the region containing all the repeats and, when possible, the pattern of the repeat. The 'Repeat' subsection is then used simply to specify the number and position of each such repeat.  
Example: [Q96NY7](https://www.uniprot.org/uniprotkb/Q96NY7#family_and_domains)

*Conventions* : We define repeats as 'half-length' or 'truncated' when appropriate and as 'approximate', 'degenerate' or 'atypical' when they deviate significantly from the consensus sequence. We also omit the position of each individual repeat when they are extremely abundant.  
Examples: [P15497](https://www.uniprot.org/uniprotkb/P15497#family_and_domains), [P38479](https://www.uniprot.org/uniprotkb/P38479#family_and_domains), [P15305](https://www.uniprot.org/uniprotkb/P15305#family_and_domains)

# 2. Annotation of predicted repeats

A large number of repeated domains have been modelled by InterPro and by the REP program of Andrade and Bork. Repeats predicted using both of these resources are annotated in UniProtKB. When using REP, the e-value thresholds for reporting matches are initially set to their most conservative values, but may be relaxed to ensure that consistent numbers of repeats are annotated in orthologous proteins. The e-values may also be adjusted to ensure that the predicted number of repeats is consistent with the 3-dimensional structures the repeats may adopt. For instance, Kelch repeats form a propeller-like structure containing 5-7 tandem repeats. Armadillo (Arm) and HEAT repeats are very similar and to date all known proteins possess only of these two repeat types. Therefore if REP detects both repeat types in a single protein, all repeats are annotated as the most common of the two types reported by REP.

# See also

[Evidence](https://www.uniprot.org/help/evidences)  
[DNA binding](https://www.uniprot.org/help/dna_bind)  
[Domain](https://www.uniprot.org/help/domain)  
[Motif](https://www.uniprot.org/help/motif)  
[Region](https://www.uniprot.org/help/region)  
[Zinc finger](https://www.uniprot.org/help/zn_fing)
