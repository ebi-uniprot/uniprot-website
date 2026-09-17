---
title: Signal  peptide
type: help
categories: PTM_processing,manual
---

This subsection of the 'PTM / Processing' section denotes the presence of an N-terminal signal peptide.

Signal peptides are found in proteins that are targeted to the endoplasmic reticulum and eventually destined to be either secreted/extracellular/periplasmic/etc., retained in the lumen of the endoplasmic reticulum, of the lysosome or of any other organelle along the secretory pathway or to be I single-pass membrane proteins.

The signal sequence is usually removed in the mature protein; in these cases, the comment 'The displayed sequence is further processed into a mature form' is added in the '[Sequence](https://www.uniprot.org/help/sequences_section)' section.

# 1. Annotation of experimentally proven signal peptides

We annotate experimentally proven signal peptides when the cleavage site has been determined by direct protein sequencing.  
Example: [P01165](https://www.uniprot.org/uniprotkb/P01165#ptm_processing)

This information can then be propagated ['By similarity'](https://www.uniprot.org/help/evidences#ECO:0000250) to closely related species providing the signal sequence is conserved.  
Example: [P27682](https://www.uniprot.org/uniprotkb/P27682/entry#ptm_processing)

When it is clear that a protein is cleaved (according to experimental data or its similarity with a family of proteins), but direct protein sequencing has not been used to determined the precise cleavage position, we use a question mark instead of a position.  
Example: [Q9VGW1](https://www.uniprot.org/uniprotkb/Q9VGW1#ptm_processing)

In some rare cases, signal sequences are not cleaved. This is indicated by the note 'Not cleaved' in the feature description.  
Example: [O95445](https://www.uniprot.org/uniprotkb/O95445#ptm_processing)

# 2. Annotation of predicted signal peptides

We annotate signal peptides which are predicted by the application of the predictive tools Phobius, Predotar, SignalP and TargetP. At least two methods must return a positive signal peptide prediction in order for the prediction to be annotated in UniProtKB. When predicted N-terminal signal peptides and transmembrane regions overlap, then the prediction returned by Phobius is used to discriminate between the two possibilities.  
Example: [Q6Q788](https://www.uniprot.org/uniprotkb/Q6Q788#ptm_processing)

# 3. Annotation of Tat signal sequences in bacteria and archaea

This subsection is also used for the annotation of proteins with a Tat (Twin-arginine translocation) signal sequence, which serves to translocate folded proteins in bacteria and archaea. Substrate proteins are directed to the Tat apparatus by distinctive N-terminal signal peptides containing a consensus SRRxFLK 'twin-arginine' motif. The related comments "Predicted to be exported by the Tat system" and "Exported by the Tat system" can be found in the 'Post-translational modification' subsection.  
Examples: [P36649](https://www.uniprot.org/uniprotkb/P36649#ptm_processing), [Q51705](https://www.uniprot.org/uniprotkb/Q51705/entry#ptm_processing)

Predicted TAT signal sequences are identified using the PROSITE profile [PS51318](https://prosite.expasy.org/PS51318).  
Predicted cleavage sites are tagged with evidence ['Sequence analysis'](https://www.uniprot.org/help/evidences#ECO:0000255) or with the [automatic annotation](https://www.uniprot.org/help/automatic_annotation) rule from which the predicted result was propagated.  
Example: [P36649](https://www.uniprot.org/uniprotkb/P36649#ptm_processing)

In **UniProtKB/TrEMBL**, signal peptides are annotated automatically by our [sequence annotation module using SignalP.](https://www.uniprot.org/help/sam)

Related keyword:  
[Signal](https://www.uniprot.org/keywords/732)

See also: [Evidence](https://www.uniprot.org/help/evidences)
