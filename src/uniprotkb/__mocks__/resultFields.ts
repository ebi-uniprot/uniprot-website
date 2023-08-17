import { ReceivedFieldData } from '../types/resultsTypes';

// Source: /configure/uniprotkb/result-fields
// Retrieved: 2023-08-09
const mock = [
  {
    groupName: 'Names & Taxonomy',
    isDatabaseGroup: false,
    id: 'names_&_taxonomy',
    fields: [
      {
        label: 'Entry',
        name: 'accession',
        sortField: 'accession',
        id: 'names_&_taxonomy/entry',
      },
      {
        label: 'Entry Name',
        name: 'id',
        sortField: 'id',
        id: 'names_&_taxonomy/entry_name',
      },
      {
        label: 'Gene Names',
        name: 'gene_names',
        sortField: 'gene',
        id: 'names_&_taxonomy/gene_names',
      },
      {
        label: 'Gene Names (ordered locus)',
        name: 'gene_oln',
        id: 'names_&_taxonomy/gene_names_(ordered_locus)',
      },
      {
        label: 'Gene Names (ORF)',
        name: 'gene_orf',
        id: 'names_&_taxonomy/gene_names_(orf)',
      },
      {
        label: 'Gene Names (primary)',
        name: 'gene_primary',
        id: 'names_&_taxonomy/gene_names_(primary)',
      },
      {
        label: 'Gene Names (synonym)',
        name: 'gene_synonym',
        id: 'names_&_taxonomy/gene_names_(synonym)',
      },
      {
        label: 'Organism',
        name: 'organism_name',
        sortField: 'organism_name',
        id: 'names_&_taxonomy/organism_name',
      },
      {
        label: 'Organism (ID)',
        name: 'organism_id',
        id: 'names_&_taxonomy/organism_(id)',
      },
      {
        label: 'Protein names',
        name: 'protein_name',
        sortField: 'protein_name',
        id: 'names_&_taxonomy/protein_names',
      },
      {
        label: 'Proteomes',
        name: 'xref_proteomes',
        id: 'names_&_taxonomy/proteomes',
      },
      {
        label: 'Taxonomic lineage',
        name: 'lineage',
        id: 'names_&_taxonomy/taxonomic_lineage',
      },
      {
        label: 'Taxonomic lineage (Ids)',
        name: 'lineage_ids',
        id: 'names_&_taxonomy/taxonomic_lineage_ids',
      },
      {
        label: 'Virus hosts',
        name: 'virus_hosts',
        id: 'names_&_taxonomy/virus_hosts',
      },
    ],
  },
  {
    groupName: 'Sequences',
    isDatabaseGroup: false,
    id: 'sequences',
    fields: [
      {
        label: 'Alternative products (isoforms)',
        name: 'cc_alternative_products',
        id: 'sequences/alternative_products_(isoforms)',
      },
      {
        label: 'Alternative sequence',
        name: 'ft_var_seq',
        id: 'sequences/alternative_sequence',
      },
      {
        label: 'Erroneous gene model prediction',
        name: 'error_gmodel_pred',
        id: 'sequences/erroneous_gene_model_prediction',
      },
      { label: 'Fragment', name: 'fragment', id: 'sequences/fragment' },
      {
        label: 'Gene encoded by',
        name: 'organelle',
        id: 'sequences/gene_encoded_by',
      },
      {
        label: 'Length',
        name: 'length',
        sortField: 'length',
        id: 'sequences/length',
      },
      { label: 'Mass', name: 'mass', sortField: 'mass', id: 'sequences/mass' },
      {
        label: 'Mass spectrometry',
        name: 'cc_mass_spectrometry',
        id: 'sequences/mass_spectrometry',
      },
      {
        label: 'Natural variant',
        name: 'ft_variant',
        id: 'sequences/natural_variant',
      },
      {
        label: 'Non-adjacent residues',
        name: 'ft_non_cons',
        id: 'sequences/non-adjacent_residues',
      },
      {
        label: 'Non-standard residue',
        name: 'ft_non_std',
        id: 'sequences/non-standard_residue',
      },
      {
        label: 'Non-terminal residue',
        name: 'ft_non_ter',
        id: 'sequences/non-terminal_residue',
      },
      {
        label: 'Polymorphism',
        name: 'cc_polymorphism',
        id: 'sequences/polymorphism',
      },
      {
        label: 'RNA Editing',
        name: 'cc_rna_editing',
        id: 'sequences/rna_editing',
      },
      { label: 'Sequence', name: 'sequence', id: 'sequences/sequence' },
      {
        label: 'Sequence caution',
        name: 'cc_sequence_caution',
        id: 'sequences/sequence_caution',
      },
      {
        label: 'Sequence conflict',
        name: 'ft_conflict',
        id: 'sequences/sequence_conflict',
      },
      {
        label: 'Sequence uncertainty',
        name: 'ft_unsure',
        id: 'sequences/sequence_uncertainty',
      },
      {
        label: 'Sequence version',
        name: 'sequence_version',
        id: 'sequences/sequence_version',
      },
    ],
  },
  {
    groupName: 'Function',
    isDatabaseGroup: false,
    id: 'function',
    fields: [
      { label: 'Absorption', name: 'absorption', id: 'function/absorption' },
      { label: 'Active site', name: 'ft_act_site', id: 'function/active_site' },
      {
        label: 'Binding site',
        name: 'ft_binding',
        id: 'function/binding_site',
      },
      {
        label: 'Catalytic activity',
        name: 'cc_catalytic_activity',
        id: 'function/catalytic_activity',
      },
      { label: 'Cofactor', name: 'cc_cofactor', id: 'function/cofactor' },
      { label: 'DNA binding', name: 'ft_dna_bind', id: 'function/dna_binding' },
      { label: 'EC number', name: 'ec', id: 'function/ec_number' },
      {
        label: 'Activity regulation',
        name: 'cc_activity_regulation',
        id: 'function/activity_regulation',
      },
      {
        label: 'Function [CC]',
        name: 'cc_function',
        id: 'function/function_[cc]',
      },
      { label: 'Kinetics', name: 'kinetics', id: 'function/kinetics' },
      { label: 'Pathway', name: 'cc_pathway', id: 'function/pathway' },
      {
        label: 'pH dependence',
        name: 'ph_dependence',
        id: 'function/ph_dependence',
      },
      {
        label: 'Redox potential',
        name: 'redox_potential',
        id: 'function/redox_potential',
      },
      { label: 'Rhea ID', name: 'rhea', id: 'function/rhea' },
      { label: 'Site', name: 'ft_site', id: 'function/site' },
      {
        label: 'Temperature dependence',
        name: 'temp_dependence',
        id: 'function/temperature_dependence',
      },
    ],
  },
  {
    groupName: 'Miscellaneous',
    isDatabaseGroup: false,
    id: 'miscellaneous',
    fields: [
      {
        label: 'Annotation',
        name: 'annotation_score',
        sortField: 'annotation_score',
        id: 'miscellaneous/annotation',
      },
      { label: 'Caution', name: 'cc_caution', id: 'miscellaneous/caution' },
      { label: 'Keywords', name: 'keyword', id: 'miscellaneous/keywords' },
      {
        label: 'Keyword ID',
        name: 'keywordid',
        id: 'miscellaneous/keyword_id',
      },
      {
        label: 'Miscellaneous [CC]',
        name: 'cc_miscellaneous',
        id: 'miscellaneous/miscellaneous_[cc]',
      },
      {
        label: 'Protein existence',
        name: 'protein_existence',
        id: 'miscellaneous/protein_existence',
      },
      { label: 'Reviewed', name: 'reviewed', id: 'miscellaneous/reviewed' },
      { label: 'Tools', name: 'tools', id: 'miscellaneous/tools' },
      { label: 'UniParc', name: 'uniparc_id', id: 'miscellaneous/uniparc' },
      {
        label: 'Comments',
        name: 'comment_count',
        id: 'miscellaneous/comment_count',
      },
      {
        label: 'Features',
        name: 'feature_count',
        id: 'miscellaneous/feature_count',
      },
    ],
  },
  {
    groupName: 'Interaction',
    isDatabaseGroup: false,
    id: 'interaction',
    fields: [
      {
        label: 'Interacts with',
        name: 'cc_interaction',
        id: 'interaction/interacts_with',
      },
      {
        label: 'Subunit structure',
        name: 'cc_subunit',
        id: 'interaction/subunit_structure',
      },
    ],
  },
  {
    groupName: 'Expression',
    isDatabaseGroup: false,
    id: 'expression',
    fields: [
      {
        label: 'Developmental stage',
        name: 'cc_developmental_stage',
        id: 'expression/developmental_stage',
      },
      { label: 'Induction', name: 'cc_induction', id: 'expression/induction' },
      {
        label: 'Tissue specificity',
        name: 'cc_tissue_specificity',
        id: 'expression/tissue_specificity',
      },
    ],
  },
  {
    groupName: 'Gene Ontology (GO)',
    isDatabaseGroup: false,
    id: 'gene_ontology_(go)',
    fields: [
      {
        label: 'Gene Ontology (biological process)',
        name: 'go_p',
        id: 'gene_ontology_(go)/gene_ontology_(biological_process)',
      },
      {
        label: 'Gene Ontology (cellular component)',
        name: 'go_c',
        id: 'gene_ontology_(go)/gene_ontology_(cellular_component)',
      },
      {
        label: 'Gene Ontology (GO)',
        name: 'go',
        id: 'gene_ontology_(go)/gene_ontology_(go)',
      },
      {
        label: 'Gene Ontology (molecular function)',
        name: 'go_f',
        id: 'gene_ontology_(go)/gene_ontology_(molecular_function)',
      },
      {
        label: 'Gene Ontology IDs',
        name: 'go_id',
        id: 'gene_ontology_(go)/gene_ontology_ids',
      },
    ],
  },
  {
    groupName: 'Pathology & Biotech',
    isDatabaseGroup: false,
    id: 'pathology_&_biotech',
    fields: [
      {
        label: 'Allergenic Properties',
        name: 'cc_allergen',
        id: 'pathology_&_biotech/allergenic_properties',
      },
      {
        label: 'Biotechnological use',
        name: 'cc_biotechnology',
        id: 'pathology_&_biotech/biotechnological_use',
      },
      {
        label: 'Disruption phenotype',
        name: 'cc_disruption_phenotype',
        id: 'pathology_&_biotech/disruption_phenotype',
      },
      {
        label: 'Involvement in disease',
        name: 'cc_disease',
        id: 'pathology_&_biotech/involvement_in_disease',
      },
      {
        label: 'Mutagenesis',
        name: 'ft_mutagen',
        id: 'pathology_&_biotech/mutagenesis',
      },
      {
        label: 'Pharmaceutical use',
        name: 'cc_pharmaceutical',
        id: 'pathology_&_biotech/pharmaceutical_use',
      },
      {
        label: 'Toxic dose',
        name: 'cc_toxic_dose',
        id: 'pathology_&_biotech/toxic_dose',
      },
    ],
  },
  {
    groupName: 'Subcellular location',
    isDatabaseGroup: false,
    id: 'subcellular_location',
    fields: [
      {
        label: 'Intramembrane',
        name: 'ft_intramem',
        id: 'subcellular_location/intramembrane',
      },
      {
        label: 'Subcellular location [CC]',
        name: 'cc_subcellular_location',
        id: 'subcellular_location/subcellular_location_[cc]',
      },
      {
        label: 'Topological domain',
        name: 'ft_topo_dom',
        id: 'subcellular_location/topological_domain',
      },
      {
        label: 'Transmembrane',
        name: 'ft_transmem',
        id: 'subcellular_location/transmembrane',
      },
    ],
  },
  {
    groupName: 'PTM / Processing',
    isDatabaseGroup: false,
    id: 'ptm_/_processing',
    fields: [
      { label: 'Chain', name: 'ft_chain', id: 'ptm_/_processing/chain' },
      {
        label: 'Cross-link',
        name: 'ft_crosslnk',
        id: 'ptm_/_processing/cross-link',
      },
      {
        label: 'Disulfide bond',
        name: 'ft_disulfid',
        id: 'ptm_/_processing/disulfide_bond',
      },
      {
        label: 'Glycosylation',
        name: 'ft_carbohyd',
        id: 'ptm_/_processing/glycosylation',
      },
      {
        label: 'Initiator methionine',
        name: 'ft_init_met',
        id: 'ptm_/_processing/initiator_methionine',
      },
      {
        label: 'Lipidation',
        name: 'ft_lipid',
        id: 'ptm_/_processing/lipidation',
      },
      {
        label: 'Modified residue',
        name: 'ft_mod_res',
        id: 'ptm_/_processing/modified_residue',
      },
      { label: 'Peptide', name: 'ft_peptide', id: 'ptm_/_processing/peptide' },
      {
        label: 'Post-translational modification',
        name: 'cc_ptm',
        id: 'ptm_/_processing/post-translational_modification',
      },
      {
        label: 'Propeptide',
        name: 'ft_propep',
        id: 'ptm_/_processing/propeptide',
      },
      {
        label: 'Signal peptide',
        name: 'ft_signal',
        id: 'ptm_/_processing/signal_peptide',
      },
      {
        label: 'Transit peptide',
        name: 'ft_transit',
        id: 'ptm_/_processing/transit_peptide',
      },
    ],
  },
  {
    groupName: 'Structure',
    isDatabaseGroup: false,
    id: 'structure',
    fields: [
      { label: '3D', name: 'structure_3d', id: 'structure/structure_3d' },
      { label: 'Beta strand', name: 'ft_strand', id: 'structure/beta_strand' },
      { label: 'Helix', name: 'ft_helix', id: 'structure/helix' },
      { label: 'Turn', name: 'ft_turn', id: 'structure/turn' },
    ],
  },
  {
    groupName: 'Publications',
    isDatabaseGroup: false,
    id: 'publications',
    fields: [
      {
        label: 'PubMed ID',
        name: 'lit_pubmed_id',
        id: 'publications/lit_pubmed_id',
      },
    ],
  },
  {
    groupName: 'Date of',
    isDatabaseGroup: false,
    id: 'date_of',
    fields: [
      {
        label: 'Date of creation',
        name: 'date_created',
        id: 'date_of/date_of_creation',
      },
      {
        label: 'Date of last modification',
        name: 'date_modified',
        id: 'date_of/date_of_last_modification',
      },
      {
        label: 'Date of last sequence modification',
        name: 'date_sequence_modified',
        id: 'date_of/date_of_last_sequence_modification',
      },
      { label: 'Entry version', name: 'version', id: 'date_of/entry_version' },
    ],
  },
  {
    groupName: 'Family & Domains',
    isDatabaseGroup: false,
    id: 'family_&_domains',
    fields: [
      {
        label: 'Coiled coil',
        name: 'ft_coiled',
        id: 'family_&_domains/coiled_coil',
      },
      {
        label: 'Compositional bias',
        name: 'ft_compbias',
        id: 'family_&_domains/compositional_bias',
      },
      {
        label: 'Domain [CC]',
        name: 'cc_domain',
        id: 'family_&_domains/domain_[cc]',
      },
      {
        label: 'Domain [FT]',
        name: 'ft_domain',
        id: 'family_&_domains/domain_[ft]',
      },
      { label: 'Motif', name: 'ft_motif', id: 'family_&_domains/motif' },
      {
        label: 'Protein families',
        name: 'protein_families',
        id: 'family_&_domains/protein_families',
      },
      { label: 'Region', name: 'ft_region', id: 'family_&_domains/region' },
      { label: 'Repeat', name: 'ft_repeat', id: 'family_&_domains/repeat' },
      {
        label: 'Sequence similarities',
        name: 'cc_similarity',
        id: 'family_&_domains/sequence_similarity',
      },
      {
        label: 'Zinc finger',
        name: 'ft_zn_fing',
        id: 'family_&_domains/zinc_finger',
      },
    ],
  },
  {
    groupName: 'Sequence',
    isDatabaseGroup: true,
    id: 'sequence',
    fields: [
      { label: 'CCDS', name: 'xref_ccds', id: 'sequence/ccds' },
      { label: 'EMBL', name: 'xref_embl', id: 'sequence/embl' },
      { label: 'PIR', name: 'xref_pir', id: 'sequence/pir' },
      { label: 'RefSeq', name: 'xref_refseq', id: 'sequence/refseq' },
    ],
  },
  {
    groupName: '3D structure',
    isDatabaseGroup: true,
    id: '3d_structure',
    fields: [
      {
        label: 'AlphaFoldDB',
        name: 'xref_alphafolddb',
        id: '3d_structure/alphafolddb',
      },
      { label: 'BMRB', name: 'xref_bmrb', id: '3d_structure/bmrb' },
      { label: 'PCDDB', name: 'xref_pcddb', id: '3d_structure/pcddb' },
      { label: 'PDB', name: 'xref_pdb', id: '3d_structure/pdb' },
      { label: 'PDBsum', name: 'xref_pdbsum', id: '3d_structure/pdbsum' },
      { label: 'SASBDB', name: 'xref_sasbdb', id: '3d_structure/sasbdb' },
      { label: 'SMR', name: 'xref_smr', id: '3d_structure/smr' },
    ],
  },
  {
    groupName: 'Protein-protein interaction',
    isDatabaseGroup: true,
    id: 'protein-protein_interaction',
    fields: [
      {
        label: 'BioGRID',
        name: 'xref_biogrid',
        id: 'protein-protein_interaction/biogrid',
      },
      {
        label: 'CORUM',
        name: 'xref_corum',
        id: 'protein-protein_interaction/corum',
      },
      {
        label: 'ComplexPortal',
        name: 'xref_complexportal',
        id: 'protein-protein_interaction/complexportal',
      },
      { label: 'DIP', name: 'xref_dip', id: 'protein-protein_interaction/dip' },
      { label: 'ELM', name: 'xref_elm', id: 'protein-protein_interaction/elm' },
      {
        label: 'IntAct',
        name: 'xref_intact',
        id: 'protein-protein_interaction/intact',
      },
      {
        label: 'MINT',
        name: 'xref_mint',
        id: 'protein-protein_interaction/mint',
      },
      {
        label: 'STRING',
        name: 'xref_string',
        id: 'protein-protein_interaction/string',
      },
    ],
  },
  {
    groupName: 'Chemistry',
    isDatabaseGroup: true,
    id: 'chemistry',
    fields: [
      { label: 'BindingDB', name: 'xref_bindingdb', id: 'chemistry/bindingdb' },
      { label: 'ChEMBL', name: 'xref_chembl', id: 'chemistry/chembl' },
      { label: 'DrugBank', name: 'xref_drugbank', id: 'chemistry/drugbank' },
      {
        label: 'DrugCentral',
        name: 'xref_drugcentral',
        id: 'chemistry/drugcentral',
      },
      {
        label: 'GuidetoPHARMACOLOGY',
        name: 'xref_guidetopharmacology',
        id: 'chemistry/guidetopharmacology',
      },
      {
        label: 'SwissLipids',
        name: 'xref_swisslipids',
        id: 'chemistry/swisslipids',
      },
    ],
  },
  {
    groupName: 'Protein family/group',
    isDatabaseGroup: true,
    id: 'protein_family/group',
    fields: [
      {
        label: 'Allergome',
        name: 'xref_allergome',
        id: 'protein_family/group/allergome',
      },
      { label: 'CAZy', name: 'xref_cazy', id: 'protein_family/group/cazy' },
      { label: 'CLAE', name: 'xref_clae', id: 'protein_family/group/clae' },
      {
        label: 'ESTHER',
        name: 'xref_esther',
        id: 'protein_family/group/esther',
      },
      {
        label: 'IMGT_GENE-DB',
        name: 'xref_imgt_gene-db',
        id: 'protein_family/group/imgt_gene-db',
      },
      {
        label: 'MEROPS',
        name: 'xref_merops',
        id: 'protein_family/group/merops',
      },
      {
        label: 'MoonDB',
        name: 'xref_moondb',
        id: 'protein_family/group/moondb',
      },
      {
        label: 'MoonProt',
        name: 'xref_moonprot',
        id: 'protein_family/group/moonprot',
      },
      {
        label: 'PeroxiBase',
        name: 'xref_peroxibase',
        id: 'protein_family/group/peroxibase',
      },
      {
        label: 'REBASE',
        name: 'xref_rebase',
        id: 'protein_family/group/rebase',
      },
      { label: 'TCDB', name: 'xref_tcdb', id: 'protein_family/group/tcdb' },
      {
        label: 'UniLectin',
        name: 'xref_unilectin',
        id: 'protein_family/group/unilectin',
      },
    ],
  },
  {
    groupName: 'PTM',
    isDatabaseGroup: true,
    id: 'ptm',
    fields: [
      { label: 'CarbonylDB', name: 'xref_carbonyldb', id: 'ptm/carbonyldb' },
      { label: 'DEPOD', name: 'xref_depod', id: 'ptm/depod' },
      { label: 'GlyConnect', name: 'xref_glyconnect', id: 'ptm/glyconnect' },
      { label: 'GlyCosmos', name: 'xref_glycosmos', id: 'ptm/glycosmos' },
      { label: 'GlyGen', name: 'xref_glygen', id: 'ptm/glygen' },
      { label: 'MetOSite', name: 'xref_metosite', id: 'ptm/metosite' },
      {
        label: 'PhosphoSitePlus',
        name: 'xref_phosphositeplus',
        id: 'ptm/phosphositeplus',
      },
      { label: 'SwissPalm', name: 'xref_swisspalm', id: 'ptm/swisspalm' },
      { label: 'UniCarbKB', name: 'xref_unicarbkb', id: 'ptm/unicarbkb' },
      { label: 'iPTMnet', name: 'xref_iptmnet', id: 'ptm/iptmnet' },
    ],
  },
  {
    groupName: 'Genetic variation',
    isDatabaseGroup: true,
    id: 'polymorphism_and_mutation',
    fields: [
      {
        label: 'BioMuta',
        name: 'xref_biomuta',
        id: 'polymorphism_and_mutation/biomuta',
      },
      {
        label: 'DMDM',
        name: 'xref_dmdm',
        id: 'polymorphism_and_mutation/dmdm',
      },
      {
        label: 'dbSNP',
        name: 'xref_dbsnp',
        id: 'polymorphism_and_mutation/dbsnp',
      },
    ],
  },
  {
    groupName: '2D gel',
    isDatabaseGroup: true,
    id: '2d_gel',
    fields: [
      {
        label: 'COMPLUYEAST-2DPAGE',
        name: 'xref_compluyeast-2dpage',
        id: '2d_gel/compluyeast-2dpage',
      },
      {
        label: 'DOSAC-COBS-2DPAGE',
        name: 'xref_dosac-cobs-2dpage',
        id: '2d_gel/dosac-cobs-2dpage',
      },
      { label: 'OGP', name: 'xref_ogp', id: '2d_gel/ogp' },
      {
        label: 'REPRODUCTION-2DPAGE',
        name: 'xref_reproduction-2dpage',
        id: '2d_gel/reproduction-2dpage',
      },
      {
        label: 'SWISS-2DPAGE',
        name: 'xref_swiss-2dpage',
        id: '2d_gel/swiss-2dpage',
      },
      { label: 'UCD-2DPAGE', name: 'xref_ucd-2dpage', id: '2d_gel/ucd-2dpage' },
      {
        label: 'World-2DPAGE',
        name: 'xref_world-2dpage',
        id: '2d_gel/world-2dpage',
      },
    ],
  },
  {
    groupName: 'Proteomic',
    isDatabaseGroup: true,
    id: 'proteomic',
    fields: [
      { label: 'CPTAC', name: 'xref_cptac', id: 'proteomic/cptac' },
      { label: 'EPD', name: 'xref_epd', id: 'proteomic/epd' },
      { label: 'MassIVE', name: 'xref_massive', id: 'proteomic/massive' },
      { label: 'MaxQB', name: 'xref_maxqb', id: 'proteomic/maxqb' },
      { label: 'PRIDE', name: 'xref_pride', id: 'proteomic/pride' },
      { label: 'PaxDb', name: 'xref_paxdb', id: 'proteomic/paxdb' },
      {
        label: 'PeptideAtlas',
        name: 'xref_peptideatlas',
        id: 'proteomic/peptideatlas',
      },
      { label: 'ProMEX', name: 'xref_promex', id: 'proteomic/promex' },
      {
        label: 'ProteomicsDB',
        name: 'xref_proteomicsdb',
        id: 'proteomic/proteomicsdb',
      },
      {
        label: 'TopDownProteomics',
        name: 'xref_topdownproteomics',
        id: 'proteomic/topdownproteomics',
      },
      { label: 'jPOST', name: 'xref_jpost', id: 'proteomic/jpost' },
    ],
  },
  {
    groupName: 'Protocols and materials',
    isDatabaseGroup: true,
    id: 'protocols_and_materials',
    fields: [
      { label: 'ABCD', name: 'xref_abcd', id: 'protocols_and_materials/abcd' },
      {
        label: 'Antibodypedia',
        name: 'xref_antibodypedia',
        id: 'protocols_and_materials/antibodypedia',
      },
      { label: 'CPTC', name: 'xref_cptc', id: 'protocols_and_materials/cptc' },
      {
        label: 'DNASU',
        name: 'xref_dnasu',
        id: 'protocols_and_materials/dnasu',
      },
    ],
  },
  {
    groupName: 'Genome annotation',
    isDatabaseGroup: true,
    id: 'genome_annotation',
    fields: [
      {
        label: 'Ensembl',
        name: 'xref_ensembl',
        id: 'genome_annotation/ensembl',
      },
      {
        label: 'EnsemblBacteria',
        name: 'xref_ensemblbacteria',
        id: 'genome_annotation/ensemblbacteria',
      },
      {
        label: 'EnsemblFungi',
        name: 'xref_ensemblfungi',
        id: 'genome_annotation/ensemblfungi',
      },
      {
        label: 'EnsemblMetazoa',
        name: 'xref_ensemblmetazoa',
        id: 'genome_annotation/ensemblmetazoa',
      },
      {
        label: 'EnsemblPlants',
        name: 'xref_ensemblplants',
        id: 'genome_annotation/ensemblplants',
      },
      {
        label: 'EnsemblProtists',
        name: 'xref_ensemblprotists',
        id: 'genome_annotation/ensemblprotists',
      },
      { label: 'GeneID', name: 'xref_geneid', id: 'genome_annotation/geneid' },
      {
        label: 'Gramene',
        name: 'xref_gramene',
        id: 'genome_annotation/gramene',
      },
      { label: 'KEGG', name: 'xref_kegg', id: 'genome_annotation/kegg' },
      {
        label: 'MANE-Select',
        name: 'xref_mane-select',
        id: 'genome_annotation/mane-select',
      },
      { label: 'PATRIC', name: 'xref_patric', id: 'genome_annotation/patric' },
      { label: 'UCSC', name: 'xref_ucsc', id: 'genome_annotation/ucsc' },
      {
        label: 'VectorBase',
        name: 'xref_vectorbase',
        id: 'genome_annotation/vectorbase',
      },
      {
        label: 'WBParaSite',
        name: 'xref_wbparasite',
        id: 'genome_annotation/wbparasite',
      },
      {
        label: 'WBParaSiteTranscriptProtein',
        name: 'xref_wbparasitetranscriptprotein',
        id: 'genome_annotation/wbparasitetranscriptprotein',
      },
    ],
  },
  {
    groupName: 'Organism-specific',
    isDatabaseGroup: true,
    id: 'organism-specific',
    fields: [
      { label: 'AGR', name: 'xref_agr', id: 'organism-specific/agr' },
      {
        label: 'ArachnoServer',
        name: 'xref_arachnoserver',
        id: 'organism-specific/arachnoserver',
      },
      {
        label: 'Araport',
        name: 'xref_araport',
        id: 'organism-specific/araport',
      },
      { label: 'CGD', name: 'xref_cgd', id: 'organism-specific/cgd' },
      { label: 'CTD', name: 'xref_ctd', id: 'organism-specific/ctd' },
      {
        label: 'ConoServer',
        name: 'xref_conoserver',
        id: 'organism-specific/conoserver',
      },
      {
        label: 'DisGeNET',
        name: 'xref_disgenet',
        id: 'organism-specific/disgenet',
      },
      {
        label: 'EchoBASE',
        name: 'xref_echobase',
        id: 'organism-specific/echobase',
      },
      {
        label: 'FlyBase',
        name: 'xref_flybase',
        id: 'organism-specific/flybase',
      },
      {
        label: 'GeneCards',
        name: 'xref_genecards',
        id: 'organism-specific/genecards',
      },
      {
        label: 'GeneReviews',
        name: 'xref_genereviews',
        id: 'organism-specific/genereviews',
      },
      { label: 'HGNC', name: 'xref_hgnc', id: 'organism-specific/hgnc' },
      { label: 'HPA', name: 'xref_hpa', id: 'organism-specific/hpa' },
      {
        label: 'LegioList',
        name: 'xref_legiolist',
        id: 'organism-specific/legiolist',
      },
      {
        label: 'Leproma',
        name: 'xref_leproma',
        id: 'organism-specific/leproma',
      },
      { label: 'MGI', name: 'xref_mgi', id: 'organism-specific/mgi' },
      { label: 'MIM', name: 'xref_mim', id: 'organism-specific/mim' },
      {
        label: 'MaizeGDB',
        name: 'xref_maizegdb',
        id: 'organism-specific/maizegdb',
      },
      {
        label: 'MalaCards',
        name: 'xref_malacards',
        id: 'organism-specific/malacards',
      },
      {
        label: 'NIAGADS',
        name: 'xref_niagads',
        id: 'organism-specific/niagads',
      },
      {
        label: 'OpenTargets',
        name: 'xref_opentargets',
        id: 'organism-specific/opentargets',
      },
      {
        label: 'Orphanet',
        name: 'xref_orphanet',
        id: 'organism-specific/orphanet',
      },
      {
        label: 'PharmGKB',
        name: 'xref_pharmgkb',
        id: 'organism-specific/pharmgkb',
      },
      {
        label: 'PomBase',
        name: 'xref_pombase',
        id: 'organism-specific/pombase',
      },
      {
        label: 'PseudoCAP',
        name: 'xref_pseudocap',
        id: 'organism-specific/pseudocap',
      },
      { label: 'RGD', name: 'xref_rgd', id: 'organism-specific/rgd' },
      { label: 'SGD', name: 'xref_sgd', id: 'organism-specific/sgd' },
      { label: 'TAIR', name: 'xref_tair', id: 'organism-specific/tair' },
      {
        label: 'TubercuList',
        name: 'xref_tuberculist',
        id: 'organism-specific/tuberculist',
      },
      {
        label: 'VEuPathDB',
        name: 'xref_veupathdb',
        id: 'organism-specific/veupathdb',
      },
      { label: 'VGNC', name: 'xref_vgnc', id: 'organism-specific/vgnc' },
      {
        label: 'WormBase',
        name: 'xref_wormbase',
        id: 'organism-specific/wormbase',
      },
      {
        label: 'Xenbase',
        name: 'xref_xenbase',
        id: 'organism-specific/xenbase',
      },
      { label: 'ZFIN', name: 'xref_zfin', id: 'organism-specific/zfin' },
      {
        label: 'dictyBase',
        name: 'xref_dictybase',
        id: 'organism-specific/dictybase',
      },
      {
        label: 'euHCVdb',
        name: 'xref_euhcvdb',
        id: 'organism-specific/euhcvdb',
      },
      {
        label: 'neXtProt',
        name: 'xref_nextprot',
        id: 'organism-specific/nextprot',
      },
    ],
  },
  {
    groupName: 'Phylogenomic',
    isDatabaseGroup: true,
    id: 'phylogenomic',
    fields: [
      { label: 'GeneTree', name: 'xref_genetree', id: 'phylogenomic/genetree' },
      { label: 'HOGENOM', name: 'xref_hogenom', id: 'phylogenomic/hogenom' },
      {
        label: 'InParanoid',
        name: 'xref_inparanoid',
        id: 'phylogenomic/inparanoid',
      },
      { label: 'KO', name: 'xref_ko', id: 'phylogenomic/ko' },
      { label: 'OMA', name: 'xref_oma', id: 'phylogenomic/oma' },
      { label: 'OrthoDB', name: 'xref_orthodb', id: 'phylogenomic/orthodb' },
      {
        label: 'PhylomeDB',
        name: 'xref_phylomedb',
        id: 'phylogenomic/phylomedb',
      },
      { label: 'TreeFam', name: 'xref_treefam', id: 'phylogenomic/treefam' },
      { label: 'eggNOG', name: 'xref_eggnog', id: 'phylogenomic/eggnog' },
    ],
  },
  {
    groupName: 'Enzyme and pathway',
    isDatabaseGroup: true,
    id: 'enzyme_and_pathway',
    fields: [
      { label: 'BRENDA', name: 'xref_brenda', id: 'enzyme_and_pathway/brenda' },
      { label: 'BioCyc', name: 'xref_biocyc', id: 'enzyme_and_pathway/biocyc' },
      {
        label: 'PathwayCommons',
        name: 'xref_pathwaycommons',
        id: 'enzyme_and_pathway/pathwaycommons',
      },
      {
        label: 'PlantReactome',
        name: 'xref_plantreactome',
        id: 'enzyme_and_pathway/plantreactome',
      },
      {
        label: 'Reactome',
        name: 'xref_reactome',
        id: 'enzyme_and_pathway/reactome',
      },
      {
        label: 'SABIO-RK',
        name: 'xref_sabio-rk',
        id: 'enzyme_and_pathway/sabio-rk',
      },
      { label: 'SIGNOR', name: 'xref_signor', id: 'enzyme_and_pathway/signor' },
      {
        label: 'SignaLink',
        name: 'xref_signalink',
        id: 'enzyme_and_pathway/signalink',
      },
      {
        label: 'UniPathway',
        name: 'xref_unipathway',
        id: 'enzyme_and_pathway/unipathway',
      },
    ],
  },
  {
    groupName: 'Miscellaneous',
    isDatabaseGroup: true,
    id: 'other',
    fields: [
      {
        label: 'BioGRID-ORCS',
        name: 'xref_biogrid-orcs',
        id: 'other/biogrid-orcs',
      },
      { label: 'ChiTaRS', name: 'xref_chitars', id: 'other/chitars' },
      {
        label: 'EvolutionaryTrace',
        name: 'xref_evolutionarytrace',
        id: 'other/evolutionarytrace',
      },
      { label: 'GeneWiki', name: 'xref_genewiki', id: 'other/genewiki' },
      { label: 'GenomeRNAi', name: 'xref_genomernai', id: 'other/genomernai' },
      { label: 'PHI-base', name: 'xref_phi-base', id: 'other/phi-base' },
      { label: 'PRO', name: 'xref_pro', id: 'other/pro' },
      { label: 'Pharos', name: 'xref_pharos', id: 'other/pharos' },
      { label: 'RNAct', name: 'xref_rnact', id: 'other/rnact' },
    ],
  },
  {
    groupName: 'Gene expression',
    isDatabaseGroup: true,
    id: 'gene_expression',
    fields: [
      { label: 'Bgee', name: 'xref_bgee', id: 'gene_expression/bgee' },
      { label: 'CleanEx', name: 'xref_cleanex', id: 'gene_expression/cleanex' },
      {
        label: 'CollecTF',
        name: 'xref_collectf',
        id: 'gene_expression/collectf',
      },
      {
        label: 'ExpressionAtlas',
        name: 'xref_expressionatlas',
        id: 'gene_expression/expressionatlas',
      },
      {
        label: 'Genevisible',
        name: 'xref_genevisible',
        id: 'gene_expression/genevisible',
      },
    ],
  },
  {
    groupName: 'Family and domain',
    isDatabaseGroup: true,
    id: 'family_and_domain',
    fields: [
      { label: 'CDD', name: 'xref_cdd', id: 'family_and_domain/cdd' },
      {
        label: 'DisProt',
        name: 'xref_disprot',
        id: 'family_and_domain/disprot',
      },
      { label: 'Gene3D', name: 'xref_gene3d', id: 'family_and_domain/gene3d' },
      { label: 'HAMAP', name: 'xref_hamap', id: 'family_and_domain/hamap' },
      { label: 'IDEAL', name: 'xref_ideal', id: 'family_and_domain/ideal' },
      {
        label: 'InterPro',
        name: 'xref_interpro',
        id: 'family_and_domain/interpro',
      },
      {
        label: 'PANTHER',
        name: 'xref_panther',
        id: 'family_and_domain/panther',
      },
      { label: 'PIRSF', name: 'xref_pirsf', id: 'family_and_domain/pirsf' },
      { label: 'PRINTS', name: 'xref_prints', id: 'family_and_domain/prints' },
      {
        label: 'PROSITE',
        name: 'xref_prosite',
        id: 'family_and_domain/prosite',
      },
      { label: 'Pfam', name: 'xref_pfam', id: 'family_and_domain/pfam' },
      { label: 'ProDom', name: 'xref_prodom', id: 'family_and_domain/prodom' },
      { label: 'SFLD', name: 'xref_sfld', id: 'family_and_domain/sfld' },
      { label: 'SMART', name: 'xref_smart', id: 'family_and_domain/smart' },
      { label: 'SUPFAM', name: 'xref_supfam', id: 'family_and_domain/supfam' },
      {
        label: 'TIGRFAMs',
        name: 'xref_tigrfams',
        id: 'family_and_domain/tigrfams',
      },
    ],
  },
] as ReceivedFieldData;

export default mock;
