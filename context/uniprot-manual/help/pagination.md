---
title: Programmatic Pagination
type: help
categories: Programmatic_access,Text_search,Technical,help
---

Querying UniProt's datasets can yield many results. Instead of returning all results in a single payload (time consuming
and expensive), the search behaviour is designed to return results in batches (pages), i.e., those that are more relevant
to the user's query coming in earlier batches. In addition to these results, a set of HTTP headers are returned, one of which is a special
['Link' header](https://datatracker.ietf.org/doc/html/rfc8288#section-3), that tells us where to find the next page of results.

The following code snippet gives an example of how to find the next page of results:

```bash
# search UniProtKB and display both response headers and body
% curl -is "https://rest.uniprot.org/uniprotkb/search?query=human%20cdc7"
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 07 Apr 2022 11:30:14 GMT
Link: <https://rest.uniprot.org/uniprotkb/search?query=human%20cdc7&cursor=1mkycb2xwxbouvt2cgz8p7tcqqebv2v2hesy&size=25>; rel="next"
...

{"results":[{"entryType":"UniProtKB reviewed (Swiss-Prot)","primaryAccession":"O00311","secondaryAccessions":["D3DT31","O00558","Q5T5U5"],"uniProtkbId":"CDC7_HUMAN","entryAudit":{"firstPublicDate":"2001-01-11","lastAnnotationUpdateDate":"2022-02-23","lastSequenceUpdateDate":"1997-07-01","entryVersion":207,"sequenceVersion":1},"annotationScore":247.99999999999997,"organism":{"scientificName":"Homo sapiens","commonName":"Human","taxonId":9606,"lineage":["Eukaryota","Metazoa","Chordata","Craniata","Vertebrata","Euteleostomi","Mammalia","Eutheria","Euarchontoglires","Primates","Haplorrhini","Catarrhini","Hominidae","Homo"]},"proteinExistence":"1: Evidence at protein level","proteinDescription":{"recommendedName":{"fullName":{"value":"Cell division cycle 7-related protein kinase"},"shortNames":[{"value":"CDC7-related kinase"},{"value":"HsCdc7"},{"value":"huCdc7"}],"ecNumbers":[{"value":"2.7.11.1"}]}},"genes":[{"geneName":{"value":"CDC7"},"synonyms":[{"value":"CDC7L1"}]}],"comments":[{"texts":[{"evidences":[{"evidenceCode":"ECO:0000269","source":"PubMed","id":"12065429"}],"value":"Seems to phosphorylate critical substrates that regulate the G1/S phase transition and/or DNA replication. Can phosphorylate MCM2 and MCM3"}],"commentType":"FUNCTION"},{"commentType":"CATALYTIC ACTIVITY","reaction":{"name":"ATP + L-seryl-
```

As can be seen, in this example the first two pages of results are accessible at:

- https://rest.uniprot.org/uniprotkb/search?query=human%20cdc7
- https://rest.uniprot.org/uniprotkb/search?query=human%20cdc7&cursor=1mkycb2xwxbouvt2cgz8p7tcqqebv2v2hesy&size=25

Note: whenever there are more results to retrieve, there will be a corresponding the 'Link' header pointing to the next
page of results. When there are no more results to retrieve, no 'Link' header is returned.
