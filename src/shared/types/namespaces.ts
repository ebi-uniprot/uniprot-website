export enum Namespace {
  // Main data
  uniprotkb = 'uniprotkb',
  uniref = 'uniref',
  uniparc = 'uniparc',
  proteomes = 'proteome', // TODO: revert to proteomes once backend update as per https://www.ebi.ac.uk/seqdb/confluence/display/UniProt/25+Jan+-+Remote+meeting
  // Supporting data
  taxonomy = 'taxonomy',
  keywords = 'keywords',
  citations = 'citations',
  diseases = 'diseases',
  database = 'database',
  locations = 'locations',
}

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
