---
title: Automatic annotation
type: help
categories: Automatic_annotation,Biocuration,UniProtKB,help
---

UniProt's Automatic Annotation pipeline enhances the unreviewed records in UniProtKB by enriching them with automatic classification and annotation.

# Automatic classification and domain annotation

UniProt uses [InterPro](https://www.ebi.ac.uk/interpro) to classify sequences at superfamily, family and subfamily levels and to predict the occurrence of functional domains and important sites. InterPro integrates predictive models of protein function, so-called 'signatures', from a number of member databases. InterPro matches are automatically annotated to UniProtKB entries as database cross-references with every InterPro release.

In UniProtKB/TrEMBL entries, [domains](https://www.uniprot.org/help/domain) from the InterPro member databases PROSITE, SMART or Pfam are predicted and annotated automatically, and their [evidence/source](https://www.uniprot.org/help/evidences) labels indicate "InterPro annotation".

# Automatic annotation

UniProt has developed two prediction systems, [UniRule](https://www.uniprot.org/help/unirule) and the [Association-Rule-Based Annotator (ARBA)](https://www.uniprot.org/help/arba) to automatically annotate UniProtKB/TrEMBL in an efficient and scalable manner with a high degree of accuracy.

Rules that constitute these two prediction systems can be browsed and queried in dedicated sections of the UniProt website:

-   [UniRule](https://www.uniprot.org/unirule)
-   [ARBA](https://www.uniprot.org/arba)

We also use a suite of [Sequence Analysis Methods (SAM)](https://www.uniprot.org/help/sam) to enrich the unreviewed TrEMBL records in the UniProt Knowledgebase with extra sequence-specific information. Predictions of sequence features such as Signal, Transmembrane and Coil regions are generated using software from external providers.

Since release 2022_04, we also use a new prediction model provided by Google called [ProtNLM](https://www.uniprot.org/help/ProtNLM).
