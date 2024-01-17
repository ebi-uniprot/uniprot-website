enum EntrySection {
  Sequence = 'sequence',
  Members = 'members',
}

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export default EntrySection;
