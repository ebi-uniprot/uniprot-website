---
title: Epitopes
type: help
categories: manual
---

Epitopes are specific, localized regions on an antigen that are recognized by immune cells such as B cells and T cells, helping to facilitate the immune response. 

# 1. UniProt curated epitopes

Epitope regions are expertly curated from experimental evidence found in published literature and annotated on the protein sequence as [Regions](https://www.uniprot.org/help/region). The annotation defines the boundaries of the amino acid sequence that has been experimentally determined to be an epitope, followed by information on antibody and phenotype if available.

Curated epitope data can be found in the protein feature viewer in the ‘Domains’ track under ‘Regions’ and also in the ‘Family and domains’ section of a protein entry. For programmatic download, use the Proteins API [‘Features’](https://www.ebi.ac.uk/proteins/api/doc/#!/features/search)
Example; [C7E9W0](https://www.uniprot.org/uniprotkb/C7E9W0/entry#family_and_domains)

# 2. Epitopes from IEDB

In collaboration with [The Immune Epitope Database](https://www.iedb.org/) (IEDB), UniProt now incorporates data on over 700,000 naturally occurring epitopes from experimental data on antibody and T cell epitope recognition sites. These data are curated by IEDB in the context of infectious disease, allergies, autoimmunity and transplantation from published literature. Only epitopes with a perfect sequence match to a protein's amino acid sequence are imported into UniProt entries (Match score = 100%). Additional details on epitope type and experimental assay are also provided where available.

Epitope data from IEDB is available in the ‘Epitopes’ track in the protein feature viewer ([P15529](https://www.uniprot.org/uniprotkb/P15529/feature-viewer)), and also for programmatic download using the Proteins API, [‘Epitope’](https://www.ebi.ac.uk/proteins/api/doc/index.html#!/epitope/search).
