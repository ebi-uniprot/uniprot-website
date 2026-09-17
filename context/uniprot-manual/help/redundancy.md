---
title: How redundant are the UniProt databases?
type: help
categories: UniParc,UniProtKB,Sequence,UniRef,Biocuration,faq
---

Each of the 3 UniProt databases - UniProtKB (Swiss-Prot and TrEMBL), UniParc and UniRef - are 'non-redundant'. However, the definition of 'redundancy' varies among the 3.

# Summary

Non-redundancy means in:

- UniProtKB/TrEMBL: one record for 100% identical full-length sequences in one species;
- UniProtKB/Swiss-Prot: one record per gene in one species;
- UniParc: one record for 100% identical sequences over the entire length, regardless of the species;
- UniRef100: one record for 100% identical sequences, including fragments, regardless of the species.

# UniProtKB

\- UniProtKB/TrEMBL is 'non-redundant' in the sense that all identical, full-length protein sequences, provided they come from the same species, are represented in a single record. Fragments, isoforms, variants and so on, encoded by the same gene, are stored in separate entries.

\- UniProtKB/Swiss-Prot is 'non-redundant' in the sense that all protein products encoded by one gene in a given species are represented in a single record. This includes alternative splicing isoforms, fragments, genetic variations, sequence conflicts, etc. Differences between sequence reports are analyzed, fully documented and reported in the entry. Cross-references to the original submissions to EMBL-Bank/GenBank/DDBJ databases are kept (see for instance, [Q9BXB7](https://www.uniprot.org/uniprotkb/Q9BXB7/external-links)).

## See also

- [How are protein sequence variety and protein diversity represented in UniProtKB?](https://www.uniprot.org/help/protein_diversity)
- [What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)

## Remarks

- When different genes in the same species give rise to the same protein sequence, they are merged in a single UniProtKB/Swiss-Prot record and the gene names listed in the gene name subsection. See for example the entry for human histone H3.1 ([P68431](https://www.uniprot.org/uniprotkb/P68431#names_and_taxonomy)). However, we tend to demerge many of these entries, and for newly annotated proteins generate separate sequence entries in case of multiple genes coding for identical protein sequences, e.g. [P08409](https://www.uniprot.org/uniprotkb?query=sec_acc:P08409).
- 'Non-redundancy' in UniProtKB/Swiss-Prot implies that identical sequences are represented in a single record. However, if identical protein sequences are produced in different species, they are stored in different records (e.g. [ubiquitin](<https://www.uniprot.org/uniprotkb?query=(uniref_cluster_100:UniRef100_P62975)%20AND%20(reviewed:true)>)).
- Manual annotation in UniProtKB/Swiss-Prot consists of merging all UniProtKB/TrEMBL entries corresponding to protein products encoded by the same gene and documenting all differences. Once the manually annotated UniProtKB/TrEMBL entries are integrated into UniProtKB/Swiss-Prot, they are automatically removed from UniProtKB/TrEMBL. In this sense, Swiss-Prot and TrEMBL are not redundant with one another. However, merging of new UniProtKB/TrEMBL to existing UniProtKB/Swiss-Prot entries is performed manually - at least partially - in order to ensure that all information contained in the UniProtKB/TrEMBL entry is correctly integrated into UniProtKB/Swiss-Prot. For example, additional publications present in the new UniProtKB/TrEMBL entry have to be critically reviewed and the UniProtKB/Swiss-Prot entry updated accordingly. Given this manual curation effort and the increasing amount of protein sequence data from high-throughput cDNA or genome sequencing projects, it is not possible to ensure non-redundancy at this level. Therefore there can be 100% identical sequences for the same species in UniProtKB/Swiss-Prot and UniProtKB/TrEMBL.

# UniParc

[UniParc](https://www.uniprot.org/help/uniparc) is 'non-redundant' in the sense that all identical protein sequences are stored in a single record regardless of the species. Each record is characterized by a unique identifier, [UPI](https://www.uniprot.org/help/uniparc_id). For example, identical ubiquitin sequences from various organisms can be found in UniParc record [UPI00000006C4](https://www.uniprot.org/uniparc/UPI00000006C4).

# UniRef

Three [UniRef](https://www.uniprot.org/help/uniref) databases - UniRef100, UniRef90 and UniRef50 - merge sequences automatically across species.

UniRef100 is 'non-redundant' in the sense that identical sequences and subfragments are presented as a single entry. For example, see the UniRef100 cluster for [ubiquitin](<https://www.uniprot.org/uniref?query=(uniprot_id:P62975)%20AND%20(identity:1.0)>), which contains 100% identical sequences from many different organisms.
