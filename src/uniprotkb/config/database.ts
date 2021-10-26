import EntrySection from '../types/entrySection';
import { DatabaseCategory } from '../types/databaseRefs';
import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../utils/database';
import databaseInfo from './databaseInfo';
import externalUrls from '../../shared/config/externalUrls';

export const databaseCategoryToString = {
  [DatabaseCategory.CHEMISTRY]: 'Chemistry',
  [DatabaseCategory.DOMAIN]: 'Family and domain databases',
  [DatabaseCategory.EXPRESSION]: 'Gene expression databases',
  [DatabaseCategory.FAMILY]: 'Protein family/group databases',
  [DatabaseCategory.GEL]: '2D gel databases',
  [DatabaseCategory.GENOME]: 'Genome annotation databases',
  [DatabaseCategory.INTERACTION]: 'Protein-protein interaction databases',
  [DatabaseCategory.ORGANISM]: 'Organism-specific databases',
  [DatabaseCategory.MISCELLANEOUS]: 'Miscellaneous',
  [DatabaseCategory.PATHWAY]: 'Enzyme and pathway databases',
  [DatabaseCategory.PHYLOGENOMIC]: 'Phylogenomic databases',
  [DatabaseCategory.GENETIC_VARIATION]: 'Genetic variation databases',
  [DatabaseCategory.PROTEOMIC]: 'Proteomic databases',
  [DatabaseCategory.PROTOCOL]: 'Protocols and materials databases',
  [DatabaseCategory.PTM]: 'PTM databases',
  [DatabaseCategory.SEQUENCE]: 'Sequence databases',
  [DatabaseCategory.STRUCTURE]: '3D structure databases',
};

export const {
  databaseCategoryToNames,
  databaseNameToCategory,
  databaseToDatabaseInfo,
  implicitDatabaseXRefs,
} = getDatabaseInfoMaps(databaseInfo);

export const PDBMirrors = ['PDB', 'RCSB-PDB', 'PDBj', 'PDBsum'];

export const PDBMirrorsInfo = PDBMirrors.map(
  (PDBMirror) => databaseToDatabaseInfo[PDBMirror]
);

const databaseSelector = selectDatabases(databaseCategoryToNames);

export const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
entrySectionToDatabaseNames.set(EntrySection.DiseaseAndDrugs, [
  'DisGeNET',
  'GeneReviews',
  'MalaCards',
  'MIM',
  'OpenTargets',
  'Orphanet',
  'PharmGKB',
  'ChEMBL',
  'DrugBank',
  'DrugCentral',
  'GuidetoPHARMACOLOGY',
  'BioMuta',
  'DMDM',
  'Allergome',
  'PHI-base',
]);
entrySectionToDatabaseNames.set(
  EntrySection.Expression,
  databaseSelector({
    categories: [DatabaseCategory.EXPRESSION],
    include: ['HPA'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.FamilyAndDomains,
  databaseSelector({
    categories: [DatabaseCategory.PHYLOGENOMIC, DatabaseCategory.DOMAIN],
    include: [
      'MobiDB', // Implicit
      'ProtoNet', // Implicit
      'GPCRDB', // Implicit
    ],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Function,
  databaseSelector({
    categories: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
    include: ['SwissLipids'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Interaction,
  databaseSelector({
    categories: [DatabaseCategory.INTERACTION],
    include: ['BindingDB'],
  })
);
entrySectionToDatabaseNames.set(EntrySection.NamesAndTaxonomy, [
  'ArachnoServer',
  'Araport',
  'CGD',
  'ConoServer',
  'dictyBase',
  'EcoGene',
  'VEuPathDB',
  'FlyBase',
  'Gramene',
  'HGNC',
  'LegioList',
  'Leproma',
  'MaizeGDB',
  'MGI',
  'MIM',
  'neXtProt',
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
]);
entrySectionToDatabaseNames.set(
  EntrySection.ProteinProcessing,
  databaseSelector({
    categories: [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
    ],
    include: ['PMAP-CutDB'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Sequence,
  databaseSelector({
    categories: [DatabaseCategory.SEQUENCE, DatabaseCategory.GENOME],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Structure,
  databaseSelector({
    categories: [DatabaseCategory.STRUCTURE],
    include: [
      'EvolutionaryTrace',
      'ModBase', // Implicit
    ],
  })
);

// This is used to catch those that aren't listed in the page sections
entrySectionToDatabaseNames.set(
  EntrySection.ExternalLinks,
  databaseSelector({
    categories: [DatabaseCategory.MISCELLANEOUS, DatabaseCategory.PROTOCOL],
    include: [
      'HUGE', // Implicit
      'Rouge', // Implicit
      'GenAtlas', // Implicit
      ...PDBMirrors,
    ],
  })
);

export const getDatabaseNameToEntrySection = (
  databaseName: string
): EntrySection | undefined => {
  let entrySection;
  entrySectionToDatabaseNames.forEach((value, key) => {
    if (value.includes(databaseName)) {
      entrySection = key;
    }
  });
  return entrySection;
};

export const entrySectionToDatabaseCategoryOrder =
  getEntrySectionToDatabaseCategoryOrder(
    entrySectionToDatabaseNames,
    databaseNameToCategory
  );

export const getDatabaseInfoByName = (dbName: string) =>
  databaseInfo.find(
    (dbInfo) => dbInfo.name.toLowerCase() === dbName.toLowerCase()
  );

// If each of the keys are present then show the values
export const implicitDatabaseDRPresence: { [key: string]: string[] } = {
  // these EMBL mirrors are taken care of in xrefview as they are displayed differently
  // EMBL: ['GenBank', 'DDBJ'],
  PDB: ['PDBe-KB'], // eg P05067
  MIM: ['SOURCE_MIM'], // eg P05067
  MGI: ['SOURCE_MGI'], // eg E9PXF8
  HGNC: ['GenAtlas'], // eg Q9Y263
};

// If each of the keys are not present then show the value
export const implicitDatabaseDRAbsence: { [key: string]: string[] } = {
  SMR: ['SWISS-MODEL-Workspace'], // eg P16646
};

export const implicitDatabaseAlwaysInclude = [
  'ModBase', // eg P05067
  'MobiDB', // eg P05067
  'ProtoNet', // eg P05067
];

export const implicitDatabaseGenePatternOrganism = {
  pattern: /KIAA\d{4}/i,
  organism: {
    Human: 'HUGE', // eg Q96PV4
    Mouse: 'Rouge', // eg Q8CJ19
  },
};

export const implicitDatabaseSimilarityComment = {
  GPCRDB: 'Belongs to the G-protein coupled receptor', // eg Q7RTX1
};

export const implicitDatabasesEC = ['ENZYME']; // eg Q54WR4

export const viewProteinLinkDatabases = new Map([
  ['InterPro', externalUrls.InterPro],
  ['Pfam', externalUrls.Pfam],
  ['SMART', externalUrls.SMART],
  ['PROSITE', externalUrls.PROSITE],
]);
