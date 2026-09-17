---
title: Structure annotation in UniProt
type: help
categories: 3D_structure,manual
---

## Why are protein structures informative?

Protein structures can impart a wealth of information. For example, they can:

* Inform the architecture of multimeric complexes, including the interactions with other proteins, nucleic acids, carbohydrates and lipids  
* Reveal the topological arrangement and transmembrane domains  
* Prove the existence of specific protein folds and provide insights on protein folding  
* Confirm and provide a structural explanation of a protein’s functional role  
* Provide residual-level details that are not available from other techniques, including:  
  * Interactions with ligands and active sites  
  * Post-translational modifications  
  * Pathogenic mutations

Related keyword: [3D-structure](https://www.uniprot.org/keywords/KW-0002)

## Structure Section

This section within the protein entry page provides a list of tertiary structures available for proteins from [cross-referenced databases](https://www.uniprot.org/database?query=*).

They are displayed in three different tabs:

* PDB: experimentally determined structures from [PDB](https://www.ebi.ac.uk/pdbe/)  
* AlphaFoldDB: predicted structural models from [AlphaFoldDB](https://alphafold.ebi.ac.uk/)  
* Others: structural models from other 3D-Beacons network [data providers](https://www.ebi.ac.uk/pdbe/pdbe-kb/3dbeacons/guidelines)

## PDB: experimentally determined structures from PDB

Experimentally determined structures can cover the complete protein sequence shown in a UniProt entry or they can be fragments or variants. They can include ligands, solvents, or other interacting partners. The most common experimental methods for structure determination are X-ray crystallography (X-ray), Cryo-Electron Microscopy (EM) and Nuclear Magnetic Resonance Spectroscopy (NMR). This tab may be absent if no experimental structure is available from PDB for the protein entry.

Example: [Q9UQM7](https://www.uniprot.org/uniprotkb/Q9UQM7/entry#structure).

## Structure table contents in the PDB tab

| Subsection | Content |
| :---- | :---- |
| Identifier | The structure identifier used in PDB. Entries are listed in descending alphanumerical order. |
| Method | Experimental method used for structure determination. |
| Resolution | Effective resolution of the refinement by X-ray or EM. Entries can be filtered by resolution using the dropdown menu. |
| Chain | The chain identifier for the protein of interest. A structure may consist of multiple entities (including proteins and nucleic acids) and each copy of an entity is assigned to a chain identifier. Not all the chains are shown for large structures, please refer to the PDB website for the full mapping. |
| Positions | The positions here indicate the construct used to determine the structure. This may vary from the observable sequence in the structure. The same residual-level mapping is used in the [SIFTS project](https://www.ebi.ac.uk/pdbe/docs/sifts/). |
| Links | Download the structural file, or look for similar structures using [Foldseek](https://search.foldseek.com/search). |

## Structure coverage

Multiple experimentally determined structures may be available for one protein (see the [PDB cross-reference help page](https://www.uniprot.org/help/multiple_pdb_xrefs)). These structures may [cover different ranges of the sequence](https://www.uniprot.org/help/structure_subseq), depending on the experimental method and the construct used to determine the structure. The sequence coverage of different structures are shown in the PDBe 3D structure coverage track of the protein [feature viewer](https://www.uniprot.org/help/feature_viewer).

Example: [Q9H165](https://www.uniprot.org/uniprotkb/Q9H165/feature-viewer).

## AlphaFoldDB: predicted structural models from AlphaFoldDB

A 3D structural model from an AlphaFoldDB prediction is usually presented as a full-length monomeric protein based on the protein canonical sequence, without any ligands or interacting partners. These structural models are shown with a per-residue confidence score (pLDDT) that indicates the confidence of the prediction. Confidence is color-coded in the 3D structural viewer of a protein entry, and in the AlphaFold confidence track of the protein feature viewer, to indicate the confidence of the prediction along the amino acid sequence.

Example: [Q9Y257](https://www.uniprot.org/uniprotkb/Q9Y257/entry#structure).

AlphaFoldDB also provides large-scale datasets from scientific communities with deep domain expertise, which may result in multiple structural models for a protein provided by AlphaFoldDB. Please see the AlphaFoldDB [collaborators page](https://www.alphafold.com/collaborators) for details.

## Structure table contents in the AlphaFoldDB tab

| Subsection | Content |
| :---- | :---- |
| Identifier | The identifier used in AlphaFoldDB. |
| Isoform | The sequence used to generate the AlphaFold prediction. It can be the [canonical or isoform sequence](https://www.uniprot.org/help/alternative_products). |
| Chain | The chain identifier for the protein of interest. A structure may consist of multiple entities (including proteins and nucleic acids) and each copy of an entity is assigned to a chain identifier. |
| Positions | The positions here indicate the sequence used to generate the AlphaFold prediction. |
| Oligomeric state | The AlphaFold prediction can be a monomer, homodimer or heterodimer. For oligomers, please see the AlphaFoldDB entry page for details of the interaction. |
| Links | Download the structural file, or look for similar structures using [Foldseek](https://search.foldseek.com/search). |

It is possible that an AlphaFoldDB prediction is not available for your protein of interest. This might be for multiple reasons, such as sequence length (longer sequences might not be included). It is also possible that the canonical sequence could have been updated since the AlphaFoldDB prediction was made and therefore the 3D-structural prediction may not be based on the latest canonical sequence. If this is the case, a warning will be displayed.

For the complete list of  reasons why an AlphaFoldDB prediction might not be available, please [see the AlphaFoldDB FAQ](https://alphafold.ebi.ac.uk/faq#faq-4).

## Others: structural models from other 3D-Beacons network

3D-Beacons is an open collaboration between providers of macromolecular structural models. They include experimentally determined structures from Small Angle Scattering Biological Data Bank (SASBDB) and structural models from other databases. These include ab initio models, template-based models and conformational ensembles. A full list of 3D-Beacons data providers can be found [here](https://www.ebi.ac.uk/pdbe/pdbe-kb/3dbeacons/guidelines).

Example: [P05067](https://www.uniprot.org/uniprotkb/P05067/entry#structure)

## Structure table contents in the Others tab

| Subsection | Content |
| :---- | :---- |
| Identifier | The identifier used in the source database |
| Source | Source database of the structural model. |
| Chain | The chain identifier for the protein of interest. A structure may consist of multiple entities (including proteins and nucleic acids) and each copy of an entity is assigned to a chain identifier. |
| Positions | The positions here indicate the sequence used to generate the structural model. |
| Links | Download the structural file. |

## AlphaMissense prediction of genetic variation consequence in the feature viewer

[AlphaMissense](https://alphamissense.hegelab.org/) is a machine-learning derived prediction of the likelihood of a human missense genetic variant being pathogenic (disease-causing) or benign (limited effect). It is a culmination of two types of data, amino acid residue evolutionary conservation and structural context of the residue based on AlphaFold2 predictions.

Pathogenicity scores are calculated per amino acid substitution in a heatmap visualization in the ‘AlphaMissense Pathogenicity’ track of the feature viewer. The higher the score (red), the more likely the variant is predicted to be pathogenic. These scores are then used to calculate an average likely pathogenicity score for each amino acid position within the protein sequence. This can be found in the ‘Average pathogenicity score’ track.

Example: [Q12834](https://www.uniprot.org/uniprotkb/Q12834/feature-viewer)

## See also

[Why are there multiple cross-references to PDB in a UniProtKB entry?](https://www.uniprot.org/help/multiple_pdb_xrefs)  
[How can I retrieve UniProtKB entries that have a PDB 3D structure cross-reference?](https://www.uniprot.org/help/retrieve_3d)  
[Why do some structures only show a portion of the protein sequence?](https://www.uniprot.org/help/structure_subseq)
