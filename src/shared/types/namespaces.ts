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

export const NamespaceLabels: Record<Namespace, string> = {
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
};
