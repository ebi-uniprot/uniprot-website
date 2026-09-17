---
title: Can I convert gene symbols to UniProtKB identifiers? How can I map UniProtKB IDs or ACs to gene symbols?
type: help
categories: UniProtKB,Text_search,Names_and_taxonomy,Website,faq
---

1.  **UniProtKB AC/ID to gene symbols**

    You can upload your list of UniProtKB identifiers (AC or ID) to the batch retrieval service ([ID mapping](https://www.uniprot.org/id-mapping)) and map from UniProtKB to UniProtKB. Then click on "Customize columns" to hide all columns except gene names. In the resulting page, click on "Download" and select the TSV format. To show only the recommended gene names (or only synonyms, ordered locus names (OLN) or ORF names) you can select the corresponding options from the list columns available via the "Customize columns" dialog.
    
    See also

    - [Gene names](https://www.uniprot.org/help/gene_name)
  
    You can also use the [ID mapping](https://www.uniprot.org/id-mapping) service to map directly from UniProtKB to Gene names.

3.  **gene symbols to UniProtKB identifiers**

    Go to the [ID mapping](https://www.uniprot.org/id-mapping) service and select to map from "Gene name" to UniProtKB, or to UniProtKB/Swiss-Prot if you need only reviewed entries. It is strongly recommended to specify an organism name or identifier, as gene name mappings against all organisms can produce extremely long lists of UniProtKB entries and may even cause the mapping service to fail.

    If your genes are all from an organism for which a model organism database exists and is cross-referenced to UniProtKB (e.g. HGNC, MGI, FlyBase), it is possible to retrieve all the UniProtKB entries for your genes if you have the corresponding remote database identifiers: You can upload this list to the [ID mapping](https://www.uniprot.org/id-mapping) service, and map the identifiers from that remote database to UniProtKB.

    See also

    - [Organism-specific databases](https://www.uniprot.org/database?facets=category_exact%3AOrganism-specific%20databases&query=%2A)
    - [Database identifier mapping (via 'Retrieve/ID mapping')](https://www.uniprot.org/help/id_mapping)
    - [Cross-references](https://www.uniprot.org/help/cross_references_section)

    

    Alternatively, to retrieve all entries corresponding to your query, you could build yourself a query string by concatenating all your gene names with `'or'` and prefixing them by `'gene:'` or `'gene_exact:'`. This can be done with a simple script or even using "find and replace" in a text processing program:

        gene_exact:BRAF or
        gene_exact:BRCA1 or
        gene_exact:BRCA2 or
        gene_exact:BTK or
        gene_exact:CASP10 or
        gene_exact:CASP8 or
        etc.

    Prefix this with your organism criteria, e.g. `'organism_name:"homo sapiens"'` and `'reviewed:true'` if you wish to restrict your results to reviewed UniProtKB/Swiss-Prot entries, or `'keyword:KW-1185'` to restrict to a reference proteome.

    [organism_name:"homo sapiens" and (gene_exact:braf or gene_exact:brca1 or gene_exact:brca2 or gene_exact:btk or gene_exact:casp10 or gene_exact:casp8) and reviewed:true](https://www.uniprot.org/uniprotkb?query=organism_name%3A%22homo%20sapiens%22%20AND%20%28gene_exact%3Abraf%20OR%20gene_exact%3Abrca1%20OR%20gene_exact%3Abrca2%20OR%20gene_exact%3Abtk%20OR%20gene_exact%3Acasp10%20OR%20gene_exact%3Acasp8%29%20AND%20reviewed%3Atrue)

    You can use the "Customize columns" button and [customize](https://www.uniprot.org/help/customize) your result table to show only gene names and UniProtKB identifiers, and then download the table (see 1. above).

    With long query strings, you may reach supported query string length limits. Should you run into problems (e.g. empty pages) please consider making POST requests, or splitting up your query.

    See also

    - [REST API - Access the UniProt website programmatically](https://www.uniprot.org/help/api)
    - [Programmatic access - Mapping database identifiers](https://www.uniprot.org/help/id_mapping)
    - [Customize display options](https://www.uniprot.org/help/customize)
