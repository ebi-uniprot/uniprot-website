---
title: Why have some UniProtKB accession numbers been deleted?
type: help
categories: UniProtKB,Entry_information,UniParc,Release,faq
---

An [accession number](https://www.uniprot.org/help/accession_numbers) (AC) is assigned to each protein sequence upon inclusion into UniProtKB. Accession numbers are stable from [release](https://www.uniprot.org/help/synchronization) to release ([What is the difference between an accession number (AC) and the entry name?](https://www.uniprot.org/help/difference_accession_entryname)). It can however happen that a protein sequence (and its corresponding accession number) is deleted from UniProtKB.

Deleted entries in UniProtKB/Swiss-Prot are mostly Open Reading Frames (ORFs) or pseudogenes that have been wrongly predicted to code for proteins.

Most UniProtKB/TrEMBL deletions are due to the deletion of the corresponding coding sequence (CDS) in the source nucleotide sequence databases EMBL-Bank/DDBJ/GenBank as requested by the original submitters, or due to the deletion of the sequence prediction from Ensembl or RefSeq. It occasionally happens that the same data is resubmitted at a later date, and UniProt works closely with EMBL-Bank/DDBJ/GenBank and Ensembl to ensure appropriate tracking of deletions and updates. However this is not always possible. In addition, some protein sequences are recognized by curators to be Open Reading Frames (ORFs) that have been wrongly predicted to code for proteins or to be pseudogenes. When there is enough evidence that these hypothetical proteins are not real, we take the decision to remove them from UniProtKB/TrEMBL.

For UniProtKB/TrEMBL entries from [proteomes](https://www.uniprot.org), there are two deletion reasons: ['proteome exclusion'](https://www.uniprot.org/help/proteome_exclusion_reasons) and 'not part of a [reference proteome](https://www.uniprot.org/help/reference_proteome)'.


# How can I track UniProtKB accessions that have been deleted?

Like all UniProtKB sequences, all protein sequences deleted from UniProtKB can be found in [UniParc](https://www.uniprot.org/help/uniparc). Example: [O00597](https://www.uniprot.org/uniprotkb/O00597) can be found in UniParc, under [UPI000013C29B](https://www.uniprot.org/uniparc/UPI000013C29B) (with the tag 'Active=No').

The history of a deleted entry can be tracked (example: [O00597](https://www.uniprot.org/uniprotkb/O00597?version=%2A)), and previous entry and sequence versions displayed.

Two documents list the deleted accession numbers:

- [delac_sp.txt](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/delac_sp.txt) for deleted ACs in UniProtKB/Swiss-Prot
- [delac_tr.txt.gz](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/delac_tr.txt.gz) for deleted ACs in UniProtKB/TrEMBL

# Deletion reasons

The full list of reasons for UniProtKB/TrEMBL entry deletion can be found here:

| Deletion reason                                                                     |
| ----------------------------------------------------------------------------------- |
| [Deleted from sequence source (EMBL)](https://www.uniprot.org/help/deleted_accessions#deleted_source_embl)       |
| [Deleted from sequence source (TAIR)](https://www.uniprot.org/help/deleted_accessions#deleted_source_tair)       |
| [Deleted from sequence source (SGD)](https://www.uniprot.org/help/deleted_accessions#deleted_source_sgd)         |
| [Deleted from sequence source (ENSEMBL)](https://www.uniprot.org/help/deleted_accessions#deleted_source_ensembl) |
| [Deleted from sequence source (PDB)](https://www.uniprot.org/help/deleted_accessions#deleted_source_pdb)         |
| [Deleted from sequence source (RefSeq)](https://www.uniprot.org/help/deleted_accessions#deleted_source_refseq)   |
| [Deleted from Swiss-Prot](https://www.uniprot.org/help/deleted_accessions#deleted_swiss-prot)                    |
| [Redundant sequence](https://www.uniprot.org/help/deleted_accessions#redundant_sequence)                         |
| [Excluded proteome](https://www.uniprot.org/help/deleted_accessions#excluded_proteome)                           |
| [Over-represented sequence](https://www.uniprot.org/help/deleted_accessions#over-represented_sequence)           |
| [Not part of a reference proteome](https://www.uniprot.org/help/deleted_accessions#not-part-of-a-reference-proteome)           |

<h2 id="deleted_source_embl">Deleted from sequence source (EMBL)</h2>

The sequence has been deleted from its source, in this case EMBL.

<h2 id="deleted_source_tair">Deleted from sequence source (TAIR)</h2>

The sequence has been deleted from its source, in this case TAIR.

<h2 id="deleted_source_sgd">Deleted from sequence source (SGD)</h2>

The sequence has been deleted from its source, in this case SGD.

<h2 id="deleted_source_ensembl">Deleted from sequence source (ENSEMBL)</h2>

The sequence has been deleted from its source, in this case ENSEMBL.

<h2 id="deleted_source_pdb">Deleted from sequence source (PDB)</h2>

The sequence has been deleted from its source, in this case PDB.

<h2 id="deleted_source_refseq">Deleted from sequence source (RefSeq)</h2>

The sequence has been deleted from its source, in this case RefSeq.

<h2 id="deleted_swiss-prot">Deleted from Swiss-Prot</h2>

The entry has been deleted from UniProtKB reviewed / Swiss-Prot

<h2 id="redundant_sequence">Redundant sequence</h2>

The entry has been deleted because its sequence is redundant. Further details can be found in the help page about [redundancy](https://www.uniprot.org/help/redundancy) in UniProtKB.

<h2 id="excluded_proteome">Excluded proteome</h2>

An excluded proteome is deemed unsuitable to be retained in UniProtKB, and its entries are deleted. Further details can be found in the [help page about excluded proteome help](https://www.uniprot.org/help/proteome_exclusion_reasons).

<h2 id="over-represented_sequence">Over-represented sequence</h2>

Over-represented sequences mean that we have too many instances of a protein in UniProtKB. One example would be SARS-CoV-2, where we initially, after the outbreak of the pandemic, created UniProtKB entries for all submitted SARS-CoV-2 sequences. This has caused an over-representation, and thus most of the redundant proteins have later been deleted.

<h2 id="not-part-of-a-reference-proteome">Not part of a reference-proteome</h2>

The entry has been deleted because it is not part of a reference proteome. UniProtKB is undergoing a change where it will be composed of entries from reference proteomes, and other proteins of biological interest.  For further details regarding this change please see our [‘quick summary of proteomes changes’](https://www.uniprot.org/help/refprot_only_changes) page.

# See also

- [What are UniProtKB's criteria for defining a CDS as a protein?](https://www.uniprot.org/help/cds_protein_definition)
- [Does UniProtKB contain all protein sequences?](https://www.uniprot.org/help/uniprotkb_coverage)
- [Why do we keep dubious sequences in UniProtKB? How to discard them from a protein set?](https://www.uniprot.org/help/dubious_sequences)
- [How frequently is UniProt released? What is the synchronization delay with other databases?](https://www.uniprot.org/help/synchronization)
- [Accession number](https://www.uniprot.org/help/accession_numbers)
