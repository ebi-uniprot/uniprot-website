---
title: Post-translational modification
type: help
categories: PTM_processing,manual
---

# What is a post-translational modification (PTM)?

A post-translational modification is a covalent processing event resulting from a proteolytic cleavage or from the addition of a modifying group to one amino acid. So far, more than 200 PTMs have been characterized. They modulate the function of most eukaryote proteins by altering their activity state, localization, turnover, and interactions with other proteins.

Although proteins can be modified pre-, co- or post-translationally, all protein modifications are generally referred to as PTMs, because a majority of them are made post-translationally, after the protein is folded.

# Types of PTM data

Protein PTM data is added to an entry via various routes. Data from primary literature is curated manually when experimental data support the existence of a PTM on the protein both when a specific amino acid residue is shown as well as when it is not. If studies show further information that is attributed to the PTM, such as the enzyme responsible for the modification this will also be curated. Example; [P35222](https://www.uniprot.org/uniprotkb/P35222/entry#ptm_processing).

PTM data is also imported from large scale studies in a residue-specific manner, such as proteomics datasets. Some of these modified residues are from re-analysed meta-analysis projects which facilitate the import of statistically confident PTM sites. Example; [B9FXV5](https://www.uniprot.org/uniprotkb/B9FXV5/entry#ptm_processing).  
For further information on modified residues from large scale studies please see; [https://www.uniprot.org/help/mod_res_large_scale](https://www.uniprot.org/help/mod_res_large_scale)

Where source databases provide further information on a protein's PTM, links will be provided in the 'PTM/Processing' subsection 'PTM databases'. A full list of cross-referenced databases that provide PTM data is provided [here](https://www.uniprot.org/database?query=PTM%20databases).

Where data indicates that an isoform is post-translationally modified this information will be captured in an isoform-specific manner.

# Where can PTM data be found in UniProt?

PTM data can be found in both the entry page and the feature viewer.

## Protein entry page

Within the protein entry page modified residue information can be found in the '[PTM/Processing](https://www.uniprot.org/uniprotkb/P35222/entry#ptm_processing)' section. Within this section the features table provides an overview of residue-specific PTM's and their source database, which includes both manually curated data (Source - UniProt) and modified residues from large scale data sources (Source – [PRIDE](https://www.ebi.ac.uk/pride/) or [PTMeXchange](https://www.proteomexchange.org/ptmexchange)). Users can filter by source and modification type using the drop-down menus at the top of the features table.

Further information on PTM modifications for the protein entry can be found below the features table under '[Post-translational modification](https://www.uniprot.org/uniprotkb/P35222/entry#ptm_processing)'. This section contains a free-text description of a protein's modified residue status if there is no positional information available, this section will also contain additional information such as if a PTM modifies protein function, or if prior residue modifications are required before a protein can be further modified.

## Feature viewer

The protein entry feature viewer graphically displays a protein’s residue-specific sequence features that users can browse according to type. For reference see our '[Explore a UniProt entry](https://www.uniprot.org/help/explore_uniprotkb_entry)' page.

The PTM track expands to detail the types of PTMs available for a protein entry, such as 'modified residue', 'glycosylation' and 'lipidation' (for example see [P00533](https://www.uniprot.org/uniprotkb/P00533/feature-viewer)). Each modification is displayed in the viewer in its sequence position, and can be selected to expand the tool tip which displays further information for that feature, including details of source evidence. The ‘modified residue (large scale data)’ subtrack features modifications from large scale dataset sources, such as [PRIDE](https://www.ebi.ac.uk/pride/) and [PTMeXchange](https://www.proteomexchange.org/ptmexchange). PTM’s with confidence scoring will be shown by either gold, silver or bronze triangles, PTM’s without confidence scoring will be shown by black triangles. For further information on confidence scoring please see our '[large scale modified residue](https://www.uniprot.org/help/mod_res_large_scale)' help page. 

Modified residues from large scale proteomics datasets are shown in the 'proteomics' track, subtrack 'PTM-containing peptide'. Peptides discovered with modified residues are mapped to their protein sequence position and the modified residue highlighted by a blue bar. Selection of a PTM-containing peptide expands the tool tip which details further information for that peptide, including its peptidoform notation and detailed statistical attributes per dataset. Modified residues found in PTM-containing peptides are also mapped to the 'modified residue (large scale data)' PTM subtrack.

# How to download PTM data?

The data is currently available for download in the [UniProt Proteins API](https://www.ebi.ac.uk/proteins/api/doc/#/) in the Features and Proteomics-ptm subsections. The Proteins API can be used to generate examples of request code in various programming languages that can then be used in your own pipeline to query the database.

## Features

Manually curated data can be accessed using the [Features](https://www.ebi.ac.uk/proteins/api/doc/#/features) section using the multi-faceted search form to filter for PTMs by searching 'categories – PTM' within other search criteria of interest, such as within a protein entry by entering a protein accession ID. Further filtering of PTMs can be performed by using the 'types' search to restrict returned PTMs to categories such as modified residues and disulfide bonds etc (‘types – MOD_RES/DISULFID’). For example see [search results](https://www.ebi.ac.uk/proteins/api/features?offset=0&size=100&accession=P35222&categories=PTM&types=MOD_RES) produced by the multi-faceted search criteria of 'Accession – P35222', 'category – PTM', and 'types – MOD_RES'.

## Proteomics-PTM

Data from large scale studies can also be queried and downloaded via the Proteins API as a result of a multi-faceted search using the [/proteomics-ptm](https://www.ebi.ac.uk/proteins/api/doc/#!/proteomics-ptm/search) feature. This section allows users to generate a search composed of multiple search parameters such as peptide sequence, PTM, confidence score or data source. For example see [search results](https://www.ebi.ac.uk/proteins/api/proteomics-ptm?offset=0&size=100&datasource=PTMeXchange&peptide=DQSSSAPAASARPVSR&ptm=Phosphorylation) produced by the multi-faceted search criteria of 'Datasource - PTMeXchange', 'Peptide - DQSSSAPAASARPVSR' and 'PTM - Phosphorylation'.
