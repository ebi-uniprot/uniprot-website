---
title: UniParc
type: help
categories: About_UniProt,UniParc,Sequence,Cross-references,help
---

The UniProt Archive (UniParc) is a comprehensive and non-redundant database of protein sequences. These sequences are sourced from public sequence databases, and each unique sequence is stored in a UniParc entry with a stable unique identifier ([UPI](https://www.uniprot.org/help/uniparc_id)). A UPI is never removed, changed or reassigned to a different sequence. In addition to the protein sequence, a UniParc entry contains cross-references to all source database entries in which the sequence exists or existed, with a date range that shows when the sequence was first and last seen in each source entry. In this way UniParc tracks sequence changes in the source databases and archives the history of all changes.

# Content of an entry

The basic information stored within each UniParc entry is the identifier, the sequence, cyclic redundancy check number, source database(s) with accession and version numbers, and a time stamp. If a UniParc entry does not have a cross-reference to a UniProtKB entry, the reason for the exclusion of that sequence from UniProtKB is provided (eg. pseudogene). In addition, each source database accession number is tagged with its status in that database, indicating if the sequence still exists or has been deleted in the source database and cross-references to NCBI GI and taxonomic identifier (TaxID) if appropriate.

# Sequence comparison

Sequences are compared when entering UniParc with all existing sequences. The CRC64 check sum is first calculated and then compared for each sequence. If two sequences have the same CRC64 value, the sequences themselves will then be compared as strings before considering them as identical. A [MD5](https://en.wikipedia.org/wiki/MD5) hash is also available as a sequence checksum, with a reduced risk of hash collision for different sequences.

# Sequence versions

Sequence changes in the source database can be tracked by sequence versions. Some source database provide their own versions while others don't. UniParc does its own internal versioning. Each time a sequence is changed the internal version is incremented by one, making it possible to track sequence changes in all source databases. Sequence versions are kept as part of cross-reference and the history of all changes are kept.

# Database cross-references

A database cross-reference links a protein sequence to its origin database. It contains a source database identifier, a sequence identifier from the source database, a sequence version from source database if any, a UniParc sequence version and whether or not the cross-reference is still active. A new cross-reference is created when a new or updated protein enters UniParc. When a sequence is changed or deleted from a source database, its corresponding cross-reference is marked as deleted. Active cross-reference can be used to directly access the source databases but inactive cross-references can only be used to access sequences archives, such as the [EMBL nucleotide sequence database sequence version archive](https://www.ebi.ac.uk/ena/browser/home), the EMBL nucleotide sequence database stores of its entries in a searchable manner.

# Download

UniProt can be downloaded from 
- [ftp.uniprot.org (USA)](https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/)
- [ftp.ebi.ac.uk (UK)](https://ftp.ebi.ac.uk/pub/databases/uniprot/current_release/uniparc/)
- [ftp.expasy.org (Switzerland)](https://ftp.expasy.org/databases/uniprot/current_release/uniparc/)
 
The UniParc data in xml or fasta format has been split into smaller files for more robust downloads. All files from the corresponding directory need to be downloaded and combined.

# Data sources

Currently UniParc contains protein sequences from the following publicly available databases:

- [EMBL-Bank](https://www.ebi.ac.uk/embl/) / [DDBJ](https://www.ddbj.nig.ac.jp/index-e.html) / [GenBank](https://www.ncbi.nlm.nih.gov/genbank/) nucleotide sequence databases
- [Ensembl](https://www.ensembl.org/)
- [EnsemblGenomes](https://www.ensemblgenomes.org/)
- [EnsemblRapid](https://rapid.ensembl.org/)
- [European Patent Office (EPO)](https://www.epo.org/)
- [FlyBase](https://flybase.org/)
- [H-Invitational Database (H-InvDB)](http://www.h-invitational.jp/)
- [International Protein Index (IPI)](https://www.ebi.ac.uk/IPI/)
- [Japan Patent Office (JPO)](https://www.jpo.go.jp/)
- [Korean Intellectual Property Office (KIPO)](https://www.kipo.go.kr/ko/MainApp.do)
- [Pathosystems Resource Integration Center (PATRIC)](http://patricbrc.org/)
- [Protein Data Bank (PDB)](https://www.wwpdb.org/)
- [Protein Research Foundation (PRF)](https://www.prf.or.jp//index-e.html)
- [RefSeq](https://www.ncbi.nlm.nih.gov/refseq/)
- [Saccharomyces Genome database (SGD)](https://www.yeastgenome.org/)
- [TAIR Arabidopsis thaliana Information Resource](http://www.arabidopsis.org/)
- [The Seed (SEED)](https://theseed.org/wiki/Home_of_the_SEED)
- [TROME](ftp://ftp.isrec.isb-sib.ch/pub/databases/trome)
- [USA Patent Office (USPTO)](https://www.uspto.gov/)
- [UniProtKB/Swiss-Prot, UniProtKB/Swiss-Prot protein isoforms, UniProtKB/TrEMBL](https://www.uniprot.org/uniprot)
- [Vertebrate Genome Annotation database (VEGA)](https://vega.archive.ensembl.org/index.html)
- [WormBase](https://www.wormbase.org/)
- [WormBase ParaSite (WBParaSite)](https://parasite.wormbase.org/index.html)

UniParc also contains and will continue to keep cross-references to the following discontinued databases:

-   IPI
-   PIR
-   PIRARC
-   REMTREMBL
-   UniMES
-   TREMBLNEW
-   TrEMBL\_varsplic
