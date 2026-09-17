---
title: UniProtKB return fields
type: help
categories: Text_search,Technical,Website,help
---

# UniProtKB column names for programmatic access

This document lists the differences between the returned columns by RESTful APIs.
User can ask required columns returned by an API by passing the _Returned Field_ in the request url
and the response will have those requested fields.

A specific page listing cross-reference fields can be found here: [Return Fields Databases](https://www.uniprot.org/help/return_fields_databases).

For example, to get UniProtKB entry with accession and proteomes in new API run the below `curl` command:

```bash
curl https://rest.uniprot.org/uniprotkb/search?query=human&fields=accession,xref_proteomes
```

The `Label` is the readable name of the returned field. The `Label` is shown on the website/TSV or in Excel format.

# Names & Taxonomy

| Label                      | Returned Field |
| -------------------------- | -------------- |
| Entry                      | accession      |
| Entry Name                 | id             |
| Gene Names                 | gene_names     |
| Gene Names (primary)       | gene_primary   |
| Gene Names (synonym)       | gene_synonym   |
| Gene Names (ordered locus) | gene_oln       |
| Gene Names (ORF)           | gene_orf       |
| Organism                   | organism_name  |
| Organism ID                | organism_id    |
| Protein names              | protein_name   |
| Proteomes                  | xref_proteomes |
| Taxonomic lineage          | lineage        |
| Taxonomic lineage (IDs)    | lineage_ids    |
| Virus hosts                | virus_hosts    |

# Sequences

| Label                           | Returned Field          |
| ------------------------------- | ----------------------- |
| Alternative products            | cc_alternative_products |
| Alternative sequence            | ft_var_seq              |
| Erroneous gene model prediction | cc_sc_epred             |
| Fragment                        | fragment                |
| Gene encoded in                 | encoded_in              |
| Length                          | length                  |
| Mass                            | mass                    |
| Mass spectrometry               | cc_mass_spectrometry    |
| Natural variant                 | ft_variant              |
| Non-adjacent residues           | ft_non_cons             |
| Non-standard residue            | ft_non_std              |
| Non-terminal residue            | ft_non_ter              |
| Polymorphism                    | cc_polymorphism         |
| RNA editing                     | cc_rna_editing          |
| Sequence                        | sequence                |
| Sequence caution                | cc_sequence_caution     |
| Sequence conflict               | ft_conflict             |
| Sequence uncertainty            | ft_unsure               |
| Sequence version                | sequence_version        |

# Function

| Label                  | Returned Field         |
| ---------------------- | ---------------------- |
| Absorption             | absorption             |
| Active site            | ft_act_site            |
| Activity regulation    | cc_activity_regulation |
| Binding site           | ft_binding             |
| Catalytic activity     | cc_catalytic_activity  |
| Cofactor               | cc_cofactor            |
| DNA binding            | ft_dna_bind            |
| EC number              | ec                     |
| Function [CC]          | cc_function            |
| Kinetics               | kinetics               |
| Pathway                | cc_pathway             |
| pH dependence          | ph_dependence          |
| Redox potential        | redox_potential        |
| Rhea ID                | rhea                   |
| Site                   | ft_site                |
| Temperature dependence | temp_dependence        |

# Miscellaneous

| Label              | Returned Field    |
| ------------------ | ----------------- |
| Annotation         | annotation_score  |
| Caution            | cc_caution        |
| Comment Count      | comment_count     |
| Features           | feature_count     |
| Keyword ID         | keywordid         |
| Keywords           | keyword           |
| Miscellaneous [CC] | cc_miscellaneous  |
| Protein existence  | protein_existence |
| Reviewed           | reviewed          |
| Tools              | tools             |
| UniParc            | uniparc_id        |

# Interaction

| Label                  | Returned Field |
| ---------------------- | -------------- |
| Interacts with         | cc_interaction |
| Subunit structure [CC] | cc_subunit     |

# Expression

| Label               | Returned Field         |
| ------------------- | ---------------------- |
| Developmental stage | cc_developmental_stage |
| Induction           | cc_induction           |
| Tissue specificity  | cc_tissue_specificity  |

# Gene Ontology (GO)

| Label                              | Returned Field |
| ---------------------------------- | -------------- |
| Gene Ontology (biological process) | go_p           |
| Gene Ontology (cellular component) | go_c           |
| Gene Ontology (GO)                 | go             |
| Gene Ontology (molecular function) | go_f           |
| Gene Ontology IDs                  | go_id          |

# Pathology & Biotech

| Label                  | Returned Field          |
| ---------------------- | ----------------------- |
| Allergenic properties  | cc_allergen             |
| Biotechnological use   | cc_biotechnology        |
| Disruption phenotype   | cc_disruption_phenotype |
| Involvement in disease | cc_disease              |
| Mutagenesis            | ft_mutagen              |
| Pharmaceutical use     | cc_pharmaceutical       |
| Toxic dose             | cc_toxic_dose           |

# Subcellular location

| Label                     | Returned Field          |
| ------------------------- | ----------------------- |
| Intramembrane             | ft_intramem             |
| Subcellular location [CC] | cc_subcellular_location |
| Topological domain        | ft_topo_dom             |
| Transmembrane             | ft_transmem             |

# PTM / Processsing

| Label                           | Returned Field |
| ------------------------------- | -------------- |
| Chain                           | ft_chain       |
| Cross-link                      | ft_crosslnk    |
| Disulfide bond                  | ft_disulfid    |
| Glycosylation                   | ft_carbohyd    |
| Initiator methionine            | ft_init_met    |
| Lipidation                      | ft_lipid       |
| Modified residue                | ft_mod_res     |
| Peptide                         | ft_peptide     |
| Post-translational modification | cc_ptm         |
| Propeptide                      | ft_propep      |
| Signal peptide                  | ft_signal      |
| Transit peptide                 | ft_transit     |

# Structure

| Label       | Returned Field |
| ----------- | -------------- |
| 3D          | structure_3d   |
| Beta strand | ft_strand      |
| Helix       | ft_helix       |
| Turn        | ft_turn        |

# Publications

| Label     | Returned Field |
| --------- | -------------- |
| PubMed ID | lit_pubmed_id  |

# Date of

| Label                              | Returned Field         |
| ---------------------------------- | ---------------------- |
| Date of creation                   | date_created           |
| Date of last modification          | date_modified          |
| Date of last sequence modification | date_sequence_modified |
| Entry version                      | version                |

# Family & Domains

| Label              | Returned Field   |
| ------------------ | ---------------- |
| Coiled coil        | ft_coiled        |
| Compositional bias | ft_compbias      |
| Domain[CC]         | cc_domain        |
| Domain[FT]         | ft_domain        |
| Motif              | ft_motif         |
| Protein families   | protein_families |
| Region             | ft_region        |
| Repeat             | ft_repeat        |
| Zinc finger        | ft_zn_fing       |

# Cross-references

For all the other fields corresponding to cross-references, please refer to the [UniProtKB return fields for cross-references](https://www.uniprot.org/help/return_fields_databases) documentation page.
