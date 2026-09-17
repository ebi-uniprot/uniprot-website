---
title: Modified residue
type: help
categories: PTM_processing,manual
---

This subsection of the 'PTM / Processing' section specifies the position and type of each modified residue excluding [lipids](https://www.uniprot.org/help/lipid), [glycans](https://www.uniprot.org/help/carbohyd) and [protein cross-links](https://www.uniprot.org/help/crosslnk).

Common modifications include phosphorylation, methylation, acetylation, amidation, formation of pyrrolidone carboxylic acid, isomerization, hydroxylation, sulfation, flavin-binding, cysteine oxidation and nitrosylation.

We describe the chemical nature of the modified residue using a controlled vocabulary (see the document ['Controlled vocabulary of posttranslational modifications (PTM)'](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/ptmlist.txt)).

We provide additional information concerning the modification, such as:

1.  the **form of the protein** which undergoes the modification; this may be either a specific **isoform**, a particular **processed or modified form** of the protein, or a specific **sequence variant** ;  
    Examples: [P41500](https://www.uniprot.org/uniprotkb/P41500#ptm_processing) (isoform), [P84715](https://www.uniprot.org/uniprotkb/P84715#ptm_processing) (processed form), [P68871](https://www.uniprot.org/uniprotkb/P68871#ptm_processing) (sequence variant)
2.  the **enzyme** which carries out the modification ('by...'). For proteins of infectious organisms, such as viruses, phages and bacteria, we also indicate whether the modification is carried out by a **host** protein;  
    Examples: [Q53EZ4](https://www.uniprot.org/uniprotkb/Q53EZ4#ptm_processing) (modifying enzyme indicated), [P03279](https://www.uniprot.org/uniprotkb/P03279#ptm_processing) (viral protein modified by host protein)
3.  information on the **frequency** of the modification or the **relationship with another feature** ('partial', 'alternate', 'transient'). The term **'partial'** indicates that not all protein molecules are modified, **'alternate'** means that the same amino acid can be modified in more than one way, and **'transient'** is applied to exceptional cases of otherwise stable modifications. For partial modifications, we do not propagate this comment to homologous proteins and we do not specify the fraction of proteins modified, as this may depend on the experimental conditions.  
    Examples: [P16157](https://www.uniprot.org/uniprotkb/P16157#ptm_processing) (partial modification), [Q9UKV3](https://www.uniprot.org/uniprotkb/Q9UKV3#ptm_processing) (alternate modification), [Q9FX54](https://www.uniprot.org/uniprotkb/Q9FX54#ptm_processing) (transient modification)

See also the subsection [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification) for additional information on modifications for which **position-specific data is not yet available**.

**Data sources and propagation of modified residue annotation**

We annotate experimentally determined sites of modification. These are propagated 'By similarity' to related orthologs provided the following criteria are met:

1.  the modification should be necessary for protein function (and therefore likely to occur in related organisms);
2.  the enzyme which performs the modification must exist in the related organism, or the same type of modification must have already been observed (this condition is mandatory);
3.  the modified residue and the surrounding region should be conserved in the orthologous protein (this condition is also mandatory).

Propagation is generally restricted to closely related species, e.g. among mammals or bacteria from the same taxonomic group. We usually do not propagate information concerning modified residues among plants or unicellular fungi. Specific details regarding the type of modification may be generalized during propagation. For instance, a particular lysine can be subjected to mono-or dimethylation in _E.coli_ strain K12, but this information is not propagated to the _E.coli_ O157:H7 orthologous entry, where we simply indicate that methylation occurs.  

Example: [P0CE47](https://www.uniprot.org/uniprotkb/P0CE47#ptm_processing) (source entry), [P0A6N3](https://www.uniprot.org/uniprotkb/P0A6N3#ptm_processing) (orthologous entry)

**Sites that are not modified**

When a site is found not to be modified, and if this is of biological significance, we indicate it in the 'Site' subsection of the features table. This information is not propagated in related entries.  
Examples: [Q10471](https://www.uniprot.org/uniprotkb/Q10471/entry#function), [P62152](https://www.uniprot.org/uniprotkb/P62152/entry#function), [P32457](https://www.uniprot.org/uniprotkb/P32457/entry#function), [P07173](https://www.uniprot.org/uniprotkb/P07173/entry#function).

**Unknown sites bearing unknown modifications**

Here is an example of a feature where the identity of the amino acid is unknown (an X is shown at this position in the sequence) and the only information concerning the modification is that the N-terminus is blocked: [P80979](https://www.uniprot.org/uniprotkb/P80979#ptm_processing) (Blocked amino end (Xaa)).

# 1. Phosphorylation

Phosphorylation refers to the transfer of a gamma-phosphate to an amino acid. It is a key mechanism for signaling in both eukaryotic and prokaryotic cells. It can occur on a number of cytoplasmic and nuclear residues, i.e. on the hydroxyl group of serine, threonine or tyrosine, on the nitrogen of arginine, histidine or lysine, on the carboxyl group of aspartate, or on the sulfhydryl group of cysteine.

Related keyword: [Phosphoprotein](https://www.uniprot.org/keywords/597)

Phosphorylation is frequent on serine, threonine, and tyrosine from eukaryotic proteins, serine phosphorylation being the most common. Phosphorylation of histidine and aspartate is known to occur as part of the two-component signalling in prokaryotes and has also been described in eukaryotes (mainly fungi and plants).

Example: [O15350](https://www.uniprot.org/uniprotkb/O15350#ptm_processing)

Since phosphorylation (phosphoserine, phosphothreonine and phosphotyrosine) is a reversible modification, phosphorylation sites are never annotated as 'partial'.

Examples: [Q9RQQ9](https://www.uniprot.org/uniprotkb/Q9RQQ9#ptm_processing), [P02662](https://www.uniprot.org/uniprotkb/P02662#ptm_processing), [P04859](https://www.uniprot.org/uniprotkb/P04859#ptm_processing), [P68433](https://www.uniprot.org/uniprotkb/P68433#ptm_processing)

Histidine can be phosphorylated on either of its two nitrogen atoms. We refer to 'Pros-phosphohistidine', when phosphorylation occurs on the nitrogen atom that is closest to the alpha-carbon and 'Tele-phosphohistidine', where it occurs on the most distal one. When the exact position of phosphate attachment on histidine is not known, we simply use the term 'Phosphohistidine'.

Examples: [P0AA06](https://www.uniprot.org/uniprotkb/P0AA06#ptm_processing), [P39928](https://www.uniprot.org/uniprotkb/P39928#ptm_processing), [P16575](https://www.uniprot.org/uniprotkb/P16575#ptm_processing), [P26762](https://www.uniprot.org/uniprotkb/P26762#ptm_processing), [P0A0E2](https://www.uniprot.org/uniprotkb/P0A0E2#ptm_processing)

Note that phosphorylation of aspartate follows a specific syntax:

Example: [P04042](https://www.uniprot.org/uniprotkb/P04042#ptm_processing)

We annotate experimentally determined phosphorylation sites and transfer this information to related orthologs as described. We do not annotate predicted phosphorylation sites. When transferring annotation regarding phosphorylation, we do not usually specify the kinase responsible in the orthologous entry, except when the modification is part of a precise, well-studied transduction pathway. For phosphohistidine, we propagate the position of the phosphorylated nitrogen atom.

# 2. Methylation

Cytoplasmic and nuclear proteins can be enzymatically modified in several ways by the addition of methyl groups from S-adenosylmethionine. Methylation reactions occurring on carboxyl groups can be reversible and modulate the activity of the target protein, while those on nitrogen atoms at the N-terminus and on side-chains are usually irreversible.

Related keyword: [Methylation](https://www.uniprot.org/keywords/488)

## Carboxyl methylation

Carboxyl methylation can occur either on a C-terminal cysteine, leucine or lysine residue, or on the side chain of a glutamate residue (or glutamine, after deamidation). It can affect protein-protein interactions and protein function.

Examples: [P67775](https://www.uniprot.org/uniprotkb/P67775#ptm_processing), [P02994](https://www.uniprot.org/uniprotkb/P02994#ptm_processing)

Cysteine carboxymethylation frequently occurs after prenylation of the CAAX (Cys - aliphatic_twice - any residue) sequence and proteolytic cleavage of the C-A bond.

Example: [P34068](https://www.uniprot.org/uniprotkb/P34068#ptm_processing)

In prokaryotes, glutamate methyl ester formation plays a major role in chemotactic signal transduction. We indicate whether the glutamate methyl ester is formed either from glutamate or from glutamine.

Example: [P07018](https://www.uniprot.org/uniprotkb/P07018#ptm_processing)

## Nitrogen methylation

Nitrogen methylation can occur on the N-terminus of a polypeptide chain on a phenylalanine, isoleucine, leucine, methionine, tyrosine, proline or alanine residue. It can also occur on the side chain of lysine, arginine or histidine residues. In eukaryotes, arginine and lysine methylation have been found mainly on histones and play an important role in signal transduction processes, nuclear transport and regulation of transcription.

Examples: [P0A7N9](https://www.uniprot.org/uniprotkb/P0A7N9#ptm_processing), [P00873](https://www.uniprot.org/uniprotkb/P00873#ptm_processing)

## Histidine methylation

Histidine methylation can occur on two positions, which are specified as 'Pros-methylhistidine' and 'Tele-methylhistidine'. When the exact position of the methylation is not known, we simply indicate 'Methylhistidine'.

Examples: [P31725](https://www.uniprot.org/uniprotkb/P31725#ptm_processing), [P62739](https://www.uniprot.org/uniprotkb/P62739#ptm_processing), [P24020](https://www.uniprot.org/uniprotkb/P24020#ptm_processing)

## Lysine methylation

Lysine can be mono-, di-, or tri-methylated. We describe each of these modifications as 'N6-methyllysine', 'N6,N6-dimethyllysine' and 'N6,N6,N6-trimethyllysine'. If the number of methyl groups is unknown, we simply indicate 'N6-methylated lysine'. This general description is also used when propagating the information 'By similarity' to homologous proteins.

Example: [P13538](https://www.uniprot.org/uniprotkb/P13538#ptm_processing)

Lysine methylation can compete with acetylation on the same residue. In this case, the modifications are described as 'alternate'.

## Arginine methylation

Arginine can be monomethylated or dimethylated in two ways which leads to four different descriptions: 'Omega-N-methylarginine', 'Dimethylated arginine', 'Symmetric dimethylarginine' and 'Asymmetric dimethylarginine'. If the residue is dimethylated, but the position of the methyl groups is unknown, it is annotated as 'Dimethylated arginine'. If the number of methyl groups is unknown, the ambiguous description 'Omega-N-methylated arginine' is used. This general description is also used when propagating information to homologous proteins.

Examples: [Q07666](https://www.uniprot.org/uniprotkb/Q07666#ptm_processing), [P11940](https://www.uniprot.org/uniprotkb/P11940#ptm_processing), [Q60487](https://www.uniprot.org/uniprotkb/Q60487#ptm_processing), [P45481](https://www.uniprot.org/uniprotkb/P45481#ptm_processing)

## Other rare examples of side chain methylation

Examples: [P00318](https://www.uniprot.org/uniprotkb/P00318#ptm_processing), [P0A287](https://www.uniprot.org/uniprotkb/P0A287#ptm_processing)

# 3. Acetylation

We annotate both N-terminal acetylation and acetylation on internal residues.

Related keyword: [Acetylation](https://www.uniprot.org/keywords/7)

## N-terminal acetylation

N-terminal acetylation is one of the most common post-translational modifications in eukaryotes, but it is rare in prokaryotes. It refers to the addition of an acetyl group from acetyl-CoA to the alpha-amino group of the first residue of a protein, often after the cleavage of the initiator methionine. The most commonly acetylated residues are glycine, alanine, serine or threonine. This reaction occurs in the cytosol. Methionine residues can also be modified if the next residue is an aspartate, glutamate, leucine, isoleucine, tryptophan, phenylalanine or asparagine residue. Note that the modified position may not correspond to the first amino acid of the displayed sequence if N-terminal acetylation occurs after proteolytic processing of the chain.

We annotate experimentally determined sites of N-terminal acetylation and this information is propagated 'By similarity' to homologous proteins in related species.

Examples: [P23542](https://www.uniprot.org/uniprotkb/P23542#ptm_processing), [P68251](https://www.uniprot.org/uniprotkb/P68251#ptm_processing), [P01201](https://www.uniprot.org/uniprotkb/P01201#ptm_processing), [P41682](https://www.uniprot.org/uniprotkb/P41682#ptm_processing), [Q71SP7](https://www.uniprot.org/uniprotkb/Q71SP7#ptm_processing)

## Internal acetylation

Internal acetylation is the addition of a N-alpha-acetyl group from acetyl-CoA to the side chain of a lysine residue. In eukaryotes, it generally takes place in the nucleus and affects mainly, but not exclusively, histones. It also occurs in prokaryotes.

Lysine acetylation can compete with acetylation on the same residue, in which case both modifications are described as 'alternate'.

We annotate experimentally determined sites of internal acetylation and propagate the information 'By similarity' to homologous proteins in related species.

Examples: [P0C0S9](https://www.uniprot.org/uniprotkb/P0C0S9#ptm_processing), [Q12158](https://www.uniprot.org/uniprotkb/Q12158#ptm_processing), [Q9NHD5](https://www.uniprot.org/uniprotkb/Q9NHD5#ptm_processing), [Q8ZKF6](https://www.uniprot.org/uniprotkb/Q8ZKF6#ptm_processing), [Q88EH6](https://www.uniprot.org/uniprotkb/Q88EH6#ptm_processing)

# 4. Amidation

The C-terminus of secreted proteins is often modified by cleavage between the amino group and the alpha carbon of a C-terminal glycine, resulting in the amidation of the precedent amino acid. This modification protects the C-terminus from degradation by proteases. Amidated proteins contain a signal peptide and are often processed prior to amidation in order to expose a glycine at C-terminus. Amidation has been observed in eukaryotes including mammals, non-mammalian vertebrates and insects, but not in plants.

Related keyword: [Amidation](https://www.uniprot.org/keywords/27)

The sequence including the amidated position generally conforms to the consensus cleavage sequence for proconvertases, which is G\[RK\] or G\[RK\]\[RK\]. Following proconvertase cleavage, removal of the pair of basic residues is accomplished by carboxypeptidase H, while the terminal glycine is converted to a new C-terminal amide by the bifunctional peptidylglycine alpha-amidating monooxygenase (PAM).

We annotate experimentally determined sites of amidation, which may be propagated to homologous proteins in related species. For each amidation, we specify the position of the glycine which provides the amide group, provided it is present within the mature protein chain. We also specify the position at which the protein is cleaved, if that is known, and the limits of the peptide which is removed by cleavage. For aspartate and glutamate amides the position of the amide is also indicated as the side chains of these amino acids can theoretically be modified to amides by a different reaction.

Examples: [P58913](https://www.uniprot.org/uniprotkb/P58913#ptm_processing), [P09859](https://www.uniprot.org/uniprotkb/P09859#ptm_processing)

## Terminal amidation

Examples: [P69148](https://www.uniprot.org/uniprotkb/P69148#ptm_processing), [P82387](https://www.uniprot.org/uniprotkb/P82387#ptm_processing)

## Glutamate amidation

Example: [P20481](https://www.uniprot.org/uniprotkb/P20481#ptm_processing)

# 5. Pyrrolidone carboxylic acid

The N-terminal glutamine of extracellular and multi-pass membrane proteins can be modified by cyclization of the glutamine via condensation of the alpha-amino group with the side-chain carboxyl group. Modified proteins show an increased half-life. Modified proteins of this type cannot be sequenced by the Edman method, they are blocked.

This modification can also occur from a glutamate residue but this seems to be extremely rare, and may be correlated with an extreme acidic context of the protein involved. We specify it by indicating 'Pyrrolidone carboxylic acid (Glu)' in the 'Description' field.

This modification has been observed in eukaryotes (including mammals, plants, insects), archaea (including halobacteria) and bacteria (including proteobacteria and actinobacteria).  
Synonyms: pyrrolidone carboxylic acid (Pca), pyroglutamic acid (Pga), pyroglutamate (pyro-Glu, pGlu, Pyr).  
_Note_ : Pyro-Glu is often indicated in papers as 'pGlu' and sometimes, in one-letter code as "U", although this is now used for selenocysteine. In figures of publications, it may be cited as Z, pQ or E.

Examples: [P30233](https://www.uniprot.org/uniprotkb/P30233#ptm_processing), [P02945](https://www.uniprot.org/uniprotkb/P02945#ptm_processing)

Related keyword: [Pyrrolidone carboxylic acid](https://www.uniprot.org/keywords/873)

We annotate experimentally identified pyrrolidone carboxylic acid modifications, which may be propagated to homologous proteins in related species. When the N-terminal glutamine of an extracellular protein is known to be blocked, we annotate it as a pyrrolidone carboxylic acid with the evidence 'Curated'.

Example: [P12111](https://www.uniprot.org/uniprotkb/P12111#ptm_processing)

# 6. Isomerization

In the translation process, only L-amino acids are incorporated into nascent polypeptides by the ribosomes. However, a variety of amino acids in secreted peptides are post-translationally converted to the D-form, probably via a deprotonation-reprotonation mechanism at the alpha-carbon. This modification has a strong effect on protein conformation and thus on protein activity and interactions. This modification has been found in secreted neuropeptides, toxins and hormones from molluscs, frogs, crustaceans, arachnids, and in bacterial lantibiotics. Synonyms: racemization, epimerisation, stereoinversion.

Example: [P35904](https://www.uniprot.org/uniprotkb/P35904#ptm_processing)

Related keyword: [D-amino acid](https://www.uniprot.org/keywords/208)

D-alanine can originate from both alanine and serine. The name of the original amino acid is given in brackets in the 'Description' field.

Examples: [O93456](https://www.uniprot.org/uniprotkb/O93456#ptm_processing), [P23826](https://www.uniprot.org/uniprotkb/P23826#ptm_processing)

2 stereoisomers of L-isoleucine can exist: D-allo-isoleucine and D-threo-isoleucine. However, only the allo-isomer has been observed so far.

Example: [P29006](https://www.uniprot.org/uniprotkb/P29006#ptm_processing)

When D-amino acids are found as partners of a cross-link, it is indicated in the 'Cross-link' subsection.  
Examples: [P08136](https://www.uniprot.org/uniprotkb/P08136#ptm_processing), [O07623](https://www.uniprot.org/uniprotkb/O07623#ptm_processing)

# 7. Hydroxylation

The modified amino acids are generally extracellular (secreted proteins, extracellular matrix proteins, multi-pass membrane proteins).

In animals, 3-hydroxyproline, 4-hydroxyproline and 5-hydroxylysine are mostly found in collagen and collagen-like domain-containing proteins. 4-hydroxyprolines have been shown to stabilize the collagen triple helix. Some of the hydroxylysines are further modified by O-glycosylation. In plants 4-hydroxyproline is mostly found in structural components of cell walls (hydroxyproline-rich glycoproteins, e.g. extensins, proline-rich proteins, arabinogalactan proteins). In most of the extensin and extensin-like domain-containing proteins, hydroxyprolines are further O-glycosylated. 4-hydroxyproline is also found in secreted neuropeptides, toxins, anti-fungal and anti-bacterial peptides of several molluscs, insects and plants.

3-hydroxyaspartate and 3-hydroxyasparagine have been found in EGF-like domain-containing proteins, e.g. blood coagulation protein factors VII, IX and X, proteins C, S, and Z, the LDL receptor and thrombomodulin.

Related keyword: [Hydroxylation](https://www.uniprot.org/keywords/379)

## Hydroxyproline

Both C3 and C4 of proline can be hydroxylated. The carbon bearing the hydroxyl group is indicated in the 'Description' field, when known. In the absence of precise information, we use the ambiguous description 'Hydroxyproline'. Note that hydroxyproline can be further glycosylated.

**4-hydroxyproline**

Examples: [Q5E9E3](https://www.uniprot.org/uniprotkb/Q5E9E3#ptm_processing), [P60245](https://www.uniprot.org/uniprotkb/P60245#ptm_processing)

**3-hydroxyproline**

Examples: [P30754](https://www.uniprot.org/uniprotkb/P30754#ptm_processing), [Q16665](https://www.uniprot.org/uniprotkb/Q16665#ptm_processing)

The information on hydroxyproline may be propagated 'By similarity' to closely related organisms.

Example: [Q15848](https://www.uniprot.org/uniprotkb/Q15848#ptm_processing)

## Hydroxylysine

**5-hydroxylysine**

Example: [Q3Y5Z3](https://www.uniprot.org/uniprotkb/Q3Y5Z3#ptm_processing)

_Note_ : Hydroxylysine can be glycosylated.

**4,5-dihydroxylysine, 3',4'-dihydroxyphenylalanine (DOPA), 3,4-dihydroxyarginine**

Examples: [O18495](https://www.uniprot.org/uniprotkb/O18495#ptm_processing), [Q25460](https://www.uniprot.org/uniprotkb/Q25460#ptm_processing), [O18496](https://www.uniprot.org/uniprotkb/O18496#ptm_processing)

## Hydroxyasparagine

**3-hydroxyasparagine**, **3-hydroxyaspartate**.

Examples: [Q8CG16](https://www.uniprot.org/uniprotkb/Q8CG16#ptm_processing), [O88278](https://www.uniprot.org/uniprotkb/O88278#ptm_processing)

# 8. Sulfation

Extracellular tyrosines of secreted and multi-pass membrane proteins can  
be modified by the addition of a sulfate group. Cytoplasmic serine and threonine residues can also undergo sulfation, although very rarely. Although the function of this modification has not yet been fully elucidated, it may serve to enhance protein stability and modulate protein-protein interactions. When carbohydrates attached to proteins are sulfated, we indicate this fact in the '[Post-translational modification](https://www.uniprot.org/help/post-translational_modification)' subsection. Sulfation has been observed in eukaryotes only.

Related keyword: [Sulfation](https://www.uniprot.org/keywords/765)

Carbohydrates attached to proteins can also be sulfated, this is annotated in the 'Post-translational modification' subsection, but won't lead to the attribution of the keyword 'Sulfation', which applies only to the modification of the protein itself, but not to the attached carbohydrate groups.

## Tyrosine sulfation

Example: [Q7LZ52](https://www.uniprot.org/uniprotkb/Q7LZ52#ptm_processing)

## Serine and threonine sulfation:

Examples: [Q01974](https://www.uniprot.org/uniprotkb/Q01974#ptm_processing), [Q8IIJ9](https://www.uniprot.org/uniprotkb/Q8IIJ9#ptm_processing)

We annotate not only experimentally determined sites of tyrosine sulfation (as well as that on serine and threonine residues), but also tyrosine sulfation sites predicted with the ['Sulfinator'](https://web.expasy.org/sulfinator/) tool. Sulfation prediction is taken into account only when this modification is known to occur on the protein concerned but the exact site is not known. The annotation of a predicted site is flagged with 'Sequence Analysis' (Sequence Model).  
Example: [P04439](https://www.uniprot.org/uniprotkb/P04439/entry#ptm_processing)

# 9. Flavin-binding

Enzymes involved in electron transport, oxidation and reduction often contain a flavin group (flavin mononucleotide \[FMN\]) or flavin adenine dinucleotide \[FAD\]) as a cofactor. When the cofactor is covalently bound to the protein, this is considered as a post-translational modification and is annotated in the 'Amino acid modifications' subsection. When the cofactor is not covalently bound, the binding region is annotated in the ['Binding'](https://www.uniprot.org/help/binding) subsection. The flavin can be transferred to the hydroxyl group of a serine, threonine or tyrosine, to the one or the other nitrogen of a histidine or to the sulfhydryl group of a cysteine. Flavin-binding has been observed in all organisms.

Examples: [P21398](https://www.uniprot.org/uniprotkb/P21398#ptm_processing), [P09788](https://www.uniprot.org/uniprotkb/P09788#ptm_processing), [Q752Y3](https://www.uniprot.org/uniprotkb/Q752Y3#ptm_processing), [Q9K0M5](https://www.uniprot.org/uniprotkb/Q9K0M5#ptm_processing), [Q9KPS2](https://www.uniprot.org/uniprotkb/Q9KPS2#ptm_processing), [O34627](https://www.uniprot.org/uniprotkb/O34627#ptm_processing), [Q48303](https://www.uniprot.org/uniprotkb/Q48303#ptm_processing), [P40875](https://www.uniprot.org/uniprotkb/P40875#ptm_processing)

Related keywords: [Flavoprotein](https://www.uniprot.org/keywords/285), [FAD](https://www.uniprot.org/keywords/274), [FMN](https://www.uniprot.org/keywords/288)

# 10. Cysteine oxidation and nitrosylation

Sulfur occurs in many different oxidation states in biological systems. In response to mild oxidative stress, reactive oxygen and nitrogen species, such as peroxides, superoxide, nitric oxide or peroxinitrite, can oxidize cytoplasmic cysteines to cysteine sulfenic acid (-SOH), S-nitrosocysteine (-SNO) and sulfinic acid (-SO2H)(single, single and double oxidation state, respectively). These modifications can alter protein activity, protein-protein interactions, or protein stability.

Cysteine sulfenic acid is extremely reactive. It is generally stabilized  
by either the formation of a disulfide bond (in this case the residue is called a cystine) or glutathione binding or reduced by specific enzymes to cysteine. Disulfide bonds are annotated in the '[Disulfide bond](https://www.uniprot.org/help/disulfid)' subsection.

In response to severe oxidative stress, cysteines are irreversibly oxidized to cysteine sulfonic acid (-SO3) or cysteic acid, which generally leads to protein inactivation and degradation. We do not annotate this modification.

## Sulfenic and sulfinic acid

Example: [P13448](https://www.uniprot.org/uniprotkb/P13448#ptm_processing)

Related keyword: [Oxidation](https://www.uniprot.org/keywords/558)

## S-nitrosocysteine

Examples: [P68871](https://www.uniprot.org/uniprotkb/P68871#ptm_processing), [P0ACQ6](https://www.uniprot.org/uniprotkb/P0ACQ6#ptm_processing)

Related keyword: [S-nitrosylation](https://www.uniprot.org/keywords/702)

# Related documents

The nature of the post-translationally formed amino acid is annotated by using a controlled vocabulary. The currently defined list of controlled vocabulary, as well as other information, such as the target amino acid, the related keyword, the taxonomic range and the subcellular location of the modification, are available in [ptmlist.txt](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/ptmlist.txt) document. Links to the RESID database are also provided to help gain a better insight into every modification.

See also: [Evidence](https://www.uniprot.org/help/evidences), [Post-translational modifications](https://www.uniprot.org/help/post-translational_modification), [Advanced search](https://www.uniprot.org/help/advanced_search)
