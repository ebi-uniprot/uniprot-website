import { DatabaseCategory } from '../../../types/databaseRefs';
import { DatabaseCategoryToNames } from '../../database';

const databaseCategoryToNames: DatabaseCategoryToNames = new Map([
  [
    DatabaseCategory.SEQUENCE,
    ['EMBL', 'GenBank', 'DDBJ', 'CCDS', 'PIR', 'RefSeq'],
  ],
  [
    DatabaseCategory.STRUCTURE,
    [
      'PDB',
      'PDBsum',
      'PCDDB',
      'SASBDB',
      'BMRB',
      'ModBase',
      'SMR',
      'SWISS-MODEL-Workspace',
      'PDBe-KB',
      'PDBj',
      'RCSB-PDB',
    ],
  ],
  [
    DatabaseCategory.INTERACTION,
    [
      'BioGRID',
      'ComplexPortal',
      'CORUM',
      'DIP',
      'ELM',
      'IntAct',
      'MINT',
      'STRING',
    ],
  ],
  [
    DatabaseCategory.CHEMISTRY,
    [
      'BindingDB',
      'ChEMBL',
      'DrugBank',
      'GuidetoPHARMACOLOGY',
      'SwissLipids',
      'DrugCentral',
    ],
  ],
  [
    DatabaseCategory.FAMILY,
    [
      'Allergome',
      'CAZy',
      'ESTHER',
      'IMGT_GENE-DB',
      'MEROPS',
      'MoonDB',
      'MoonProt',
      'CLAE',
      'PeroxiBase',
      'REBASE',
      'TCDB',
      'UniLectin',
      'GPCRDB',
    ],
  ],
  [
    DatabaseCategory.PTM,
    [
      'CarbonylDB',
      'DEPOD',
      'GlyConnect',
      'GlyGen',
      'iPTMnet',
      'PhosphoSitePlus',
      'SwissPalm',
      'UniCarbKB',
      'MetOSite',
    ],
  ],
  [DatabaseCategory.GENETIC_VARIATION, ['BioMuta', 'DMDM', 'dbSNP']],
  [
    DatabaseCategory.GEL,
    [
      'COMPLUYEAST-2DPAGE',
      'DOSAC-COBS-2DPAGE',
      'OGP',
      'REPRODUCTION-2DPAGE',
      'SWISS-2DPAGE',
      'UCD-2DPAGE',
      'World-2DPAGE',
    ],
  ],
  [
    DatabaseCategory.PROTEOMIC,
    [
      'CPTAC',
      'EPD',
      'MaxQB',
      'PaxDb',
      'PeptideAtlas',
      'PRIDE',
      'ProMEX',
      'ProteomicsDB',
      'TopDownProteomics',
      'jPOST',
      'MassIVE',
    ],
  ],
  [DatabaseCategory.PROTOCOL, ['DNASU', 'ABCD', 'Antibodypedia', 'CPTC']],
  [
    DatabaseCategory.GENOME,
    [
      'Ensembl',
      'EnsemblBacteria',
      'EnsemblFungi',
      'EnsemblMetazoa',
      'EnsemblPlants',
      'EnsemblProtists',
      'GeneDB',
      'GeneID',
      'Gramene',
      'KEGG',
      'PATRIC',
      'UCSC',
      'VectorBase',
      'WBParaSite',
    ],
  ],
  [
    DatabaseCategory.ORGANISM,
    [
      'ArachnoServer',
      'Araport',
      'CGD',
      'ConoServer',
      'CTD',
      'dictyBase',
      'DisGeNET',
      'EchoBASE',
      'euHCVdb',
      'VEuPathDB',
      'FlyBase',
      'GeneCards',
      'GeneReviews',
      'HGNC',
      'GenAtlas',
      'HPA',
      'LegioList',
      'Leproma',
      'MaizeGDB',
      'MalaCards',
      'MGI',
      'MIM',
      'NIAGADS',
      'neXtProt',
      'OpenTargets',
      'Orphanet',
      'PharmGKB',
      'PomBase',
      'PseudoCAP',
      'RGD',
      'SGD',
      'TAIR',
      'TubercuList',
      'VGNC',
      'WormBase',
      'Xenbase',
      'ZFIN',
      'HUGE',
      'Rouge',
    ],
  ],
  [
    DatabaseCategory.PHYLOGENOMIC,
    [
      'eggNOG',
      'GeneTree',
      'HOGENOM',
      'InParanoid',
      'KO',
      'OMA',
      'OrthoDB',
      'PhylomeDB',
      'TreeFam',
    ],
  ],
  [
    DatabaseCategory.PATHWAY,
    [
      'BioCyc',
      'BRENDA',
      'Reactome',
      'SABIO-RK',
      'SignaLink',
      'SIGNOR',
      'UniPathway',
      'PlantReactome',
      'ENZYME',
      'PathwayCommons',
    ],
  ],
  [
    DatabaseCategory.MISCELLANEOUS,
    [
      'ChiTaRS',
      'EvolutionaryTrace',
      'GeneWiki',
      'GenomeRNAi',
      'PHI-base',
      'PRO',
      'SOURCE_MIM',
      'SOURCE_MGI',
      'Pharos',
      'RNAct',
      'BioGRID-ORCS',
    ],
  ],
  [
    DatabaseCategory.EXPRESSION,
    ['Bgee', 'CleanEx', 'CollecTF', 'ExpressionAtlas', 'Genevisible'],
  ],
  [
    DatabaseCategory.DOMAIN,
    [
      'CDD',
      'Gene3D',
      'HAMAP',
      'IDEAL',
      'InterPro',
      'PANTHER',
      DatabaseCategory.FAMILY,
      'PIRSF',
      'PRINTS',
      'ProDom',
      'SFLD',
      'SMART',
      'SUPFAM',
      'TIGRFAMs',
      'PROSITE',
      'DisProt',
      'MobiDB',
      'ProtoNet',
    ],
  ],
  // TODO: investigate - these 2 are missing from DatabaseCategory
  // ['OTG', ['GO']],
  // ['PRM', ['Proteomes']],
]);

export default databaseCategoryToNames;
