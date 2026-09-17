---
title: How can I download data at every UniProt release?
type: help
categories: UniProtKB,UniRef,UniParc,Download,Technical,Release,faq
---

If the data sets you need are available on our [ftp site](https://ftp.uniprot.org/pub/databases/uniprot/), we recommend that you download them from there. Other data sets can be downloaded by querying this website (read [how to retrieve entries via queries programmatically](https://www.uniprot.org/help/api_queries)), but please use check the release associated with your requested data in the HTTP header `x-uniprot-release` to avoid download the same data again more than once per release.

# See also

- [Downloads](https://www.uniprot.org/downloads)
- [How can I access resources on this website programmatically?](https://www.uniprot.org/help/programmatic_access)
- [How frequently is UniProt released? What is the synchronization delay with other databases?](https://www.uniprot.org/help/synchronization)
- [Downloaded data seems incomplete or corrupted - how can I get help with download problems?](https://www.uniprot.org/help/metalink)

Related terms: programmatic access, program, script, wget, curl, web services, API
