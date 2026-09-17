---
title: Programmatic access - Retrieving individual entries
type: help
categories: UniProtKB,UniRef,UniParc,Programmatic_access,help
---

The web address for an entry consists of a data set name (e.g. `uniprot`, `uniref`, `uniparc`, `taxonomy`,...) and the entry's unique identifier, e.g.:

    https://www.uniprot.org/uniprotkb/P12345

By default, a web page is returned. Depending on the data set, other formats may also be available (click on "Formats" on the entry's web page). Here are some examples:

    https://rest.uniprot.org/uniprotkb/P12345.txt
    https://rest.uniprot.org/uniprotkb/P12345.xml
    https://rest.uniprot.org/uniprotkb/P12345.rdf
    https://rest.uniprot.org/uniprotkb/P12345.fasta
    https://rest.uniprot.org/uniprotkb/P12345.gff

    https://rest.uniprot.org/uniref/UniRef90_P99999.xml
    https://rest.uniprot.org/uniref/UniRef90_P99999.rdf
    https://rest.uniprot.org/uniref/UniRef90_P99999.fasta
    https://rest.uniprot.org/uniref/UniRef90_P99999.tsv

    https://rest.uniprot.org/uniparc/UPI000000001F.xml
    https://rest.uniprot.org/uniparc/UPI000000001F.rdf
    https://rest.uniprot.org/uniparc/UPI000000001F.fasta
    https://rest.uniprot.org/uniparc/UPI000000001F.tsv

Note that UniRef identifiers cannot be guaranteed to be stable, since the sequence clusters are recomputed at every release, and the representative protein may change. See also [How to link to UniProt entries](https://www.uniprot.org/help/linking_to_uniprot).

For the RDF/XML format there is an option to include data from referenced data sets directly in the returned data:

    https://rest.uniprot.org/uniprotkb/P12345.rdf?include=yes

The following [status codes](https://www.rfc-editor.org/rfc/rfc9110.html#status.codes) may be returned:

| Code | Description                                                                                            |
| :--- | :----------------------------------------------------------------------------------------------------- |
| 200  | The request was processed successfully.                                                                |
| 400  | Bad request. There is a problem with your input.                                                       |
| 404  | Not found. The resource you requested doesn't exist.                                                   |
| 410  | Gone. The resource you requested was removed.                                                          |
| 500  | Internal server error. Most likely a temporary problem, but if the problem persists please contact us. |
| 503  | Service not available. The server is being updated, try again later.                                   |

# Resolving RDF identifiers

A request for an address such as

    https://purl.uniprot.org/uniprot/P12345

will be resolved, where possible, by redirection to the corresponding resource (see previous section). For UniProt resources, entries are returned in RDF/XML format if the HTTP [`'Accept'` request header](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) is set to `'application/rdf+xml'`.

# See also

- [REST API - Access the UniProt website programmatically](https://www.uniprot.org/help/api)
- [REST API - Retrieve entries](https://www.uniprot.org/help/api_retrieve_entries)
- [REST API - ID Mapping](https://www.uniprot.org/help/id_mapping)
- [REST API - Retrieving entries via queries](https://www.uniprot.org/help/api_queries)
