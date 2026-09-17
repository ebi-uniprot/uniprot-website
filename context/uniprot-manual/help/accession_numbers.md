---
title: Accession
type: help
categories: Entry_information,manual
---

This subsection of the 'Entry information' section provides one or more accession number(s). These are stable identifiers and should be used to cite UniProtKB entries. Upon integration into UniProtKB, each entry is assigned a unique accession number, which is called 'Primary (citable) accession number'.

UniProtKB accession numbers consist of 6 or 10 alphanumerical characters in the format:

| 1           | 2       | 3           | 4           | 5           | 6       | 7       | 8           | 9           | 10      |
|:------------|:--------|:------------|:------------|:------------|:--------|:--------|:------------|:------------|:--------|
| \[O,P,Q\]   | \[0-9\] | \[A-Z,0-9\] | \[A-Z,0-9\] | \[A-Z,0-9\] | \[0-9\] |         |             |             |         |
| \[A-N,R-Z\] | \[0-9\] | \[A-Z\]     | \[A-Z,0-9\] | \[A-Z,0-9\] | \[0-9\] |         |             |             |         |
| \[A-N,R-Z\] | \[0-9\] | \[A-Z\]     | \[A-Z,0-9\] | \[A-Z,0-9\] | \[0-9\] | \[A-Z\] | \[A-Z,0-9\] | \[A-Z,0-9\] | \[0-9\] |

The three patterns can be combined into the following regular expression:

`[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}`


Examples: [A2BC19](https://www.uniprot.org/uniprotkb/A2BC19), [P12345](https://www.uniprot.org/uniprotkb/P12345), [A0A023GPI8](https://www.uniprot.org/uniprotkb/A0A023GPI8)

Entries can have more than one accession number. This can be due to two distinct mechanisms:

-   a\) When two or more entries are merged, the accession numbers from all entries are kept. The first accession number is referred to as the 'Primary (citable) accession number', while the others are referred to as 'Secondary accession numbers'. These are listed in alphanumerical order.

-   b\) If an existing entry is split into two or more entries ('demerged'), new 'primary' accession numbers are attributed to all the split entries while all original accession numbers are retained as 'secondary' accession numbers.

Example: [P29358](https://www.uniprot.org/uniprotkb/P29358) which has been 'demerged' into [P68250](https://www.uniprot.org/uniprotkb/P68250) and [P68251](https://www.uniprot.org/uniprotkb/P68251).

An accession number is only deleted when the entry to which it was assigned has been removed from UniProtKB. The list of deleted accession numbers is stored in the document files [delac\_sp.txt](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/delac_sp.txt) (for the Swiss-Prot section) and [delac\_tr.txt.gz](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/delac_tr.txt.gz) (for the TrEMBL section)

We remind users that they should always use the primary accession number of an entry in any citation and link since it is the only unique stable identifier for an entry.

# Related documents

[Index of UniProtKB secondary accession numbers](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/sec_ac.txt)

[What is the difference between an accession number (AC) and the entry name?](https://www.uniprot.org/help/difference_accession_entryname)

[Why have some UniProtKB accession numbers been deleted? How can I track them?](https://www.uniprot.org/help/deleted_accessions)

[How to link to UniProt entries (UniProtKB, UniParc and UniRef)?](https://www.uniprot.org/help/linking_to_uniprot)
