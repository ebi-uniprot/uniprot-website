---
title: Binary interactions
type: help
categories: Interaction,manual
---

This subsection of the '[Interaction](https://www.uniprot.org/help/interaction_section)' section provides information about binary protein-protein interactions. The data presented in this section are a quality-filtered subset of binary interactions automatically derived from the [IntAct database](https://www.ebi.ac.uk/intact/). It is updated at every [UniProt release](https://www.uniprot.org/help/synchronization).

# Binary interaction plot

This is a graphical plot representation of the binary interactions available for a protein. The first entry name (in bold) on the X- and Y-axis of the plot is the selected protein entry, and a circle indicates an interaction with a partner protein. The darker the circle the more experimental evidence is available to support that interaction. Interactions between partner proteins are also shown on the graphic. Selecting an interaction circle will open a tooltip containing further information on the interaction, including UniProtKB accession numbers and links to the IntAct database.
The plot can be filtered by subcellular location and/or disease if data is available.

For usability reasons, the binary interaction plot will not be available if there are more than 50 binary interactions for the selected protein entry.

# Binary interaction table

Interactions with the displayed protein, or with one of its isoforms or proteolytic products, are shown in the table:

- Type - this describes the type of interaction. ‘Binary’ is a one-to-one interaction between proteins within the same species. ‘Xeno’ is a one-to-one relationship between proteins of different species. If there are multiple types of interaction data available, a drop down box will allow filtering. 

- Entry 1 - reports the UniProtKB accession number of the protein entry of interest. Where isoform-specific data is available, the [identifier for that isoform](https://www.uniprot.org/help/alternative_products) will be stated - typically the accession number followed with a dash and a number. Example: [P04150](https://www.uniprot.org/uniprotkb/P04150/entry#interaction).
If there are multiple isoforms with interaction data available, a drop down box will allow filtering. Where proteolytic cleavage production-specific information is available the unique [PRO identifier](https://www.uniprot.org/help/sequence_annotation#feature-identifiers) will be stated for that protein product, filterable in the drop down box using the category ‘Other’. Example: [P05067](https://www.uniprot.org/uniprotkb/P05067/entry#interaction).
- Entry 2 - reports the gene name and the UniProtKB accession number of the interacting protein. If the interaction partner is a specific isoform or a product of proteolytic cleavage, this information includes the isoform name and identifier, or the peptide/chain name and identifier. Example: [Q8WUM4](https://www.uniprot.org/uniprotkb/Q8WUM4/entry#interaction)
- Number of experiments -  indicates the number of experiments in the IntAct database which support the interaction.
- IntAct - contains the Interactor IDs of the two interacting proteins. Clicking on this link will open the relevant IntAct page for this interaction.

Homotypic interactions are indicated by the gene name and UniProtKB accession number of the entry in the 'Entry 2' column.
Example: [P62258](https://www.uniprot.org/uniprotkb/P62258#interaction).

UniProtKB 'Binary interactions' are automatically derived from the IntAct database, and represent [a filtered subset of the binary interactions found in IntAct](https://www.uniprot.org/help/binary_interactions_import). The complete IntAct dataset can be accessed using the link in the 'Cross-references' section.
Example: [P51617](https://www.uniprot.org/uniprotkb/P51617/external-links) 'Protein-protein interaction databases' section.

More examples: [Q8T4F7](https://www.uniprot.org/uniprotkb/Q8T4F7#interaction), [P02829](https://www.uniprot.org/uniprotkb/P02829#interaction), [O43521](https://www.uniprot.org/uniprotkb/O43521#interaction), [Q07817](https://www.uniprot.org/uniprotkb/Q07817#interaction)

# Related documents

[Why are only a subset of binary interactions from the IntAct database reported in UniProtKB?](https://www.uniprot.org/help/binary_interactions_import)  
[Subunit structure - information about the protein quaternary structure and interaction(s) with other proteins or protein complexes](https://www.uniprot.org/help/subunit_structure)
