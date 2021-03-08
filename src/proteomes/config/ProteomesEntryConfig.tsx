import Overview from '../components/entry/Overview';
import { ProteomesUIModel } from '../adapters/proteomesConverter';
import EntrySection from '../types/entrySection';

const UniRefEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: ProteomesUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Overview,
    sectionContent: (data) => <Overview data={data} />,
  },
  {
    id: EntrySection.Components,
    sectionContent: (data) => <h2>components</h2>,
  },
  {
    id: EntrySection.Publications,
    sectionContent: (data) => <h2>publications</h2>,
  },
];

export default UniRefEntryConfig;
