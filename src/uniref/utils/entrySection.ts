import EntrySection, { EntrySectionNameAndId } from '../types/entrySection';

export const getEntrySectionNameAndId = (
  section: EntrySection
): EntrySectionNameAndId => {
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
