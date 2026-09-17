---
title: What are proteomes?
type: help
categories: Proteomes,UniProtKB,Keywords,Sequence,faq
---

UniProt provides [proteome](https://www.uniprot.org/proteomes) sets of proteins whose genomes have been completely sequenced.

# What is a proteome?

A proteome is the set of proteins thought to be expressed by an organism. The majority of the UniProt proteomes are based on the translation of a sequenced genome, and will normally include sequences that derive from extra-chromosomal elements such as plasmids or organellar genomes in organisms where these occur. Some proteomes may also include protein sequences based on high quality cDNAs that cannot be mapped to the current genome assembly due to sequencing errors or gaps. These are only included in the proteome following manual review of the supporting evidence, including careful analysis of homologous sequences from closely related organisms.

As more and more genomes of the same organism are being sequenced, we introduced [unique proteome identifiers](https://www.uniprot.org/help/proteome_id) to distinguish individual proteomes from the same [taxonomy identifier](https://www.uniprot.org/help/taxonomic_identifier).

# What is the curation status of UniProt proteomes?

UniProt proteomes may include both manually reviewed (UniProtKB/Swiss-Prot) and unreviewed (UniProtKB/TrEMBL) entries. The proportion of reviewed entries varies between proteomes, and is obviously greater for the proteomes of intensively curated model organisms: some proteomes, such as [_Escherichia coli_ strain K12](https://www.uniprot.org/uniprotkb?query=proteome:UP000000625) consist entirely of reviewed entries. Curation is a continuing process, and proteomes are updated in a regular manner as new information becomes available: pseudogenes and other dubious uncharacterized ORFs may be removed, other newly identified and characterized sequences may be added.

# What is the source of the sequences for proteomes?

The majority of UniProt proteomes are based on translations of genome sequence submissions to the International Nucleotide Sequence Database Consortium ([INSDC](https://www.insdc.org/)).

Complementary pipelines for import of protein sequences have been developed in collaboration with [Ensembl](https://www.ensembl.org/) for vertebrate species, [Ensembl Genomes](https://ensemblgenomes.org/) for non-vertebrate species, [WormBase ParaSite](https://parasite.wormbase.org/index.html) for parasitic nematodes and [VectorBase](https://www.vectorbase.org/) for pathogen vector genomes. In addition, a pipeline imports selected non-redundant genomes annotated by NCBI [RefSeq](https://www.ncbi.nlm.nih.gov/refseq/). These sources provide proteome sequences for a number of key genomes of special interest where the INSDC submission is lacking gene model annotation. Both INSDC and non-INSDC derived proteomes link back to the source via the assembly and annotation sections respectively.
<br>
Example: GCS_000005845 from ENA/EMBL in [UP000005640](https://www.uniprot.org/proteomes/UP000005640).

As the above-mentioned pipelines cover organisms for which we already have some sequences in UniProtKB, these existing sequences have to be reconciled with those imported. The procedure works in the following way:

- Sequences from non-INSDC genomes are first mapped to their UniProtKB counterparts under stringent conditions, requiring 100% identity over 100% of the length of the two sequences. These entries are flagged as part of the proteome (i.e. linked to "Proteomes" via the proteome identifier) and updated with an Ensembl/EnsemblGenomes/WormBase/VectorBase/RefSeq cross-reference.

- Non-INSDC genomic sequences that are absent from UniProtKB are imported into UniProtKB/TrEMBL. These entries are flagged as part of the proteome and have a cross-reference to the appropriate resource.

- All other UniProtKB/Swiss-Prot entries within the proteome that do not map to these non-INSDC genomes are flagged as part of the proteome.

Therefore, a proteome is formed from all UniProtKB/Swiss-Prot entries (irrespective of whether they map to non-INSDC annotated genomes) plus those UniProtKB/TrEMBL entries mapping to the non-INSDC resource for that proteome. Some proteomes are not present in UniProtKB, however their protein sequences are present in [UniParc](https://www.uniprot.org/help/uniparc).

To date these pipelines have been used to populate UniProtKB with additional sequences for the human proteome, major model organisms and other species of special interest (see headline [Complete proteomes for _Homo sapiens_ and _Mus musculus_](https://www.uniprot.org/release-notes/2011-05-03-release)).

## See also

- [Where do the UniProtKB protein sequences come from?](https://www.uniprot.org/help/sequence_origin)

# Which sequenced genomes are available as proteomes at UniProt?

The [Proteomes](https://www.uniprot.org/proteomes/) resource offers protein sequence sets obtained from the translation of completely sequenced genomes. Published genomes from [INSDC](https://www.insdc.org/) are brought into UniProt if they satisfy the following criteria:

- The genome is annotated and a set of coding sequences is available;
- The taxonomy or bioproject is imported, and is not considered ineligible for import;
- The proteome has to have nuclear genome components.

Protein sequences that are part of reference proteomes can be found in UniProtKB (and also in UniParc), whilst protein sequences from non-reference proteomes and excluded proteomes can be found only in UniParc. 

## See also

- [How frequently is UniProt released? What is the synchronization delay with other databases?](https://www.uniprot.org/help/synchronization)

# How to retrieve proteomes?

Proteomes can be retrieved via the [Proteomes](https://www.uniprot.org/proteomes) section of the UniProt website, which provides download links for various formats.

Alternatively, all entries that form a proteome, can be retrieved from UniProtKB by searching for the [proteome identifier](https://www.uniprot.org/help/proteome_id) in the `proteome` field. A proteome identifier uniquely identifies the set of proteins corresponding to a single assembly of a completely sequenced genome.

For example, to retrieve the proteome for _Escherichia coli_ (strain K12), the required query would be:

- Query: [proteome:UP000000625](https://www.uniprot.org/uniprotkb?query=proteome:UP000000625)

Please note that there may be several proteomes per [taxonomic identifier](https://www.uniprot.org/help/taxonomic_identifier). The taxonomic identifier can be used to query the `taxonomy` field or the `organism` field, together with the cross-reference to "Proteomes". This will result in the retrieval of all proteome sequences at or below the taxonomic rank specified by the identifier. For example, to retrieve the proteome for _Escherichia coli_ (strain K12) and all proteomes at lower taxonomic nodes (substrains such as _Escherichia coli_ (strain K12 / DH10B)), then the required query would be:

- Query: [taxonomy_name:"Escherichia coli (strain K12)"](https://www.uniprot.org/proteomes?query=%28taxonomy_name%3A%22Escherichia%20coli%20%28strain%20K12%29%22%29)

# How can I download proteomes?

Our [FTP server](https://www.uniprot.org/downloads) allows the download of precomputed [data sets for reference proteomes](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/reference_proteomes/README), based on a gene-centric perspective. For each reference proteome, protein FASTA files (composed of canonical and additional sequences), gene mapping files, Coding DNA Sequence (CDS) FASTA files and database mapping files are available. It may be advisable to prefer an FTP download of these precomputed sets over the HTTP download of query results on the website, because HTTP streams for large datasets tend to fail after a while due to packet loss.

To download the results of a text search in UniProtKB:

- Click the **Download** button
- Choose the download format

To download your favorite proteomes programmatically, you can do so using [our APIs](https://www.uniprot.org/help/programmatic_access).

Note that the download formats which describe complete UniProtKB entries (text, XML, RDF/XML) include only the ['canonical'](https://www.uniprot.org/help/canonical_and_isoforms) or displayed protein sequences of UniProtKB entries. These canonical sequences can also be downloaded in FASTA format (option `FASTA (canonical)`), as can a set of protein sequences including both canonical and manually reviewed 'isoform sequences' from UniProtKB/Swiss-Prot (where available) using the option `FASTA (canonical & isoform)`.

# See also

- [What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)
- [What are reference proteomes?](https://www.uniprot.org/help/reference_proteome)
- [UniProt's human proteome?](https://www.uniprot.org/help/human_proteome)
- [How to retrieve sets of UniProtKB protein sequences?](https://www.uniprot.org/help/retrieve_sets)
- [Reducing proteome redundancy](https://www.uniprot.org/help/proteome_redundancy)
- [REST API - Access the UniProt website programmatically](https://www.uniprot.org/help/api)
- [Sequences](https://www.uniprot.org/help/sequences)
- [Alternative products](https://www.uniprot.org/help/alternative_products)
- [Alternative sequence](https://www.uniprot.org/help/var_seq)
