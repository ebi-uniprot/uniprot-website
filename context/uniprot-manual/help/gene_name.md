---
title: Gene names
type: help
categories: Names_and_taxonomy,manual
---

This subsection of the [Names and taxonomy](https://www.uniprot.org/help/names_and_taxonomy_section) section indicates the name(s) of the gene(s) that code for the protein sequence(s) described in the entry. Four distinct tokens exist: 'Name', 'Synonyms', 'Ordered locus names' and 'ORF names'.

# 1. Name

The recommended name is used to officially represent a gene. However, in many cases, more than one name have been assigned to a specific gene. We therefore make a distinction between the name which we believe should be used as the recommended gene name (official gene symbol) and the other names which we list in the 'Synonyms' subsection.

If an official gene name is provided by nomenclature committees, we usually store it in the 'Name' token with the recommended casing. However, there are some exceptions to this rule:

a\) Many species have no established nomenclature committee. In such cases, we propose a gene name derived from an orthologous gene in a closely related species;

b\) We try to give similar names to orthologous genes. In some rare cases, this implies that we use a name different from that proposed by a nomenclature committee.

Note that we write the gene name in uppercase when there is no casing rule for a given species.

# 2. Synonyms

In this subsection we list, in alphabetical order, all the names, but the recommended one, that are or were used to represent the gene.

Example: [Q04609](https://www.uniprot.org/uniprotkb/Q04609#names_and_taxonomy)

We try to provide an exhaustive list of synonyms. This allows users to mine the scientific literature for articles describing their biological object of interest. Note, however, that we do not always propagate a synonym across orthologous proteins. This is the case when a synonym is ambiguous, obsolete or has been used in a very restricted manner. We also do not store misnomers or spelling-deficient names.

# 3. Ordered Locus Names

We call 'Ordered locus name' (OLN) the naming systems that are used to sequentially assign an identifier to each predicted gene of a completely sequenced genome or chromosome. The OLN is generally based on a prefix representing the organism followed by a number which usually represents the sequential ordering of genes on the chromosome. Depending on the genome-sequencing center, OLNs are only attributed to protein-coding genes, or also to pseudogenes, and also to tRNA-coding genes and others. If two predicted genes have been merged to form a new gene, both OLNs are indicated, separated by a slash.

Examples: [HI0934](https://www.uniprot.org/uniprotkb/P44942#names_and_taxonomy), [Rv3245c](https://www.uniprot.org/uniprotkb/Q50496#names_and_taxonomy), [ECs2657/ECs2658](https://www.uniprot.org/uniprotkb/Q8XBC7#names_and_taxonomy)

Note that OLNs are sometimes referred to as 'ORF numbers', 'CDS numbers' or 'Gene numbers'.

There can be more than one OLN per gene as it sometimes happens that one genome has been the target of distinct sequencing projects. In such cases, the order of the names in the 'Ordered Locus Names:' token reflects the order of the corresponding references in the entry.

Example: [Q50496](https://www.uniprot.org/uniprotkb/Q50496#names_and_taxonomy)

# 4. ORF Names

The 'ORF names' section is used to alphabetically list the names that are temporarily attributed to an open reading frame (ORF) by a sequencing project. This name can be based on a cosmid numbering system, on the clone name attributed by large-scale cDNA projects or on any other type of naming system.

Examples: [SYGP-ORF50](https://www.uniprot.org/uniprotkb/P32634#names_and_taxonomy), [SpBC2F12.04](https://www.uniprot.org/uniprotkb/O14339#names_and_taxonomy), [C06E1.1](https://www.uniprot.org/uniprotkb/P34296#names_and_taxonomy), [CG10954](https://www.uniprot.org/uniprotkb/Q9VIM5#names_and_taxonomy)

ORF names are not propagated across species.

## Important remarks

- The scope of the data that we represent in the 'Gene names' subsection is wider than the classical geneticists' gene name since it also includes 'Ordered locus names' and 'ORF names'.

- Some life sciences communities prefer to use the terminology 'gene symbol' rather than 'gene name'.

- None of the above four subsections is mandatory, so that the 'Synonyms' subsection is present only if there is a 'Name' subsection.

- In names and synonyms, we do not keep the prefix indicating the species of origin, although these are sometimes used in publications.  
  Examples: Xbcl2 (for _Xenopus laevis_ bcl2), HsARG1 (for _Homo sapiens_ ARG1).

- It can happen that multiple genes can be translated to produce identical proteins in one species. In such cases, all gene products were historically often merged into a single UniProtKB entry and there are as many 'Name' tokens in the 'Gene names' subsection as the number of genes encoding the protein of interest, e.g. [P68431](https://www.uniprot.org/uniprotkb/P68431#names_and_taxonomy).  
  However, we tend to demerge many of these entries, and for newly annotated proteins we generate separate sequence entries in case of multiple genes coding for identical protein sequences, e.g. [P08409](https://www.uniprot.org/uniprotkb/P08409).
