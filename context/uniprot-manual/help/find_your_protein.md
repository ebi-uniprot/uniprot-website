---
title: Find your protein
type: help
categories: Get_started,UniProtKB
---
The UniProt Knowledgebase ([UniProtKB](https://www.uniprot.org/help/uniprotkb)) is the central hub for the collection of functional information on proteins, with accurate, consistent and rich annotation. UniProtKB consists of [two sections](https://www.uniprot.org/help/uniprotkb_sections), one containing [manually annotated](https://www.uniprot.org/help/manual_curation) reviewed/SwissProt proteins entries and the other containing [computationally annotated](https://www.uniprot.org/help/automatic_annotation) unreviewed/TrEMBL protein entries. 

UniProtKB entries can be searched in a number of different ways.

# Finding proteins using the website search 

On the UniProt website [homepage](https://www.uniprot.org/) and at the top of all UniProt pages, you can use the search bar (with the UniProtKB database selected in the dropdown box on the left) and enter a free text query to search. A general free text search of UniProtKB will return all entries that contain the query search term within any section of the protein entry. More information can be found in the “[How to search UniProt](https://www.ebi.ac.uk/training/online/courses/uniprot-exploring-protein-sequence-and-functional-info/how-to-search-uniprot/)” section of our online training tutorial.

Performing an [advanced search](https://www.uniprot.org/help/advanced_search) will allow you to restrict terms to specific fields or to combine multiple terms using boolean logic, therefore narrowing the search and returning a more targeted [table of results](https://www.ebi.ac.uk/training/online/courses/uniprot-exploring-protein-sequence-and-functional-info/how-to-search-uniprot/viewing-search-results/). The results table can be [customized](https://www.uniprot.org/help/customize) to display data of interest, and the results can be downloaded in multiple formats using the ‘Download’ link at the top of the table. 
More information can be found in the “[Advanced search](https://www.ebi.ac.uk/training/online/courses/uniprot-exploring-protein-sequence-and-functional-info/how-to-search-uniprot/advanced-search/)” section of our online training tutorial.


# Finding proteins using BLAST search 

Proteins can also be found by [searching for similar amino acid sequences](https://www.uniprot.org/help/blast-submission) using the [BLAST](https://www.uniprot.org/blast) sequence similarity search, available on the UniProt homepage, on the tool bar and within a protein entry page. 

It is important to note that the annotations in unreviewed entries, including protein and gene names, depend on what the original authors have submitted to the [nucleotide sequence](https://www.uniprot.org/help/sequence_origin) databases, or on what [automatic annotation](https://www.uniprot.org/help/automatic_annotation) procedures have been able to attribute.
As a result, the database may well contain a sequence for your protein of interest, but it may not have been curated/characterized as such. You can therefore start by looking for a reliable, preferably reviewed sequence for your gene of interest, from a closely rated organism, and submit it to a [sequence similarity search](https://www.uniprot.org/blast).

When a protein entry of interest is sparsely annotated, performing a sequence similarity search may identify a similar protein entry with more annotation coverage that may be of interest.

For a detailed walkthrough of our BLAST tool, see our [online training tutorial](https://www.ebi.ac.uk/training/online/courses/uniprot-exploring-protein-sequence-and-functional-info/how-to-use-uniprot-tools-clone/blast-sequence-similarity-searching/).

# Finding proteins programmatically

UniProt has several application programming interfaces (API) which users can query, see our [programmatic access](https://www.uniprot.org/help/programmatic_access) page for information on each of our APIs.

Protein entries in UniProtKB can be queried through the [UniProt website REST API](https://www.uniprot.org/api-documentation/uniprotkb) using the same search fields as those available in the website’s [advanced search](https://www.uniprot.org/help/advanced_search).This allows users to build their search query interactively on the website, and verify that the results correspond to what is expected. Once the result is as intended, results table columns can be [customized](https://www.uniprot.org/help/customize) to display required information from the entries. The ‘Download’ option at the top of the results table gives users a ‘Generate URL for API’ link that can be directly used in programmatic queries of the UniProt website REST API.

Full documentation is available, as is a complete list of the valid [search fields](https://rest.uniprot.org/configure/uniprotkb/result-fields).

Additional protein information can also be found in the [Proteins REST API](https://www.ebi.ac.uk/proteins/api/doc/).
