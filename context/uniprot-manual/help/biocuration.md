---
title: Biocuration in UniProt
type: help
categories: Biocuration,Automatic_annotation,UniProtKB,help
---

# Introduction

One of the central activities of the UniProt Consortium is the biocuration of the UniProt Knowledgebase (UniProtKB). Biocuration involves the interpretation and integration of information relevant to biology into a database or resource that enables integration of the scientific literature as well as large data sets. Accurate and comprehensive representation of biological knowledge, as well as easy access to this data for working scientists and a basis for computational analysis, are primary goals of biocuration. In order to respond to the flood of sequencing data, UniProt provides both manual curation and automatic annotation. UniProtKB consists of two sections, UniProtKB/Swiss-Prot and UniProtKB/TrEMBL. The former contains manually reviewed records with annotation extracted from the literature and curator evaluated computational analysis while the latter contains computationally generated records enhanced by automatic classification and annotation.

# UniProt manual curation

Manual curation consists of a critical review of experimental and predicted data for each protein as well as manual verification of each protein sequence. Curation methods applied to UniProtKB/Swiss-Prot include manual extraction and structuring of information from the literature, manual verification of results from computational analyses, mining and integration of large-scale data sets, and continuous updating as new information becomes available.

# See also

-   [How do we manually annotate a UniProtKB entry](https://www.uniprot.org/help/manual_curation)
-   [Standard operating procedure (SOP) for UniProt manual curation](https://github.com/ebi-uniprot/uniprot-manual/raw/main/pdfs/sop_manual_curation.pdf)
-   [Manual curation projects](https://www.uniprot.org/help/?fil=section:biocuration)
-   [Prioritizing curation - how do we decide which UniProtKB entries to manually annotate? (UniProt blog)](https://insideuniprot.blogspot.com/2021/05/)

# UniProt automatic annotation

UniProt has developed two complementary approaches to automatically annotate protein sequences with a high degree of accuracy. [UniRule](https://www.uniprot.org/help/unirule) is a collection of manually curated annotation rules which define annotations that can be propagated based on specific conditions while the [Association-Rule-Based Annotator (ARBA)](https://www.uniprot.org/help/arba) is an automatic decision-tree based rule-generating system. The central components of these approaches are rules based on [InterPro](https://www.ebi.ac.uk/interpro) classification and the manually curated data in UniProtKB/Swiss-Prot. [More...](https://www.uniprot.org/help/automatic_annotation)

# UniProt annotation flow diagram

![UniProt annotation flow diagram](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/annotation.png)
