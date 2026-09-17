---
title: How are protein sequence variety and protein diversity represented in UniProtKB?
type: help
categories: UniProtKB,Keywords,Text_search,Biocuration,Sequence,faq
---

The article [C. R. Biol. (2005)](https://dx.doi.org/10.1016/j.crvi.2005.06.001) gives an overview on cellular processes that can lead to sequence variety and structural diversity in eukaryotes. It explains, with examples, how such processes are represented in UniProtKB.

This tutorial also shows how to use the UniProtKB annotation to extract specific datasets of entries, e.g.:

- [proteins containing a selenocysteine](https://www.uniprot.org/uniprotkb?query=keyword:KW-0712)
- [proteins whose sequences are derived from a RNA editing event](https://www.uniprot.org/uniprotkb?query=keyword:KW-0691)
- [proteins containing a GPI-anchor](<https://www.uniprot.org/uniprotkb?query=(keyword:KW-0336)>)...

Remark: Most information in UniProtKB has one or several ['evidence tags'](https://www.uniprot.org/help/evidences) which describe the source of the information, e.g. an experiment that has been published in the scientific literature, an orthologous protein, a record from another database, etc.

Example of query:

- [proteins phosphorylated on serine](<https://wwww.uniprot.org/uniprotkb?query=(ft_mod_res:phosphoserine)>) (Experimentally proven, predicted or propagated by similarity)
- [proteins which have been experimentally proven to be phosphorylated on a serine](<https://www.uniprot.org/uniprotkb?query=((ft_mod_res:phosphoserine)%20AND%20(ftev_mod_res:experimental))>)...

Note: Examples on the website might differ slightly from those printed in the article, due to [format changes](https://www.uniprot.org/release-notes/) and updates to the annotation.

Related terms: post-translational modification, posttranslational modification, PTM, alternative splicing, variant, isoform, mRNA editing, ribosomal frameshifting.

# See also

- [What is the canonical sequence? Are all isoforms described in one entry?](https://www.uniprot.org/help/canonical_and_isoforms)
- [How do we manually annotate a UniProtKB entry?](https://www.uniprot.org/help/manual_curation)
- [Alternative products](https://www.uniprot.org/help/alternative_products)
- [Alternative sequence](https://www.uniprot.org/help/var_seq)
