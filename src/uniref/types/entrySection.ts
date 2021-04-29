export enum EntrySection {
  Sequence = 'sequence',
  Members = 'members',
}

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export const getEntrySectionNameAndId = (
  section: EntrySection
  // eslint-disable-next-line consistent-return
): EntrySectionNameAndId => {
  // eslint-disable-next-line default-case
  switch (section) {
    case EntrySection.Sequence:
      return {
        name: 'Representative',
        id: EntrySection.Sequence,
      };
    case EntrySection.Members:
      return {
        name: 'members',
        id: EntrySection.Members,
      };
  }
};

export default EntrySection;
