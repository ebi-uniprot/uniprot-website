---
title: Entry name
type: help
categories: Entry_information,manual
---

This subsection of the 'Entry information' section provides a mnemonic identifier for a UniProtKB entry, but it is not a stable identifier. Each reviewed entry is assigned a unique entry name upon integration into UniProtKB/Swiss-Prot.

# UniProtKB/Swiss-Prot entry name

The UniProtKB/Swiss-Prot entry name consists of up to 11 uppercase alphanumeric characters with a naming convention that can be symbolized as X_Y, where:

- X is a mnemonic protein identification code of at most 5 alphanumeric characters;
- The '\_' sign serves as a separator;
- Y is a mnemonic species identification code of at most 5 alphanumeric characters.

The mnemonic code 'X' is an abbreviation of the protein/gene name, which does not necessarily correspond to the recommended protein name or to the gene name.

Examples:

| Code(X) | Recommended protein name | Gene name |
| :------ | :----------------------- | :-------- |
| B2MG    | Beta-2-microglobulin     | B2M       |
| HBA     | Hemoglobin subunit alpha | HBA1      |
| INS     | Insulin                  | INS       |
| CAD17   | Cadherin-17              | CDH17     |

Whenever possible, we assign the same mnemonic code for orthologous proteins (even if the gene name is not the same).

For multigene families, we assign consistent protein name abbreviations and add a numerical discriminator (see for instance [INS_HUMAN](https://www.uniprot.org/uniprotkb/P01308#entry_information), [INS1_MOUSE](https://www.uniprot.org/uniprotkb/P01325#entry_information) and [INS2_MOUSE](https://www.uniprot.org/uniprotkb/P01326#entry_information)) or a letter (see for instance [CHST9](https://www.uniprot.org/uniprotkb/Q7L1S5#entry_information), [CHSTA](https://www.uniprot.org/uniprotkb/O43529#entry_information) and [CHSTB](https://www.uniprot.org/uniprotkb/Q9NPF2#entry_information)) at the end of the code.

The mnemonic code 'Y' identifies the organism which is the biological source of the protein. It is generally composed of the first three letters of its genus name and the first two letters of its species name.

Examples: PSEPU is for Pseudomonas putida and NAJNI is for Naja nivea.

However, for a number of species commonly encountered in UniProtKB, we use self-explanatory codes.

There are 16 of those codes:

- BOVIN for Bovine
- CHICK for Chicken
- ECOLI for _Escherichia coli_
- HORSE for Horse
- HUMAN for _Homo sapiens_
- MAIZE for Maize (_Zea mays_)
- MOUSE for Mouse
- PEA for Garden pea (_Pisum sativum_)
- PIG for Pig
- RABIT for Rabbit
- RAT for Rat
- SHEEP for Sheep
- SOYBN for Soybean (_Glycine max_)
- TOBAC for Common tobacco (_Nicotina tabacum_)
- WHEAT for Wheat (_Triticum aestivum_)
- YEAST for Baker's yeast (_Saccharomyces cerevisiae_)

Since the above rules cannot apply to viruses, we give them arbitrary, but generally easy-to-remember, identification codes.

The names of all the currently defined species identification codes are listed in the document ['Controlled vocabulary of species'](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/speclist.txt).

# UniProtKB/TrEMBL entry names

The UniProtKB/TrEMBL entry name consists of up to 16 uppercase alphanumeric characters with a naming convention similar to that of UniProtKB/Swiss-Prot, where:

- X is identical to the [accession number](https://www.uniprot.org/help/accession_numbers) of the entry and consists of 6 or 10 alphanumeric characters;
- The '\_' sign serves as a separator;
- Y is a mnemonic species identification code of at most 5 alphanumeric characters.

Since it is impossible to manually assign organism codes to all species represented in UniProtKB/TrEMBL, 'virtual' codes have been defined that group organisms at a certain taxonomic level. Such codes are prefixed by the number '9' and generally correspond to a 'pool' of organisms, which can be as wide as a kingdom. Here are some examples of such codes:

| Mnemomnic code | Taxonomic identifier | Scope         |
| :------------- | :------------------- | :------------ |
| 9BACT          | 2                    | Bacteria      |
| 9CNID          | 6073                 | Cnidaria      |
| 9FUNG          | 4751                 | Fungi         |
| 9REOV          | 10880                | Reoviridae    |
| 9TETR          | 32523                | Tetrapoda     |
| 9VIRI          | 33090                | Viridiplantae |

The 'virtual' codes are listed in the document [Controlled vocabulary of species](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/speclist.txt)

## Important tip

The entry name is a useful mnemonic means of identifying a sequence, but, unlike the [accession number](https://www.uniprot.org/help/accession_numbers), it is not a stable identifier. It is sometimes necessary, for reasons of consistency, to change the entry name (for instance to ensure that related entries have similar names or when a UniProtKB/TrEMBL entry is integrated into UniProtKB/Swiss-Prot). We remind users that they should **always use the primary accession number** of an entry in any citation and link since it is the only unique stable identifier for an entry.  
An 'entry name tracker' tool is included in the UniProt website search engine. It allows the tracking of UniProtKB entry names that are no longer in use.

# Related documents

- [Controlled vocabulary of species](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/speclist.txt)
- [What is the difference between an accession number (AC) and the entry name?](https://www.uniprot.org/help/difference_accession_entryname)
