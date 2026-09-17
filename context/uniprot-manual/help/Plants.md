---
title: Plant protein annotation project
type: help
categories: biocuration,project
---

The main goal of the Plant protein annotation project is the manual annotation of plant-specific proteins or protein families.

See: [How do we manually annotate a UniProtKB entry?](https://www.uniprot.org/help/manual_curation)

Due to the polyploid nature of [plant](https://www.uniprot.org/taxonomy/33090) genomes ([potato](https://www.uniprot.org/taxonomy/4113) is tetraploid, [wheat](https://www.uniprot.org/taxonomy/4565) is hexaploid...) and to frequent genome duplications, plants are known to contain large genes families, some of which include up to 100 closely related members that can differ by only one nucleotide in the open reading frame.

Our major effort is currently focused on manual annotation of the proteomes of both a [dicot](https://www.uniprot.org/taxonomy/71240) ([_Arabidopsis thaliana_](https://www.uniprot.org/taxonomy/3702)) and a [monocot](https://www.uniprot.org/taxonomy/4447) ([_Oryza sativa_](https://www.uniprot.org/taxonomy/4530)). Later on we will then propagate the relevant annotation to orthologous proteins from other plant species. We will also annotate all the proteins involved in specific pathways not present in our two model plants, such as the [nitrogen fixation pathway](https://www.uniprot.org/keywords/KW-0536) of [_Medicago truncatula_](https://www.uniprot.org/taxonomy/3880) once the sequences and the gene predictions are reliable.

# About Arabidopsis

<figure width="150px">
  <img src="https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/arabidopsis.jpg" title="Arabidopsis thaliana picture kindly provided by Volker Knoop" alt="Arabidopsis thaliana (Mouse-ear cress)" />
  <figcaption>Arabidopsis thaliana (Mouse-ear cress)</figcaption>
</figure>

[_Arabidopsis thaliana_](https://www.uniprot.org/taxonomy/3702) is a 20-25 cm tall flowering plant native to Europe, Asia, and northwestern Africa with a rapid life cycle (six weeks). It is used extensively as a model organism in plant biology and genetics. With about 157 million base pairs and five chromosomes, Arabidopsis has one of the smallest genomes among plants and it was the first one to be sequenced in 2000.

We are working on the establishment and annotation of a comprehensive, non-redundant proteome of Arabidopsis. As a first step towards achieving this goal we have compared the content of UniProtKB with the list of proteins established by [The Arabidopsis Information Resource](https://www.arabidopsis.org/) (TAIR). In several cases this led us to complement the sequence information that was already present in UniProtKB with data available at TAIR. Since then, UniProtKB and TAIR have been kept manually synchronized. Based on our family annotation, changes to the current gene model predictions are sometimes necessary and all our gene model improvements are transmitted to TAIR for integration in their database.

- The _Arabidopsis thaliana_ entries which have been manually annotated are [listed here](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/arath.txt) [(statistics)](https://www.uniprot.org/biocuration_project/Plants/statistics/#Arabidopsisthaliana).

# About rice

![Oryza sativa (Rice)](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/rice.jpg "Rice picture kindly provided by Sharon Stern")

[_Oryza sativa_](https://www.uniprot.org/taxonomy/4530) has the smallest [cereal](https://www.uniprot.org/taxonomy/4479) genome consisting of only 430 million base pairs and 12 chromosomes. It is a model organism for cereal biology and genetics.

Rice contains two major subspecies: the sticky, short grained [japonica](https://www.uniprot.org/taxonomy/39947) or sinica variety, and the non-sticky, long-grained [indica](https://www.uniprot.org/taxonomy/39946) variety. A first draft of the complete sequences of both genomes was published in 2002 while improved versions were released in 2005.

Our major effort is currently directed towards the annotation of the proteins encoded by the genome of [_Oryza sativa_ subspecies _japonica_](https://www.uniprot.org/taxonomy/39947), cultivar _nipponbare_.

- The _Oryza sativa_ subsp. _japonica_ entries which have been manually annotated are [listed here](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs/rice.txt) [(statistics)](https://www.uniprot.org/biocuration_project/Plants/statistics/#Oryzasativasubspjaponica).
