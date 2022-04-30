export enum EntrySection {
  Sequence = 'sequence',
  XRefs = 'cross_references',
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
    case EntrySection.XRefs:
      return {
        name: 'Cross references',
        id: EntrySection.XRefs,
      };
  }
};

export default EntrySection;
