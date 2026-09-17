---
title: Is there a download file available where all UniProt IDs from X.laevis are matched to their human equivalents (homologs)? How can I obtain an ortholog mapping of human proteins to S.pombe proteins?
type: help
categories: UniProtKB,Text_search,Cross-references,Taxonomy,faq
---

There are no such ready-made files available from UniProt, but a number of phylogenomic databases exist which may be in a better position to answer this question. There is quite a useful [thread on the BioStars website.](https://www.biostars.org/p/7568/)

If you want to use UniProtKB, you should first find out which of the [phylogenomic databases cross-referenced by UniProtKB](https://www.uniprot.org/database?facets=category_exact%3APhylogenomic%20databases&query=%2A) provides the best coverage for your organisms.

Once you have selected such a database, e.g. OrthoDB, you can include it in a query that allows you to retrieve all entries from Xenopus laevis and all human Swiss-Prot entries with a cross-reference to the phylogenomic database OrthoDB:

Query: [((organism_id:8355) OR ((organism_id:9606) AND (reviewed:true))) AND (database:orthodb)](https://www.uniprot.org/uniprotkb?query=%28%28organism_id%3A8355%29%20OR%20%28%28organism_id%3A9606%29%20AND%20%28reviewed%3Atrue%29%29%29%20AND%20%28database%3Aorthodb%29)

Note: To be even more exact, we recommend to use the taxonomy identifiers instead of organism names (e.g. organism_id:9606).

If you click on the little triangle in the title of the gene name column, you can have these results sorted by gene name, an operation that will group orthologous entries together in many cases:

[https://www.uniprot.org/uniprotkb?dir=ascend&query=%28%28organism_id%3A8355%29+OR+%28%28organism_id%3A9606%29+AND+%28reviewed%3Atrue%29%29%29+AND+%28database%3Aorthodb%29&sort=gene](https://www.uniprot.org/uniprotkb?dir=ascend&query=%28%28organism_id%3A8355%29+OR+%28%28organism_id%3A9606%29+AND+%28reviewed%3Atrue%29%29%29+AND+%28database%3Aorthodb%29&sort=gene)


You can customize the table view and add columns for the OrthoDB cross-references. To do this, click on "Columns", go to "Cross-references" and click on "More". Then select the database(s) of interest from the "Phylogenomic databases" section, and click on "Go". You can also remove columns which are not of interest to you in this context.

Once you are happy with the view, click on "Download" and select the tab-separated format.

If you want to sort on the OrthoDB identifiers instead, this cannot be done via the web interface, but once you have downloaded the file, you can open it in Excel and sort there.

# See also

- [How is orthology established in UniProtKB/Swiss-Prot?](https://www.uniprot.org/help/orthology)
- [List of phylogenomic databases cross-referenced in UniProtKB](https://www.uniprot.org/database?facets=category_exact%3APhylogenomic%20databases&query=%2A)
- [Customize display options](https://www.uniprot.org/help/customize)
