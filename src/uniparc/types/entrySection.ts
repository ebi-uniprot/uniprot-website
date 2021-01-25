export enum EntrySection {
  Sequence = 'sequence',
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
        name: 'Sequence',
        id: EntrySection.Sequence,
      };
  }
};

export default EntrySection;
