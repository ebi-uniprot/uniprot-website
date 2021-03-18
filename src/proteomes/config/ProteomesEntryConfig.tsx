import Overview from '../components/entry/Overview';
import Components from '../components/entry/Components';
import { ProteomesUIModel } from '../adapters/proteomesConverter';
import EntrySection from '../types/entrySection';

const ProteomesEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: ProteomesUIModel) => JSX.Element | undefined;
}[] = [
  {
    id: EntrySection.Overview,
    sectionContent: (data) => <Overview data={data} />,
  },
  {
    id: EntrySection.Components,
    sectionContent: ({ components, id, proteinCount }) => (
      <Components components={components} id={id} proteinCount={proteinCount} />
    ),
  },
  {
    id: EntrySection.Publications, // TODO: implement
    sectionContent: () => <h2>Publications</h2>,
  },
];

export default ProteomesEntryConfig;
