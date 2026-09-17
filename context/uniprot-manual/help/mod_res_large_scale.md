---
title: Large scale modified residue
type: help
categories: PTM_processing
---

# Modified residues from large scale data

In addition to manually curated [post-translational modification](https://www.uniprot.org/help/post-translational_modification) (PTM) data which is included in the downloadable versions of our data, some entries on our website also include additional large-scale PTM data. These originate from large-scale mass spectrometry (MS) datasets, which have been reanalyzed.

Example: [B9FXV5](https://www.uniprot.org/uniprotkb/B9FXV5/entry#ptm_processing)

## Where does the data come from?

The data comes from a refined set of large-scale enriched PTM (e.g. phosphorylation) proteomics datasets publicly available in the [PRIDE database](https://www.ebi.ac.uk/pride/) or the wider [ProteomeXchange](https://proteomecentral.proteomexchange.org/) Consortium of proteomics resources. The links to each source dataset can be found in the expandable “evidence tag” section for each PTM, next to the protein modification name in the ‘Description’ column of the table. In addition, links to PeptideAtlas species-specific PTM builds are also available.

The data originates from two collaborative projects:

*PRIDE project:*
Human large-scale PTM data has been imported as part of a project from a reanalysed dataset ([PXD012174](https://www.ebi.ac.uk/pride/archive/projects/PXD012174)) combining multiple large-scale phosphoproteomics studies. This project aimed to map the human phosphoproteome from publicly available phosphorylation-enriched MS-based proteomics datasets in the PRIDE database. Data from multiple datasets was reanalysed in tandem and filtered for a confidence of &lt;1% site-based false discovery rate, and a greater than 75% localization probability. The data includes both tissues and cell lines derived from 'healthy' and 'disease' states. For detailed methodology see [The functional landscape of the human phosphoproteome.](https://www.nature.com/articles/s41587-019-0344-3)

*PTMeXchange project:*
Data for rice and other model organisms originates from large-scale MS datasets, which have been reanalyzed via the [PTMeXchange project](https://www.proteomexchange.org/ptmexchange). This project facilitates confident identification of PTM sites across multiple datasets. The confidence score reflects the strength of the evidence for PTMs at that site. For detailed methodology see  [Method for Independent Estimation of the False Localization Rate for Phosphoproteomics](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.1c00827).

## Evidence

These are proteomics datasets submitted to [PRIDE](https://www.ebi.ac.uk/pride/), for example in support of studies performed by the group generating the data. We include links to these, so that the full data provenance is clear. MS raw data from these sources has been re-processed, and thus data processing such as identification or quantification analysis carried out in the original study has been disregarded. Studies are listed by dataset ID (ProteomeXchange ID, PXD ID, e.g. [PXD004939](https://www.ebi.ac.uk/pride/archive/projects/PXD004939)). A single PTM may have supporting data in multiple datasets.

## Which species is large-scale data available for?

For an up to date list of datasets that are available on UniProt as well as datasets that are currently in progress see the [PTMeXchange project](https://www.proteomexchange.org/ptmexchange/index.html) web pages.

# How can I access this data in UniProt?

The data is viewable in multiple formats, via the [UniProt Proteins API (Proteomics PTM section)](https://www.ebi.ac.uk/proteins/api/doc/), the [protein entry page](https://www.uniprot.org/help/explore_uniprotkb_entry) under section [PTM/Processing](https://www.uniprot.org/help/ptm_processing_section) (e.g. [B9FXV5](https://www.uniprot.org/uniprotkb/B9FXV5/entry#ptm_processing)) and in the interactive Feature Viewer. Links to original source proteomics datasets in [PRIDE](https://www.ebi.ac.uk/pride/) are provided for users to explore the data in more detail. 

## How can I download this data?

The data is currently available for download in the [UniProt Proteins API](https://www.ebi.ac.uk/proteins/api/doc/#/) in the Proteomics-ptm subsection. All proteomic PTM data for an entry can be downloaded using the [/proteomics-ptm/{accession}](https://www.ebi.ac.uk/proteins/api/doc/#!/proteomics-ptm/getByAccession) feature. For example see results from the [B9FXV5](https://ebi.ac.uk/proteins/api/proteomics-ptm/B9FXV5) entry accession search.

Data can also be queried and downloaded via the Proteins API as a result of a multi-faceted search using the [/proteomics-ptm](https://www.ebi.ac.uk/proteins/api/doc/#!/proteomics-ptm/search) feature. This section allows users to generate a search composed of multiple search parameters such as peptide sequence, PTM, confidence score or data source. For example see [search results](https://www.ebi.ac.uk/proteins/api/proteomics-ptm?offset=0&size=100&datasource=PTMeXchange&peptide=DQSSSAPAASARPVSR&ptm=Phosphorylation) produced by the multi-faceted search criteria of 'Datasource - PTMeXchange', 'Peptide - DQSSSAPAASARPVSR' and 'PTM - Phosphorylation'.

Alternatively the Proteins API can be used to generate examples of request code in various programming languages that can then be used in your own pipeline to query the database.

# What is a peptidoform?

A "peptidoform" is the exact peptide sequence, including the position of the protein modifications, which can be identified in one particular Peptide Spectrum Match (PSM). It derives from the term ‘proteoform’, which represents the same concept for protein sequences (PMID: [23443629](https://pubmed.ncbi.nlm.nih.gov/23443629/)). In this context the ‘Peptidoform’ will describe the biologically-occurring modifications present in a peptide. Additionally in the ‘PTM statistical attributes’ section ‘[Experimental Peptidoform](https://www.uniprot.org/help/mod_res_large_scale#experimental_peptidoform)’ will describe all modifications present in a peptide, including experiment-induced artefactual modifications.


# Scoring and statistical analysis for PTM’s imported from the PTMeXchange project.


## Confidence score


### How is the score calculated?

Source MS data have been re-processed with strict statistical control at the level of the peptide and at the level of site localization, using "decoy" amino acids to verify and control for incorrect identification of modification sites, using methods described in the paper: [Method for Independent Estimation of the False Localization Rate for Phosphoproteomics](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.1c00827).

Observed PTM sites are ranked by a probability of detection, calculated as follows. The pipeline first models the probability _p1_ that a peptide sequence with modifications (peptidoform) has been identified, then creates an orthogonal probability _p2_, that the exact site has been correctly localized on the peptide. The “final probability” is derived by multiplying _p1_ by _p2_. Sites are ranked by final probability and then thresholded by site-level false discovery rate (or false localization rate, FLR). The FLR is calculated by summing the matches to decoy amino acids in the ranked list (modelling false positives), normalizing for the ratio of occurrence of the decoy amino acid (phospho Ala) to target amino acids (Ser, Thr and Tyr for phosphorylation), and dividing by the count of rows (for target amino acids). Results per dataset are then thresholded at 1% and 5% FLR. Meta-analysis and final classification is determined by the simple Gold/Silver/Bronze criteria, as described below.


### What is the gold/silver/bronze criterion?

A modified residue is classified into three categories based on its false localization rate (FLR) across multiple datasets. This does not reflect its biological relevance or significance.

|              |                                                                                        |
| :----------: | :------------------------------------------------------------------------------------: |
| **Category** |                                      **Criteria**                                      |
|     Gold     |                      Identified in _n_ or more datasets at ≤1% FLR                     |
|    Silver    |       Identified in at least _m_ datasets, but less than _n_ datasets at ≤1% FLR       |
|    Bronze    | Identified in one or more datasets at ≤5% FLR, but not meeting Silver or Gold criteria |

For small builds e.g. &lt;20 datasets, m=1, and n=2, i.e. a site must have been observed with high confidence in at least 2 datasets to qualify as Gold standard. For larger builds, e.g. up to 100 datasets, the values of n and m are estimated empirically, by counting hits to decoy amino acids after merging, to ensure that final FLR within the Gold set is &lt;1% and Silver &lt;~3%. 

Some modified residues will not have a confidence score as they have been imported from a source separate to the PTMeXchange project.

## Statistical attributes

Statistics are listed by dataset identifier (PXD ID) and then by modified residue.

### PSM (Peptide Spectrum Match) count

The PSM count details the number of spectra collected that match the exact peptidoform, with a threshold cut off of 5% FLR.

### Site probability

Observed PTM sites are ranked by a probability of detection, calculated as follows. The pipeline first models the probability _p1_ that a peptide sequence with modifications (peptidoform) has been identified, then creates an orthogonal probability _p2_, that the exact site has been correctly localized on the peptide. The final “site probability” is derived by multiplying _p1_ by _p2_.

### Universal Spectrum Identifier (USI) 

The concept of Universal Spectrum Identifier (USI) is described in this [publication](https://www.nature.com/articles/s41592-021-01184-6). The USI allows a single mass spectrum, and optionally the corresponding peptidoform interpretation, to be unambiguously described, and then resolved across multiple ProteomeXchange databases, for public datasets.

### Experimental Peptidoform

An ‘Experimental Peptidoform’ describes biologically occurring PTMs as well as artefactual modifications which can be identified in one particular Peptide Spectrum Match (PSM) using [ProForma notation](https://github.com/HUPO-PSI/ProForma). Artefactual modifications are non-endogenously occurring modifications that are typically introduced during sample handling and MS analysis (e.g. carbamydo-methylation of Cysteine (see ubiquitinated Lys85 in the PTM-containing peptide track of [P49841](https://www.uniprot.org/uniprotkb/P49841/feature-viewer)). Each modification is linked to a unique [UNIMOD](https://www.unimod.org/modifications_list.php?a=return) identifier that describes the modification in a controlled format.
