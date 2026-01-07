import { type JSX } from 'react';

import { type ProteomesUIModel } from '../adapters/proteomesConverter';
import Components from '../components/entry/Components';
import Description from '../components/entry/Description';
import Publications from '../components/entry/Publications';
import EntrySection from '../types/entrySection';

const ProteomesEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: ProteomesUIModel) => JSX.Element | null;
}[] = [
  {
    id: EntrySection.Description,
    sectionContent: (data) =>
      data.description ? <Description>{data.description}</Description> : null,
  },
  {
    id: EntrySection.Components,
    sectionContent: ({
      components,
      id,
      proteinCount,
      proteomeType,
      taxonomy,
      proteomeStatistics,
    }) => (
      <Components
        components={components}
        id={id}
        proteinCount={proteinCount}
        proteomeType={proteomeType}
        taxonomy={taxonomy}
        proteomeStatistics={proteomeStatistics}
      />
    ),
  },
  {
    id: EntrySection.Publications,
    sectionContent: ({ citations }) => <Publications citations={citations} />,
  },
];

export default ProteomesEntryConfig;
