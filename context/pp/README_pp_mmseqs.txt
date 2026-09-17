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

Pan Proteomes MMseqs2 parameters
================================

This document describes the parameters used for clustering the proteomes used
in the creation of the UniProt Pan Proteomes dataset.

Any change in the parameters used will be documented in the file 'CHANGELOG'.

Workflow
========

easy-cluster

Main parameters
===============

--cov-mode 0
--min-seq-id 0.9
-c 0.5
--cluster-mode 0
--seq-id-mode 0
--clust-hash 1
--cluster-version 2
--linclust-version 2

Additional parameters
=====================

--alignment-mode 3
--kmer-per-seq 100
--sub-mat aa:VTML10.out,nucl:nucleotide.out
--seed-sub-mat aa:VTML10.out,nucl:nucleotide.out
-s 7.5
--max-seqs 10000

NOTE: Please refer to MMseqs2 user guide for full details on parameters and
usage: https://mmseqs.com/latest/userguide.pdf

MMseqs2 Version: d45e0c44404715475da3e1f06df6529d4c83e49e

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
