---
title: ID Mapping
type: help
categories: Website,help
---

## Overview

The ID mapping service can map between the identifiers used in one database, to the identifiers of another, e.g., from UniProt to Ensembl, or to PomBase, etc. If you map to [UniProtKB](https://www.uniprot.org/help/uniprotkb), [UniParc](https://www.uniprot.org/help/uniparc) or [UniRef](https://www.uniprot.org/help/uniref) data, the full entries will be returned to you for convenience.

This document serves as a basic guide to using the ID mapping services offered.

### Where to find the ID mapping tool

You can access the ID mapping tool directly from various sections of the UniProt website:

* Main toolbar: Easily accessible in the top left of the navigation toolbar.  
* [Basket](https://www.uniprot.org/help/basket): Select and map sequences stored in your basket.  
* UniProtKB, UniRef and UniParc results pages: directly from search results by selecting the results of interest and then selecting ‘Map IDs’ in the ‘Tools’ dropdown menu.  
* Programmatically via the [/idmapping](https://www.uniprot.org/api-documentation/idmapping) end point.

## The ID mapping job submission form

### Input identifiers

You can submit identifiers in multiple ways:

* Pre-populated e.g. from selections made in your search results or your basket.  
* Entry identifiers entered manually, separated by whitespace (space, tab, newline) or commas.  
* Text file upload: Upload a text file containing the entry IDs to map in a comma separated format.

Supported UniProt identifiers include:

| Database identifier | Identifier example | Description |
| ----- | ----- | ----- |
| UniProt AC/ID | P00750 | UniProt provides protein sequence and functional information. Each entry is assigned a stable accession number (e.g., P05067) that uniquely identifies a specific protein. UniProt entries may be from UniProtKB/Swiss-Prot (reviewed) or UniProtKB/TrEMBL (unreviewed). |
| UniParc | UPI0000000001 | UniParc stores all unique protein sequences, regardless of source. Each unique sequence gets a [UPI](https://www.uniprot.org/help/uniparc_id) (UniParc Identifier) (e.g., UPI000000000B) that never changes, even if the sequence is later modified or removed in other databases. It ensures sequence-level tracking. |
| UniRef100<br>UniRef90<br>UniRef50 | UniRef100\_P00750 UniRef90\_P00750 UniRef50\_P00750 | UniRef groups similar protein sequences to reduce redundancy.  Identifiers are prefixed by the cluster type.<br>UniRef100: Identical sequences (e.g., UniRef100\_A0A001)<br>UniRef90: Sequences with ≥90% identity (e.g., UniRef90\_P00750)<br>UniRef50: Sequences with ≥50% identity (e.g., UniRef50\_P00750)<br>Each cluster is represented by a stable UniRef ID derived from a representative UniProt entry.  |

<br>

You may submit up to a maximum of 100,000 IDs for mapping.

### Choosing the correct ‘From’ and ‘To’ databases

The "From" database is where your list of identifiers originates. This is the database format of the IDs you currently have. The "To" database is the target database to which you want to convert or map your initial identifiers.

In essence, you provide a list of IDs in the "From" database format, and ID mapping will attempt to find the corresponding IDs in the "To" database format. For example, you might map IDs "From" RefSeq Protein "To" UniProtKB.

If you are not sure which database to select from the "From" database list, you can start with a simple text search in UniProtKB with one of your identifiers, click on the matching entry and use the browser's "Find in page" functionality to find out which database your identifier is associated with.

#### Supported databases

| Database type | Databases supported |
| ----- | ----- |
| UniProt | UniProtKB AC/ID, UniProtKB, UniProtKB/Swiss-Prot, UniParc, UniRef50, UniRef90, UniRef100, Gene Name, CRC64 |
| Sequence databases | CCDS, EMBL/GenBank/DDBJ, EMBL/GenBank/DDBJ CDS, GI number, PIR, RefSeq Nucleotide, RefSeq Protein |
| 3D structure databases | PDB |
| Protein-protein interaction databases | BioGRID, ComplexPortal, DIP, STRING |
| Chemistry | ChEMBL, DrugBank, GuidetoPHARMACOLOGY, SwissLipids |
| Protein family/group databases | Allergome, ESTHER, MEROPS, PeroxiBase, REBASE, TCDB |
| PTM databases | GlyConnect |
| Genetic variation databases | BioMuta, DMDM |
| Proteomic databases | CPTAC, ProteomicsDB |
| Protocols and materials databases | DNASU |
| Genome annotation databases | Ensembl, Ensembl Genomes, Ensembl Genomes Protein, Ensembl Genomes Transcript, Ensembl Protein, Ensembl Transcript, GeneID, KEGG, PATRIC, UCSC, WBParaSite, WBParaSite Transcript/Protein |
| Organism-specific databases | ArachnoServer, Araport, CGD, ConoServer, dictyBase, EchoBASE, euHCVdb, FlyBase, GeneCards, GeneReviews, HGNC, LegioList, Leproma, MaizeGDB, MGI, MIM, neXtProt, OpenTargets, orphanet, PharmGKB, PomBase, PseudoCAP, RGD, SGD, TubercuList, VEuPathDB, VGNC, WormBase, WormBase Protein, WormBase Transcript, Xenbase, ZFIN |
| Phylogenomic databases | eggNOG, GeneTree, HOGENOM, OMA, OrthoDB, TreeFam |
| Enzyme and pathway databases | BioCyc, PlantReactome, Reactome, UniPathway |
| Miscellaneous | ChiTaRS, GeneWiki, GenomeRNAi, PHI-base |
| Gene expression databases | CollecTF |
| Family and domain databases | DisProt, IDEAL |

<br>

### Job name

By default, the job name is auto-generated based on the submitted identifiers. Customising the name will allow you to find your ID Mapping results quickly in your tools dashboard.

## Programmatic Access for ID Mapping

ID mapping is also available programmatically. For documentation regarding programmatic access and API usage, please refer to the links below:

* [Programmatic access for ID mapping](https://www.uniprot.org/help/id_mapping_prog)  
* [UniProt API](https://www.uniprot.org/api-documentation/idmapping)

## See also

[Can I convert gene symbols to UniProtKB identifiers?](https://www.uniprot.org/help/gene_symbol_mapping)
