---
title: Protein existence
type: help
categories: Protein_existence,manual
---

This indicates the type of evidence that supports the existence of the protein. Note that the 'protein existence' evidence does not give information on the accuracy or correctness of the sequence(s) displayed.

While it gives information on the existence of a protein, it may happen that the sequence slightly differs from genomic sequences, especially for sequences derived from gene model predictions.

In UniProtKB there are 5 types of evidence for the existence of a protein:

1\. Experimental evidence at protein level  
2. Experimental evidence at transcript level  
3. Protein inferred from homology  
4. Protein predicted  
5. Protein uncertain

The value **'Experimental evidence at protein level'** indicates that there is clear experimental evidence for the existence of the protein. The criteria include partial or complete Edman sequencing, clear identification by mass spectrometry, X-ray or NMR structure, good quality protein-protein interaction or detection of the protein by antibodies.

The value **'Experimental evidence at transcript level'** indicates that the existence of a protein has not been strictly proven but that expression data (such as existence of cDNA(s), RT-PCR or Northern blots) indicate the existence of a transcript.

The value **'Protein inferred by homology'** indicates that the existence of a protein is probable because clear orthologs exist in closely related species.

The value **'Protein predicted'** is used for entries without evidence at protein, transcript, or homology levels.

The value **'Protein uncertain'** indicates that the existence of the protein is unsure.

Only the highest or most reliable level of supporting evidence for the existence of a protein is displayed for each entry. For example, if the existence of a protein is supported by both the presence of ESTs and direct protein sequencing, the protein is assigned the value 'Experimental evidence at protein level'.

The 'protein existence' value is assigned automatically, based on the annotation elements present in the entry. The criteria used by this automatic procedure are listed in the document ['Criteria used to assign the PE level of entries'](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/pe_criteria.txt).

# Related documents

[Criteria description for protein existence](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/pe_criteria.txt)  
[Why do we keep dubious sequences in UniProtKB? How to discard them from a protein set?](https://www.uniprot.org/help/dubious_sequences)
