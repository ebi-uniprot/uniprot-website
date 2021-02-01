export enum Namespace {
  // Main data
  uniprotkb = 'uniprotkb',
  uniref = 'uniref',
  uniparc = 'uniparc',
  proteomes = 'proteome', // TODO: revert to proteomes once backend update as per https://www.ebi.ac.uk/seqdb/confluence/display/UniProt/25+Jan+-+Remote+meeting
  // Supporting data
  taxonomy = 'taxonomy',
  citations = 'citations',
  keywords = 'keywords',
}

export const NamespaceLabels = {
  // Main data
  [Namespace.uniprotkb]: 'UniProtKB',
  [Namespace.uniref]: 'UniRef',
  [Namespace.uniparc]: 'UniParc',
  [Namespace.proteomes]: 'Proteomes',
  // Supporting data
  [Namespace.taxonomy]: 'Taxonomy',
  [Namespace.citations]: 'Literature citations',
  [Namespace.keywords]: 'Keywords',
};
