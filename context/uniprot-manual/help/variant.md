---
title: Natural variant
type: help
categories: Sequence,manual
---

This subsection of the 'Sequence' section describes natural variant(s) of the protein sequence.

We annotate individual genetic variants, including disease-linked variants, variations between strains, isolates or cultivars, and RNA editing events. We report the nature of the amino acid change, the name of the variant (or allele), when available, and the effect(s) of the variation on the protein, the cell or the complete organism.

Note that frameshift variants are not annotated. Although these variants are not described in this subsection, the associated  
phenotype, if known, will be reported in the '[Polymorphism](https://www.uniprot.org/help/polymorphism)' or '[Involvement in disease](https://www.uniprot.org/help/involvement_in_disease)' subsections.

# 1. Variants not linked to diseases

The sequence displayed by default in the entry (also called the canonical sequence) is usually the most common polymorphic variant or the most conserved in orthologous species. In human and some model organisms, the sequence reported is that of the translation of the official reference genome. All variations are described with regard to this canonical sequence.

Most naturally occurring variants are due to a single nucleotide change (SNP) at the codon level. When a variant results from more than one nucleotide change, it is indicated in the 'Description' field.  
Example: [Q96CV9](https://www.uniprot.org/uniprotkb/Q96CV9/entry#disease_variants)

Validated human variants from the NCBI [dbSNP](https://www.ncbi.nlm.nih.gov/snp/) database are annotated and tagged with the dbSNP identifier in the 'Description' field.  
Examples: [P15516](https://www.uniprot.org/uniprotkb/P15516/entry#disease_variants), [O43593](https://www.uniprot.org/uniprotkb/O43593/entry#disease_variants)

Additional information, such as the cell type or tissue of origin of the variant, the distribution or the frequency of the allele in a given population, is indicated in the 'Description' field, when available.  
Examples: [P30154](https://www.uniprot.org/uniprotkb/P30154/entry#disease_variants), [O14896](https://www.uniprot.org/uniprotkb/O14896/entry#disease_variants)

When several natural variants exist for a single position, they are annotated in distinct 'Natural variant' subsections.  
Example: [P06400](https://www.uniprot.org/uniprotkb/P06400/entry#disease_variants)

Additional information concerning individual polymorphic sites and alleles can be reported in the ['Polymorphism'](https://www.uniprot.org/help/polymorphism) subsection.  
Example: [P15516](https://www.uniprot.org/uniprotkb/P15516#sequences)

Note that artificial mutants resulting from (large-scale) mutagenesis screens of genetically tractable organisms, such as yeast or fly, are described in the ['Mutagenesis'](https://www.uniprot.org/help/mutagen) subsection of the 'Disease/Phenotypes and variants' section.

# 2. Disease-linked variants

Information on disease-linked variants is mostly restricted to human proteins and is usually found in the 'Disease/Phenotypes and variants' section. We describe the amino acid change, the abbreviation of the associated disease and the effect(s) of the variation on the protein, the cell and/or the organism, if known. The large majority of curated human disease-linked variants are germline - not somatic - changes involved in Mendelian disease and linked to phenotypes described in the [OMIM database](https://www.omim.org/).

Additional information about the disease itself is provided in the ['Involvement in disease'](https://www.uniprot.org/help/involvement_in_disease) subsection of the 'Disease/Phenotypes and variants' section.  
Examples: [O43593](https://www.uniprot.org/uniprotkb/O43593/entry#disease_variants), [P26439](https://www.uniprot.org/uniprotkb/P26439/entry#disease_variants)

Related keyword: [Disease variant](https://www.uniprot.org/keywords/KW-0225)

# 3. RNA editing

RNA editing events include conversion, insertion and deletion of nucleotides. We annotate only those RNA editing events that change the protein sequence. Silent events are not annotated. For partial RNA editing events, we show the translation of the underlying genomic DNA sequence and indicate the potential amino acid change due to RNA editing in the 'Natural variant' subsection and in the 'Sequence and Isoform subsection.  
Example: [P28335 - Sequence and Isoform section](https://www.uniprot.org/uniprotkb/P28335#sequences), [P28335 - Natural variant section](https://www.uniprot.org/uniprotkb/P28335/entry#disease_variants).

Additional information on RNA editing events can be found in the ['RNA editing'](https://www.uniprot.org/help/rna_editing) help page.

Related keyword: [RNA editing](https://www.uniprot.org/keywords/691)

# 4. Variations between strains, isolates or cultivars

Variations between strains, isolates or cultivars (cv) are described and the strain/isolate/cultivar exhibiting the variation is indicated in the 'Description' field.  
Examples: [Q8MMF9](https://www.uniprot.org/uniprotkb/Q8MMF9/entry#phenotypes_variants), [Q9QNF7](https://www.uniprot.org/uniprotkb/Q9QNF7/entry#phenotypes_variants), [Q8W4J9](https://www.uniprot.org/uniprotkb/Q8W4J9/entry#phenotypes_variants)

# Related documents

[List of human entries with genetic variants](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/humpvar.txt)  
[Index of human variants curated from literature reports](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/humsavar)  
[Controlled vocabulary of strains](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/strains.txt)  
[Amino acid altering variants imported from Ensembl Variation databases, tab-delimited download](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/variants/)
