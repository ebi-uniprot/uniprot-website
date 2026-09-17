---
title: Searching with leading wildcards
type: help
categories: search,Technical,Text_search,Programmatic_access,solr
---

While it should be noted that our tokenisers make sure that search results are mature and diverse enough for the majority of [searches](https://www.uniprot.org/help/text-search) without leading wildcards, the need for leading wildcards still exists for our users.

Wildcard searches `(*, ?)` can be very resource heavy and slow to run. Due to the vast amount of data that UniProt offers, searches with leading wildcards may often take considerable minutes before completing. Leading wildcards are disabled in most advanced search fields to prevent such potential issues.

Currently, leading wildcards are only supported in the `gene` and `protein_name` fields. Trailing wildcards are supported throughout all fields.

When the UniProt search engine encounters a leading wildcard on an unsupported field, the leading wildcard is automatically discarded before the search is executed.

For example, a query such as `*human` will simply return the same search result as `human`. Please take a look below for further examples on how search performs with wildcards.

# Query examples with leading wildcards:

- `gene:*app` → Valid query
- `protein_name:*mas5` → Valid query
- `otherfield:*quick brown fox` → Leading wildcard is stripped from search term
- `*quick brown fox AND field:text` → Leading wildcard is stripped from the first search term
- `*quick brown fox*` → Strip leading wildcard only; trailing wildcard is valid

If you have any further questions or suggestions, please feel free to reach out to us via the [Contact](https://www.uniprot.org/contact) page.

See more
