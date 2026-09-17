---
title: A brief summary of proteomes changes
type: help
categories: Proteomes,Taxonomy,UniProtKB
---

Between releases 2025_04 and 2026_02 UniProtKB and Proteomes underwent a major, phased package of changes due to the implementation of a new [reference protome workflow](https://www.uniprot.org/help/ref_proteomes_workflow). These changes affected how [reference proteomes](https://www.uniprot.org/help/reference_proteome) are selected and also what protein entries are included in [UniProtKB](https://www.uniprot.org/help/uniprotkb).

A comprehensive list of affected protein entries and proteomes is available [here](https://ftp.ebi.ac.uk/pub/contrib/UniProt/proteomes/).

See below a summary of the changes implemented at each release since 2025_04 and how this might have affected user workflows.

## Release 2025_04 
15th October 2025

Changes that were made in this release:

- Removal of taxonomically unclassified proteins\* from UniProtKB.  
- Addition of proteins from new reference proteomes to UniProtKB.

Changes in numbers:

- Removal of 85 million protein entries from UniProtKB that are mainly from taxonomically unclassified species.  
- Addition of 31 million protein entries to UniProtKB, most of which are from new reference proteomes.  
- Resulting in a total decrease in the protein entries found in UniProtKB from 253 million to 199 million.

How this might affect users:

- Taxonomically unclassified proteins that were previously found in UniProtKB can still be accessed in UniParc. In UniParc users can find information such as the protein sequence, gene and protein names, and InterPro signatures etc. UniParc can be searched by protein accession number or proteome identifier, either through the website or programmatically via our [APIs](https://www.uniprot.org/help/programmatic_access), to locate your protein(s) of interest.  
- Addition of novel protein entries to UniProtKB from new reference proteomes.  
- In the weeks leading up to December 2025, users had the opportunity to provide feedback on the changes and express possible concerns about specific entries that are due to be removed from UniProtKB in 2026_02.

## Release 2026_01
28th January 2026

Changes that were made in this release:

- No major changes \- this was to provide time for users to adapt their work to correspond to future changes coming in release 2026_02.

Changes in numbers:

- Very few changes were made to UniProtKB and Proteomes outside of the scope of our usual [release cycle](https://www.uniprot.org/help/synchronization).

How this might affect users:

- There were minimal changes in UniProtKB and Proteomes that will be unlikely to affect users.

## Release 2026_02
10th June 2026

Changes that were made in this release:

- Removal of all remaining non-reference proteome protein entries (except reviewed (Swiss-Prot) or biologically highly relevant protein entries) from UniProtKB.

Changes in numbers:

- Removal of approximately 57 million protein entries, resulting in 150 million protein entries in UniProtKB.

How this might affect users:

- Protein entries that do not belong to a Reference Proteome or that are not considered to be of high biological relevance can still be found in [UniParc](https://www.uniprot.org/uniparc), where users can find some information such as the protein sequence, gene and protein names, InterPro signatures, etc.


\* Taxonomically unclassified entries refer to UniProtKB proteins where the associated species is unspecific, i.e., taxa that do not have a binomial species name (consisting of the genus name and species epithet). For example, both the taxa [Escherichia sp.](https://www.uniprot.org/taxonomy/1884818) (and [its proteomes](https://www.uniprot.org/proteomes?query=%28organism\_id%3A1884818%29)) and [Athelia sp. TMB](https://www.uniprot.org/taxonomy/2748771) (and [its proteome](https://www.uniprot.org/proteomes?query=%28organism\_id%3A2748771%29)) are taxonomically unclassified, whereas the species [Arabis nemorensis](https://www.uniprot.org/taxonomy/586526) is classified.

# Further documentation
For a further explanation of why we are making these changes to UniProt Proteomes please see our blog article: [Capturing the Diversity of Life - Reorganizing the Protein Space in UniProtKB](https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html)

For further help regarding Proteomes please see our related [help pages](https://www.uniprot.org/help?query=proteome) 

# FAQs
## How are bacterial strains being taken into account by the new reference proteome selection workflow?
Proteomes from the categories “Reference”, “Redundant” (now obsolete) and “Other” are analyzed in the new workflow. All strains within these proteomes are considered, and from this pool of proteomes one or a few reference proteomes are selected. UniProt ensures that all species have at least one reference proteome, but it does not ensure that all strains have reference proteomes.

## How would having one reference proteome per species be applied to virus isolates?
Viral reference proteomes are selected based on the International Committee on Taxonomy of Viruses ([ICTV](https://ictv.global/)) which publishes exemplar genomes (well-characterized virus isolates) for each virus species in its Virus Metadata Resource ([VMR](https://ictv.global/vmr)). There are additional non-ICTV-based reference proteomes that are promoted because these are considered biologically relevant as a result of additional UniProt curation considerations.

## How will entries removed by this change be identified in UniParc?
UniProtKB accessions that are part of non-reference proteomes can still be searched within UniParc, where all entries will be kept. Searching in UniProtKB for accessions for removed entries will redirect you to the corresponding UniParc page and the history of this entry will still be available. Inside each UniParc entry additional annotations are added automatically (this is based on [UniFIRE](https://gitlab.ebi.ac.uk/uniprot-public/unifire), a software that uses [UniRule](https://www.uniprot.org/help/unirule) and [ARBA](https://www.uniprot.org/help/arba) to predict annotations).
