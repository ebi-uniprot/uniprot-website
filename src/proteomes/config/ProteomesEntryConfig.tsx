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
    id: EntrySection.Components, // TODO: implement
    sectionContent: () => <h2>Components</h2>,
  },
  {
    id: EntrySection.Publications, // TODO: implement
    sectionContent: () => <h2>Publications</h2>,
  },
];

export default UniRefEntryConfig;
