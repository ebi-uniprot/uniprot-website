---
title: How can I get all green plant entries integrated in UniProtKB since release 12.0?
type: help
categories: UniProtKB,Text_search,Release,faq
---

1.  Go to the [news archive](https://www.uniprot.org/release-notes) and find the date of the UniProt release under consideration, e.g. Release 12.0 was published on July 24, 2007
2.  Use the query builder as described below.

Retrieve all green plant entries:

- Select **Search in** : `Protein Knowledgebase (UniProtKB)`
- Click **Advanced** to open the query builder
- Select **Field** : `Taxonomy [OC]`
- Type `Viridiplantae` (use autocompletion)
- Select `Viridiplantae [33090]`

Restrict results to data integrated since release 12.0:

- Click `Add Field`
- Select **Field** : `Date of` - `Date of creation`
- Type **From** : `24/07/2007`
- Click **Search**

You can choose to view only [reviewed](https://www.uniprot.org/uniprotkb?facets=reviewed%3Atrue&query=%28taxonomy_id%3A33090%29%20AND%20%28date_created%3A%5B2007-07-24%20TO%20%2A%5D%29) (UniProtKB/Swiss-Prot) or [unreviewed](https://www.uniprot.org/uniprotkb?facets=reviewed%3Afalse&query=%28taxonomy_id%3A33090%29%20AND%20%28date_created%3A%5B2007-07-24%20TO%20%2A%5D%29) (UniProtKB/TrEMBL) entries.

Note that the date can be modified in the query box `(taxonomy_id:33090) AND (date_created:[2007-07-24 TO \*])` and that you can bookmark the result page.

# See also

- [How do I link to a specific version of a UniProtKB entry?](https://www.uniprot.org/help/link_old_versions)
- [What are the date formats accepted in the relevant fields of the query builder (e.g. UniProtKB date integrated/date modified)?](https://www.uniprot.org/help/date_formats/)
- [UniProtKB advanced search options](https://www.uniprot.org/help/advanced_search)
