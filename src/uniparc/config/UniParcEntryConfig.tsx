// import MembersSection from '../components/entry/MembersSection';

import SequenceSection from '../../shared/components/entry/SequenceSection';
import { UniParcUIModel } from '../adapters/uniParcConverter';
import EntrySection, { getEntrySectionNameAndId } from '../types/entrySection';

const UniParcEntryConfig: {
  name: string;
  id: EntrySection;
  sectionContent: (
    entryData: UniParcUIModel,
    metadata?: Record<string, string>
  ) => JSX.Element;
}[] = [
  {
    ...getEntrySectionNameAndId(EntrySection.Sequence),
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniParcEntryConfig;
