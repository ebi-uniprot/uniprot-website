enum EntrySection {
  Sequence = 'sequence',
  Structure = 'structure',
  XRefs = 'cross_references',
}

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export default EntrySection;
