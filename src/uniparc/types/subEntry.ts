export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
}

export enum SubEntrySection {
  Structure = 'structure',
  FamilyAndDomains = 'family_and_domains',
  Sequence = 'sequence',
  SimilarProteins = 'similar_proteins',
}

export type EntrySectionNameAndId = {
  name: string;
  id: SubEntrySection;
};

export default SubEntrySection;
