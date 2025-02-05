import EntrySection, { EntrySectionNameAndId } from '../types/entrySection';

export const getEntrySectionNameAndId = (
  section: EntrySection
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
