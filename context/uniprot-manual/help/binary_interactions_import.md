---
title: Why are only a subset of binary interactions from the IntAct database reported in UniProtKB?
type: help
categories: UniProtKB,Interaction,faq
---

The imported subset of binary interactions is determined using a simple scoring system developed by [IntAct](https://www.ebi.ac.uk/intact/main.xhtml) and a score threshold that has been deliberately chosen to exclude interactions supported by only one experimental observation. Details of how interactions are scored can be found at the [IntAct website](https://www.ebi.ac.uk/intact/documentation/user-guide#data_export).

This simple score-based filter is used in combination with a set of defined rules that exclude certain types of data, such as interactions that are only ever observed in larger complexes, or interactions that have been inferred but not experimentally proven. These stringent criteria ensure that the interaction data that is imported into UniProtKB is composed solely of experimentally proven binary interactions supported by multiple observations.

# See also

-   [Binary interactions](https://www.uniprot.org/help/binary_interactions)
