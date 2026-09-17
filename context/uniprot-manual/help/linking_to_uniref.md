---
title: Are UniRef cluster identifiers permanent? How can I link to UniRef clusters?
type: help
categories: UniRef,faq
---

# Are UniRef cluster identifiers permanent?

No. However, the vast majority do not change from release to release even if clusters are recomputed, and the representative entry usually remains the same. For example, [UniRef50_P99999](https://www.uniprot.org/uniref/UniRef50_P99999) has over 450 members, and [Cytochrome C from Human](https://www.uniprot.org/uniprotkb/P99999) is the representative. This will probably remain so, as it is by far the best annotated and biologically relevant member of the cluster. If a cluster has multiple equally suitable well-annotated members, the historically consistent representative member takes precedence.

# How do I link to UniRef clusters, and what if the cluster ID changed?

You can link directly to UniRef using the cluster ID:

`https://www.uniprot.org/uniref/UniRef90_P99999`

A more stable way of referring to the UniRef90 cluster containing [P99999](https://www.uniprot.org/uniprotkb/P99999), however, is to use query URLs as in this example:

Link to the UniRef90 cluster containing UniProtKB P99999:

[uniprot_id:P99999 AND identity:0.9](https://www.uniprot.org/uniref/?query=uniprot_id:P99999+AND+identity:0.9)

You can replace `identity:0.9` with `identity:0.5` for UniRef50 or `identity:1.0` for UniRef100.

These URLs will continue to work, even if the representative member and thus the cluster ID change between releases.

# See also

[How to link to UniProt entries (UniProtKB, UniParc and UniRef)](https://www.uniprot.org/help/linking_to_uniprot)
