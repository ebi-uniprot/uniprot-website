---
title: On what basis are literature references inserted in UniProtKB/Swiss-Prot entries?
type: help
categories: UniProtKB,Publications,Biocuration,faq
---

One of our primary source of protein knowledge are journal articles. Information on a given protein is often spread between many different reports. All relevant references used by the annotators to create or update an entry are generally added. This includes references dealing with sequences, structures, protein-protein interactions, post-translational modifications, subcellular locations, functions, etc.

Reviews are read, especially in the case of extensively studied proteins in order to select the relevant references, but usually not cited, as the UniProtKB/Swiss-Prot relevant information is retrieved from the original publications, which in turn are cited in the appropriate entry. This is particularly important to make sure that the experimental data are reported in the species in which the experiments were performed.

Specialized papers on chromosome location, genetics, gene regulation are usually not included.

Each time a journal article is added, we list the extracted information in the 'RP line' (flat file format) or 'cited for' subsection.

See for example: [P02768](https://www.uniprot.org/uniprotkb/P02768/publications).

In the flat file format, these are some of the scopes of the references in the P02768 entry:

    RP   NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 1), AND VARIANT LYS-420.
        ...
        RP   NUCLEOTIDE SEQUENCE [GENOMIC DNA].
        ...
        RP   NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORMS 1 AND 2).
        ...
        RP   NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA].
        ...
        RP   PROTEIN SEQUENCE OF 25-609.
        ...
        RP   PROTEIN SEQUENCE OF 45-65; 118-130; 169-183; 348-372; 397-413 AND 509-543, AND MASS SPECTROMETRY.
        ...
        RP   PROTEIN SEQUENCE OF 222-229, AND ASPIRIN-ACETYLATION AT LYS-223.
        ...
        RP   DISULFIDE BONDS.
        RP   BILIRUBIN-BINDING SITE.
        RP   GLYCATION AT LYS-223 AND LYS-549.
        ...
        RP   X-RAY CRYSTALLOGRAPHY (6.0 ANGSTROMS).
        RP   X-RAY CRYSTALLOGRAPHY (4.0 ANGSTROMS).
        RP   X-RAY CRYSTALLOGRAPHY (2.8 ANGSTROMS).
        RP   ERRATUM.
        ...
        RP   VARIANT CANTERBURY ASN-337.
        RP   VARIANTS NASKAPI/MERSIN GLU-396 AND MEXICO GLY-574.
        ...
        RP   CHARACTERIZATION OF VARIANT REDHILL.
        RP   VARIANTS VARESE HIS-23; TORINO LYS-84 AND VIBO VALENTIA LYS-106.
        ...
        RP   VARIANT TYR-73, AND MASS SPECTROMETRY.
        RP   CHARACTERIZATION OF VARIANT KENITRA.

In order to keep up with the explosive growth of literature and to give our users access to additional publications, we decided to integrate additional sources of literature from other annotated databases into UniProtKB, such as Entrez Gene (GeneRIFs), SGD, MGI, GAD and PDB. This additional bibliography is available from the 'Publications' section, e.g. [P03875](https://www.uniprot.org/uniprotkb/P03875/publications).

If you see that a (or your) publication is missing, do not hesitate to [contact us](https://www.uniprot.org/contact).

# Query UniProtKB

UniProtKB entries containing a given publication can be searched by the title or abstract content, author name, journal abbreviation, year of publication, PubMed ID and DOI (query 'Literature citation').

Example: \[Kuopio ischaemic heart disease risk factor study\](https://www.uniprot.org/uniprotkb?query=citation%3A(%22Kuopio+ischaemic+heart+disease+risk+factor+study%22)

Publications cited in UniProtKB can be searched by their title or abstract content, author name, journal abbreviation, year of publication, PubMed ID and DOI on [https://www.uniprot.org/citations/](https://www.uniprot.org/citations/).

Example: [Kuopio ischaemic heart disease risk factor study](https://www.uniprot.org/citations/?query=%22Kuopio+ischaemic+heart+disease+risk+factor+study%22)

# See also

- [How do we manually annotate a UniProtKB entry?](https://www.uniprot.org/help/manual_curation)
- [References](https://www.uniprot.org/help/publications_section)
