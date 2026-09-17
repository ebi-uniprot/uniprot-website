---
title: Mass spectrometry-based proteomics data in UniProtKB
type: help
categories: help
---

Data from high-throughput proteomics experiments constitute a rich potential source of annotations for UniProtKB, providing supporting evidence for the existence of specific protein isoforms and post-translational modifications. However, a number of challenges exist for integrating high-throughput proteomics data in UniProtKB. Publications and dataset reports from proteomics experiments exhibit highly variable levels of quality and reliability. This is due to the heterogeneity of proteomics experimental protocols on one side, and to the computational and interpretational stringency of results on the other side. UniProt runs two expert-driven analysis pipelines to map selected mass spectrometry-based proteomics data to UniProtKB sequences, taking into account experimental and predicted sequence annotations from UniProtKB/Swiss-Prot, including isoform differences, sequence processing events and natural variants. The peptides that have been identified by proteomics experiments may map to protein sequences originating from different genes. We use only peptides that map uniquely to one or several protein isoforms from a single gene for UniProtKB annotations.

The pipelines are re-run at every [UniProt release](https://www.uniprot.org/help/synchronization) to take into account new and modified sequences in UniProtKB.

# 1. Data from public mass spectrometry-based proteomics resources

UniProt has developed a pipeline to analyze data sets from selected public mass spectrometry-based proteomics resources (currently [PeptideAtlas](https://peptideatlas.org/)). These resources provide tools for processing sequence and spectral data from publicly deposited proteomics experiments and UniProt bioinformaticians with expertise in proteomics work collaboratively with them to identify high-quality peptides, using well-defined quality metrics, that are then extracted by the pipeline and mapped to UniProtKB sequences.  
An unreviewed UniProtKB (TrEMBL) entry whose gene is uniquely identified by a peptide is annotated with the keyword [Proteomics identification](https://www.uniprot.org/keywords/KW-1267), and the [Protein existence level](https://www.uniprot.org/help/protein_existence) is set to 'Experimental evidence at protein level'.

Because this pipeline is not based on data curated from the scientific literature, it is not used to annotate reviewed UniProtKB (Swiss-Prot) entries, but the mappings for all UniProtKB entries can be [downloaded](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/) from the UniProt FTP site, and they are shown in the 'Proteomics' track of the [protein feature viewer](https://www.uniprot.org/help/feature_viewer) in UniProtKB entries. The 'Unique peptide' track shows peptides that are uniquely mapped to that protein, conversely the 'Non-unique peptide' track contains peptides that map to this protein as well as others within the species.

UniProtKB entries also cross-reference the proteomics resources that are used by our pipeline. These cross-reference are compiled by these resources and may include links to peptides that map to several genes. For this reason and different update cycles it is possible that a UniProtKB entry has cross-references to a proteomics resource, but is not annotated with the keyword [Proteomics identification](https://www.uniprot.org/keywords/KW-1267) and vice-versa.

# 2. Mass spectrometry-based proteomics data from the scientific literature

UniProt has also developed a pipeline for the integration of proteomics data in UniProtKB that is used to process data from the scientific literature that meets the criteria for UniProt manual curation. Curators with expertise in proteomics evaluate first whether a publication of interest is compliant with the [MIAPE](https://www.psidev.info/miape) (Minimum Information About a Proteomics Experiment) standard for reporting proteomics experiments, providing access to the raw data and the associated metadata. The relevance of the scientific articles and the methods used, such as the precision of the instruments, the peptide identification software used, the selection cut-off values and the post-processing methods are also reviewed. After this evaluation step, the pipeline extracts the experimental peptide sequences and metadata from the publication, filters the peptides according to the criteria given by the curator and maps them to UniProtKB sequences. The pipeline also checks the biological relevance of PTMs (e.g. a phosphorylation site should not be located in a transmembrane region). The UniProtKB entries that are annotated by this pipeline cite the publication from which the data was extracted with scopes such as

    IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]
    CLEAVAGE OF SIGNAL PEPTIDE [LARGE SCALE ANALYSIS] AFTER LEU-27
    PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-37 AND SER-438

and the [Protein existence level](https://www.uniprot.org/help/protein_existence) is set to 'Experimental evidence at protein level'. PTM annotations are attributed the evidence [Combined sources](https://www.uniprot.org/help/evidences#ECO:0007744) (e.g. [Modified residues](https://www.uniprot.org/uniprotkb?query=%28%28ft_mod_res%3A%2A%29%20AND%20%28ftev_mod_res%3AECO_0007744%29%29), [Cross-links](https://www.uniprot.org/uniprotkb?query=%28%28ft_crosslnk%3A%2A%29%20AND%20%28ftev_crosslnk%3AECO_0007744%29%29), [Signal](https://www.uniprot.org/uniprotkb?query=%28%28ft_signal%3A%2A%29%20AND%20%28ftev_signal%3AECO_0007744%29%29), [Initiator methionine](https://www.uniprot.org/uniprotkb?query=%28%28ft_init_met%3A%2A%29%20AND%20%28ftev_init_met%3AECO_0007744%29%29), [Transit peptide](https://www.uniprot.org/uniprotkb?query=%28%28ft_transit%3A%2A%29%20AND%20%28ftev_transit%3AECO_0007744%29%29) etc).

# 3. Human Proteome Project

The [HUPO Human Proteome Project (HPP)](https://hupo.org/human-proteome-project) aims to provide mass spectrometry (MS) evidence for the existence of each protein in the human proteome. MS-based proteomic data deposited 
into proteomeXchange databases is reprocessed and scored by the [PeptideAtlas](https://peptideatlas.org/) [Trans-Proteomics Pipeline](https://tppms.systemsbiology.net/) and used by UniProt to verify the existence of each protein, 
meeting the stringency described by the HPP 3.0 guidelines described in; [Human Proteome Project Mass Spectrometry Data Interpretation Guideline 3.0](https://pubs.acs.org/doi/10.1021/acs.jproteome.9b00542). All proteins 
identified by the qualifying number of unique peptides of a set minimum length are annotated with the keyword [‘proteomics identification’](https://www.uniprot.org/keywords/KW-1267), and the protein existence level is set
to [‘experimental evidence at protein level’](https://www.uniprot.org/help/protein_existence).

HPP data can be found in the feature viewer Proteomics track under ‘Human proteome project’, example [Q9BXU3](https://www.uniprot.org/uniprotkb/Q9BXU3/feature-viewer). For programmatic download use the UniProt Proteins 
API, Proteomics, [‘Human proteome project’](https://www.ebi.ac.uk/proteins/api/doc/#!/hpp/search_0).

# 4. Post-translational modification (PTM) data derived from large scale mass spectrometry (MS) datasets

UniProt also facilitates the curation of post-translation modification enriched large scale proteomics datasets, this data is imported into both SwissProt and TrEMBL entries, however does not affect protein evidence values or keywords. Post-translational modified peptide data is available to view in the PTM/Processing section of protein entry pages and in the feature viewer under 'PTM modified residue (large scale data)' and 'Proteomics PTM-containing peptides'.

As part of the collaborative [PTMeXchange project](https://www.proteomexchange.org/ptmexchange/index.html), large-scale PTM-enriched MS-based proteomics datasets that are publicly available in the [PRIDE](https://www.ebi.ac.uk/pride/) database or the wider [ProteomeXchange Consortium](https://proteomecentral.proteomexchange.org/) of proteomic resources are reanalyzed and imported into UniProt. Focusing so far on the PTM's found in model organisms the project facilitates the identification and confidence scoring of PTM sites across multiple datasets. The confidence score reflects the strength of evidence for each modification at that site. Also, as a key feature, it is possible to trace back this information to the original MS evidence stored in PRIDE/ProteomeXchange.

An additional reanalysed dataset combining multiple large-scale phosphoproteomics studies has been imported into human UniProt entries. This project aimed to map the human phosphoproteome from publicly available phosphorylation-enriched MS-based proteomics datasets in the PRIDE database. Data from multiple datasets was reanalysed in tandem and filtered for confidence, the data includes both tissues and cell lines derived from 'healthy' and 'disease' states.

For further information see the [Large scale modified residue](https://www.uniprot.org/help/mod_res_large_scale) help page.
