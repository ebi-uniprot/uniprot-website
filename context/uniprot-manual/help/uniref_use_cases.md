---
title: What are some of the advanced uses of UniRef?
type: help
categories: UniRef,faq
---

UniRef is not limited to similarity searches only. The fact that UniRef representatives are distinct and members are consistent allows more extensive uses.

A few examples are:

UniRef can help with functional annotation and gene prediction. In particular UniRef90/50 clusters provide common Gene Ontology annotation that is consistent within the members and can be used directly for prediction. See: [Sieber et al](https://www.nature.com/articles/s41564-018-0171-1), [Carradec et al](https://www.nature.com/articles/s41467-017-02342-1), [Castelle et al](https://www.nature.com/articles/srep40101), [Oostra et al](https://www.nature.com/articles/s41467-018-03384-9) and [Ino et al](https://www.nature.com/articles/ismej2017140).

UniRef is also being used for functional profiling, enrichment and gene analysis. It has become a common pipeline in metagenomics study, particularly with the tool HUMAnN2. See: [Lloyd-Price et al](https://www.nature.com/articles/nature23889), [Ruff et al](https://www.nature.com/articles/s41396-018-0263-1) and [Vatanen et al](https://www.nature.com/articles/s41586-018-0620-2).

UniRef databases have been used in machine learning studies, such as building Markov models or serving as training or validation datasets. See: [Cozzetto et al](https://www.nature.com/articles/srep31865), [Bush et al](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5926538/), and [Dalkiran et al](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6150975/).

Other webservices and software take advantage of the member consistency of UniRef clusters to enhance their databases and tools. For example, the Structure Integration with Function, Taxonomy and Sequences resource ([SIFTS](https://www.ebi.ac.uk/pdbe/docs/sifts/)) now includes mappings to UniRef90 cluster members, expanding its applicability of structures from 44,000 to nearly two million UniProtKB records. See [Dana et al](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6324003/).

The Enzyme Similarity Tool (EFI-EST) for sequence similarity networks now supports functional profiling using UniRef90. See [Zallot et al](https://www.ncbi.nlm.nih.gov/pubmed/30268904).
