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
  // UniSave
  unisave = 'unisave',
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

export type SearchableNamespace = Exclude<
  Namespace,
  Namespace.idmapping | Namespace.unisave
>;

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
export const toolResults = 'toolResults' as const;
export type ToolResults = typeof toolResults;
export type Searchspace = SearchableNamespace | ToolResults;
export const searchspaceLabels = {
  [toolResults]: 'Tool results',
  ...searchableNamespaceLabels,
};

export const namespaceAndToolsLabels: Record<Namespace | JobTypes, string> = {
  ...searchableNamespaceLabels,
  // Non-searchable namespace
  [Namespace.idmapping]: 'ID mapping',
  [Namespace.unisave]: 'UniProtKB entry history', // unused at the moment
  // Tools
  [JobTypes.ID_MAPPING]: 'Retrieve/ID mapping',
  [JobTypes.ALIGN]: 'Align',
  [JobTypes.ASYNC_DOWNLOAD]: 'File generation',
  [JobTypes.BLAST]: 'BLAST',
  [JobTypes.PEPTIDE_SEARCH]: 'Peptide search',
  [JobTypes.FOLDSEEK]: 'Foldseek',
};
