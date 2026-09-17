---
title: How do I get the nucleotide sequence that corresponds to the UniProtKB sequence?
type: help
categories: UniProtKB,Sequence,Cross-references,Text_search,faq
---

# How do I get the nucleotide sequence that corresponds to the canonical UniProtKB sequence?

You cannot! Although more than 95% of the known protein sequences derive from DNA translation, there is no **single** nucleic acid reference sequence for a given UniProtKB/Swiss-Prot protein sequence.

The [canonical protein sequence](https://www.uniprot.org/help/canonical_and_isoforms) is the outcome of thorough curation work, which often involves the merge of various sequences encoded by the same gene (in one species). In the annotation process, the most correct amino acid sequences are chosen and discrepancies are analyzed and documented, most frequently in the 'Sequence' section (in the flat file FT keys: VAR_SEQ, CONFLICT, VARIANT,...). Additional information can be found in the 'Alternative sequence' subsection.

The annotated coding sequences (CDS) submitted to the EMBL-Bank/GenBank/DDBJ databases that show the most severe discrepancies with the UniProtKB/Swiss-Prot canonical sequence are tagged in the 'Sequence databases' subsection of the [Cross-reference section](https://www.uniprot.org/help/cross_references_section) (EMBL-Bank/GenBank/DDBJ) as frameshifts, erroneous prediction, etc., with an optional comment in the subsection 'Sequence caution'.

In most cases, in the absence of annotation of 'Sequence conflict', 'Variant', 'Alternative products', 'Sequence caution', etc., the nucleic acid sequences listed in the 'Sequence databases' subsection, when translated, correspond to the canonical sequence, provided they are not fragments.

There are some exceptions. Some entries may display a full-length protein sequence, while the available nucleic acid sequences are only fragments. In this case, the manual annotation process comes into the picture: by combining the sequences of submitted fragmentary CDS and/or of the genomic sequence, taking into account the similarity with orthologous proteins (in a closely related species), one can predict the full-length protein sequence.

In addition, some [entries](https://www.uniprot.org/uniprotkb?query=reviewed:true+keyword:KW-0903+NOT+database:embl) exclusively contain protein sequence data resulting from direct protein sequencing and thus do not have cross-references to any nucleic acid sequence.

# How do I get the nucleotide sequence that corresponds to the UniProtKB alternative sequences?

There is currently no way to directly find the nucleotide sequence that corresponds to the alternative protein sequences described in a UniProtKB entry.

However, some of the resources to which we link contain information that is specific to an isoform sequence. Where this is known, we indicate the corresponding UniProtKB [isoform sequence identifier in cross-references](https://www.uniprot.org/help/isoform_crossreferences).

# See also

- [What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)
- [How redundant are the UniProt databases?](https://www.uniprot.org/help/redundancy)
- [Sequences](https://www.uniprot.org/help/sequences)
- [Alternative sequence](https://www.uniprot.org/help/var_seq)
- [Sequence conflict](https://www.uniprot.org/help/conflict)
- [Cross-references section](https://www.uniprot.org/help/cross_references_section)
- [Cross-references for isoform sequences](https://www.uniprot.org/help/isoform_crossreferences)
