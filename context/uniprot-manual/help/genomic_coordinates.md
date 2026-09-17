---
title: Genomic coordinates tab
type: help
categories: UniProtKB,manual
---
This tab displays genomic coordinates information for a UniProtKB entry.

## Origin of the data
UniProtKB entries are mainly created from translations of coding sequences (CDS) that are annotated in nucleotide sequence and genome databases. We provide genomic coordinates on the corresponding nucleotide sequences for all UniProtKB entries that have been created based on [Ensembl](https://www.ensembl.org/), [EnsemblGenomes](https://www.ensemblgenomes.org/), [RefSeq](https://www.ncbi.nlm.nih.gov/refseq/) and [WormBase ParaSite (WBParaSite)](https://parasite.wormbase.org/index.html) sequences, and we have started to provide genomic coordinates for reference proteomes imported from the [INSDC](https://www.insdc.org/). Note that some of the reviewed UniProtKB/Swiss-Prot entries that are part of a reference proteome may lack genomic coordinates. This is the case when the protein was either not predicted by a genome annotation pipeline, or when the reviewed sequence differs in some positions from the predicted sequence.

This data is also available from the genomic coordinates endpoint of the Proteins REST API which is one of the [programmatic interfaces offered by UniProt](https://www.uniprot.org/help/programmatic_access).

## Sections of the tab
This tab presents the data described above grouped by gene, showing for each gene some basic information like the chromosome and strand. The isoforms for a gene are listed with their corresponding genomic location and the number of exons. A table shows all exon coordinates and in which isoforms each exon can be found.
