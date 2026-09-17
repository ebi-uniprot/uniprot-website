---
title: Similar Proteins in Genomic Context from SeqHub
type: help
categories: UniProtKB,Genomic_context,help
---

Prokaryotic protein entries in UniProt include a genomic context panel, powered by SeqHub. The panel (in the Sequence section of UniProt) shows similar proteins to the current entry, each displayed in its genomic context: neighboring genes from its source genome.

![SeqHub inside UniProtKB entry pages](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/SeqHub-embed_example.png)
*Genomic context similarity within UniProtKB entry [P0A6F5](https://www.uniprot.org/uniprotkb/P0A6F5/entry)*

## Why genomic context matters

A protein's genomic neighborhood can reveal functional and evolutionary relationships that sequence similarity alone does not capture. This is especially useful for prokaryotic proteins that are uncharacterized or listed as hypothetical, but it's also informative for proteins with an established function, since neighboring genes can clarify how a protein fits into a pathway or operon and how conserved that arrangement is across organisms.

## What you're looking at

The panel is made up of up to four rows, each representing a retrieved contig containing functionally similar proteins (see Technical Details section) to what you searched in UniProt. Here's how to read it using [Chaperonin GroEL (P0A6F5)](https://www.uniprot.org/uniprotkb/P0A6F5/entry) as an example:

### 1. The pinned genes

The pinned genes (shown with a pin on the left side, centered within the row) correspond to the proteins SeqHub identified as the most functionally similar to the protein you searched in UniProt. The rows shown are the top 4 matches, out of up to 100 retrieved, ranked by functional similarity, with the closest match appearing at the top.

![Pinned genes](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_pinned.png)
<br>

### 2. Surrounding genes

The genes on either side of the pinned gene make up its genomic neighborhood, the genes physically located next to it in its source genome. Genes shown in color (vs. gray) are ones that commonly co-occur alongside the pinned match across genomes and taxa.

![Surrounding genes](<https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_surrounding genes.png>)
<br>

### 3. Percent identity and percent coverage

These two values describe how closely the pinned protein matches the sequence of the protein you searched in UniProt. Percent identity is the proportion of identical residues in the aligned region; percent coverage is the proportion of the sequence that could be aligned to the UniProt query sequence.

![Percent identity and percent coverage](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_ID.png)
<br>

### 4. Predicted functional annotation (on hover)

Hovering over any gene brings up a card with:

* Predicted protein name (e.g., “Chaperonin GroEL") based on gLM2 (Tatta Bio’s model), linked out to that protein's full entry (opens in new tab)  
* Strand, length, and genomic position (in base pairs) for that protein

![Functional annotations on mouse hover](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_hover_annotation.png)


### 5. Taxonomic lineage
Each row lists the full taxonomic lineage of the organism the contig comes from.

![Taxonomic lineage](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_taxonomic_lineage.png)
<br>

### 6. Explore more results

A link at the top of the panel ("Explore more results on SeqHub") takes you to the full set of retrieved results on SeqHub, where you can also run a new search or access other protein and genome analysis tools.

![Link to SeqHub for more results](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/Seqhub-iframe_results.png)
<br>

## Technical Methodology

The [SeqHub genomic context search](https://www.science.org/doi/10.1126/sciadv.adv5109) is powered by [gLM2](https://openreview.net/pdf?id=jlzNb1iWs3), Tatta Bio’s genomic language model. gLM2-based vector search is used to retrieve functionally similar proteins from the [OpenGenome database](https://openreview.net/pdf?id=jlzNb1iWs3), which spans 130,000+ microbial genomes and 400M+ proteins. Vector search enables [fast and scalable retrieval](https://www.science.org/doi/10.1126/sciadv.adv5109) of functionally and evolutionarily related genes that are found in conserved genomic contexts, which may be missed by traditional sequence- or structure-based search alone.

## Links

* [SeqHub](https://hubs.ly/Q04vBS3r0)  
* [SeqHub documentation](https://seqhub.org/faq)  
* [Tatta Bio full research portfolio](http://tatta.bio/research)
