---
title: Protein names
type: help
categories: Names_and_taxonomy,manual
---

This subsection of the [Names and taxonomy](https://www.uniprot.org/help/names_and_taxonomy_section) section provides an exhaustive list of all names of the protein, from commonly used to obsolete, to allow unambiguous identification of a protein.

This subsection also includes information on the activity of the protein, such as a precise description of the catalytic mechanism of enzymes, or information about individual protein chains or functional domains contained within it, if pertinent.

# UniProtKB/Swiss-Prot 'Protein names' subsection

The subsection consists of 2 categories and several subcategories of protein names and abbreviations. It always begins with the 'Recommended name' ('RecName' in the flat text file). Alternative names are listed under the heading 'Alternative name(s)' ('AltName' in the flat text file).

| Category Field          | Subcategory Field | Cardinality | Description                                                                                                                                                         |
|:------------------------|:------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Recommended name**    |                   | 1           | Full name recommended by the UniProt consortium.                                                                                                                    |
|                         | **Short name(s)** | 0-n         | Abbreviation of the full name or acronym.                                                                                                                           |
|                         | **EC**            | 0-n         | Enzyme Commission number.                                                                                                                                           |
| **Alternative name(s)** |                   | 0-n         | Synonym of the recommended name (full name).                                                                                                                        |
|                         | **Short name(s)** | 0-n         | Abbreviation of the full name or an acronym.                                                                                                                        |
|                         | **EC**            | 0-n         | Enzyme Commission number.                                                                                                                                           |
| **Alternative name(s)** | **Allergen**      | 0-1         | See [Allergen nomenclature and list of entries](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/allergen.txt).                                                                             |
| **Alternative name(s)** | **Biotech**       | 0-1         | Name used in a biotechnological context.                                                                                                                            |
| **Alternative name(s)** | **CD\_antigen**   | 0-n         | See [Human cell differentiation molecules nomenclature and list of entries](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/cdlist.txt).                                                   |
| **Alternative name(s)** | **INN**           | 0-n         | International nonproprietary name: a generic name for a pharmaceutical substance or active pharmaceutical ingredient that is a globally recognized public property. |

If a protein is known to be cleaved into multiple functional components, the description starts with the name of the precursor protein, followed by ' **Cleaved into ...** ' section(s). Each component is described in a separate section. 'Alternative name(s)' are allowed for each individual component.  
Example: [P01189](https://www.uniprot.org/uniprotkb/P01189#names_and_taxonomy) ('Cleaved into the following 11 chains:')

If a protein is known to include multiple functional domains, each of which described by a different name, the description starts with the name of the whole protein, followed by ' **Including** ' section(s). Each domain is described in a separate section. 'Alternative name(s)' are allowed for each individual domain.  
Example: [P27708](https://www.uniprot.org/uniprotkb/P27708#names_and_taxonomy) ('Including the following 3 domains:')

# UniProtKB/TrEMBL 'Protein names' subsection

The format of the 'Protein names' section in UniProtKB/TrEMBL closely follows the format used in UniProtKB/Swiss-Prot. However, as UniProtKB/TrEMBL is not manually annotated, the description is imported directly from the underlying nucleotide entry and its accuracy relies on the information provided by the submitter of the nucleotide entry. This is why UniProtKB/TrEMBL entries usually have ' **Submitted name** ' ('SubName' in the flat text file) instead of 'Recommended name'. There can be more than one 'Submitted name'. 'Submitted names' may later be improved by [automatic annotation](https://www.uniprot.org/help/automatic_annotation) procedures (the label will then change from 'SubName' to 'RecName'), but if not, it remains as provided by the submitter until the entry is manually annotated and integrated to UniProtKB/Swiss-Prot.

# Related documents

[International protein nomenclature guidelines](https://www.uniprot.org/help/international_protein_nomenclature_guidelines)  
[Protein nomenclature information](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/nomlist.txt)  
[Why does the UniProtKB use so many different names for the same protein?](https://www.uniprot.org/help/different_protein_gene_names)
