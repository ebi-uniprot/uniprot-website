---
title: Proteome similarity score
type: help
categories: Proteomes,UniProtKB,Keywords,Sequence
---
# What is the proteome similarity score?
In cases where there are multiple [proteomes](https://www.uniprot.org/help/proteome) for a given species, the proteome similarity score indicates how similar a proteome is to the [reference proteome(s)](https://www.uniprot.org/help/reference_proteome) of that species.

# How can the proteome similarity score be used?
The score can be used to determine how similar a given proteome (non-reference or reference, but not an excluded proteome) is to a reference proteome within the same species.

# What proteomes have a similarity score?
The score is provided to almost all cellular (non-viral) proteomes. 
A proteome may **not** have a similarity score for one of the following reasons:
- The proteome has been [excluded](https://www.uniprot.org/help/proteome_exclusion_reasons);
- Newly imported proteomes from surveillance projects are not currently eligible to become reference proteomes, and therefore the species might not have reference proteomes;
- Newly imported proteomes from metagenome assemblies are not currently considered for promotion to a reference proteome, and therefore the species might not have reference proteomes;
- Newly imported proteomes from organisms with the status ‘Candidatus’ are not currently eligible to become reference proteomes;
- The proteome belongs to a taxonomically undefined species;
- The proteome is the only one for that species (N.B. being the only one automatically makes it a reference proteome).

Please see our help page for more information on how [reference proteomes are selected](https://www.uniprot.org/help/ref_proteomes_workflow).

# How is the proteome similarity score calculated?
The proteome similarity score is determined by how many proteins from a proteome align with the proteins of a reference proteome, as a percentage. The protein alignment between proteins of two proteomes is calculated by the [reference proteome selection workflow](https://www.uniprot.org/help/ref_proteomes_workflow), during MMseqs2 clustering.

If there is more than one reference proteome for a species, each of these reference proteomes will have a similarity score comparing them against each other. Non-reference proteomes for such a species will also have similarity scores against each of the species’ reference proteomes.

Proteome alignment parameters are explained in further detail in the preprint publication [‘A novel method to select Reference Proteomes in UniProt’](https://www.biorxiv.org/content/10.64898/2026.05.12.720148v1). See Figure 1.

<figure style="width:80%">
  <img src="https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/proteome_similarity_score.png" alt="Proteome similarity score example" />
  <figcaption>Figure 1 - Protein clustering between proteomes.  MMseqs2 protein clustering methods identify 4 protein clusters between proteome A and B. Protein cluster coloring: blue - singleton clusters of proteome A; yellow - singleton clusters of proteome B; green - clusters where there are proteins from A and B that align well; red - clusters where proteins from proteome A encompass the sequence of proteins from proteome B, but not the other way around.</figcaption>
</figure>

<p></p>

Example:
- Proteome A has 5 proteins
- Proteome B has 8 proteins
- After MMseqs2 protein clustering, 4 protein clusters are formed

The proteome similarity score is a measure of how similar a proteome is to a reference proteome as a percentage score. The proteome similarity score of proteome A, when compared with proteome B, is 80%, because 4 out of its 5 proteins encompass the protein sequences from proteins of proteome B. 

In this example, because the protein alignment is unidirectional, the score for proteome B when compared with proteome A is 25% because only 2 out of its 8 proteins encompass the protein sequences from proteins of proteome A.

# Where to find the proteome similarity score
The proteome similarity score can be found on a proteome page in the ‘Similar reference proteomes’ section. If similar reference proteomes are available, the table will be populated with a list of their [proteome identifiers](https://www.uniprot.org/help/proteome_id) (UPIDs), [organism](https://www.uniprot.org/help/organism-name)and the associated proteome similarity score. 
