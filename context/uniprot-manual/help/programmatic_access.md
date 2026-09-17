---
title: Programmatic access
type: help
categories: UniProtKB,UniRef,UniParc,Programmatic_access,Technical,help
---

UniProt provides several application programming interfaces (APIs) to query and access its data programmatically:

# UniProt website REST API

**What:** RESTful URLs that can be bookmarked, linked and used in programs for all entries, queries and tools available through this website. Data is available in all formats provided on the website, e.g. text, XML, RDF, FASTA, GFF, tab-separated for UniProtKB protein data.  
**Why:** Access data and tools from the UniProt website with any programming language.  
**Help articles:** [https://www.uniprot.org/help/api](https://www.uniprot.org/help/api)  
**Swagger documentation:** [https://www.uniprot.org/api-documentation/](https://www.uniprot.org/api-documentation)  

# Proteins REST API

**What:** Extended REST API with a service providing [genomic coordinates](https://www.ebi.ac.uk/proteins/api/doc/#coordinatesApi) of UniProtKB sequences, and other services providing annotations imported and mapped from Large Scale data Sources (LSS), such as 1000Genomes, ExAC, PeptideAtlas, and HPA via the [variation](https://www.ebi.ac.uk/proteins/api/doc/#/variation), [proteomics](https://www.ebi.ac.uk/proteins/api/doc/#proteomics), and [antigen](https://www.ebi.ac.uk/proteins/api/doc/#/antigen) services.  
**Why:** Access data sets mapped to UniProt and integrated through a single service.  
**Documentation:** <https://www.ebi.ac.uk/proteins/api/doc/>

# UniProt SPARQL API

**What:** [SPARQL](https://en.wikipedia.org/wiki/SPARQL) API for all UniProt data, stored in Resource Description Framework (RDF) format ([Help](https://www.uniprot.org/help/sparql)). An SQL-like graph query language that allows to perform complex queries across all UniProt data, as well as across other resources that provide a SPARQL endpoint, such as Ensembl or Wikidata.  
**Why:** Access data from UniProt, and other resources, using a low-cost alternative to importing the data into e.g. a relational database and building a local data warehouse.  
**Documentation:** [https://sparql.uniprot.org](https://sparql.uniprot.org/)

# UniProt Java API

**What:** A Java library that provides a stable remote API for programmatically accessing UniProt data.  
**Why:** Access data and tools from UniProt using Java.  
**Documentation:** <https://www.ebi.ac.uk/uniprot/japi/>
