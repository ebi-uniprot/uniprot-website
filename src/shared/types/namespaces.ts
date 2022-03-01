import { JobTypes } from '../../tools/types/toolsJobTypes';

export enum Namespace {
  // Main data
  uniprotkb = 'uniprotkb',
  uniref = 'uniref',
  uniparc = 'uniparc',
  proteomes = 'proteomes',
  // Supporting data
  taxonomy = 'taxonomy',
  keywords = 'keywords',
  citations = 'citations',
  diseases = 'diseases',
  database = 'database',
  locations = 'locations',
  // Tools
  idmapping = 'id-mapping',
  // Annotations
  unirule = 'unirule',
  arba = 'arba',
}

export const mainNamespaces = new Set<Namespace>([
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.proteomes,
]);

export const supportingDataNamespaces = new Set<Namespace>([
  Namespace.taxonomy,
  Namespace.keywords,
  Namespace.citations,
  Namespace.diseases,
  Namespace.database,
  Namespace.locations,
]);

export const supportingDataAndAANamespaces = new Set<Namespace>([
  Namespace.taxonomy,
  Namespace.keywords,
  Namespace.citations,
  Namespace.diseases,
  Namespace.database,
  Namespace.locations,
  Namespace.unirule,
  Namespace.arba,
]);

export type SearchableNamespace = Exclude<Namespace, Namespace.idmapping>;

export const searchableNamespaceLabels: Record<SearchableNamespace, string> = {
  // Main data
  [Namespace.uniprotkb]: 'UniProtKB',
  [Namespace.uniref]: 'UniRef',
  [Namespace.uniparc]: 'UniParc',
  [Namespace.proteomes]: 'Proteomes',
  // Supporting data
  [Namespace.taxonomy]: 'Taxonomy',
  [Namespace.keywords]: 'Keywords',
  [Namespace.citations]: 'Literature citations',
  [Namespace.diseases]: 'Human diseases',
  [Namespace.database]: 'Cross-referenced databases',
  [Namespace.locations]: 'Subcellular locations',
  // Annotations
  [Namespace.unirule]: 'UniRule',
  [Namespace.arba]: 'ARBA',
};

export const namespaceAndToolsLabels: Record<Namespace | JobTypes, string> = {
  ...searchableNamespaceLabels,
  // Non-searchable namespace
  [Namespace.idmapping]: 'ID mapping',
  // Tools
  [JobTypes.ID_MAPPING]: 'Retrieve/ID mapping',
  [JobTypes.ALIGN]: 'Align',
  [JobTypes.BLAST]: 'BLAST',
  [JobTypes.PEPTIDE_SEARCH]: 'Peptide search',
};
