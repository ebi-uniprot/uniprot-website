---
title: Automatic annotation using UniRule
type: help
categories: Automatic_annotation,Biocuration,UniProtKB,help
---

UniProt's [Automatic Annotation pipeline](https://www.uniprot.org/help/automatic_annotation) enhances the unreviewed records in UniProtKB by enriching them with automatic classification and annotation.

The Unified Rule (UniRule) system is one of the contributors to this pipeline, and rules are devised and tested by experienced curators using experimental data from manually annotated entries. UniRule has been developed by merging existing manual rule-based systems ([HAMAP](https://hamap.expasy.org/), [PIR name and site rules](https://www.uniprot.org/help/pir_rules), [NCBIfam rules](https://www.uniprot.org/help/ncbifam_rules) and [RuleBase rules](https://www.uniprot.org/help/rulebase_rules)) into one system which stores, applies, and evaluates all rules. Although originally developed independently, these rule systems all share a common scientific approach, using the presence of specific protein signatures together with taxonomy to predict the biochemical features and biological role of a protein.

UniRule rules can annotate protein properties such as the protein name, function, catalytic activity, pathway membership, and subcellular location, along with sequence specific information, such as the positions of post-translational modifications and active sites. All predictions are refreshed with each UniProtKB release to ensure the latest state-of-knowledge predictions.

# Rule-based evidence for UniProtKB annotation

UniProtKB entries contain evidence tags that describe the provenance of a given annotation and provide links to a reference where applicable. When an annotation is added to an entry based on an automatic annotation UniRule rule, the evidence tag indicates this:

![](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/unirule_evidence_tag.png)

When you click on the tag, you see a link to the relevant UniRule rule:

![](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/unirule_evidence_tag_drop.png)

In the example shown above, the UniRule rule comes from RuleBase. UniRule is comprised of several rule systems (HAMAP, PIR name and site rules, [NCBIfam](https://www.uniprot.org/help/ncbifam_rules) and [RuleBase](https://www.uniprot.org/help/rulebase_rules) rules) and each rule has a unique UniRule ID as well as a source rule ID coming from the system which created the rule.

# Searching UniRule rules

The UniRule dataset is available from the home page of the [UniProt](https://www.uniprot.org/) website and on the top of every page of the website. In order to search the dataset to view rules of interest, click on the dropdown next to the search box and select 'UniRule'. Now enter a search term or rule ID. You can also use the advanced search to build your query.

<img src="https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/arba-10.png" alt="UniProt namespace dropdown, including UniRule" style="width:400px" />

# Exploring the UniRule rule pages

[Example](https://www.uniprot.org/unirule/UR000124451)

A UniRule rule page contains the unique UniRule ID, the source rule's ID, a link to search the UniProtKB entries annotated by the rule and the rule content which consists of a set of conditions and corresponding annotations that apply to a protein entry if the conditions are true.

![](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/unirule_rule.png)

Conditions are listed on the left hand side of the rule page and annotations are on the right hand side. The conditions are arranged in groups and all conditions within a group must be met together. 'Common conditions' are the minimum set that must be met for a rule to apply any annotation to a protein entry. Hence, they are common to all protein entries annotated by the rule. These conditions and their relevant annotations are colour coded in purple. If the 'Common conditions' are met for an entry, the system then checks the 'Special conditions', where they exist, and applies the corresponding annotations. 'Special conditions' and their corresponding annotations are colour coded orange. You can click on a condition group to see the relevant annotations. If you click on a 'Special condition' group, the 'Common conditions' also apply by default.

For example, if you select the first 'Special condition' in the following screenshot (highlighted in orange), the annotations applied by that condition are highlighted in orange. Simultaneously, the 'Common conditions' are also highlighted (in purple) and the relevant annotations are highlighted with a purple outline.

![](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/unirule_special.png)

You can also click directly on an annotation to view the conditions that must be true for it to be applied to a protein entry. This will highlight the required conditions and also the other annotations that will be applied by the conditions along with the one you have clicked on.

For example, if you click on the annotation under 'Catalytic activity' in the screenshot below, it is highlighted in purple and you see the relevant condition set highlighted on the left hand side in purple as well. Other annotations that would be applied by this condition group are highlighted with a purple outline.

![](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/unirule_annotation.png)

# See also

[UniRule automatic annotation system in UniProt (UniProt blog)](https://insideuniprot.blogspot.com/2015/11/)
