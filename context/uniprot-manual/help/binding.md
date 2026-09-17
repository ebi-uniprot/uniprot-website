---
title: Binding site
type: help
categories: Function,manual
---

This subsection of the
[Function](https://www.uniprot.org/help/function_section) section
describes the interaction between protein residues and a chemical
entity. Priority is
given to the annotation
of physiological ligands (metals, cofactors, substrates and products of
enzymes, allosteric regulators, physiological inhibitors/activators,
ligands of receptors/sensors and transporters/channels, effectors of transcriptional regulators, chromophores...).

In this subsection, we primarily annotate data originating from 3D
structures.

The exact nature of the ligand is described by its identifier in the
[ChEBI](https://www.ebi.ac.uk/chebi) ontology, and the corresponding
UniProt name.
Example: [P45568](https://www.uniprot.org/uniprotkb/P45568)

Historically, many ligands were described by the word "substrate", and
have thus no associated ChEBI ID. These should be re-curated/retrofitted
over time, replacing "Substrate" by the ligand name of the compound
seen in the 3D structure.
  
Example: [P00507](https://www.uniprot.org/uniprotkb/P00507)

Binding annotations most often refer to a single amino acid residue, but
can sometimes correspond to a range of residues.

Interactions which occur via post-translationally modified residues are
specified.

Example: [P27708](https://www.uniprot.org/uniprotkb/P27708)

Interactions are considered to be non-covalent by default. When a
substance is covalently bound with a cofactor or a prosthetic group,
this is indicated by using the qualifier 'covalent'.

Example: [P39186](https://www.uniprot.org/uniprotkb/P39186)

This subsection complements the information on covalent binding
described in the [Modified residue](https://www.uniprot.org/help/mod_res), [Glyosylation](https://www.uniprot.org/help/carbohyd) and 
[Lipidation](https://www.uniprot.org/help/lipid) subsections as well as the information in the [Active site](https://www.uniprot.org/help/act_site) subsection concerning unstable
reaction intermediates.


In this subsection, we do not annotate general protein-protein
interactions. These can be found in relevant subsections of the
[Interaction](https://www.uniprot.org/help/interaction_section) section.

See also:

[UniProtKB text format user
manual](https://web.expasy.org/docs/userman.html#FT_BINDING)


