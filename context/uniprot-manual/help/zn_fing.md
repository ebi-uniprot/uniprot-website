---
title: Zinc finger
type: help
categories: Function,manual
---

This subsection of the [Function](https://www.uniprot.org/help/function_section) section specifies the position(s) and type(s) of zinc fingers within the protein.

A zinc finger is a small, functional, independently folded domain that coordinates one or more zinc ions to stabilize its structure through cysteine and/or histidine residues. Zinc fingers are structurally diverse and exhibit a wide range of functions, from DNA- or RNA-binding to protein-protein interactions and membrane association.

# 1. Types of zinc finger

There are more than 40 types of zinc fingers annotated in UniProtKB. The most frequent are the C2H2-type, the CCHC-type, the PHD-type and the RING-type.  
Examples: [Q7Z142](https://www.uniprot.org/uniprotkb/Q7Z142#family_and_domains), [P55197](https://www.uniprot.org/uniprotkb/P55197#family_and_domains), [Q9P2R3](https://www.uniprot.org/uniprotkb/Q9P2R3#family_and_domains), [Q9P2G1](https://www.uniprot.org/uniprotkb/Q9P2G1#family_and_domains), [Q9P2S6](https://www.uniprot.org/uniprotkb/Q9P2S6#family_and_domains), [P19811](https://www.uniprot.org/uniprotkb/P19811#family_and_domains), [Q92793](https://www.uniprot.org/uniprotkb/Q92793#family_and_domains), [P36406](https://www.uniprot.org/uniprotkb/P36406#family_and_domains), [O95081](https://www.uniprot.org/uniprotkb/O95081#family_and_domains), [Q9ULV3](https://www.uniprot.org/uniprotkb/Q9ULV3#family_and_domains)

# 2. Annotation of zinc fingers predicted using InterPro resources

We annotate a variety of zinc fingers defined by the InterPro resources PROSITE, Pfam and SMART. The number and type of predicted zinc fingers is specified in the ['Sequence similarities'](https://www.uniprot.org/help/sequence_similarities) subsection of the 'Family and Domains' section.  
Example: [P75093](https://www.uniprot.org/uniprotkb/P75093#family_and_domains)

## a) C2H2-type zinc fingers

Zinc finger proteins of the C2H2-type are amongst the most frequently occurring proteins in the genome of Homo sapiens. Most C2H2-type zinc finger proteins are transcriptional activators or repressors that bind DNA. C2H2-type zinc fingers are frequently found in multiple copies in the same protein, in which case individual copies are numbered. Numbering of zinc fingers is optional if the protein is a fragment at the N-terminus and no complete orthologous sequence is available from which the exact numbering can be inferred.

We annotate C2H2-type zinc fingers which can be detected using Pfam, SMART or the PROSITE profile [PS50157](https://prosite.expasy.org/PS50157) and the PROSITE pattern [PS00028](https://prosite.expasy.org/PDOC00028) :

    C-x(2,4)-C-x(3)-[LIVMFYWC]-x(8)-H-x(3,5)-H

The profile extends from the 2 residues preceding the first cysteine (this generally begins with an aromatic residue) to the second histidine. The range assigned is normally that of the profile.  
Example: [P08045](https://www.uniprot.org/uniprotkb/P08045#family_and_domains)

C2H2-type zinc fingers are frequently associated with the following domains: KRAB (transcriptional repression), SCAN box or LeR (oligomerization - always before KRAB if KRAB present in the protein), BTB/POZ (homodimerization - never found in combination with SCAN or KRAB), SET (methylation) and Homeobox (DNA-binding). Except for the Homeobox domain, these other domains are almost always found in the N-terminal section of the protein before the zinc finger.

## b) Atypical and degenerate zinc fingers

Atypical zinc fingers are those which deviate from a consensus profile or pattern but which nevertheless retain the ability to bind zinc. These may include zinc fingers in which cysteine is replaced by histidine or where the spacing between cysteine or histidine residues is slightly altered in one of the following ways:

    C-x(5)-C instead of C-x(2,4)-C;

     C-x(10,14)-H instead of C-x(12)-H;

     H-x(2)-H or H-x(6)-H instead of H-x(3,5)-H.

Example: [P47043](https://www.uniprot.org/uniprotkb/P47043#family_and_domains)

Degenerate zinc fingers are those which deviate from a consensus profile or pattern and which have also lost the ability to bind zinc. These may include zinc fingers in which cysteine is replaced by amino acids other than histidine or where the spacing between cysteine or histidine residues is outside the range of normal or atypical zinc fingers, or truncated zinc fingers.  
Examples: [Q80ZQ5](https://www.uniprot.org/uniprotkb/Q80ZQ5#family_and_domains), [Q19203](https://www.uniprot.org/uniprotkb/Q19203#family_and_domains), [Q15911](https://www.uniprot.org/uniprotkb/Q15911#family_and_domains)

# 3. Annotation of zinc fingers not represented in InterPro

Many zinc fingers cannot be described by a specific family profile or pattern as only the amino acids that coordinate the zinc ion are conserved. Hence the number and type of such zinc fingers is NOT specified in the ['Sequence similarities'](https://www.uniprot.org/help/sequence_similarities) subsection of the 'Family and Domains' section.  
Such zinc fingers are generally named for the pattern of cysteine or histidine residues that coordinate the zinc ion: C4-type, C5-type, C2H3-type and so on.

## C4-type zinc fingers

C4-type zinc fingers are characterized by 4 cysteine residues that coordinate zinc and do not share further sequence similarity - for instance, the distances between the cysteine residues are not conserved. C4-type zinc fingers are found within the DNA-binding regions of some well-characterized families of nuclear receptors.  
Example: [P10827](https://www.uniprot.org/uniprotkb/P10827#family_and_domains)

In archaea and bacteria, C4-type zinc fingers are found in a limited number of proteins, including some conserved protein families. These include the UvrA subfamily of ABC transporters (MF\_00205 family), the clpX chaperone family (MF\_00175 family) and the recR family (MF\_00017 family). We annotate these highly conserved C4-type zinc fingers, but those not found in other proteins, unless there is some good evidence.  
Examples: [Q8UF86](https://www.uniprot.org/uniprotkb/Q8UF86#family_and_domains), [P0A6H1](https://www.uniprot.org/uniprotkb/P0A6H1#family_and_domains), [P24277](https://www.uniprot.org/uniprotkb/P24277#family_and_domains)

Related keywords:  
[Metal-binding](https://www.uniprot.org/keywords/479),  
[Zinc](https://www.uniprot.org/keywords/862),  
[Zinc finger](https://www.uniprot.org/keywords/863).

# See also

[DNA binding](https://www.uniprot.org/help/dna_bind)  
[Domain](https://www.uniprot.org/help/domain)  
[Motif](https://www.uniprot.org/help/motif)  
[Region](https://www.uniprot.org/help/region)  
[Repeat](https://www.uniprot.org/help/repeat)
