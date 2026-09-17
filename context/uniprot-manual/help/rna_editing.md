---
title: RNA editing
type: help
categories: Sequence,manual
---

# Where can RNA editing data be found in UniProt?

RNA editing data can be found in both the protein entry page and the feature viewer.

## Protein entry page

Within the protein entry page RNA editing information can be found in the 'Sequence' section under the 'RNA editing' subsection as well as the the 'Disease/Phenotypes and variants' section under the 'Natural variant' subsection.

The 'RNA editing' subsection provides information relevant to all types of RNA editing events (conversion, insertion, deletion of nucleotides) that lead to one or more amino acid changes compared to the translation of the non-edited RNA version.

For RNA editing leading to conversion, we list the positions of the edited codons in the order of appearance in the protein sequence.

Optional free text information may be provided to convey more information relevant to the RNA editing process or to the effect of the edition on the protein function.

Examples: [Q31796](https://www.uniprot.org/uniprotkb/Q31796#sequences), [P21359](https://www.uniprot.org/uniprotkb/P21359/entry#sequences), [P04114](https://www.uniprot.org/uniprotkb/P04114#sequences)

For RNA editing leading to insertion or deletion, the information is provided, but not described precisely as they result in major sequence changes.  
Example: [Q07434](https://www.uniprot.org/uniprotkb/Q07434#sequences)

When the mRNA sequence is fully edited, the [canonical protein sequence](https://www.uniprot.org/help/canonical_and_isoforms) displayed by default in the entry corresponds to the translation of the edited mRNA.
For partially edited mRNAs, the translation is that of the genomic DNA and the amino acid changes are listed in the 'Natural variant' subsection. The Natural variant subsection includes both manually curated RNA editing data  (Source - UniProt) as well as large-scale RNA editing data that has been imported from REDIportal, a comprehensive database of A-to-I RNA editing events (Source - [REDIportal](http://srv00.recas.ba.infn.it/atlas/)).

Examples: [P62952](https://www.uniprot.org/uniprotkb/P62952/entry#disease_variants), [Q8N1G4](https://www.uniprot.org/uniprotkb/Q8N1G4/entry#disease_variants)

Manually curated RNA editing events listed in the '[Natural variant](https://www.uniprot.org/help/variant)' subsection include validated human variants from the NCBI [dbSNP](https://www.ncbi.nlm.nih.gov/snp/) database that are annotated and tagged with the dbSNP identifier in the 'Description' field.  
Example: [P28335](https://www.uniprot.org/uniprotkb/P28335/entry#disease_variants)

For human proteins, we are also providing RNA editing events that have been imported from REDIportal, a comprehensive large scale database of A-to-I RNA editing events. REDIportal presents a collection of RNA editing events in humans with A-to-I events detected in body tissues by RNAseq experiments.  
Example: [Q9HCC6](https://www.uniprot.org/uniprotkb/Q9HCC6/entry#disease_variants)

We do not describe silent editing events.

Related keyword: [RNA editing](https://www.uniprot.org/keywords/KW-0691)

## Feature Viewer

The protein entry feature viewer graphically displays a protein’s residue-specific sequence features that users can browse according to type. For reference see our '[Explore a UniProt entry](https://www.uniprot.org/help/explore_uniprotkb_entry)' page.

For human proteins, the RNA editing track expands to feature RNA editing events imported from the large scale dataset resource [REDIportal](http://srv00.recas.ba.infn.it/atlas/). The RNA editing events detailed lead to one or more amino acid changes compared to the translation of the non-edited RNA version (for example see [Q8NE31](https://www.uniprot.org/uniprotkb/Q8NE31/feature-viewer)). Each RNA editing event is displayed in the viewer in its sequence position, and can be selected to expand the tool tip which displays further information for that feature, including amino acid position, amino acid change, consequence (e.g missense), and genomic location.

# How to download RNA editing data?

The data is available for download in the [UniProt Proteins API](https://www.ebi.ac.uk/proteins/api/doc/#/rna-editing) in the RNA editing subsection. The proteins API can be used to generate examples of request code in various programming languages that can be used in your own pipeline to query the database.
