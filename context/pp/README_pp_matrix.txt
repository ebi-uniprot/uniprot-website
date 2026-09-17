Universal Protein Resource (UniProt)
====================================

The Universal Protein Resource (UniProt), a collaboration between the European
Bioinformatics Institute (EBI), the SIB Swiss Institute of Bioinformatics, and
the Protein Information Resource (PIR), is comprised of three databases, each
optimized for different uses. The UniProt Knowledgebase (UniProtKB) is the
central access point for extensively curated protein information, including
function, classification and cross-references. The UniProt Reference Clusters
(UniRef) combine closely related sequences into a single record to speed up
sequence similarity searches. The UniProt Archive (UniParc) is a comprehensive
repository of all protein sequences, consisting only of unique identifiers and
sequences.

Pan Proteomes Matrix
====================

This document describes the structure and content of the Pan Proteome Matrix tsv
files (pp<taxid>_matrix.tsv).

Description
===========

The Pan Proteome matrix is conceptually similar to a gene presence-absence
matrix commonly used in comparative genomics.

In a traditional gene presence-absence matrix:

  Rows represent genes (or gene families)

  Columns represent genomes

  Cells contain binary values(0/1) indicating whether a gene is absent or
present in a genome

The Pan Proteome matrix follows the same overall structure but provides
additional information:

  Rows represent protein clusters (UniParc Identifiers, UPI).
  The rows are labelled with cluster identifiers, which correspond to the UPI of
the selected protein sequence included in the accompanying Pan Proteome FASTA
file.

  Columns represent proteomes (UPIDs) except:
    The first column, "cluster" indicating the row labels
    The second column, "proteomes_count" which indicates the total number of
contributing at least one protein to the cluster.
    All remaining columns are labelled with proteome identifiers, i.e. UPID.

  Cells contain integer counts rather than binary values. Each cell is an
integer with either 0: the proteome does not contribute any protein to the
cluster or a value >=1: the proteome contributes the indicated number of
proteins to the cluster.

Notes:
  Rows are sorted according to the "proteomes_count" value, which directly
relates to the Protein Frequency of the accompanying FASTA file. Clusters
shared by the highest number of clustered proteomes appear at the top of the
matrix.
  Columns are sorted by the total number of selected proteins per
proteome, with proteomes contributing the highest number of selected proteins
appearing in the leftmost columns 

Purpose
=======
The Pan Proteome matrix can be viewed as an extended presence-absence matrix
with quantitative copy-number information and frequency based ordering,
tailored for proteome-level comparative analysis. It can be used to, for
example:
- check the presence or absence of specific clusters across proteomes
- compare any two proteomes to determine which clusters they share
- examine copy number variation of cluster members

Format
======

File type:
   tab-separated values (TSV)
Header (first line):
   first column label is "cluster"
   second column label is "proteomes_count"
   remaining header columns are proteome identifiers (UPIDs)
Rows:
   one cluster per row.
   first column is the cluster identifier (UPI)
   second column is the count of proteomes with at least one protein in the
   cluster
   subsequent columns hold integer counts (0 or positive) that denote how many
   proteins from the corresponding column's proteome are in the cluster

Example
=======

cluster proteomes_count UP000181909     UP001549306     UP000252698     UP001525586     UP001207722     UP001326168       UP001623259
UPI000DF01F15   7       1       1       1       1       1       1       1
UPI000DF01E6B   7       1       1       1       1       1       1       1
UPI000DF01D59   7       1       1       1       1       1       1       1
[...]
UPI0003667A00   1       0       0       0       0       1       0       0
UPI0002AC0EB0   1       0       0       0       0       0       0       1
UPI0001B8830F   1       0       1       0       0       0       0       0

NOTE:
For any UniProt proteome identifier (UPID), the corresponding genome assembly
can be retrieved via the UniProt proteomes portal page. For example the genome
assembly corresponding to UP000181909 can be found in the "Genome assembly and
annotation" section of
   https://www.uniprot.org/proteomes/UP000181909

Versions
========

A Pan Proteome dataset is released concomitant with each UniProtKB release and
the corresponding UniProtKB release number is included in the statistics files
that accompanies each Pan Proteome. Changes in the methodology or in the
structure of the files are documented in the file 'CHANGELOG'.

Limitations
===========

While every effort has been made to ensure accuracy and completeness, the
dataset reflects the quality and diversity of the underlying genome assemblies
and annotations. Some proteins may be fragmented, misannotated, or missing due
to assembly gaps or prediction errors. Furthermore clustering artefacts may have
been introduced by the clustering procedure.

Citation
========

If you use this dataset in published work, please cite the associated
publication as specified in the 'CITATION' file.

Contact
=======
For questions regarding this dataset, please contact:
  https://www.uniprot.org/contact

--------------------------------------------------------------------------------
LICENSE
--------------------------------------------------------------------------------
We have chosen to apply the Creative Commons Attribution (CC BY 4.0) License
(https://creativecommons.org/licenses/by/4.0/) to all copyrightable parts of our
databases.

(c) 2002- UniProt Consortium

--------------------------------------------------------------------------------
DISCLAIMER
--------------------------------------------------------------------------------
We make no warranties regarding the correctness of the data, and disclaim
liability for damages resulting from its use. We cannot provide unrestricted
permission regarding the use of the data, as some data may be covered by patents
or other rights.

Any medical or genetic information is provided for research, educational and
informational purposes only. It is not in any way intended to be used as a
substitute for professional medical advice, diagnosis, treatment or care.
