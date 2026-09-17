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

Pan Proteomes
=============

This directory 'databases/uniprot/current_release/knowledgebase/pan_proteomes'
contains the Pan Proteome data files, which are updated in conjunction with the
UniProt Knowledgebase (UniProtKB) and compiled for species across the three
Domains of life (Archaea, Bacteria and Eukaryota). Their composition may evolve
over time according to the data available at each UniProt release (see section
"Versions" below).

A Pan Proteome represents the complete set of proteins encoded across the
analyzed proteomes, encompassing both conserved (core) proteins shared across 
most proteomes of a species, and variable (accessory) proteins present in only 
a subset. Please see section below "Criteria for selection of the proteomes to
analyse" for further information.

Pan Proteomes = RP proteins (UniProtKB) + selected UniParc proteins

File Structure
==============

The release is organized into subfolders, one for each species, identified by
the species NCBI taxonomy identifier ("taxid"). For example pp562/ subfolder
contains the Pan Proteome files for Escherichia coli.

Under each subfolder three types of files are provided:
1. pp<taxid>.fasta.gz (single representative sequence chosen for each cluster)
2. pp<taxid>_matrix.tsv.gz (presence/absence matrix of clusters and proteomes)
3. pp<taxid>_stats.json (summary statistics about proteomes, clustering and
   selection)

For example under pp562, the following three files are present:
  pp562/pp562.fasta.gz 
  pp562/pp562_matrix.tsv.gz
  pp562/pp562_stats.json

Explanation of the format and content of each file is provided in the
corresponding documentation files, located under this directory:
1. README_pp_fasta
2. README_pp_matrix
3. README_pp_stats

Abbreviations used
==================

- RP: UniProtKB Reference Proteome
  (https://www.uniprot.org/help/reference_proteome)
- PP: UniProt Pan Proteome (https://www.uniprot.org/help/pan_proteomes)
- UPID: Proteome identifier (https://www.uniprot.org/help/proteome_id)
- UPI: UniParc entry identifier (https://www.uniprot.org/help/uniparc)
- PF: Protein Frequency

Protein Frequency (PF) is defined as the percentage of all clustered proteomes,
for a species, that contributes at least one sequence to a given cluster.
PF is calculated as the number of proteomes within a cluster divided by the
total number of clustered proteomes, expressed as a percentage and rounded to
the nearest integer. A PF of 100% indicates clusters shared by all proteomes
analysed.

Criteria for selection of the proteomes to analyse
==================================================

A pan proteome dataset is created for all species having at least three eligible
proteomes. Proteomes are considered not eligible if they are:
- Excluded proteomes (https://www.uniprot.org/help/proteome_exclusion_reasons)
- Malformed proteomes (either derived solely from a non-nuclear
  genome or having a protein count lower than 180)
- Proteomes identified as belonging to pathogen surveillance projects:
  because their genome assemblies are linked to Bio Projects listed in
  NCBI’s Pathogen Detection resource
  (https://ftp.ncbi.nlm.nih.gov/pathogen/Results/BioProject_Hierarchy/latest.bioproject_hierarchy.txt)

Furthermore, the proteomes' taxonomic identifier must be determined at the
species level (it cannot be unspecific or at the genus level,
e.g. Escherichia spp).

Data Generation
===============

For each species, the protein sequences for the considered proteomes were
clustered using the software "MMseqs2" (Steinegger and Soeding, 2017, doi:
10.1038/nbt.3988). The latest set of clustering parameters used is documented
in the accompanying file "README_pp_mmseqs", available under this directory.

For species with an available set of more than 10 proteomes, singleton
clusters (clusters with protein(s) from a single proteome) were removed, unless
the proteomes connected to those clusters were UniProtKB Reference Proteomes.

A single protein sequence was then chosen to represent each of the remaining
clusters, with criteria detailed below (see the next section) and included in a
file in FASTA format (see file 'README_pp_fasta').

For all analysed proteomes and clusters, a matrix has been generated detailing
the number of proteins that each proteome contributes to each of the clusters
(see the file 'README_pp_matrix').

Finally, a file with summary statistics has been provided for each species (see
file 'README_pp_stats').

Selection of Representative Sequence
====================================

For each cluster, a single protein sequence is chosen for inclusion in the FASTA
format file, according to the following hierarchical criteria:

- A UniProtKB entry is preferred over an entry present only in UniParc
- Entries from RP are preferred over nonRP entries (in the order of RP
  preference detailed below)
- A reviewed (Swiss-Prot) entry is preferred over an unreviewed one (TrEMBL)
- A GeneCentric canonical sequence is preferred over an isoform
- Entry with sequence length closest to the mode length of the cluster
- Finally, entries from the earliest created proteomes are preferred

When entries from multiple RP are present in the same clusters, they are chosen
according to the order of RP preference as here detailed:

Proteomes of special community interest identified by our curators and proteomes
identified as type strains - if present for the species - are preferred,
followed by:
- proteomes with the highest number of reviewed entries
- proteomes with the highest BUSCO complete score (see
  https://www.uniprot.org/help/assessing_proteomes)
- earliest created Reference Proteomes (as tiebreaker)

Intended Use
============

This dataset is intended to support comparative proteome analyses and to enable
researchers to investigate proteome diversity, conserved targets, pathogenicity,
gene essentiality, etc.

The Pan Proteome FASTA files provide non-redundant protein sequence sets within
each species. All FASTA headers contain (among other information) a Protein
Frequency value: the percentage of analysed proteomes having a protein in the
same cluster represented by that sequence.

The Pan Proteome matrix files allow comparisons across all proteomes of a
species, identifying not only which clusters are shared by the majority (or
minority) of the available set but exactly how any two proteomes differ.

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
