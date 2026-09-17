---
title: Cross-link
type: help
categories: PTM_processing,manual
---

This subsection of the [PTM / Processing](https://www.uniprot.org/help/ptm_processing_section) section describes **covalent linkages** of various types formed **between two proteins (interchain cross-links)** or **between two parts of the same protein (intrachain cross-links)**, except the disulfide bonds that are annotated in the ['Disulfide bond'](https://www.uniprot.org/help/disulfid) subsection.

Interchain cross-links are involved in the formation of covalently linked protein complexes. Common cross-links include ubiquitin (and ubiquitin-like)(Ubl) conjugation, SUMOylation, transglutamination, thioether bonds and thioester bonds.

For each cross-link, we specify the name of the conjugate and the identity of the two amino acids involved in the 'Description' field. There is a strict controlled vocabulary for the description of cross-link types.

# 1. Intrachain cross-links

For intrachain cross-links, we cite the amino acids involved in their order of appearance in the sequence.  
Examples: [P36503](https://www.uniprot.org/uniprotkb/P36503#ptm_processing), [P36499](https://www.uniprot.org/uniprotkb/P36499#ptm_processing)

Note that the intrachain cross-link of the C-terminus with the N-terminus results in the formation of a cyclopeptide:  
Example: [O07623](https://www.uniprot.org/uniprotkb/O07623#ptm_processing)

# 2. Interchain cross-links

For interchain cross-links we give the identity of the two amino acids involved, the amino acid in the partner protein cited in second position. We also indicate that the linkage is interchain and provide the name of the partner protein.  
Examples: [P16893](https://www.uniprot.org/uniprotkb/P16893#ptm_processing), [P08697](https://www.uniprot.org/uniprotkb/P08697#ptm_processing), [P02671](https://www.uniprot.org/uniprotkb/P02671#ptm_processing)

## a. Cross-link between homodimers

Cross-links between individual subunits of a homodimer are annotated as interchain cross-links and use the same syntax as above, except that the name of the protein is not indicated.  
Example: [P02679](https://www.uniprot.org/uniprotkb/P02679#ptm_processing)

## b. Cross-links between two chains or peptides from the same protein precursor

Cross-links formed between two proteolytically generated parts of the same protein are annotated as interchain. The identities of the two chains are indicated in the 'Description' field using the syntax 'between chain A and chain B'.

# 3. Other common cross-links

- Ubiquitin-like (Ubl) conjugation
- Transglutamination
- Thioether bond
- Thioester bond
- Special cases

## a. Ubiquitin and Ubiquitin-like conjugation

Ubiquitin (Ubl) conjugation includes conjugation of ubiquitin and of related proteins, which are collectively referred to as modifiers. Ubl conjugation requires the concerted action of several enzymes which act in a stepwise process. Ubl is activated by an E1 ubiquitin-activating enzyme and then transferred from E1 to the active site cysteine of a Ubl-conjugating enzyme E2. The final step of the ubiquitylation process generally requires the activity of a specific E3 ubiquitin-protein ligase, which functions as a specific substrate recognition module of the system. Ubl conjugation is reversible.

Related keyword: [Ubl conjugation](https://www.uniprot.org/keywords/832)  
Note that the keyword ['Ubl conjugation pathway'](https://www.uniprot.org/keywords/833) is applied to proteins involved in conjugating/deconjugating the Ubl, and not to the ubl conjugation target proteins.

### Ubiquitination

Ubiquitination often leads to the degradation of the modified protein by the proteasome.

Example of target: [Q04119](https://www.uniprot.org/uniprotkb/Q04119#ptm_processing)

Example of modifier: [P0CG53](https://www.uniprot.org/uniprotkb/P0CG53/entry#ptm_processing)

### Sumoylation

Sumoylation is involved in the nuclear retention of proteins that normally shuttle between the nucleus and cytoplasm and in the targeting of proteins to specific subnuclear structures.

Example of target: [Q9H2X6](https://www.uniprot.org/uniprotkb/Q9H2X6#ptm_processing)

Example of modifier: [P63165](https://www.uniprot.org/uniprotkb/P63165#ptm_processing)

### Atg12 conjugation

This conjugation is essential for autophagy. Atg5 is the unique substrate.

Example of target: [Q9H1Y0](https://www.uniprot.org/uniprotkb/Q9H1Y0#ptm_processing)

Example of modifier: [O94817](https://www.uniprot.org/uniprotkb/O94817#ptm_processing)

### Neddylation

Neddylation is the conjugation of NEDD8 (known as 'Rub' in plants). The substrates are proteins of the cullin family, that are themselves E3 enzymes involved in ubiquitination. Neddylation of cullins may control ubiquitination level.

Example of target: [Q94AH6](https://www.uniprot.org/uniprotkb/Q94AH6#ptm_processing)

Example of modifier: [Q9SHE7](https://www.uniprot.org/uniprotkb/Q9SHE7#ptm_processing)

## b. Transglutamination

Transglutamination is catalyzed by transglutaminases that cross-link glutamine with lysine. Under physiological conditions, tranglutamination of intermediate filaments and their associated proteins is essential for the formation of the protective cornified cell envelope that contributes to the structure of the skin barrier. Aberrant non-reversible transglutamination is implicated in various diseases of the skin and in Alzheimer disease.

Protein 1: [P02671](https://www.uniprot.org/uniprotkb/P02671#ptm_processing)

Protein 2: [P08697](https://www.uniprot.org/uniprotkb/P08697#ptm_processing)

## c. Thioether bond

Thioether bond type cross-links are mainly found in antimicrobial peptides, or lantibiotics. Lantibiotic thioether bonds are formed between a cysteine and a threonine or a serine.  
Example: [P36503](https://www.uniprot.org/uniprotkb/P36503#ptm_processing)

Related keyword: [Thioether bond](https://www.uniprot.org/keywords/883)

## d. Thioester bond

Thioester bonds are formed between a cysteine and a glutamine; they are mainly found in eukaryotic proteins.  
Example: [P14046](https://www.uniprot.org/uniprotkb/P14046#ptm_processing)

Related keyword: [Thioester bond](https://www.uniprot.org/keywords/882)

## e. Special cases

Some cross-links may involve the rare [non-standard amino acid](https://www.uniprot.org/help/non_std) **selenocysteine**. Others may form between amino acids that undergo preliminary modification(s) prior to cross-link formation.  
Example: [Q9MYY8](https://www.uniprot.org/uniprotkb/Q9MYY8#ptm_processing) (Selenocysteine)

**Tryptophan tryptophylquinone (TTQ)** is formed by oxidation of the indole ring of a tryptophan to form tryptophylquinone followed by covalent cross-linking with another tryptophan residue.  
Example: [P00372](https://www.uniprot.org/uniprotkb/P00372#ptm_processing)  
Related keyword: [TTQ](https://www.uniprot.org/keywords/824)

Analagous cross-links have been observed between tryptophylquinone and cysteine (related keyword: [CTQ](https://www.uniprot.org/keywords/885)) and between tyrosylquinone and lysine (related keyword: [LTQ](https://www.uniprot.org/keywords/886)).

See also the subsection [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification) for additional information on modifications for which **position-specific data is not yet available**.
