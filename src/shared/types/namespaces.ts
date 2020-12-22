export enum Namespace {
  uniprotkb = 'uniprotkb',
  uniref = 'uniref',
  uniparc = 'uniparc',
  proteomes = 'proteomes',
  taxonomy = 'taxonomy',
  publications = 'publications',
  keywords = 'keywords',
}

export const NamespaceLabels = {
  [Namespace.uniprotkb]: 'UniProtKB',
  [Namespace.uniref]: 'UniRef',
  [Namespace.uniparc]: 'UniParc',
  [Namespace.proteomes]: 'Proteomes',
  [Namespace.taxonomy]: 'Taxonomy',
  [Namespace.publications]: 'Publications',
  [Namespace.keywords]: 'Keywords',
};
