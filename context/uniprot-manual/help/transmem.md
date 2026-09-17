---
title: Transmembrane
type: help
categories: Subcellular_location,manual
---

This subsection of the ['Subcellular location'](https://www.uniprot.org/help/subcellular_location_section) section describes the extent of a membrane-spanning region of the protein. It denotes the presence of both alpha-helical transmembrane regions and the membrane spanning regions of beta-barrel transmembrane proteins.

In **UniProtKB/Swiss-Prot**, we annotate transmembrane regions, when:  
1. the transmembrane regions have been experimentally determined; there is some experimental evidence for the number, location and range of transmembrane regions; the structure of a protein family has been reviewed.  
2. a protein is related to a well-characterized family known to contain transmembranes. In some families, such a G-protein coupled receptors, ion channels, transmembrane regions can be propagated by similarity, when there is some experimental evidence for the number, location and topology of transmembrane regions.  
3. transmembrane regions are predicted by different prediction tools, provided their presence is consistent with the function of the protein and is detected by several prediction tools.

For multi-pass membrane proteins, we do not number transmembrane regions except in cases when an accepted numbering system exists, such as for seven-transmembrane proteins, ion channels, bacteriorhodopsin and others. In these cases we use the numbering system applied to the specific protein family concerned.

In **UniProtKB/TrEMBL**, transmembrane regions are annotated automatically by our [sequence annotation module using TMHMM.](https://www.uniprot.org/help/sam)

# 1. Annotation of experimentally proven transmembrane regions

Even when there is proof for the **existence** of transmembrane regions, it is difficult to determine their **boundaries**. Transmembrane regions are therefore generally annotated using the qualifier ['Sequence analysis'](https://www.uniprot.org/help/evidences#ECO:0000255).  
Example: [Q6IWH7](https://www.uniprot.org/uniprotkb/Q6IWH7#subcellular_location)

However, when the experimental technique used allows the assignment of the boundary to a particular position (X-ray crystallography etc.), the transmembrane region is labeled with ['Experimental'](https://www.uniprot.org/help/evidences#ECO:0000269) or ['Curated'](https://www.uniprot.org/help/evidences#ECO:0000305) evidence. In such cases, the positions of the transmembrane regions can be propagated ['By similarity'](https://www.uniprot.org/help/evidences#ECO:0000250) to closely related homologs.

Examples: [Q86V24](https://www.uniprot.org/uniprotkb/Q86V24#subcellular_location) (experimental), [Q8BQS5](https://www.uniprot.org/uniprotkb/Q8BQS5#subcellular_location) (propagated by similarity)

Having said this, unfortunately [not all UniProtKB/Swiss-Prot annotations have evidence](https://www.uniprot.org/help/evidence_in_swissprot). The annotations which are missing evidence were created before we started to manually curate information with evidence in UniProtKB/Swiss-Prot, and manual attribution of evidence to these existing annotations was not possible due to the huge amount of existing data. In such cases, the absence of any evidence for topological domains may in many cases be interpreted as 'Experimental' or 'Curated'.

# 2. Annotation of predicted transmembrane regions

We also annotate transmembrane regions which are predicted by the application of the predictive tools TMHMM, Memsat, Phobius and the hydrophobic moment plot method of Eisenberg and coworkers. Note that these tools predict only alpha-helical membrane spanning regions: the positions of membrane spanning beta-sheet regions are annotated strictly according to experimental information.

For predicted alpha-helical transmembrane regions at least two methods must return a positive prediction in order for a region to be annotated as transmembrane in UniProtKB/Swiss-Prot. When predicted N-terminal signal peptides and transmembrane regions overlap, the Phobius prediction is used to discriminate between the two. In all cases predicted transmembrane regions are annotated with evidence ['Sequence analysis'](https://www.uniprot.org/help/evidences#ECO:0000255).

See also: [Evidence](https://www.uniprot.org/help/evidences)

# 3. Membrane protein topologies in UniProtKB/Swiss-Prot

## a) Single-pass transmembrane proteins

We define 4 types of single-pass transmembrane proteins in UniProtKB/Swiss-Prot. Each of these 4 topologies is specified according to a controlled vocabulary in the ['Subcellular location'](https://www.uniprot.org/help/subcellular_location_section) subsection.

-   Type I: (N-terminus out): characterized by the feature key: 'Signal peptide' in the ['PTM / Processing'](https://www.uniprot.org/help/ptm_processing_section) section.  
    Example: [P14778](https://www.uniprot.org/uniprotkb/P14778/entry#ptm_processing)

-   Type II (N-terminus in): characterized by the description: 'Signal-anchor for type II membrane protein'. The transmembrane region is located close to the N-terminus of the protein and functions as an anchor.  
    Example: [P08195](https://www.uniprot.org/uniprotkb/P08195#subcellular_location)

-   Type III (N-terminus out): characterized by the description: 'Signal-anchor for type III membrane protein'. The transmembrane region is located close to the N-terminus of the protein and functions as an anchor.  
    Example: [O70601](https://www.uniprot.org/uniprotkb/O70601#subcellular_location)

-   Type IV (N-terminus in): the transmembrane region is located close to the C-terminus of the protein and functions as an anchor.  
    Example: [Q9HDC5](https://www.uniprot.org/uniprotkb/Q9HDC5#subcellular_location)

## b) Multi-pass transmembrane proteins

Proteins with 2 or more transmembrane regions are considered as integral multi-pass membrane proteins and are not classified further in UniProtKB/Swiss-Prot. Here again the topology is specified in the ['Subcellular location'](https://www.uniprot.org/help/subcellular_location_section) subsection.

Many multi-pass membrane proteins do not have a signal peptide. Therefore when predicted N-terminal signal peptides and transmembrane regions overlap, and Phobius cannot be used to discriminate between the two, we annotate the disputed region by default as 'transmembrane'. In the following example, the protein is predicted to contain a signal peptide which is annotated as transmembrane region.  
Example: [Q8RKH1](https://www.uniprot.org/uniprotkb/Q8RKH1#subcellular_location)

There are, however, examples of well-characterized proteins that have both a signal peptide and multiple transmembrane regions.  
Example: [P30988](https://www.uniprot.org/uniprotkb/P30988#subcellular_location)

## c) Beta-barrel transmembrane proteins

We do not predict the positions of the membrane spanning domains of beta-barrel transmembrane proteins, so sequence annotations for transmembrane regions may be absent. In this case, information about the structure and topology of these proteins may be indicated in the ['Domain'](https://www.uniprot.org/help/domain_cc) subsection of the 'Family and Domains' section.  
Example: [P04840](https://www.uniprot.org/uniprotkb/P04840#family_and_domains)

Related keyword:  
[Transmembrane](https://www.uniprot.org/keywords/812)

# See also

-   [Sequence Analysis Methods for automatic annotation of unreviewed entries](https://www.uniprot.org/help/sam)
-   [Topological domain](https://www.uniprot.org/help/topo_dom)
-   [Sequence annotation (features)](https://www.uniprot.org/help/sequence_annotation)
