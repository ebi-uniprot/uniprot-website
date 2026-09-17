---
title: SPARQL for UniProt
type: help
categories: Technical,Programmatic_access,Text_search,UniProtKB,UniRef,UniParc,help
---

[SPARQL](https://en.wikipedia.org/wiki/SPARQL) is a [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) standardized query language for the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web). If you know SQL, it will look familiar to you and you can do similar types of queries with it. SPARQL also allows you to query and combine data from a variety of SPARQL endpoints, providing a valuable low-cost alternative to building your own data warehouse. You can combine UniProt data from [sparql.uniprot.org](https://sparql.uniprot.org/) with that from the SPARQL endpoints hosted by the [EBI's RDF platform](https://www.ebi.ac.uk/rdf/), the [SIB's neXtProt](http://snorql.nextprot.org/) SPARQL endpoint, etc.

The UniProt SPARQL endpoint is free to use. It is updated in sync with the www.uniprot.org and ftp [releases](https://www.uniprot.org/help/synchronization). As for all [programmatic access](https://www.uniprot.org/help/programmatic_access), please consider to provide a contact email address as part of the User-Agent header that your programs set. This will allow us to contact you in case of problems (see our [privacy notice](https://www.uniprot.org/help/privacy)).

Documentation about the data in the UniProt SPARQL endpoint is available [here](https://sparql.uniprot.org/.well-known/void). We use standard and community supported vocabularies ([Dublin core](https://en.wikipedia.org/wiki/Dublin_Core), [SKOS](https://en.wikipedia.org/wiki/Simple_Knowledge_Organization_System), etc.) where possible to extend our own [UniProt core vocabulary](https://purl.uniprot.org/core/).
