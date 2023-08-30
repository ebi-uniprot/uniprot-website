import Overview from '../components/entry/Overview';
import Components from '../components/entry/Components';
import Publications from '../components/entry/Publications';

import { ProteomesUIModel } from '../adapters/proteomesConverter';

import EntrySection from '../types/entrySection';

const ProteomesEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: ProteomesUIModel) => JSX.Element | null;
}[] = [
  {
    id: EntrySection.Overview,
    sectionContent: (data) => <Overview data={data} />,
  },
  {
    id: EntrySection.Components,
    sectionContent: ({
      components,
      id,
      proteinCount,
      proteomeType,
      superkingdom,
      taxonomy,
    }) => (
      <Components
        components={components}
        id={id}
        proteinCount={proteinCount}
        proteomeType={proteomeType}
        superkingdom={superkingdom}
        taxonomy={taxonomy}
      />
    ),
  },
  {
    id: EntrySection.Publications,
    sectionContent: ({ citations }) => <Publications citations={citations} />,
  },
];

export default ProteomesEntryConfig;
