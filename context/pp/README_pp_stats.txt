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

Pan Proteomes Stats
===================

This document describes the structure and meaning of the fields present in the
Pan Proteome Statistics JSON files (pp<taxid>_stats.json). This README should
be read together with a corresponding JSON file (e.g. pp562/pp562_stats.json)
as it explains the purpose and interpretation of each field and how the values
were derived.

The JSON file includes summary statistics describing:
- the available proteome composition of a species,
- the results of proteome clustering,
- the size of the Pan Proteome,
- Reference Proteome contributions and
- Protein Frequency data.

Top-level section
=================

"schema_version": Schema version for the file structure (e.g. "1.0")
"up_release": UniProtKB release identifier corresponding to the release when
the PP dataset was created (e.g. "2026_01") "species":
    - "tax_id": NCBI taxonomy ID of the species
    - "name": Scientific name of the species
    - "url": UniProtKB taxonomy webpage for the species

Proteomes section
=================

"proteomes":
    - "total_clustered": Total number of proteomes clustered for the species
    - "rp": Number of Reference Proteomes included in the clustering
    - "included_in_pp_fasta": Number of distinct proteomes that appear (named)
      in the PP FASTA (i.e. number of proteomes from which at least one
      representative sequence was selected for inclusion in the PP)
"proteome_sizes_distribution": Summary statistics of proteome sizes
      (protein count per proteome) across the clustered proteomes:
    - min, max, median, mean, 1st and 3rd quartiles

Clustering section
==================

"clustering":
    - "total_proteins": Count of the proteins clustered across all proteomes
    - "clusters":
        - "total": Total clusters
        - "singletons": Number of singleton clusters (clusters having one or
          more proteins coming from a single proteome)
        - "non_singletons": Number of non-singleton clusters

Pan proteome summary section
============================

"pan_proteome":
    - "url": FTP location for the PP subfolder
    - "size": Size of the PP for the species. It corresponds to the number of
      unique clusters as defined by the PP build logic (see explanation under
      main README): all the non-singleton clusters and all singleton clusters
      connected to the RPs. For species with no more than 10 proteomes, all
      clusters are included.
    - "upkb_entries": Number of live UniProtKB entries in the PP fasta file
    - "rp_composition": Per-Reference-Proteome contribution in the PP:
         - "rp_id": Reference proteome identifier (e.g. UP000000625)
         - "rp_url": UniProtKB proteome webpage for the RP
         - "clusters": Number of clusters containing at least one sequence from
           this RP. Note that this may sometimes count proteins no more
           present in the current version of UniProtKB
         - "singleton_clusters": Number of clusters contributed only by this RP
           (no other proteome sharing the cluster)
         - "included_in_pp_fasta": Number of times this RP is named in the PP
           FASTA (i.e. number of PP representative sequences chosen from this
           RP). Because RPs are ranked, this count is expected to decrease
           from the highest-ranked RP to lower-ranked RPs. See section
           "Selection of Representative Sequence" in the main README

    - "protein_frequency_distribution_pct": Summary statistics for PF
      across the clustered proteomes, expressed as percentage:
        - min, max, median, mean, 1st and 3rd quartiles
        - "decile_analysis": PF values sorted and split into ten equal-count
          bins. Each element comprising "bin" (index of the bin), median and
          mean

    - "protein_frequency_histogram": Value-range histogram of PF.
      Each element comprising "range" (PF% range label, e.g. "0-10%", "91-100%")
      and "count" (number of clusters with a PF in that range).
      These are equal-width percentage ranges.

Notes
=====

* Fields containing "_fasta" are tied to the FASTA representation of the PP.
* Under "rp_composition", "clusters" is a membership count (clusters where
  the RP has proteins), whereas "included_in_pp_fasta" is the number of
  clusters for which the representative sequence was chosen from the specified
  RP.

Parsing tips
============

* Treat "schema_version" as the primary compatibility key.
* As per JSON convention, all values not enclosed in double quote characters
  ("") represent numbers, [] indicate arrays (lists) and {} indicate objects.

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
