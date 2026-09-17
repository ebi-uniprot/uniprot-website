---
title: Evidence
type: help
categories: manual
---

# Table of contents

- [Introduction](https://www.uniprot.org/help/evidences#introduction)
- [Evidence types used for UniProtKB annotations](https://www.uniprot.org/help/evidences#evidence-types-used-for-uniprotkb-annotations)
- [Evidence types used for GO annotations](https://www.uniprot.org/help/evidences#evidence-types-used-for-go-annotations)
- [Related documents](https://www.uniprot.org/help/evidences#related-documents)

# Introduction

Most information in UniProtKB has one or several "evidence tags" which describe the source of the information, e.g. an experiment that has been published in the scientific literature, an orthologous protein, a record from another database, etc.

Formally, an evidence is described by a mandatory **evidence type**, represented by a code from the [Evidence and Conclusion Ontology](https://evidenceontology.org/) (ECO) and, where applicable, the **source of the information**, which is usually a database record (articles from the scientific literature are represented as PubMed records, but in the case of publications that are not in PubMed we indicate instead the corresponding UniProtKB reference number).

ECO comprises two high-level classes, **evidence** and **assertion method**. Evidence is defined as a type of information that is used to support an assertion and assertion method is defined as a means by which a statement is made about an entity. Together evidence and assertion method can be used to describe both the support for an assertion and whether that assertion was made by a human being or a computer. UniProtKB is using only codes that combine evidence and assertion method.

Here are some examples of how evidence descriptions look in the UniProtKB flat file format:

- An evidence type without source: `{type}`, e.g.

```
{ECO:0000305}
{ECO:0000250}
{ECO:0000255}
```

- An evidence type with source: `{type|source}`, e.g.

```
{ECO:0000269|PubMed:24356955}
{ECO:0000303|Ref.6}
{ECO:0000305|PubMed:22388736}
{ECO:0000250|UniProtKB:P11497}
{ECO:0000255|HAMAP-Rule:MF_03130}
{ECO:0000256|HAMAP-Rule:MF_03130}
{ECO:0000312|EMBL:AAY86039.1}
{ECO:0000313|EMBL:AAY86039.1}
{ECO:0007744|PDB:1V90}
{ECO:0007829|PDB:1V90}
```

- Several evidence attributions: `{type|source, type|source,...}`, e.g.

```
{ECO:0000269|PubMed:10433554, ECO:0000303|Ref.6}
```

On the website, these descriptions are transformed to make them more user-friendly.
The ECO codes are replaced by easy to understand labels and the sources are accessible by clicking on the label to list the hyper-linked sources.
Evidences that are used in manual assertions are marked with a gold banner.
Their labels could be containing these example texts and contents:

- 1 Publication
  - Manual assertion based on experiment
- By similarity
  - Manual assertion inferred from sequence similarity
- UniRule annotation
  - Manual assertion according to rules
  - [HAMAP-Rule:MF_03130](https://hamap.expasy.org/rule/MF_03130)
- Imported
  - Manual assertion inferred from database entries
  - [EMBL:AAY86039.1](https://www.ebi.ac.uk/ena/browser/view/AAY86039)
  - [MGI:87860](https://www.informatics.jax.org/marker/MGI:87860)

and those that are used in automatic assertions are colored blue, with texts like:

- UniRule annotation
  - Automatic assertion according to rules
  - PIRNR:PIRNR036489
- Imported
  - Automatic assertion inferred from database entries
  - [EMBL:ABC70327.1](https://www.ebi.ac.uk/ena/browser/view/ABC70327)
  - [MGI:96952](https://www.informatics.jax.org/marker/MGI:96952)

# Evidence types used for UniProtKB annotations

## Evidence used only in manual assertions

<h3 id="ECO:0000269">Experimental evidence</h3>

We use the ECO code [ECO:0000269](https://www.ebi.ac.uk/QuickGO/term/ECO:0000269) for manually curated information for which there is published experimental evidence. The PubMed identifier of the publication(s) which is the original source of the information is provided (for publications that are not in PubMed we indicate instead the corresponding UniProtKB reference number(s)).

Example: [D9N129](https://www.uniprot.org/uniprotkb/D9N129#function)

- 1 Publication

  - Manual assertion based on experiment

- **"The WD40-repeat proteins WDR-20 and WDR-48 bind and activate the deubiquitinating enzyme USP-46 to promote the abundance of the glutamate receptor GLR-1 in the ventral nerve cord of Caenorhabditis elegans."**  
  [Moremen K.W.](https://www.uniprot.org/uniprotkb?query=lit_author:%22Moremen+K.W.%22), [Touster O.](https://www.uniprot.org/uniprotkb?query=lit_author:%22Touster+O.%22), [Robbins P.W.](https://www.uniprot.org/uniprotkb?query=lit_author:%22Robbins+P.W.%22)  
  J. Biol. Chem. 266:16876-16885(1991) \[ [PubMed](https://pubmed.ncbi.nlm.nih.gov/1885615) \] \[ [Europe PMC](https://europepmc.org/abstract/MED/1885615) \] \[ [Abstract](https://www.uniprot.org/citations/1885615) \] **Cited for:** PROTEIN SEQUENCE OF <a href="https://www.uniprot.org/blast/?about=P28494%5B107-136%5D" class="tooltipped blastSubsequences" title="View this subsequence or run a BLAST search on it.">107-136</a> AND <a href="https://www.uniprot.org/blast/?about=P28494%5B478-496%5D" class="tooltipped blastSubsequences" title="View this subsequence or run a BLAST search on it.">478-496</a>, CATALYTIC ACTIVITY, ACTIVITY REGULATION, SUBUNIT, SUBCELLULAR LOCATION, TISSUE SPECIFICITY, GLYCOSYLATION.

```
CC   -!- FUNCTION: Together with wdr-20, binds to and stimulates the activity of
CC       the deubiquitinating enzyme usp-46, leading to deubiquitination and
CC       stabilization of the glr-1 glutamate receptor.
CC       {ECO:0000269|PubMed:24356955}.
```

<h3 id="ECO:0000303">Non-traceable author statement evidence</h3>

We use the ECO code [ECO:0000303](https://www.ebi.ac.uk/QuickGO/term/ECO:0000303) for manually curated information that is based on statements in scientific articles for which there is no experimental support. The PubMed identifier of the paper(s) which is the original source of the information is provided (for publications that are not in PubMed we indicate instead the corresponding UniProtKB reference number(s)).

Example: [P28494](https://www.uniprot.org/uniprotkb/P28494#function)

- 1 Publication

  - Manual assertion based on opinion

- **"Novel purification of the catalytic domain of Golgi alpha-mannosidase II. Characterization and comparison with the intact enzyme."**  
  [Ferrante A.W. Jr.](https://www.uniprot.org/?query=lit_author:%22Ferrante+A.W.+Jr.%22), [Reinke R.](https://www.uniprot.org/?query=lit_author:%22Reinke+R.%22), [Stanley E.R.](https://www.uniprot.org/?query=lit_author:%22Stanley+E.R.%22)  
  [Proc. Natl. Acad. Sci. U.S.A. 92:1911-1915(1995)](https://dx.doi.org/10.1073/pnas.92.6.1911) \[ [PubMed](https://www.ncbi.nlm.nih.gov/pubmed/7892198) \] \[ [Europe PMC](https://europepmc.org/abstract/MED/7892198) \] \[ [Abstract](https://www.uniprot.org/citations/7892198) \] **Cited for** : NUCLEOTIDE SEQUENCE \[MRNA\], FUNCTION, SUBCELLULAR LOCATION, TISSUE SPECIFICITY, DEVELOPMENTAL STAGE.

```
CC   -!- FUNCTION: Catalyzes the first committed step in the biosynthesis of
CC       complex N-glycans. It controls conversion of high mannose to complex N-
CC       glycans; the final hydrolytic step in the N-glycan maturation pathway.
CC       {ECO:0000303|PubMed:1885615}.
```

<h3 id="ECO:0000305">Curator inference evidence</h3>

We use the ECO code [ECO:0000305](https://www.ebi.ac.uk/QuickGO/term/ECO:0000305) for manually curated information which has been inferred by a curator based on his/her scientific knowledge or on the scientific content of an article. If the information is inferred from the scientific content of an article, the PubMed identifier of the supporting paper is provided (for publications that are not in PubMed we indicate instead the corresponding UniProtKB reference number(s)).

Example: [Q9UKV3](https://www.uniprot.org/uniprotkb/Q9UKV3#miscellaneous)

- 1 Publication

  - Manual assertion inferred from experiment in

- **"The structure of the ASAP core complex reveals the existence of a Pinin-containing PSAP complex."**  
  [Murachelli A.G.](https://www.uniprot.org/?query=lit_author:%22Murachelli+A.G.%22), [Ebert J.](https://www.uniprot.org/?query=lit_author:%22Ebert+J.%22), [Basquin C.](https://www.uniprot.org/?query=lit_author:%22Basquin+C.%22), [Le Hir H.](https://www.uniprot.org/?query=lit_author:%22Le+Hir+H.%22), [Conti E.](https://www.uniprot.org/?query=lit_author:%22Conti+E.%22)  
  [Nat. Struct. Mol. Biol. 19:378-386(2012)](https://dx.doi.org/10.1038/nsmb.2242) \[ [PubMed](https://www.ncbi.nlm.nih.gov/pubmed/22388736) \] \[ [Europe PMC](https://europepmc.org/abstract/MED/22388736) \] \[ [Abstract](https://www.uniprot.org/citations/22388736) \] **Cited for** : INTERACTION WITH RNPS1, COMPOSITION OF THE ASAP COMPLEX, FUNCTION OF THE ASAP COMPLEX.

```
CC   -!- CAUTION: Structural and functional studies of the ASAP complex have
CC       been conducted with a chimeric complex involving a conserved fragment
CC       of Drosophila melanogaster Acinus/hkl. {ECO:0000305|PubMed:22388736}.
```

Example: [P62196](https://www.uniprot.org/uniprotkb/P62196#ptm_processing)

- 1 Publication

  - Manual assertion inferred from experiment in

- **"Mapping the murine cardiac 26S proteasome complexes."**  
  [Gomes A.V.](https://www.uniprot.org/?query=lit_author:%22Gomes+A.V.%22), [Zong C.](https://www.uniprot.org/?query=lit_author:%22Zong+C.%22), [Edmondson R.D.](https://www.uniprot.org/?query=lit_author:%22Edmondson+R.D.%22), [Li X.](https://www.uniprot.org/?query=lit_author:%22Li+X.%22), [Stefani E.](https://www.uniprot.org/?query=lit_author:%22Stefani+E.%22), [Zhang J.](https://www.uniprot.org/?query=lit_author:%22Zhang+J.%22), [Jones R.C.](https://www.uniprot.org/?query=lit_author:%22Jones+R.C.%22), [Thyparambil S.](https://www.uniprot.org/?query=lit_author:%22Thyparambil+S.%22), [Wang G.W.](https://www.uniprot.org/?query=lit_author:%22Wang+G.W.%22), [Qiao X.](https://www.uniprot.org/?query=lit_author:%22Qiao+X.%22), [Bardag-Gorce F.](https://www.uniprot.org/?query=lit_author:%22Bardag-Gorce+F.%22), [Ping P.](https://www.uniprot.org/?query=lit_author:%22Ping+P.%22)  
  [Circ. Res. 99:362-371(2006)](https://dx.doi.org/10.1161/01.RES.0000237386.98506.f7) \[ [PubMed](https://www.ncbi.nlm.nih.gov/pubmed/16857966) \] \[ [Europe PMC](https://europepmc.org/abstract/MED/16857966) \] \[ [Abstract](https://www.uniprot.org/citations/16857966) \] **Cited for** : IDENTIFICATION IN THE 19S PROTEASOME REGULATORY COMPLEX, ACETYLATION AT ALA-2.

```
FT   INIT_MET        1
FT                   /note="Removed"
FT                   /evidence="ECO:0000305|PubMed:16857966"
```

<h3 id="ECO:0000250">Sequence similarity evidence</h3>

We use the ECO code [ECO:0000250](https://www.ebi.ac.uk/QuickGO/term/ECO:0000250) for manually curated information which has been propagated from a related experimentally characterized protein. The accession number of the experimental source is provided (except for some historic UniProtKB/Swiss-Prot annotations, see [Why don't all UniProtKB/Swiss-Prot annotations have evidence?](https://www.uniprot.org/faq/evidence_in_swissprot)).

Example: [D3DJ41](https://www.uniprot.org/uniprotkb/D3DJ41#ptm_processing)

- By similarity
  - Manual assertion inferred from sequence similarity
  - [UniProtKB:P11498](https://www.uniprot.org/uniprotkb/P11498)

```
FT   MOD_RES         609
FT                   /note="N6-biotinyllysine"
FT                   /evidence="ECO:0000250|UniProtKB:P11498,
FT                   ECO:0000255|PROSITE-ProRule:PRU01066"
```

## Evidence used in manual and automatic assertions

<h3 id="ECO:0000255">Sequence model evidence</h3>

We use the ECO code [ECO:0000255](https://www.ebi.ac.uk/QuickGO/term/ECO:0000255) in manual assertions and [ECO:0000256](https://www.ebi.ac.uk/QuickGO/term/ECO:0000256) (and its descendant code [ECO:0000259](https://www.ebi.ac.uk/QuickGO/term/ECO:0000259)) in automatic assertions, respectively, for information which has been generated by the UniProtKB [automatic annotation](https://www.uniprot.org/help/automatic_annotation) system. The database name and identifier of the sequence model rule that has been used by the system are provided.

The ECO code [ECO:0000255](https://www.ebi.ac.uk/QuickGO/term/ECO:0000255) is also used for information which has been generated by various sequence analysis programs that are used during the manual curation process and which has been verified by a curator.

Example: [P0A940](https://www.uniprot.org/uniprotkb/P0A940#family_and_domains)

- UniRule annotation

  - Manual assertion according to rules
  - [HAMAP-Rule:MF_00979](https://hamap.expasy.org/rule/MF_00979)

- PROSITE-ProRule annotations

  - Manual assertion according to rules
  - [PROSITE-ProRule:PRU00169](https://prosite.expasy.org/rule/PRU00169)

- Sequence Analysis
  - Manual assertion according to rules

```
CC   -!- SIMILARITY: Belongs to the BamA family. {ECO:0000255|HAMAP-
CC       Rule:MF_01430}.
FT   TOPO_DOM        790..803
FT                   /note="Extracellular; loop 8"
FT                   /evidence="ECO:0000305"
FT   TRANSMEM        804..808
FT                   /note="Beta stranded; Name=Strand 16"
FT                   /evidence="ECO:0000269|PubMed:24914988"
FT   DOMAIN          24..91
FT                   /note="POTRA 1"
FT                   /evidence="ECO:0000255|PROSITE-ProRule:PRU01115,
FT                   ECO:0000305|PubMed:14559180"
```

Example: [Q86NT5](https://www.uniprot.org/uniprotkb/Q86NT5#function)

- UniRule annotation

  - Automatic assertion according to rules
  - [PIRSR000106-3](https://www.uniprot.org/unirule/UR000176873)

- UniRule annotation

  - Automatic assertion according to rules
  - [RuleBase:RU003426](https://www.uniprot.org/unirule/UR000000446)

- Sequence analysis
  - Automatic assertion according to rules
  - [SAM:Phobius](https://www.uniprot.org/help/sam)

```
CC   -!- SIMILARITY: Belongs to the malic enzymes family.
CC       {ECO:0000256|ARBA:ARBA00008785, ECO:0000256|RuleBase:RU003426}.
KW   Membrane {ECO:0000256|SAM:Phobius};
KW   Metal-binding {ECO:0000256|ARBA:ARBA00022723,
KW   ECO:0000256|PIRSR:PIRSR000106-3};
KW   Oxidoreductase {ECO:0000256|RuleBase:RU003426,
KW   ECO:0000313|EMBL:AAF58000.3};
KW   Reference proteome {ECO:0000313|Proteomes:UP000000803};
KW   Transmembrane {ECO:0000256|SAM:Phobius};
KW   Transmembrane helix {ECO:0000256|SAM:Phobius}.
FT   TRANSMEM        327..345
FT                   /note="Helical"
FT                   /evidence="ECO:0000256|SAM:Phobius"
FT   METAL           277
FT                   /note="Divalent metal cation"
FT                   /evidence="ECO:0000256|PIRSR:PIRSR000106-3"
```

<h3 id="ECO:0000312">Imported information evidence</h3>

We use the ECO code [ECO:0000312](https://www.ebi.ac.uk/QuickGO/term/ECO:0000312) in manual assertions and [ECO:0000313](https://www.ebi.ac.uk/QuickGO/term/ECO:0000313) in automatic assertions, respectively, for information which has been imported from another database. The database name and identifier of the entry from which the information has been imported are provided.

Example: [Q4JIM5](https://www.uniprot.org/uniprotkb/Q4JIM5#names_and_taxonomy)

- Imported
  - Manual assertion inferred from database entries
  - [EMBL:AAY86039.1](https://www.ebi.ac.uk/ena/browser/view/AAY86039)
  - [MGI:87860](https://www.informatics.jax.org/marker/MGI:87860)

```
GN Name=Abl2 {ECO:0000312|EMBL:AAY86039.1, ECO:0000312|MGI:MGI:87860};
```

Example: [Q2L9A9](https://www.uniprot.org/uniprotkb/Q2L9A9#names_and_taxonomy)

- Imported
  - Automatic assertion inferred from database entries
  - [EMBL:ABC70327.1](https://www.ebi.ac.uk/ena/browser/view/ABC70327)
  - [MGI:96952](https://www.informatics.jax.org/marker/MGI:96952)

```
GN Name=Mdm2 {ECO:0000313|EMBL:ABC70327.1, ECO:0000313|MGI:MGI:96952};
```

<h3 id="ECO:0007744">Combinatorial evidence</h3>

We use the ECO code [ECO:0007744](https://www.ebi.ac.uk/QuickGO/term/ECO:0007744) in manual assertions and [ECO:0007829](https://www.ebi.ac.uk/QuickGO/term/ECO:0007829) in automatic assertions, respectively, for information inferred from a combination of experimental and computational evidence. It is currently used in UniProtKB for published large-scale proteomics data and a subset of 3D structural data for which UniProt makes use of computational procedures to generate the data. If the experimental evidence is derived from a paper, the PubMed identifier of the paper is provided. For experimental data derived from the Protein Data Bank, the PDB code is provided.

Example: [P83256](https://www.uniprot.org/uniprotkb/P83256#structure)

- Combined sources
  - Manual assertion inferred from algorithms based on publications or databases entries
  - [PDB:1V90](https://www.ebi.ac.uk/pdbe-srv/view/entry/1V90)

```
FT   STRAND          5..7
FT                   /evidence="ECO:0007829|PDB:1V90"
FT   TURN            11..13
FT                   /evidence="ECO:0007829|PDB:1V90"
FT   STRAND          26..29
FT                   /evidence="ECO:0007829|PDB:1V90"
```

<h3 id="ECO:0008006">Deep learning neural network method evidence used in automatic assertion</h3>

We use the ECO code [ECO:0008006](https://www.ebi.ac.uk/QuickGO/term/ECO:0008006) in automatic assertions from deep learning neural network method evidence.

# Evidence types used for GO annotations

The [Gene Ontology (GO)](https://www.uniprot.org/help/gene-ontology) consortium had originally defined its own evidence types and later mapped them to the [Evidence and Conclusion Ontology](https://www.evidenceontology.org/) (ECO). The codes and descriptions of the original GO evidences are still widely used and are listed here with their corresponding ECO codes:

## Experimental evidence codes

- EXP: Inferred from Experiment = [ECO:0000269](https://www.ebi.ac.uk/QuickGO/term/ECO:0000269)  
  Used when experimental results indicate a gene product's function, process involvement or subcellular location.

- IDA: Inferred from Direct Assay = [ECO:0000314](https://www.ebi.ac.uk/QuickGO/term/ECO:0000314)  
  Used when a direct assay for the function, process or component indicated by the GO term is available.

- IPI: Inferred from Physical Interaction = [ECO:0000353](https://www.ebi.ac.uk/QuickGO/term/ECO:0000353)  
  Used to cover physical interactions between the gene product of interest and another molecule (ion, complex, etc.).

- IMP: Inferred from Mutant Phenotype = [ECO:0000315](https://www.ebi.ac.uk/QuickGO/term/ECO:0000315)  
  Used to describe the observations of variations or changes in a gene product, such as mutations or abnormal levels. This includes techniques, such as knockouts, overexpression, anti-sense experiments and use of specific protein inhibitors.

- IGI: Inferred from Genetic Interaction = [ECO:0000316](https://www.ebi.ac.uk/QuickGO/term/ECO:0000316)  
  Used to describe "traditional" genetic interactions, such as suppressors and synthetic lethals, as well as other techniques, such as functional complementation, rescue experiments, or inferences about a gene drawn from the phenotype of a mutation in a different gene.

- IEP: Inferred from Expression Pattern = [ECO:0000270](https://www.ebi.ac.uk/QuickGO/term/ECO:0000270)  
  Used when annotation is inferred from the timing or site of expression of a gene.

## Experimental 'high throughput' evidence codes

- HTP: Inferred from High Throughput Experiment = [ECO:0006056](https://www.ebi.ac.uk/QuickGO/term/ECO:0006056)

- HDA: Inferred from High Throughput Direct Assay = [ECO:0007005](https://www.ebi.ac.uk/QuickGO/term/ECO:0007005)

- HMP: Inferred from High Throughput Mutant Phenotype = [ECO:0007001](https://www.ebi.ac.uk/QuickGO/term/ECO:0007001)

- HGI: Inferred from High Throughput Genetic Interaction = [ECO:0007003](https://www.ebi.ac.uk/QuickGO/term/ECO:0007003)

- HEP: Inferred from High Throughput Expression Pattern = [ECO:0007007](https://www.ebi.ac.uk/QuickGO/term/ECO:0007007)

## Phylogenetically-inferred annotations

- IBA: Inferred from Biological Aspect of Ancestor = [ECO:0000318](https://www.ebi.ac.uk/QuickGO/term/ECO:0000318)  
  Used when an aspect of a descendent is inferred through the characterization of an aspect of a ancestral gene.

- IBD: Inferred from Biological aspect of Descendant = [ECO:0000319](https://www.ebi.ac.uk/QuickGO/term/ECO:0000319)

- IKR: Inferred from Key Residues = [ECO:0000320](https://www.ebi.ac.uk/QuickGO/term/ECO:0000320)

- IRD: Inferred from Rapid Divergence = [ECO:0000321](https://www.ebi.ac.uk/QuickGO/term/ECO:0000321)

## Computational analysis evidence codes

- ISS: Inferred from Sequence or Structural Similarity ~ [ECO:0000250](https://www.ebi.ac.uk/QuickGO/term/ECO:0000250)  
  Used for any analysis based on sequence alignment, structure comparison, or evaluation of sequence features, such as composition.

- ISO: Inferred from Sequence Orthology = [ECO:0000266](https://www.ebi.ac.uk/QuickGO/term/ECO:0000266)  
  Used when the assertion of orthology between the gene product and an experimentally characterized gene product in another organism is the main basis of the annotation

- ISA: Inferred from Sequence Alignment = [ECO:0000247](https://www.ebi.ac.uk/QuickGO/term/ECO:0000247)  
  Used when the primary piece of evidence is a pairwise or multiple sequence alignment.

- ISM: Inferred from Sequence Model = [ECO:0000255](https://www.ebi.ac.uk/QuickGO/term/ECO:0000255)  
  Used when any kind of sequence modeling method (e.g. Hidden Markov Models) is the primary piece of evidence

- IGC: Inferred from Genomic Context = [ECO:0000317](https://www.ebi.ac.uk/QuickGO/term/ECO:0000317)  
  Used when information about the genomic context of a gene product forms part of the evidence for a particular annotation. Genomic context includes, but is not limited to, such things as identity of neighboring genes (i.e. synteny), operon structure, and phylogenetic or other whole genome analysis.

- RCA: Inferred from Reviewed Computational Analysis ~ [ECO:0000245](https://www.ebi.ac.uk/QuickGO/term/ECO:0000245)

## Author statement evidence codes

- TAS: Traceable Author Statement = [ECO:0000304](https://www.ebi.ac.uk/QuickGO/term/ECO:0000304)  
  Used for information obtained from published articles, mostly reviews, as well as text books or dictionaries, where the original experiments are traceable.

- NAS: Non-traceable Author Statement = [ECO:0000303](https://www.ebi.ac.uk/QuickGO/term/ECO:0000303)  
  Used for statements found in a published article that cannot be traced back to another publication.

## Curator statement evidence codes

- IC: Inferred by Curator = [ECO:0000305](https://www.ebi.ac.uk/QuickGO/term/ECO:0000305)  
  Used when annotation is not supported by any evidence, but can be reasonably inferred by a curator from other GO annotations for which evidence is available.
- ND: No biological Data available = [ECO:0000307](https://www.ebi.ac.uk/QuickGO/term/ECO:0000307)

## Electronic annotation evidence code

- IEA: Inferred from Electronic Annotation = [ECO:0007669](https://www.ebi.ac.uk/QuickGO/term/ECO:0007669)  
  Used when annotation derives from computation or automated transfer from a database. These annotations have not been manually checked.

A detailed description of the evidence types can be found [here](https://geneontology.org/docs/guide-go-evidence-codes/).

# Related documents

[Why don't all UniProtKB/Swiss-Prot annotations have evidence?](https://www.uniprot.org/help/evidence_in_swissprot)  
[How can I query UniProtKB annotations by evidence?](https://www.uniprot.org/help/evidence_table) - A guide to evidence codes and labels in entry view and advanced search
