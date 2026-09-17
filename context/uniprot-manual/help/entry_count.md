---
title: How can I (programmatically) obtain the number of results returned by my query?
type: help
categories: Programmatic_access,Text_search,Technical,faq
---

If you are accessing UniProt programmatically, using our [REST API](https://www.uniprot.org/help/api), and are just interested in the number of entries returned by your query, but not in downloading or listing all the hits, you can check the `X-Total-Results` response header.

This returns the entry count, allowing you to count the hits without actually retrieving them.

# See also

-   [REST API - Access the UniProt website programmatically](https://www.uniprot.org/help/api)
