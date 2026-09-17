---
title: Animal toxin annotation project
type: help
categories: biocuration,project
---

The animal toxin annotation project (Tox-Prot) aims to systematically annotate proteins secreted in animal venom. Among venomous animals are snakes, spiders, scorpions, cone snails, centipedes, jellyfish, insects, sea anemones, lizards, a few fish and platypuses. The project also deals with the manual annotation of toxins produced by poisonous animals that lack venom injection devices, such as certain mammals, toads and ticks.

See: [How do we manually annotate a UniProtKB entry?](https://www.uniprot.org/help/manual_curation)

Each venom protein is annotated according to the quality standards of UniProtKB/Swiss-Prot. Particular care has been taken to capture what is known on the function and mode of action of a given protein, as well as its post-translational modifications and 3D structural data, which are all quite abundant in the field of protein toxins.

Since protein toxins are relatively short and undergo extensive post-translational modifications, they are, more often than not, studied at the protein level.

- All manually reviewed toxins can be found [here](https://www.uniprot.org/uniprotkb?query=(keyword:KW-0800)%20AND%20(reviewed:true)%20AND%20%28taxonomy_id:33208%29)
- All manually reviewed venom proteins can be found [here](https://www.uniprot.org/uniprotkb?query=(taxonomy_id:33208)%20AND%20(cc_tissue_specificity:venom%20OR%20cc_scl_term:SL-0177)%20AND%20(reviewed:true))
- All manually reviewed venom proteins and toxins can be found [here](https://www.uniprot.org/uniprotkb?query=(taxonomy_id:33208)%20AND%20((cc_tissue_specificity:venom%20OR%20cc_scl_term:SL-0177)%20OR%20(keyword:KW-0800))%20AND%20(reviewed:true))

