---
title: Variant viewer
type: help
categories: disease_phenotypes_variants,manual
---

The variant viewer is a graphical representation of [natural variants](https://www.uniprot.org/help/variant) that are mapped to a protein's amino acid sequence. In addition to the variants that have been expertly curated by the UniProt team, it includes variants from a range of external sources such as [dbSNP](https://www.ncbi.nlm.nih.gov/snp/), [NCBI-TCGA](https://www.cancer.gov/ccg/research/genome-sequencing/tcga), and [gnomAD](https://gnomad.broadinstitute.org/) amongst others. The variant viewer facilitates understanding of the occurrence of natural variants along a protein sequence by providing an overview of all known natural variants in a single graphical view.

## Navigating the variant viewer

The graphical display shows variants mapped along the protein sequence, which can be zoomed using the grey sliders on the sequence residue bar at the top of the display, or by using the looking glass icons. The graphical panel shows all possible amino acid variants, in separate lines, one per amino acid. The color of the variant denotes the variant consequence, shown in the legend on the left of the viewer. 
Variants can be filtered by consequence by selecting and unselecting the consequence categories. Variants can also be filtered by source by selecting or unselecting the provenance filters also on the left of the display. These filters can be used in conjunction with one another to narrow down the variants on the display by both source and consequence. Selecting a coloured dot (variant) on the graphic will highlight the residue position with a vertical yellow bar, allowing visualization of other variants present at the same residue. It will also skip to, and highlight, the variant in the table below the variant viewer graphic, which contains further information.
Below the variant viewer graphic is a table containing further data of each of the variants. Clicking the ‘+’ in the first column of this table will expand the row for that variant and provide more information, including the genomic variant details and associated cross-references. The rest of the columns highlight the amino acid position of the variant, the amino acid change, description of the phenotype, its clinical significance and the source (provenance) of the data.

## Where to find the variant viewer

The variant viewer can be found in the ‘Variant viewer’ tab at the top of a protein entry. 
There is also a link to the variant viewer in the ‘Disease and variants’ section of the protein entry.
If no variants are available for the entry, the tab will be inactive and grayed out, and no link to the variant viewer will be present on the ‘Disease and variants’ section.

## Variants track in the feature viewer

The [feature viewer](https://www.uniprot.org/help/feature_viewer) also contains a variant track including the graphical display from the variant viewer, allowing variants to be filtered by consequence and provenance. Additionally there is a ‘counts’ track which shows the frequency of variants at each particular residue along the protein sequence in the form of a line graph. This allows the identification of regions of high variability within a protein sequence. The feature viewer does not contain a table of variant data unlike the variant viewer. Instead, further information for each variant can be accessed by selecting a variant of interest which will open an associated tooltip. If no variants are available for the entry, the variant track will not be present.

## How to download the data found in the variant viewer

Information found in the feature viewer can be downloaded by using the ‘Download’ option in the top left of the variant viewer window and selecting the dataset ‘Variations (including UniProtKB)’.
Variant data can also be accessed programmatically via the UniProt [Proteins API](https://www.ebi.ac.uk/proteins/api/doc/#!/variation/search) variation endpoint.
