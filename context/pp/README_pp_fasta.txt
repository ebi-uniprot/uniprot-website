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

Pan Proteomes FASTA
===================

This document describes the format and content of the Pan Proteome FASTA files
(pp<taxid>.fasta). The examples shown are taken from the 2026_02 version of the
PP FASTA file for E.coli (pp562/pp562.fasta).

Content
=======

Each file contains one representative entry per cluster in FASTA
format (https://en.wikipedia.org/wiki/FASTA_format). 
Each entry in a file consists of two lines.
The first line is a "header", indicated by a leading greater-than
character (">") followed by information describing the entry (explained in the
next section).
The header occupies a single line.
The second line, immediately following the header, contains the
amino acid sequence, with one letter representing each amino acid:

>header1
sequence1
>header2
sequence2

The rationale for choosing the representative sequence for each cluster is
described in the main README file.

Entries correspond to either UniProtKB or UniParc records, with preference
given to UniProtKB entries when available.

Structure of the headers
========================
This section describes FASTA headers for UniProt Pan Proteome entries.
See also https://www.uniprot.org/help/fasta-headers.

Each header contains a set of minimal information common to all entries.
Additional information is present for those UniProtKB entries which are part of
the Pan Proteome. Square brackets [ ] indicate additional fields that only
appear in the headers of UniProtKB entries. The presence of these additional
fields is also indicated by the semicolon ";" character.

General header format:
>ppIdentifier|UniparcIdentifier ProteinFrequency ProteomeIdentifier SourceIdentifier OX=OrganismIdentifier OS=OrganismName [ ; db|EntryAccession|EntryName ProteinName GN=GeneName PE=ProteinExistence SV=SequenceVersion ]

Example:
>pp562|UPI0000138ECA 79% UP000000625 AAC75106 OX=83333 OS=Escherichia coli str. K-12 sub str. MG1655 ; sp|P71242|WCAK_ECOLI Colanic acid biosynthesis protein WcaK GN=wcaK PE=3 SV=2


Field descriptions:

ppIdentifier: pan proteome identifier, in the format "pp<taxid>", matching the
              filename and the subfolder where the file is located, e.g. "pp562"
              for E.coli, where 562 (taxid) is the species taxon identifier

UniparcIdentifier: unique identifier of a UniParc entry (UPI); together with the
                   ppIdentifier, it identifies the Pan Proteome cluster

ProteinFrequency: percentage of all clustered proteomes that contain at least  
                  one sequence in the cluster represented by this entry

ProteomeIdentifier: identifier of the proteome containing the displayed sequence
                    (UPID) https://www.uniprot.org/help/proteome_id

SourceIdentifier: protein identifier of the entry in the source genomic
                  database (ENA, Ensembl or RefSeq)

OrganismIdentifier: taxonomy identifier of the proteome's source organism
                    (https://www.uniprot.org/help/taxonomic_identifier)

OrganismName: scientific name of the proteome's source organism/strain

db: database code, 'sp' for UniProtKB/Swiss-Prot and 'tr' for UniProtKB/TrEMBL

EntryAccession: primary accession number of the UniProtKB entry
                (https://www.uniprot.org/help/accession_numbers)

EntryName: UniProtKB entry name (https://www.uniprot.org/help/entry_name)

ProteinName: the recommended name of the UniProtKB entry
             (https://www.uniprot.org/help/protein_names)

GN (GeneName): the first gene name of the UniProtKB entry
               (https://www.uniprot.org/help/gene_name)

PE (ProteinExistence): numerical value describing the evidence for the
                       existence of the protein
                       (https://www.uniprot.org/help/protein_existence)
 
SV (SequenceVersion): version number of the displayed sequence
                      (https://www.uniprot.org/help/entry_history)


Filtering by Protein Frequency
=================================

A simple Python script, named filter_pp_fasta.py, is provided in the same
location as the present document.
It can be used to filter a Pan Proteome FASTA file so as to retain (in the
specified output file) only those entries which have a Protein Frequency (PF)
equal or greater than a desired threshold.
This can be useful if one wishes to analyze only those clusters with sequences
contributed by the majority of the proteomes, the so-called "core".

An example call could be:

filter_pp_fasta.py -i pp562.fasta -o pp562_90pct.fasta -m 90

which would create an output file "pp562_90pct.fasta" containing only those entries
marked with PF >= 90%

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
to assembly gaps or prediction errors. Furthermore, clustering artefacts may
have been introduced by the clustering procedure.

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
