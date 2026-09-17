---
title: How do I link to a specific version of a UniProtKB entry?
type: help
categories: UniProtKB,Technical,Release,faq
---

In order to keep up-to-date with scientific knowledge, we update entries thus producing a new version of the entry each time. For example, there have been over 250 updates to [P00750](https://www.uniprot.org/uniprotkb/P00750) (TPA_HUMAN).

The version number appears below the accession number right at the top of a UniProtKB entry view. The **History** link allows you to browse and compare various versions of the entry.

![image](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/entry_history_link.png)

To link to a particular version of an entry, use the **version** parameter in the link, e.g. to link to version 109 of P00750 use:

[https://rest.uniprot.org/unisave/P00750?format=txt&versions=109]](https://rest.uniprot.org/unisave/P00750?format=txt&versions=109)

# See also

- [Entry history](https://www.uniprot.org/help/entry_history)
- [How to link to UniProt entries (UniProtKB, UniParc and UniRef)](https://www.uniprot.org/help/linking_to_uniprot)
