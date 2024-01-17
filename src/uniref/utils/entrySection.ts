import EntrySection, { EntrySectionNameAndId } from '../types/entrySection';

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
        name: 'member',
        id: EntrySection.Members,
      };
  }
};
