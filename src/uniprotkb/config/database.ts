import EntrySection from '../types/entrySection';
import { DatabaseCategory } from '../types/databaseRefs';
import {
  DatabaseToDatabaseInfo,
  DatabaseCategoryToNames,
} from '../utils/database';
import externalUrls from '../../shared/config/externalUrls';

export const selectDatabases =
  (databaseCategoryToNames: Map<DatabaseCategory, string[]>) =>
  ({
    categories = [],
    include = [],
    exclude = [],
  }: {
    categories?: DatabaseCategory[];
    include?: string[];
    exclude?: string[];
  }) =>
    [
      ...(categories?.flatMap(
        (category) => databaseCategoryToNames.get(category) || []
      ) || []),
      ...include,
    ].filter((db) => !exclude.includes(db));

export const databaseCategoryToString = {
  [DatabaseCategory.CHEMISTRY]: 'Chemistry',
  [DatabaseCategory.DOMAIN]: 'Family and domain databases',
  [DatabaseCategory.EXPRESSION]: 'Gene expression databases',
  [DatabaseCategory.FAMILY]: 'Protein family/group databases',
  [DatabaseCategory.GEL]: '2D gel databases',
  [DatabaseCategory.GENOME]: 'Genome annotation databases',
  [DatabaseCategory.GENE_ONTOLOGY]: 'Gene ontology databases',
  [DatabaseCategory.INTERACTION]: 'Protein-protein interaction databases',
  [DatabaseCategory.ORGANISM]: 'Organism-specific databases',
  [DatabaseCategory.MISCELLANEOUS]: 'Miscellaneous',
  [DatabaseCategory.PATHWAY]: 'Enzyme and pathway databases',
  [DatabaseCategory.PHYLOGENOMIC]: 'Phylogenomic databases',
  [DatabaseCategory.GENETIC_VARIATION]: 'Genetic variation databases',
  [DatabaseCategory.PROTEOMES]: 'Proteomes databases',
  [DatabaseCategory.PROTEOMIC]: 'Proteomic databases',
  [DatabaseCategory.PROTOCOL]: 'Protocols and materials databases',
  [DatabaseCategory.PTM]: 'PTM databases',
  [DatabaseCategory.SEQUENCE]: 'Sequence databases',
  [DatabaseCategory.STRUCTURE]: '3D structure databases',
};

export const PDBMirrors = ['PDB', 'RCSB-PDB', 'PDBj', 'PDBsum'];

export const getPDBMirrorsInfo = (
  databaseToDatabaseInfo: DatabaseToDatabaseInfo
) => PDBMirrors.map((PDBMirror) => databaseToDatabaseInfo[PDBMirror]);

export type EntrySectionToDatabaseNames = Map<EntrySection, string[]>;

// NOTE: the categories OTG & PRM each map to a single DB: quickgo and uniprot/proteomes, respectively.
// Both of these DBs are present outside of the standard xrefs sections: go-ribbon and names & taxonomy, respectively.
// For this reason OTG & PRM are not currently found in the mapping below. However, if at some point
// additional DBs are added then it will have to be decided where these categories should reside within the entry page.
// For historical context view https://www.ebi.ac.uk/panda/jira/browse/TRM-27105
export const getEntrySectionToDatabaseNames = (
  databaseCategoryToNames: DatabaseCategoryToNames
): EntrySectionToDatabaseNames => {
  const databaseSelector = selectDatabases(databaseCategoryToNames);

  const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
  entrySectionToDatabaseNames.set(EntrySection.DiseaseVariants, [
    'DisGeNET',
    'GeneReviews',
    'MalaCards',
    'MIM',
    'OpenTargets',
    'Orphanet',
    'PharmGKB',
    'Pharos',
    'ChEMBL',
    'DrugBank',
    'DrugCentral',
    'GuidetoPHARMACOLOGY',
    'BioMuta',
    'DMDM',
    'Allergome',
    'PHI-base',
    'ClinGen', // Implicit
    'GenCC', // Implicit
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
      include: ['BindingDB', 'RNAct'],
    })
  );
  entrySectionToDatabaseNames.set(EntrySection.NamesAndTaxonomy, [
    'AGR',
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
      categories: [
        DatabaseCategory.MISCELLANEOUS,
        DatabaseCategory.PROTOCOL,
        DatabaseCategory.ORGANISM,
      ],
      include: [
        'HUGE', // Implicit
        'Rouge', // Implicit
        'GenAtlas', // Implicit
        'ClinGen', // Implicit
        'GenCC', // Implicit
        ...PDBMirrors,
      ],
    })
  );
  return entrySectionToDatabaseNames;
};

// If each of the keys are present then show the values
export const implicitDatabaseDRPresence: { [key: string]: string[] } = {
  // these EMBL mirrors are taken care of in xrefview as they are displayed differently
  // EMBL: ['GenBank', 'DDBJ'],
  PDB: ['PDBe-KB'], // eg P05067
  MIM: ['SOURCE_MIM'], // eg P05067
  MGI: ['SOURCE_MGI'], // eg E9PXF8
  HGNC: ['GenAtlas', 'ClinGen', 'GenCC'], // eg Q9Y263
};

// If each of the keys are not present then show the value
export const implicitDatabaseDRAbsence: { [key: string]: string[] } = {
  SMR: ['SWISS-MODEL-Workspace'], // eg P16646
};

export const implicitDatabaseAlwaysInclude = [
  'ModBase', // eg P05067
  'MobiDB', // eg P05067
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
