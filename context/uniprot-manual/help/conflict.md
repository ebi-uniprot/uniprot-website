---
title: Sequence conflict
type: help
categories: Sequence,manual
---

This subsection of the 'Sequence' section reports difference(s) between the canonical sequence (displayed by default in the entry) and the different sequence submissions merged in the entry. These various submissions may originate from different sequencing projects, different types of experiments, or different biological samples. Sequence conflicts are usually of unknown origin.

The 'Sequence conflict' subsection indicates the position at which a submitted sequence differs from the canonical sequence, the resulting change in the protein sequence and the reference corresponding to the differing sequence report.

We usually define the canonical sequence as the most frequent protein sequence or the most conserved in orthologous species. For organisms whose genome has been fully sequenced, we generally define the canonical protein sequence as the one derived from the translation of the genomic sequence. All sequence conflicts are described with reference to this canonical sequence.  
Example: [O94335](https://www.uniprot.org/uniprotkb/O94335#sequences)

The [INSDC](https://www.insdc.org/) unique identifier of the conflicting sequence is given in the 'Description' field.  
Example: [Q5NAW2](https://www.uniprot.org/uniprotkb/Q5NAW2#sequences)

The sequence differences described in this subsection complement those in the ['Sequence caution'](https://www.uniprot.org/help/sequence_caution) subsection, which describes substantial sequence differences, such as errors in translation, frameshifts or erroneous gene model predictions.

Sequence conflicts are usually of unknown origin: they may originate from sequencing errors or may be a yet uncharacterized natural polymorphism (Single Amino-acid Polymorphism, SAP). If a sequence conflict turns out to be an actual SAP, the annotation is updated: the conflict is deleted from this subsection and reported in the 'Natural variations' instead.

# Related documents

[What is the canonical sequence? Are all isoforms described in one entry? How can I retrieve them?](https://www.uniprot.org/help/canonical_and_isoforms)

[How do I get the nucleotide sequence that corresponds to the canonical UniProtKB sequence?](https://www.uniprot.org/help/canonical_nucleotide)
