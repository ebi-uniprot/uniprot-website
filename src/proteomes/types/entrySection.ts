export enum EntrySection {
  Overview = 'overview',
  Components = 'components',
  Publications = 'publications',
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
    case EntrySection.Overview:
      return {
        name: 'Overview',
        id: EntrySection.Overview,
      };
    case EntrySection.Components:
      return {
        name: 'Components',
        id: EntrySection.Components,
      };
    case EntrySection.Publications:
      return {
        name: 'Publications',
        id: EntrySection.Publications,
      };
  }
};

export default EntrySection;
