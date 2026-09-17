---
title: Glycosylation
type: help
categories: PTM_processing,manual
---

This subsection of the [PTM / Processing](https://www.uniprot.org/help/ptm_processing_section) section specifies the position and type of each covalently attached glycan group (mono-, di-, or polysaccharide).

Glycosylation types are classified according to the identity of the atom of the amino acid which binds the carbohydrate chain, i.e. C-linked, N-linked, O-linked or S-linked. N-, C- and S-glycosylation take place in the endoplasmic reticulum and/or the Golgi apparatus and only extracellular or secreted proteins are concerned. In contrast, both intracellular and extracellular proteins can be O-glycosylated. The sugar directly bound to the protein is termed the reducing sugar, as it reduces the amino acid it binds to, and the structure of an oligosaccharide is written from the non-reducing end to the reducing end. We indicate the type of linkage to the protein and specify the nature of the reducing terminal sugar (if known) in brackets in the 'Description' field. For monosaccharides, the name of the reducing terminal sugar appears alone, while for di- and polysaccharides the name is followed by three periods '...'.

Glycosylation is described using a strict controlled vocabulary.

Examples for monosaccharides: [P54939](https://www.uniprot.org/uniprotkb/P54939#ptm_processing), [P13671](https://www.uniprot.org/uniprotkb/P13671#ptm_processing)

Examples for polysaccharides: [Q15293](https://www.uniprot.org/uniprotkb/Q15293#ptm_processing), [P46976](https://www.uniprot.org/uniprotkb/P46976#ptm_processing), [Q9S8M0](https://www.uniprot.org/uniprotkb/Q9S8M0#ptm_processing)

If the site of glycosylation is **not known or if the consequences of the modifications require further comments**, the information is stored in the ['Post-translational modification'](https://www.uniprot.org/help/post-translational_modification) subsection.

Related keyword: [Glycoprotein](https://www.uniprot.org/keywords/325)

We annotate the following types of glycosylation:

-   N-linked glycosylation
-   O-linked glycosylation
-   C-linked glycosylation
-   S-linked glycosylation
-   Glycation

# 1. N-linked glycosylation

N-linked glycosylation refers to the attachment of oligosaccharides to a nitrogen atom, usually the N4 of asparagine residues. N-glycosylation occurs on secreted or membrane bound proteins, mainly in eukaryotes and archaea - most bacteria do not carry out this modification. In eukaryotes, N-glycosylation begins as a co-translational event in the endoplasmic reticulum, where preassembled blocks of 14 sugars (including 2 N-acetylglucosamines, 9 mannoses and 3 glucoses) are first added to the nascent polypeptide chain. After cleavage of 3 glucose and 1 mannose residues, the protein is transferred to the Golgi apparatus where the glycans lose a variable number of mannose residues and acquire a more complex structure during a process called 'terminal glycosylation'.

There are 3 types of mature N-glycans:

-   high mannose (those that have escaped terminal glycosylation),
-   hybrid
-   complex (with different combinations of mannose, N-acetylglucosamine, N-acetylgalactosamine, fucose and sialic acid residues).

Example: [P08195](https://www.uniprot.org/uniprotkb/P08195#ptm_processing)

If the type of N-linked glycan is known, it is indicated in the 'Description' field using the terms 'high mannose', 'hybrid' or 'complex'.  
Examples: [P18892](https://www.uniprot.org/uniprotkb/P18892#ptm_processing), [P01830](https://www.uniprot.org/uniprotkb/P01830#ptm_processing)

The consensus sequence for N-glycosylation is Asn-Xaa-Ser/Thr (where Xaa is not Pro; note that Thr is more common than Ser) and more rarely Asn-X-Cys. We annotate experimentally identified N-glycosylation sites and predicted sites of N-glycosylation identified by the 'NetNGlyc' predictor (for mammalian entries) or the PROSITE pattern [PS00001](https://prosite.expasy.org/PDOC00001)  
(for non-mammalian entries). The PROSITE pattern is also applied to mammalian entries when NetNGlyc returns a negative prediction for a protein known to contain N-glycosylated sites. Predicted sites are only annotated in regions of proteins that are known or predicted to be extracellular, and are tagged as 'Sequence Analysis' (Sequence model). In general, we avoid propagating N-glycosylation sites 'By similarity' to related proteins.  
Example: [Q94BT2](https://www.uniprot.org/uniprotkb/Q94BT2#ptm_processing)

# 2. O-linked glycosylation

O-linked glycosylation of secreted and membrane bound proteins is a post-translational event that takes place in the cis-Golgi compartment after N-glycosylation and folding of the protein. It refers to the attachment of glycans to serine and threonine, and, to a lesser extent, to hydroxyproline and hydroxylysine. O-linked glycans play important roles in protein localization and trafficking, protein solubility, antigenicity and cell-cell interactions.

O-linked glycans are built up in a stepwise fashion with sugars added incrementally. The most common type of O-glycosylation in secreted and membrane-bound mammalian proteins seems to be the addition of reducing terminal N-acetylgalactosamine (GalNAc). This type of O-linked glycan is also referred to as 'mucin-type' glycan. The reducing terminal GalNAc residue can be further extended with galactose (Gal), N-acetylglucosamine (GlcNAc) or GlcNAc and Gal resulting in 8 common core structures, which are often further decorated with the addition of up to three sialic acid residues.  
Example: [P02724](https://www.uniprot.org/uniprotkb/P02724#ptm_processing)

In addition to the mucin-type O-linked glycans, a variety of mammalian proteins are known to have mannose (Man), fucose (Fuc), glucose (Glc), Gal or xylose (Xyl) as reducing terminal linkages.  
Examples: [P00740](https://www.uniprot.org/uniprotkb/P00740#ptm_processing), [P08592](https://www.uniprot.org/uniprotkb/P08592#ptm_processing)

Some cytoplasmic and nuclear proteins have simple O-linked glycans in which a single N-acetylglucosamine residue is linked to a serine or a threonine. This modification has been identified in a number of eukaryotes including plants and filamentous fungi, although its presence in S. cerevisiae is disputed. This type of O-linked glycosylation plays an important role in the modulation of the biological activity of intracellular proteins; in some proteins the same residue may be subject to competing phosphorylation and O-linked glycosylation.  
Example: [P02488](https://www.uniprot.org/uniprotkb/P02488#ptm_processing)

We annotate experimentally identified O-glycosylation sites and predicted mucin-type O-glycosylation sites identified by the 'NetOGlyc' predictor. Predicted sites are only annotated in regions of proteins that are known or predicted to be extracellular and where mucin-type O-glycosylation has been observed, but the exact site is unknown.

# 3. C-linked glycosylation

C-linked glycosylation refers to the covalent attachment of a mannose residue to a tryptophan residue within an extracellular protein. Two recognition signals for C-mannosylation have been proposed: W-X-X-W (in which the first or both tryptophan residues become mannosylated), and W-S/T-X-C.  
Example: [P13671](https://www.uniprot.org/uniprotkb/P13671#ptm_processing)

We only annotate C-linked glycosylation when there is experimental [evidence](https://www.uniprot.org/help/evidences) for the modification.

# 4. S-linked glycosylation

S-linked glycosylation refers to the attachment of oligosaccharides to the sulfur atom of the cysteine. This modification seems to be extremely rare in comparison to other glycosylation events and was first seen in human and bacterial peptides.  
Example: [P19827](https://www.uniprot.org/uniprotkb/P19827#ptm_processing)

# 5. Glycation

Glycation refers to the non-enzymatic attachment of reducing sugars to the nitrogen atoms of proteins (both to the N-terminus and to lysine and histidine side chains). This modification is also known as the "Maillard" reaction. Over time, the sugar moieties bound to glycated proteins are gradually modified to become Advanced Glycation Endproducts (AGEs), some of which are implicated in a variety of diseases, such as type II diabetes mellitus, cancer, atherosclerosis, Alzheimer disease and Parkinson disease.  
Examples: [P68871](https://www.uniprot.org/uniprotkb/P68871#ptm_processing), [P10636](https://www.uniprot.org/uniprotkb/P10636#ptm_processing)

We only annotate glycation when there is experimental [evidence](https://www.uniprot.org/help/evidences). Further information regarding the effect of glycation can be found in the ['Post-translational modification'](https://www.uniprot.org/help/post-translational_modification) subsection.

See also: [Evidence](https://www.uniprot.org/help/evidences), [Modified residue](https://www.uniprot.org/help/mod_res), [Lipidation](https://www.uniprot.org/help/lipid), [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification)
