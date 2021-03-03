import { ProteomesUIModel } from '../adapters/proteomesConverter';
import EntrySection from '../types/entrySection';

const UniRefEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: ProteomesUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Overview,
    sectionContent: (data) => <h1>overview</h1>,
  },
  {
    id: EntrySection.Components,
    sectionContent: (data) => <h1>components</h1>,
  },
  {
    id: EntrySection.Publications,
    sectionContent: (data) => <h1>publications</h1>,
  },
];

export default UniRefEntryConfig;
