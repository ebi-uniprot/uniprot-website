---
title: Why does the UniProtKB use so many different names for the same protein?
type: help
categories: UniProtKB,Nomenclature,Names_and_taxonomy,Biocuration,faq
---

Ambiguities regarding gene/protein names are a major problem in the literature and in the sequence databases which tend to propagate the confusion. As administrators of UniProt we feel that we can play a major role in standardization of protein nomenclature.

We try to attribute a recommended name to all the proteins of UniProtKB/Swiss-Prot, following as far as possible the [International protein nomenclature guidelines](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/International_Protein_Nomenclature_Guidelines.pdf).

We have however to be as exhaustive as possible and to also list synonym names (alternative names) for a given protein. These alternative names are manually added if they are found in publication or other databases, including the EMBL database. This is essential for protein sequence retrieval and tracking.

The protein name always starts with the recommended name of the protein. Alternative names are indicated. Example: [P08758](https://www.uniprot.org/uniprotkb/P08758#names_and_taxonomy)

    Recommended name:  Annexin A5
    Alternative names: Anchorin CII
                       Annexin V
                       Annexin-5
                       Calphobindin I
                           Short name: CBP-I
                       Endonexin II
                       Lipocortin V
                       Placental anticoagulant protein 4
                           Short name: PP4
                       Placental anticoagulant protein I
                           Short name: PAP-I
                       Thromboplastin inhibitor
                       Vascular anticoagulant-alpha;
                           Short name: VAC-alpha

The format of the protein name in UniProtKB/TrEMBL follows closely the format used in UniProtKB/Swiss-Prot. However, as UniProtKB/TrEMBL is not manually annotated, the description is derived directly from the underlying nucleotide entry and its accuracy relies on the information provided by the submitter of the nucleotide entry. It is why UniProtKB/TrEMBL entries usually have 'Submitted name' instead of a 'Recommended name'. The description may later be improved by automatic annotation procedures but if not, it remains as provided by the submitter until the entry is manually annotated and added to UniProtKB/Swiss-Prot.

# Protein isoform name

Given that for most genes there is no accepted, standardized nomenclature that covers all individual isoforms, our policy is to identify them using simple numbering, beginning with isoform 1. Example: [Q15406](https://www.uniprot.org/uniprotkb/Q15406#sequences)

When a comprehensive nomenclature does exist for all isoforms, then this will be applied. Example: [P04150](https://www.uniprot.org/uniprotkb/P04150#sequences)

In either case all isoform-specific synonyms used in the literature will also be recorded, in order to facilitate the identification of specific isoform sequences by users. Example: [P08235](https://www.uniprot.org/uniprotkb/P08235#sequences)

# See also

-   [Protein names](https://www.uniprot.org/help/protein_names)
