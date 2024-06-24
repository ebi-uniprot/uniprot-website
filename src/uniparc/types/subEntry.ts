export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
}

enum EntrySection {
  Sequence = 'sequence',
}

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export default EntrySection;
