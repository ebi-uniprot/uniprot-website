---
title: How are reference proteomes selected?
type: help
categories: Proteomes,UniProtKB,Keywords,Sequence,faq
---
UniProt selects [reference proteomes](https://www.uniprot.org/help/reference_proteome) for all species, to provide users with the best quality data in the [UniProt Knowledgebase](https://www.uniprot.org/help/uniprotkb) (UniProtKB) and the [Proteomes](https://www.uniprot.org/help/proteome) resource. Reference proteomes are selected from all proteomes for a given species using a combination of automatic and manual selection methods. For each species, the minimum number of reference proteomes are selected whilst maximizing their coverage of the protein space. This page provides a brief explanation of this process.

# Summary 
The automatic selection of reference proteomes differs between cellular and viral species:
- For cellular organisms (from Bacteria, Archaea, and Eukaryota), the reference proteome workflow, described below, is designed to select at least one reference proteome per species. It is based on the clustering system Many-against-Many sequence searching ([MMseqs2](https://www.nature.com/articles/nbt.3988)) and has been fine-tuned to select the minimum number of reference proteomes whilst ensuring the maximum coverage of protein space of that species;
- For viruses, the genomes selected in the Virus Metadata Resource [VMR](https://ictv.global/vmr) from the International Committee on Taxonomy of Viruses (ICTV) are imported and promoted as reference proteomes.

These automatic selection processes are carefully monitored by curators.

The manual selection of reference proteomes is done by a team of expert curators. Factors such as importance of the proteome within the scientific community, usage of that proteome, genome quality and proteome quality are taken into account when considering the promotion of a proteome to a reference proteome. Manually selected reference proteomes are evaluated independently from the workflow described below.


# Reference proteomes workflow
1. Identification of candidate proteomes to become reference proteomes. <br><br>For cellular organisms, proteomes must meet stringent criteria to be considered by the workflow as candidates to become reference proteomes:
    - The proteome must belong to a defined species (a proteome must have a species name with complete binomial nomenclature including both genus and epithet). Example: A defined species is Salmonella enterica (taxonomy ID: [28901](https://www.ncbi.nlm.nih.gov/datasets/taxonomy/28901/)), as opposed to an undefined species such as Salmonella sp. (taxonomy ID: [599](https://www.ncbi.nlm.nih.gov/datasets/taxonomy/599/)) where the taxonomy is not resolved at the species rank (e.g., genus-level assignment like "Escherichia spp.");
    - The proteomes cannot be excluded[https://www.uniprot.org/help/proteome_exclusion_reasons];
    - Novel proteomes from metagenome assemblies are not currently considered for promotion to a reference proteome, pending further work to establish a high quality set of assemblies;
    - Novel proteomes from surveillance projects are not considered for promotion to a reference proteome;
    - Novel proteomes from organisms with the status ‘Candidatus’ are not currently considered for promotion to a reference proteome.

2. If the candidate proteome is the only one from that species, it will be automatically promoted as a reference proteome.
3. If there is more than one proteome per species, the MMseqs2 clustering analysis is used to suggest which proteome to promote as a reference proteome:
    - Protein clustering: firstly, it clusters similar proteins from different proteomes of the same species. The more proteins a proteome has in different clusters, the more likely it is to be selected as a reference proteome;
    - Proteome clustering: secondly, it calculates how similar proteomes within the same species are, based on the number of protein clusters shared between any two proteomes. For each proteome cluster, the best representative proteome (in the protein space) will be selected as the reference proteome.

4. The suggested promotions (in which a non-reference proteome is proposed to become a reference proteome), or demotions (in which a reference proteome is proposed to become a non-reference proteome) are manually reviewed by curators.

The reference proteomes workflow described in this page was introduced in [release](https://www.uniprot.org/help/synchronization) 2025_04.

For a summary of the changes made to proteomes during the period between releases 2025_04 and 2026_02, please see our [‘Quick summary of proteome changes’](https://www.uniprot.org/help/refprot_only_changes) help page.

For more information on the technical details of this workflow, please refer to the recorded webinar [‘Redefining UniProt reference proteomes and upcoming changes in UniProtKB’](https://www.ebi.ac.uk/training/events/redefining-uniprot-reference-proteomes-and-upcoming-changes-uniprotkb/) or the publication [‘A novel method to select Reference Proteomes in UniProt’](https://www.biorxiv.org/content/10.64898/2026.05.12.720148v1).

# FAQs
## Why are some VMR genomes from ICTV missing as reference proteomes in UniProt?
Not all genomes selected by VMR have translated proteins associated with them. In these cases, UniProt does not have access to the protein sequences and therefore there is no proteome. Additionally, genome sequences that have not been made into a genome assembly will not be included by UniProt.

## Why is my genome assembly not associated with a reference proteome in UniProt?
Any imported cellular proteome can become a reference proteome. If your genome of interest is not selected as a reference proteome (and therefore does not have protein accessions in UniProtKB) and if you have evidence that it is important within its taxonomic clade to the scientific community, you can contact our [help desk](https://www.uniprot.org/contact), and the UniProt team will consider promoting it.

## Why do some species have more than one reference proteome?
One reference proteome might not be enough to sufficiently represent the protein space for that species. Additionally, some species can have multiple strains or subspecies relevant to the scientific community.

## Is the reference proteome set stable from release to release?
The set will be mostly stable between releases, as most reference proteomes are predicted to remain as they are in future releases. Per release, a small number of proteomes may be promoted and others demoted to provide the most up-to-date and best quality data available to users.

## If a reference proteome is demoted to non-reference proteome, what happens to its proteins?
The UniProtKB/TrEMBL (unreviewed) entries belonging to that proteome will be removed from UniProtKB. UniProtKB/Swiss-Prot entries will remain active, but will no longer be associated with that proteome. However, its sequences and [UniProtKB accessions](https://www.uniprot.org/help/accession_numbers) will be kept in our sequence archive resource, [UniParc](https://www.uniprot.org/help/uniparc).

