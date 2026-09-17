---
title: Downloaded data seems incomplete or corrupted - how can I get help with download problems?
type: help
categories: Download,Technical,faq
---

# FTP downloads

Every folder on our [FTP server](https://ftp.uniprot.org/) contains a file called RELEASE.metalink that specifies the size and MD5 checksum of every file in that folder, e.g.  
<https://ftp.uniprot.org/pub/databases/uniprot/knowledgebase/complete/RELEASE.metalink>

[Metalink](https://en.wikipedia.org/wiki/Metalink) is an extensible metadata file format that describes one or more computer files available for download. It facilitates file verification and recovery from data corruption and lists alternate download sources (mirror URIs).

Various command line download tools, e.g. [cURL](https://curl.haxx.se/) version 7.30 or higher and [aria2](https://aria2.github.io/), support metalink.

Example: The following command will download all files in the `current_release/` folder and verify their MD5 checksums:

    curl --metalink https://ftp.uniprot.org/pub/databases/uniprot/current_release/RELEASE.metalink

They will be downloaded from one of the alternative locations mentioned in the metalink file. If one FTP server goes down during a download, programs can automatically switch to another mirror location. Some programs can also download segments from several FTP locations at the same time, which can make downloads much faster.

Please note that UniProt can be downloaded from the consortium member FTP sites at three different geographical locations:

USA: <https://ftp.uniprot.org/pub/databases/uniprot>  
UK: <https://ftp.ebi.ac.uk/pub/databases/uniprot>  
Switzerland: <https://ftp.expasy.org/databases/uniprot>

# HTTP downloads

Due to HTTP transport unreliability (HTTP streams tend to fail after a while due to packet loss), large downloads should be split into smaller chunks using pagination. These are described in our API help page [Retrieving entries via queries](https://www.uniprot.org/help/api_queries) and [Programmatic pagination](https://www.uniprot.org/help/pagination).

1\) Start by retrieving the number of results in your query by checking the response `x-total-results` header like in the example [Download all UniProt sequences for a given organism in FASTA format](https://www.uniprot.org/help/programmatic_access#downloading).

2\) If the number of results x is greater than 500, repeat your query and append the following to the URL:

    &cursor=<cursor value>&size=500

The cursor value for the next page, and actually the full URL for the next page of results for the same query is available in the response `link` header

Also use `compress=true` if you wish to compress the different files

e.g.

    first page: https://rest.uniprot.org/uniprotkb/search?compressed=true&format=fasta&query=(organism_id:9606)&size=500
    second page: https://rest.uniprot.org/uniprotkb/search?format=fasta&query=(organism_id:9606)&cursor=c9bacmxsqhkqgdxso0ulhqyxppukpzw2pnepg&size=500
    third page: https://rest.uniprot.org/uniprotkb/search?format=fasta&query=(organism_id:9606)&cursor=28m7xk8oeejl5mhhjk1glje7i02fk9hn8v0v5f6&size=500

etc.

The cursor values for each page might change across different data releases, so you should always read and use them at the moment that you're doing the request and not rely on values from multiple months back.

3\) Once you have your download, use `gzip -t` to check the integrity of your file. Uncompress the chunks and concatenate them into a single download file.
