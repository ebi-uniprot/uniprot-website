// Maps to 'name' attributes in /api/configure/uniprotkb/result-fields
// To extract all as a text list:
//     curl -s <prefix>/api/configure/uniprotkb/result-fields | jq '..|.name? | strings'
// And to create a CSV string so this can be pasted into the developer application's localstorage entry pipe the above to:
//     <above> | paste -s -d, -
// Note: cc_similarity exists as a search field but is not present as a result field
export enum UniProtKBColumn {
  absorption = 'absorption',
  accession = 'accession',
  annotationScore = 'annotation_score',
  ccActivityRegulation = 'cc_activity_regulation',
  ccAllergen = 'cc_allergen',
  ccAlternativeProducts = 'cc_alternative_products',
  ccBiotechnology = 'cc_biotechnology',
  ccCatalyticActivity = 'cc_catalytic_activity',
  ccCaution = 'cc_caution',
  ccCofactor = 'cc_cofactor',
  ccDevelopmentalStage = 'cc_developmental_stage',
  ccDisease = 'cc_disease',
  ccDisruptionPhenotype = 'cc_disruption_phenotype',
  ccDomain = 'cc_domain',
  ccFunction = 'cc_function',
  ccInduction = 'cc_induction',
  ccInteraction = 'cc_interaction',
  ccMassSpectrometry = 'cc_mass_spectrometry',
  ccMiscellaneous = 'cc_miscellaneous',
  ccPathway = 'cc_pathway',
  ccPharmaceutical = 'cc_pharmaceutical',
  ccPolymorphism = 'cc_polymorphism',
  ccPtm = 'cc_ptm',
  ccRnaEditing = 'cc_rna_editing',
  ccSequenceCaution = 'cc_sequence_caution',
  ccSimilarity = 'cc_similarity',
  ccSubcellularLocation = 'cc_subcellular_location',
  ccSubunit = 'cc_subunit',
  ccTissueSpecificity = 'cc_tissue_specificity',
  ccToxicDose = 'cc_toxic_dose',
  commentCount = 'comment_count',
  dateCreated = 'date_created',
  dateModified = 'date_modified',
  dateSequenceModified = 'date_sequence_modified',
  ec = 'ec',
  errorGmodelPred = 'error_gmodel_pred',
  featureCount = 'feature_count',
  fragment = 'fragment',
  ftActSite = 'ft_act_site',
  ftBinding = 'ft_binding',
  ftCarbohyd = 'ft_carbohyd',
  ftChain = 'ft_chain',
  ftCoiled = 'ft_coiled',
  ftCompbias = 'ft_compbias',
  ftConflict = 'ft_conflict',
  ftCrosslnk = 'ft_crosslnk',
  ftDisulfid = 'ft_disulfid',
  ftDnaBind = 'ft_dna_bind',
  ftDomain = 'ft_domain',
  ftHelix = 'ft_helix',
  ftInitMet = 'ft_init_met',
  ftIntramem = 'ft_intramem',
  ftLipid = 'ft_lipid',
  ftModRes = 'ft_mod_res',
  ftMotif = 'ft_motif',
  ftMutagen = 'ft_mutagen',
  ftNonCons = 'ft_non_cons',
  ftNonStd = 'ft_non_std',
  ftNonTer = 'ft_non_ter',
  ftPeptide = 'ft_peptide',
  ftPropep = 'ft_propep',
  ftRegion = 'ft_region',
  ftRepeat = 'ft_repeat',
  ftSignal = 'ft_signal',
  ftSite = 'ft_site',
  ftStrand = 'ft_strand',
  ftTopoDom = 'ft_topo_dom',
  ftTransit = 'ft_transit',
  ftTransmem = 'ft_transmem',
  ftTurn = 'ft_turn',
  ftUnsure = 'ft_unsure',
  ftVarSeq = 'ft_var_seq',
  ftVariant = 'ft_variant',
  ftZnFing = 'ft_zn_fing',
  geneNames = 'gene_names',
  geneOln = 'gene_oln',
  geneOrf = 'gene_orf',
  genePrimary = 'gene_primary',
  geneSynonym = 'gene_synonym',
  go = 'go',
  goC = 'go_c',
  goF = 'go_f',
  goId = 'go_id',
  goP = 'go_p',
  id = 'id',
  keyword = 'keyword',
  keywordid = 'keywordid',
  kinetics = 'kinetics',
  length = 'length',
  lineage = 'lineage',
  lineageIds = 'lineage_ids',
  litPubmedId = 'lit_pubmed_id',
  litDoiId = 'lit_doi_id',
  mass = 'mass',
  matchedText = 'matched_text',
  organelle = 'organelle',
  organismId = 'organism_id',
  organismName = 'organism_name',
  phDependence = 'ph_dependence',
  proteinExistence = 'protein_existence',
  proteinFamilies = 'protein_families',
  proteinName = 'protein_name',
  proteome = 'proteome',
  proteomeComponent = 'proteomecomponent',
  redoxPotential = 'redox_potential',
  rhea = 'rhea',
  reviewed = 'reviewed',
  sequence = 'sequence',
  sequenceVersion = 'sequence_version',
  structure3D = 'structure_3d',
  tempDependence = 'temp_dependence',
  tlAll = 'tl_all',
  tlClass = 'tl_class',
  tlCohort = 'tl_cohort',
  tlFamily = 'tl_family',
  tlForma = 'tl_forma',
  tlGenus = 'tl_genus',
  tlInfraclass = 'tl_infraclass',
  tlInfraorder = 'tl_infraorder',
  tlKingdom = 'tl_kingdom',
  tlOrder = 'tl_order',
  tlParvorder = 'tl_parvorder',
  tlPhylum = 'tl_phylum',
  tlSpecies = 'tl_species',
  tlSpeciesGroup = 'tl_species_group',
  tlSpeciesSubgroup = 'tl_species_subgroup',
  tlSubclass = 'tl_subclass',
  tlSubcohort = 'tl_subcohort',
  tlSubfamily = 'tl_subfamily',
  tlSubgenus = 'tl_subgenus',
  tlSubkingdom = 'tl_subkingdom',
  tlSuborder = 'tl_suborder',
  tlSubphylum = 'tl_subphylum',
  tlSubspecies = 'tl_subspecies',
  tlSubtribe = 'tl_subtribe',
  tlSuperclass = 'tl_superclass',
  tlSuperfamily = 'tl_superfamily',
  tlSuperkingdom = 'tl_superkingdom',
  tlSuperorder = 'tl_superorder',
  tlSuperphylum = 'tl_superphylum',
  tlTribe = 'tl_tribe',
  tlVarietas = 'tl_varietas',
  tools = 'tools',
  uniparcId = 'uniparc_id',
  version = 'version',
  organismHosts = 'virus_hosts',
  xrefAbcd = 'xref_abcd',
  xrefAgr = 'xref_agr',
  xrefAllergome = 'xref_allergome',
  xrefAlphafolddb = 'xref_alphafolddb',
  xrefAlzforum = 'xref_alzforum',
  xrefAntibodypedia = 'xref_antibodypedia',
  xrefAntifam = 'xref_antifam',
  xrefArachnoserver = 'xref_arachnoserver',
  xrefAraport = 'xref_araport',
  xrefBgee = 'xref_bgee',
  xrefBindingdb = 'xref_bindingdb',
  xrefBiocyc = 'xref_biocyc',
  xrefBiogrid = 'xref_biogrid',
  xrefBiogridOrcs = 'xref_biogrid-orcs',
  xrefBiomuta = 'xref_biomuta',
  xrefBmrb = 'xref_bmrb',
  xrefBrenda = 'xref_brenda',
  xrefCarbonyldb = 'xref_carbonyldb',
  xrefCazy = 'xref_cazy',
  xrefCcds = 'xref_ccds',
  xrefCdd = 'xref_cdd',
  xrefCdCode = 'xref_cd-code',
  xrefCgd = 'xref_cgd',
  xrefChembl = 'xref_chembl',
  xrefChitars = 'xref_chitars',
  xrefCleanex = 'xref_cleanex',
  xrefCollectf = 'xref_collectf',
  xrefComplexportal = 'xref_complexportal',
  xrefConoserver = 'xref_conoserver',
  xrefCorum = 'xref_corum',
  xrefCptac = 'xref_cptac',
  xrefCptc = 'xref_cptc',
  xrefCtd = 'xref_ctd',
  xrefDbsnp = 'xref_dbsnp',
  xrefDepod = 'xref_depod',
  xrefDictybase = 'xref_dictybase',
  xrefDip = 'xref_dip',
  xrefDisgenet = 'xref_disgenet',
  xrefDisprot = 'xref_disprot',
  xrefDmdm = 'xref_dmdm',
  xrefDnasu = 'xref_dnasu',
  xrefDrugCentral = 'xref_drugcentral',
  xrefDrugbank = 'xref_drugbank',
  xrefEchobase = 'xref_echobase',
  xrefEggnog = 'xref_eggnog',
  xrefElm = 'xref_elm',
  xrefEmbl = 'xref_embl',
  xrefEmdb = 'xref_emdb',
  xrefEmind = 'xref_emind',
  xrefEnsembl = 'xref_ensembl',
  xrefEnsemblbacteria = 'xref_ensemblbacteria',
  xrefEnsemblfungi = 'xref_ensemblfungi',
  xrefEnsemblmetazoa = 'xref_ensemblmetazoa',
  xrefEnsemblplants = 'xref_ensemblplants',
  xrefEnsemblprotists = 'xref_ensemblprotists',
  xrefEsther = 'xref_esther',
  xrefEuhcvdb = 'xref_euhcvdb',
  xrefEvolutionarytrace = 'xref_evolutionarytrace',
  xrefExpressionatlas = 'xref_expressionatlas',
  xrefFlybase = 'xref_flybase',
  xrefFunfam = 'xref_funfam',
  xrefGene3D = 'xref_gene3d',
  xrefGenecards = 'xref_genecards',
  xrefGeneid = 'xref_geneid',
  xrefGenereviews = 'xref_genereviews',
  GeneRIF = 'xref_generif',
  xrefGenetree = 'xref_genetree',
  xrefGenewiki = 'xref_genewiki',
  xrefGenomernai = 'xref_genomernai',
  xrefGlycosmos = 'xref_glycosmos',
  xrefGlyGen = 'xref_glygen',
  xrefGlyconnect = 'xref_glyconnect',
  xrefGo = 'xref_go',
  xrefGramene = 'xref_gramene',
  xrefGuidetopharmacology = 'xref_guidetopharmacology',
  xrefHamap = 'xref_hamap',
  xrefHgnc = 'xref_hgnc',
  xrefHogenom = 'xref_hogenom',
  xrefHpa = 'xref_hpa',
  xrefIC4R = 'xref_ic4r',
  xrefIdeal = 'xref_ideal',
  xrefImgtGeneDb = 'xref_imgt_gene-db',
  xrefInparanoid = 'xref_inparanoid',
  xrefIntact = 'xref_intact',
  xrefInterpro = 'xref_interpro',
  xrefIptmnet = 'xref_iptmnet',
  xrefJaponicusdb = 'xref_japonicusdb',
  xrefJpost = 'xref_jpost',
  xrefKegg = 'xref_kegg',
  xrefLegiolist = 'xref_legiolist',
  xrefLeproma = 'xref_leproma',
  xrefMaizegdb = 'xref_maizegdb',
  xrefMalacards = 'xref_malacards',
  xrefManeSelect = 'xref_mane-select',
  xrefMassive = 'xref_massive',
  xrefMerops = 'xref_merops',
  xrefMetosite = 'xref_metosite',
  xrefMgi = 'xref_mgi',
  xrefMim = 'xref_mim',
  xrefMint = 'xref_mint',
  xrefMoondb = 'xref_moondb',
  xrefMoonprot = 'xref_moonprot',
  xrefNextprot = 'xref_nextprot',
  xrefNiagads = 'xref_niagads',
  xrefOgp = 'xref_ogp',
  xrefOma = 'xref_oma',
  xrefOpentargets = 'xref_opentargets',
  xrefORCID = 'xref_orcid',
  xrefOrphanet = 'xref_orphanet',
  xrefOrthodb = 'xref_orthodb',
  xrefPanther = 'xref_panther',
  xrefPathwayCommons = 'xref_pathwaycommons',
  xrefPatric = 'xref_patric',
  xrefPaxdb = 'xref_paxdb',
  xrefPcddb = 'xref_pcddb',
  xrefPdb = 'xref_pdb',
  xrefPdbsum = 'xref_pdbsum',
  xrefPeptideatlas = 'xref_peptideatlas',
  xrefPeroxibase = 'xref_peroxibase',
  xrefPfam = 'xref_pfam',
  xrefPGenN = 'xref_pgenn',
  xrefPharmgkb = 'xref_pharmgkb',
  xrefPharos = 'xref_pharos',
  xrefPhiBase = 'xref_phi-base',
  xrefPhosphositeplus = 'xref_phosphositeplus',
  xrefPhylomedb = 'xref_phylomedb',
  xrefPir = 'xref_pir',
  xrefPirsf = 'xref_pirsf',
  xrefPlantreactome = 'xref_plantreactome',
  xrefPombase = 'xref_pombase',
  xrefPride = 'xref_pride',
  xrefPrints = 'xref_prints',
  xrefPro = 'xref_pro',
  xrefPromex = 'xref_promex',
  xrefProsite = 'xref_prosite',
  xrefProteomes = 'xref_proteomes',
  xrefProteomicsdb = 'xref_proteomicsdb',
  xrefPubTator = 'xref_pseudocap',
  xrefPseudocap = 'xref_pubtator',
  xrefPumba = 'xref_pumba',
  xrefReactome = 'xref_reactome',
  xrefRebase = 'xref_rebase',
  xrefRefseq = 'xref_refseq',
  xrefReproduction2Dpage = 'xref_reproduction-2dpage',
  xrefRgd = 'xref_rgd',
  xrefRnact = 'xref_rnact',
  xrefSabioRk = 'xref_sabio-rk',
  xrefSasbdb = 'xref_sasbdb',
  xrefSfld = 'xref_sfld',
  xrefSgd = 'xref_sgd',
  xrefSignalink = 'xref_signalink',
  xrefSignor = 'xref_signor',
  xrefSmart = 'xref_smart',
  xrefSmr = 'xref_smr',
  xrefStrendaDb = 'xref_strenda-db',
  xrefString = 'xref_string',
  xrefSupfam = 'xref_supfam',
  xrefSwisslipids = 'xref_swisslipids',
  xrefSwisspalm = 'xref_swisspalm',
  xrefTair = 'xref_tair',
  xrefTcdb = 'xref_tcdb',
  xrefNcbifam = 'xref_ncbifam',
  xrefTopdownproteomics = 'xref_topdownproteomics',
  xrefTreefam = 'xref_treefam',
  xrefTuberculist = 'xref_tuberculist',
  xrefUcsc = 'xref_ucsc',
  xrefUnicarbkb = 'xref_unicarbkb',
  xrefUnilectin = 'xref_unilectin',
  xrefUnipathway = 'xref_unipathway',
  xrefVectorbase = 'xref_vectorbase',
  xrefVeupathdb = 'xref_veupathdb',
  xrefVgnc = 'xref_vgnc',
  xrefWbparasite = 'xref_wbparasite',
  xrefWormbase = 'xref_wormbase',
  xrefXenbase = 'xref_xenbase',
  xrefYCharOS = 'xref_ycharos',
  xrefZfin = 'xref_zfin',
  from = 'from', // id mapping
  match = 'match', // peptide search
}

export type SortableColumn =
  | UniProtKBColumn.accession
  | UniProtKBColumn.annotationScore
  | UniProtKBColumn.geneNames
  | UniProtKBColumn.id
  | UniProtKBColumn.length
  | UniProtKBColumn.mass
  | UniProtKBColumn.organismName
  | UniProtKBColumn.proteinName;
