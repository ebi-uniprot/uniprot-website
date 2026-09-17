---
title: What is UniProt's human proteome?
type: help
categories: Proteomes,Download,UniProtKB,Keywords,Sequence,Human,faq
---

In 2008, the first draft of the complete [human](https://www.uniprot.org/proteomes/UP000005640) (Homo sapiens) [proteome](https://www.uniprot.org/help/proteomes_manual) was released in UniProtKB/Swiss-Prot with approximately 20,000 putative human protein-coding genes, each represented by one UniProtKB/Swiss-Prot entry. The human proteome is assigned the unique [proteome identifier](https://www.uniprot.org/help/proteome_id): [UP000005640](https://www.uniprot.org/proteomes/UP000005640).

The UniProtKB/Swiss-Prot human proteome contains one representative ([canonical](https://www.uniprot.org/help/canonical_and_isoforms)) protein sequence, and therefore one [reviewed/Swiss-Prot](https://www.uniprot.org/help/uniprotkb_sections) protein entry, for each known protein-coding gene. Additionally, many of these entries contain manually annotated alternative [isoforms](https://www.uniprot.org/help/canonical_and_isoforms). There is also a large set of unreviewed/TrEMBL protein entries that are part of the human proteome. These entries represent additional predicted isoform sequences, but potentially also add redundancy.

# How is the human proteome selected?

UniProt’s human proteome is a [reference proteome](https://www.uniprot.org/help/reference_proteome). Reference proteomes provide broad coverage of the tree of life and are considered ‘landmarks’ in the proteome space.

The proteins in the human proteome are derived from the [translation of coding sequences (CDS)](https://www.uniprot.org/help/sequence_origin) from the GRCh38 [Ensembl](http://www.ensembl.org/Homo_sapiens/Info/Annotation) genome assembly.


As part of every UniProt [release cycle](https://www.uniprot.org/help/synchronization), updates are made to the UniProt Proteomes resource which means that the number of protein entries that constitutes the human proteome may change between releases. Additionally updates to the source genome assembly will also affect protein entry numbers. <br>
Entries continuously undergo manual review and update, which can result in the merging of entries that were originally thought to be encoded by two separate genes, but were later shown to derive from a single gene. Entries may also be deleted when there is evidence for [erroneous translation](https://www.uniprot.org/help/dubious_sequences) from a pseudogene. [Dubious sequences](https://www.uniprot.org/help/dubious_sequences) are retained in UniProtKB until there is enough evidence to decide whether we should delete them.

When referring to a specific version of a proteome, please reference the identifier ([UPID](https://www.uniprot.org/help/proteome_id)) of that proteome and the release number at the time of download. 
Example: UP000005640, release 2026_01.

# Accessing human proteome data

Each proteome has its own page within the UniProt [Proteomes resource](https://www.uniprot.org/proteomes). The [human proteome](https://www.uniprot.org/proteomes/UP000005640) page contains key proteome-identifying information, download options and a brief description of Homo sapiens. For further help on how to navigate the Proteomes resource, please see our ‘[Explore proteomes](https://www.uniprot.org/help/explore_proteomes)’ help page.

Our [FTP server](https://www.uniprot.org/downloads) allows download of expanded FASTA sets, containing both the canonical and manually reviewed isoform sequences, for a selection of the most widely used proteomes, including human.

Below are website queries to retrieve different human protein entry sets. In order to download the query results, please read ['How to retrieve sets of UniProtKB protein sequences?'](https://www.uniprot.org/help/retrieve_sets)

To access all protein entries for the human proteome, both reviewed and unreviewed, search: [proteome:up000005640](https://www.uniprot.org/uniprotkb?query=proteome%3Aup000005640). This query retrieves all reviewed/Swiss-Prot human proteome entries plus additional unreviewed/TrEMBL entries representing novel isoforms. To download the protein sequences for the full human proteome from this page, including the additional isoforms curated in the reviewed/Swiss-Prot entries, click ‘Download’ and select the option ‘Download all’, then select ‘FASTA (canonical & isoform)’  in the ‘Format’ drop down menu.

To return only reviewed/Swiss-Prot protein entries for the human proteome, search: [(proteome:up000005640) AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=%28proteome%3Aup000005640%29+AND+%28reviewed%3Atrue%29)

To access reviewed/Swiss-Prot protein entries that also contain manually annotated isoforms, search: [(proteome:UP000005640) AND (cc_ap:*) AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=%28proteome%3AUP000005640%29+AND+%28cc_ap%3A*%29+AND+%28reviewed%3Atrue%29)

To retrieve human protein entries that are not part of the reference proteome, search: [(organism_id:9606) NOT (proteome:UP000005640)](https://www.uniprot.org/uniprotkb?query=%28organism_id%3A9606%29+NOT+%28proteome%3Aup000005640%29). These entries are not considered part of the proteome due to reasons including but not restricted to: the protein sequence does not map to the reference genome, or the sequence is not identical to any isoform sequences predicted by Ensembl. The reviewed/Swiss-Prot entries that do not map to the reference proteome are either a result of [direct protein sequencing](https://www.uniprot.org/keywords/KW-0903) methods or are rearranged [immunoglobulins](https://www.uniprot.org/help/immunoglobulins) resulting from V(D)J recombination.


# See also

- [What are proteomes?](https://www.uniprot.org/help/proteome)
- [What are reference proteomes?](https://www.uniprot.org/help/reference_proteome)
- [How to retrieve sets of UniProtKB protein sequences?](https://www.uniprot.org/help/retrieve_sets)
- [Alternative products](https://www.uniprot.org/help/alternative_products)
- [Alternative sequence](https://www.uniprot.org/help/var_seq)
