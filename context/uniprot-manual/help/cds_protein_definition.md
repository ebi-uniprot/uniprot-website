---
title: What are UniProtKB's criteria for defining a CDS as a protein?
type: help
categories: UniProtKB,Sequence,faq
---

# What are the criteria for defining a CDS as a real protein, i.e. for inclusion in UniProtKB?

Most protein sequences are derived from translations of CoDing Sequence (CDS) derived from gene predictions. A CoDing Sequence (CDS) is a region of DNA or RNA whose sequence determines the sequence of amino acids in a protein. It should not be mixed up with an Open Reading Frame (ORF), which is a continuous stretch of DNA codons that begins with a start codon and ends at a STOP codon. All CDS are ORFs, but not all ORFs are CDS...

Some of the predicted CDSs exhibit strong sequence similarity to known proteins in closely related species. For other proteins there is experimental evidence, such as Edman sequencing, clear identification by mass spectrometry (MSI), X-ray or NMR structure, detection by antibodies, etc. However, for some other proteins, there is no evidence at all. To indicate these different levels of evidence for the existence of a protein, we have introduced the PE (Protein Existence) line (see [the protein existence criteria](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/pe_criteria.txt)).

Note that the PE line does not describe the accuracy or correctness of a sequence displayed in UniProtKB, but the evidence for the existence of a protein. It may happen that the protein sequence is not entirely accurate, especially for sequences derived from gene predictions from genomic sequences.

# What are UniProtKB's criteria for defining a CDS as 'not a real protein'?

Gene prediction performance largely depends on current biological knowledge. We use bioinformatics tools to align the proposed CDS with the latest version of nucleic acid sequences (genomic and RNA/ESTs). We sometimes suggest that proposed CDS or ORFs are incorrectly predicted protein sequences. Our evidence can include the presence of new longer or shorter RNAs (fused or split predicted gene(s)), absence of RNA (even in other species), and/or wrong intron/exon boundaries (in Eukaryota). Some other protein sequences may have been identified as pseudogenes in the literature. When there is enough evidence that these CDSs are not real proteins, we remove them from UniProtKB.

# See also

- [Where do the UniProtKB protein sequences come from?](https://www.uniprot.org/help/sequence_origin)
- [Does UniProtKB contain all protein sequences?](https://www.uniprot.org/help/uniprotkb_coverage)
- [Why do we keep dubious sequences in UniProtKB? How to discard them from a protein set?](https://www.uniprot.org/help/dubious_sequences)
- [Why have some UniProtKB accession numbers been deleted? How can I track them?](https://www.uniprot.org/help/deleted_accessions)
- [Sequences](https://www.uniprot.org/help/sequences)
- [Alternative sequence](https://www.uniprot.org/help/var_seq)
