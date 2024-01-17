enum EntrySection {
  Sequence = 'sequence',
  XRefs = 'cross_references',
}

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export default EntrySection;
