---
title: Lipidation
type: help
categories: PTM_processing,manual
---

This subsection of the [PTM / Processing](https://www.uniprot.org/help/ptm_processing_section) section specifies the position(s) and the type of covalently attached lipid group(s).

The covalent binding of a lipid group to a peptide chain, also known as lipidation, can affect the activity of the protein and/or alter its subcellular location. For instance, palmitoylation, myristoylation or prenylation of cytoplasmic proteins can promote their association with the inner face of the plasma membrane, while the addition of a GPI-anchor may serve to anchor extracellular proteins to the outer face of the plasma membrane.

Related keyword: [Lipoprotein](https://www.uniprot.org/keywords/KW-0449)  
Most frequent lipids also have a specific keyword associated (see below).

See also the subsection [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification) for additional information on modifications for which **position-specific data is not yet available**.

The following types of lipidation are described in UniProtKB:

- N-Myristoylation
- Palmitoylation
- GPI-anchor addition
- Prenylation
- Lipidation of bacterial proteins (S-diacylglycerol)
- Other types of lipidation

# 1. N-Myristoylation

N-myristoylation refers to the covalent attachment of myristate to an N-terminal glycine. This irreversible protein modification occurs co- translationally following the removal of the initiator methionine residue, which is also annotated. This modification promotes weak protein-membrane and protein-protein interactions.

We annotate experimentally determined N-myristoylation sites and sites predicted by NMT and NMT_NN predictors provided that the prediction is consistent with other known properties of the protein or that the protein belongs to a family in which this modification is known to occur.  
Example: [P84077](https://www.uniprot.org/uniprotkb/P84077#ptm_processing)

Related keyword: [Myristate](https://www.uniprot.org/keywords/KW-0519)

# 2. Palmitoylation

S-palmitoylation is the thioester linkage of long-chain fatty acids to cytoplasmic cysteine residues. S-palmitoylation can modulate interactions with other proteins and membranes and regulate protein trafficking and enzyme activity.  
Example: [Q09470](https://www.uniprot.org/uniprotkb/Q09470#ptm_processing)

Related keyword: [Palmitate](https://www.uniprot.org/keywords/KW-0564)

# 3. GPI-anchor addition

GPI-anchor addition refers to the linkage of glycosyl-phosphatidylinositol (GPI) to the C-terminus of extracellular proteins, which mediates their attachment to the plasma membrane. GPI-anchor addition takes place in the lumen of the endoplasmic reticulum.

We annotate experimentally determined sites of GPI-anchor addition, as well as sites predicted by the 'big-Pi' predictor, but only when the protein (or the family to which it belongs) is known to be modified in this way and the precise site of modification is unknown.  
Example: [P21589](https://www.uniprot.org/uniprotkb/P21589#ptm_processing)

Related keyword: [GPI-anchor](https://www.uniprot.org/keywords/KW-0336)

# 4. Prenylation

Prenylation is the thioether linkage of an isoprenoid lipid (farnesyl (C-15) or geranylgeranyl (C-20)) to a cytoplasmic cysteine at or near the C-terminus. These lipid groups mediate protein attachment to membranes and their addition is specified by the amino acid sequence motifs CAAX, CC or CAC at the C-terminus. Prenylated proteins are estimated to represent 0.5% of all intracellular proteins.  
Example: [P62820](https://www.uniprot.org/uniprotkb/P62820#ptm_processing)

Prenylation of a cysteine in the CAAX context often leads to both proteolytic cleavage of the C-A bond and to the methylation of the new C-terminal cysteine residue. Both the cleaved propeptide and the accompanying methylation of the new C-terminal cysteine are annotated.  
Example: [P34068](https://www.uniprot.org/uniprotkb/P34068#ptm_processing)

Related keyword: [Prenylation](https://www.uniprot.org/keywords/KW-0636)  
In entries where prenylation is followed by cleavage and methylation of the new C-terminal cysteine residue: [Methylation](https://www.uniprot.org/keywords/KW-0488)

# 5. Lipidation of bacterial proteins (S-diacylglycerol)

Most bacterial lipoproteins are anchored to the outer plasma membrane by diacylglycerol linked to the side chain of an N-terminal cysteine via the sulfur atom. This modification is required for the cleavage of the signal peptide. The mature N-terminal chain is further palmitoylated.  
Example: [P61320](https://www.uniprot.org/uniprotkb/P61320#ptm_processing)

# 6. Other examples of lipidation

O-octanoyl: attached to serine or threonine of secreted proteins.  
Example: [Q9UBU3](https://www.uniprot.org/uniprotkb/Q9UBU3#ptm_processing)

S-archaeol: attached to cysteine of secreted proteins.  
Example: [P39442](https://www.uniprot.org/uniprotkb/P39442#ptm_processing)

Cholesterol: attached to the C-terminus following cleavage of the  
polypeptide.  
Example: [Q02936](https://www.uniprot.org/uniprotkb/Q02936#ptm_processing)

The nature of the post-translationally formed amino acid is annotated by using a controlled vocabulary. The currently defined list of controlled vocabulary, as well as other information, such as the target amino acid, the related keyword, the taxonomic range and the subcellular location of the modification, are available in [ptmlist.txt](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/ptmlist.txt) document. Links to the RESID database are also provided to help gain a better insight into every modification.

See also: [Evidence](https://www.uniprot.org/help/evidences), [Glycosylation](https://www.uniprot.org/help/carbohyd), [Modified residue](https://www.uniprot.org/help/mod_res), [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification)
