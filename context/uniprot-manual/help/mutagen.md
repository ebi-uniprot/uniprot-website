---
title: Mutagenesis data
type: help
categories: disease_phenotypes_variants,manual
---

This subsection of the ['Disease/Phenotypes and variants'](https://www.uniprot.org/help/disease_phenotypes_variants_section) section describes the effect of the experimental mutation of one or more amino acid(s) on the biological properties of the protein.

# 1. Mutagenesis experimental data from the literature

We describe only those experiments in which a limited number of amino acid residues are altered: gross alterations in protein structure, such as the deletion of hundreds of amino acids, are not described. We report the amino acid change, the name of the mutant (if known), and the effect(s) of the mutation on the protein, the cell or the complete organism.  
Examples: [Q1LCS4](https://www.uniprot.org/uniprotkb/Q1LCS4#phenotypes_variants), [P04395](https://www.uniprot.org/uniprotkb/P04395#phenotypes_variants), [Q38914](https://www.uniprot.org/uniprotkb/Q38914#phenotypes_variants)

When the experimental observation was obtained with a combination of several point mutations, we indicate not only the global effect, but also the exact combination of mutations (positions and amino acid modifications). This information can be found in the 'Description' field in the sentence 'when associated with...'.  
Examples: [P62166](https://www.uniprot.org/uniprotkb/P62166/entry#disease_variants), [O14776](https://www.uniprot.org/uniprotkb/O14776/entry#disease_variants)

Mutagenesis data can be found on the protein entry page in the phenotypes and variants section, or the disease and variants section in human entries. Data can also be downloaded programmatically using the [Proteins API](https://www.ebi.ac.uk/proteins/api/doc/#!/mutagenesis/search).

# 2. Mutagenesis (large scale data)

The [IMEx Consortium](https://www.imexconsortium.org/) of interaction databases capture the effects of targeted changes to the amino acid sequence of a protein which have been engineered, largely by site-directed mutagenesis and documenting their effect on protein interaction. This can be by changing amino acids at known, or predicted, post-translational modification sites or sites associated with disease, disrupting regions required for protein stability or altering the properties of protein binding domains. The effect of single, or multiple, induced point mutations on both binary and n-ary interactions in mainly small-scale experiments are manually extracted from the literature by IMEx curators and the effect of each observation is described using a set of controlled vocabulary terms such as [mutation disrupting interaction strength](https://ontobee.org/ontology/MI?iri=http://purl.obolibrary.org/obo/MI_1128) or [mutation increasing interaction rate](https://ontobee.org/ontology/MI?iri=http://purl.obolibrary.org/obo/MI_1131). 

The data is stored in the [IntAct](https://www.ebi.ac.uk/intact/home) database at the [EMBL-EBI](https://www.ebi.ac.uk/).
UniProtKB has been a member of the IMEx Consortium since its creation in 2009. 
For further information please see [Towards a unified open access dataset of molecular interactions](https://www.nature.com/articles/s41467-020-19942-z) and [Capturing variation impact on molecular interactions in the IMEx Consortium mutations data set](https://www.nature.com/articles/s41467-018-07709-6).

Mutagenesis (large scale data) can be found in the protein feature viewer of an entry, in the mutagenesis track. 
Example; [P35222](https://www.uniprot.org/uniprotkb/P35222/feature-viewer?loadFeatures=true)
