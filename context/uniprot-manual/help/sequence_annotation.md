---
title: Sequence annotation (Features)
type: help
categories: manual,Technical
---

Sequence annotations describe regions or sites of interest in the protein sequence, such as post-translational modifications, binding sites, enzyme active sites, local secondary structure or other characteristics reported in the cited references, or predicted. Sequence conflicts between references are also described in this manner.

Sequence annotations (position-specific annotations) used to be found in the 'Sequence annotation (Features)' section in a previous version of the UniProtKB entry view. The current entry view displays annotation by subject (Function, PTM & processing, etc), and the various position-specific annotations are distributed to the relevant sections. The [text](https://www.uniprot.org/release-notes/2019-12-18-release#text_ft) and XML formats still group all position-specific annotation together in a "feature table" (FT). 

The same holds true for [general annotations (comments)](https://www.uniprot.org/help/general_annotation).

Each sequence annotation consists of a "feature key", "from" and "to" positions as well as a short description.



# Feature types

## Molecule processing

| **Subsection**                                                | **Query Field** | **Content**                                                               |
| ------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------- |
| [Initiator methionine](https://www.uniprot.org/help/init_met) | ft_init_met     | Cleavage of the initiator methionine                                      |
| [Signal](https://www.uniprot.org/help/signal)                 | ft_signal       | Sequence targeting proteins to the secretory pathway or periplasmic space |
| [Transit peptide](https://www.uniprot.org/help/transit)       | ft_transit      | Extent of a transit peptide for organelle targeting                       |
| [Propeptide](https://www.uniprot.org/help/propep)             | ft_propep       | Part of a protein that is cleaved during maturation or activation         |
| [Chain](https://www.uniprot.org/help/chain)                   | ft_chain        | Extent of a polypeptide chain in the mature protein                       |
| [Peptide](https://www.uniprot.org/help/peptide)               | ft_peptide      | Extent of an active peptide in the mature protein                         |

## Regions

| **Subsection**                                              | **Query Field** | **Content**                                                        |
| ----------------------------------------------------------- | --------------- | ------------------------------------------------------------------ |
| [Topological domain](https://www.uniprot.org/help/topo_dom) | ft_topo_dom     | Location of non-membrane regions of membrane-spanning proteins     |
| [Transmembrane](https://www.uniprot.org/help/transmem)      | ft_transmem     | Extent of a membrane-spanning region                               |
| [Intramembrane](https://www.uniprot.org/help/intramem)      | ft_intramem     | Extent of a region located in a membrane without crossing it       |
| [Domain](https://www.uniprot.org/help/domain)               | ft_domain       | Position and type of each modular protein domain                   |
| [Repeat](https://www.uniprot.org/help/repeat)               | ft_repeat       | Positions of repeated sequence motifs or repeated domains          |
| [Zinc finger](https://www.uniprot.org/help/zn_fing)         | ft_zn_fing      | Position(s) and type(s) of zinc fingers within the protein         |
| [DNA binding](https://www.uniprot.org/help/dna_bind)        | ft_dna_bind     | Position and type of a DNA\-binding domain                         |
| [Region](https://www.uniprot.org/help/region)               | ft_region       | Region of interest in the sequence                                 |
| [Coiled coil](https://www.uniprot.org/help/coiled)          | ft_coiled       | Positions of regions of coiled coil within the protein             |
| [Motif](https://www.uniprot.org/help/motif)                 | ft_motif        | Short (up to 20 amino acids) sequence motif of biological interest |
| [Compositional bias](https://www.uniprot.org/help/compbias) | ft_compbias     | Region of compositional bias in the protein                        |

## Sites

| **Subsection**                                       | **Query Field** | **Content**                                                             |
| ---------------------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [Active site](https://www.uniprot.org/help/act_site) | ft_act_site     | Amino acid(s) directly involved in the activity of an enzyme            |
| [Binding site](https://www.uniprot.org/help/binding) | ft_binding      | Binding site for any chemical group (co-enzyme, prosthetic group, etc.) |
| [Site](https://www.uniprot.org/help/site)            | ft_site         | Any interesting single amino acid site on the sequence                  |

## Amino acid modifications

| **Subsection**                                               | **Query Field** | **Content**                                                                                    |
| ------------------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------- |
| [Non-standard residue](https://www.uniprot.org/help/non_std) | ft_non_std      | Occurence of non-standard amino acids (selenocysteine and pyrrolysine) in the protein sequence |
| [Modified residue](https://www.uniprot.org/help/mod_res)     | ft_mod_res      | Modified residues excluding lipids, glycans and protein cross-links                            |
| [Lipidation](https://www.uniprot.org/help/lipid)             | ft_lipid        | Covalently attached lipid group(s)                                                             |
| [Glycosylation](https://www.uniprot.org/help/carbohyd)       | ft_carbohyd     | Covalently attached glycan group(s)                                                            |
| [Disulfide bond](https://www.uniprot.org/help/disulfid)      | ft_disulfid     | Cysteine residues participating in disulfide bonds                                             |
| [Cross-link](https://www.uniprot.org/help/crosslnk)          | ft_crosslnk     | Residues participating in covalent linkage(s) between proteins                                 |

## Natural variations

| **Subsection**                                               | **Query Field** | **Content**                                               |
| ------------------------------------------------------------ | --------------- | --------------------------------------------------------- |
| [Alternative sequence](https://www.uniprot.org/help/var_seq) | ft_var_seq      | Amino acid change(s) producing alternate protein isoforms |
| [Natural variant](https://www.uniprot.org/help/variant)      | ft_variant      | Description of a natural variant of the protein           |

## Experimental info

| **Subsection**                                                 | **Query Field** | **Content**                                                                                             |
| -------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| [Mutagenesis](https://www.uniprot.org/help/mutagen)            | ft_mutagen      | Site which has been experimentally altered by mutagenesis                                               |
| [Sequence uncertainty](https://www.uniprot.org/help/unsure)    | ft_unsure       | Regions of uncertainty in the sequence                                                                  |
| [Sequence conflict](https://www.uniprot.org/help/conflict)     | ft_conflict     | Description of sequence discrepancies of unknown origin                                                 |
| [Non-adjacent residues](https://www.uniprot.org/help/non_cons) | ft_non_cons     | Indicates that two residues in a sequence are not consecutive                                           |
| [Non-terminal residue](https://www.uniprot.org/help/non_ter)   | ft_non_ter      | The sequence is incomplete. Indicate that a residue is not the terminal residue of the complete protein |

## Secondary structure

| **Subsection**                                     | **Query Field** | **Content**                                                                |
| -------------------------------------------------- | --------------- | -------------------------------------------------------------------------- |
| [Helix](https://www.uniprot.org/help/helix)        | ft_helix        | Helical regions within the experimentally determined protein structure     |
| [Turn](https://www.uniprot.org/help/turn)          | ft_turn         | Turns within the experimentally determined protein structure               |
| [Beta strand](https://www.uniprot.org/help/strand) | ft_strand       | Beta strand regions within the experimentally determined protein structure |

The exact boundaries of the described sequence feature, as well as its length, are provided. When a feature is known to extend beyond the position that is given in this section, the endpoint specification will be preceded by '<' (less than) for features which continue to the N-terminal direction or by '>' (greater than) for features which continue to the C-terminal direction.

Example: [P62756](https://www.uniprot.org/uniprotkb/P62756#ptm_processing)

Unknown endpoints are denoted by a question mark '?'.

Example: [P78586](https://www.uniprot.org/uniprotkb/P78586#ptm_processing)

Uncertain endpoints are denoted by a question mark '?' before the position, e.g. '?42'.

Example: [Q3ZC31](https://www.uniprot.org/uniprotkb/Q3ZC31#ptm_processing)

# Querying Features

Individual features can be queried using the query fields described in the tables above. Querying is of the form:

```bash
curl "https://rest.uniprot.org/uniprotkb/search?query=FIELD:VALUE"
```

For example, to find all Human entries with variants, we could run the following `curl` command:

```bash
curl "https://rest.uniprot.org/uniprotkb/search?query=ft_variant:*%20AND%20organism_id:9606"
```

## Querying for Features with experimental evidence

Queries for any feature type can be restricted to annotations for which experimental evidence is available. To do this, every feature type `ft_XXXX` has a corresponding field that allows to query for annotations with experimental evidence, `ft_XXXX_exp`.

For example, to find human entries with ATP binding sites annotated on the basis of experimental evidence, we can execute the following command:

```bash
curl "https://rest.uniprot.org/uniprotkb/search?query=ft_binding_exp:ATP%20AND%20organism_id:9606"
```

# Feature identifiers

Some features are associated with a unique and stable identifier that allows to construct links between these position-specific annotations and specialized protein-related databases.

The format of the identifiers is a 3-letter prefix, specific for an annotation type, separated by an underscore from a 6 to 10-digit number.

Feature identifiers currently exist for the following annotation topics: Propeptide, Chain, Peptide, Glycosylation, Alternative sequence and Natural variant.

| **Subsection**                                                                                     | **Identifier prefix** | **Availability**                                                                                                                 | **Example**                                                                                                                                     |
| -------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Molecule processing**                                                                            |                       |                                                                                                                                  |                                                                                                                                                 |
| [Propeptide](https://www.uniprot.org/help/propep)                                                  | PRO                   | Any processed propeptide                                                                                                         | [Q7XAD0](https://www.uniprot.org/uniprotkb/Q7XAD0/entry#ptm-processing)                                                                         |
| [Chain](https://www.uniprot.org/help/chain) <br /> [Peptide](https://www.uniprot.org/help/peptide) | PRO                   | Any mature polypeptide                                                                                                           | [Q9W568](https://www.uniprot.org/uniprotkb/Q9W568/entry#ptm-processing) [P15515](https://www.uniprot.org/uniprotkb/P15515/entry#ptm-processing) |
| **Amino acid modifications**                                                                       |                       |                                                                                                                                  |                                                                                                                                                 |
| [Glycosylation](https://www.uniprot.org/help/carbohyd)                                             | CAR                   | Only for residues attached to an oligosaccharide structure annotated in the [GlyConnect](https://glyconnect.expasy.org) database | [P02771](https://www.uniprot.org/uniprotkb/P02771/entry#ptm-processing)                                                                         |
| **Natural variations**                                                                             |                       |                                                                                                                                  |                                                                                                                                                 |
| [Alternative sequence](https://www.uniprot.org/help/var_seq)                                       | VSP                   | Any sequence with an ‘Alternative sequence’ feature                                                                              | [P81278](https://www.uniprot.org/uniprotkb/P81278/entry#sequences)                                                                              |
| [Natural variant](https://www.uniprot.org/help/variant)                                            | VAR                   | Only for protein sequence variants of Hominidae (great apes and humans)                                                          | [P11171](https://www.uniprot.org/uniprotkb/P11171/entry#sequences)                                                                              |

# See also

[General annotation (Comments)](https://www.uniprot.org/help/general_annotation)

[Advanced Search](https://www.uniprot.org/help/advanced_search)

[Programmatic access - retrieving entries via queries](https://www.uniprot.org/help/api_queries)

[UniProtKB query fields](https://www.uniprot.org/help/query-fields)




