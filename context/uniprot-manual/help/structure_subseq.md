---
title: Why do some structures only show a portion of the protein sequence?
type: help
categories: UniProtKB,3D_structure,Text_search,faq
---

In some cases, the structure may only include a segment of the protein sequence, in complex with ligands or other proteins. <br>
Example: [P00734](https://www.uniprot.org/uniprotkb/P00734/entry#structure) is complexed with multiple inhibitors: [1A2C](https://www.rcsb.org/structure/1A2C), [1A3B](https://www.rcsb.org/structure/1A3B), [1A3E](https://www.rcsb.org/structure/1A3E) and [1A46](https://www.rcsb.org/structure/1A46). 

It is also possible that only a small subsequence was resolved in the structure, limited by the experimental method or/and the construct used to determine the structure. <br>
Example: [Q99959](https://www.uniprot.org/uniprotkb/Q99959/entry#structure) [3TT9](https://www.rcsb.org/structure/3TT9).

For each structure the sequence coverage is shown in two locations:
- In the [structure section](https://www.uniprot.org/help/structure_section) of the protein entry. Example: [Q9H165](https://www.uniprot.org/uniprotkb/Q9H165/entry#structure)
- In the protein feature viewer [‘PDBe 3D structural coverage'](https://www.uniprot.org/help/structure_section#structure-coverage) track. Example: [Q9H165](https://www.uniprot.org/uniprotkb/Q9H165/feature-viewer)


Multiple experimentally determined structures may be available for one protein (see the [PDB cross-reference help page](https://www.uniprot.org/help/multiple_pdb_xrefs)). These structures may cover different ranges of the sequence.
Positions annotated in the [Structure section](https://www.uniprot.org/help/structure_section) of the entry refer to the protein sequence of the construct used to determine the structure. This can be longer than the observable sequence in the structure. It is useful to check the sequence coverage of different structures in the ‘PDBe 3D structure coverage’ track of the protein feature viewer to see if the sequence of interest is included in the structure.<br>
Example: [Q9H165](https://www.uniprot.org/uniprotkb/Q9H165/feature-viewer).

For more information, please see [‘Structural annotation in UniProt’](https://www.uniprot.org/help/structure_section).
