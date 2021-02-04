import MembersSection from '../components/entry/MembersSection';
import SequenceSection from '../components/entry/SequenceSection';

import { UniRefUIModel } from '../adapters/uniRefConverter';
import EntrySection from '../types/entrySection';

const UniRefEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniRefUIModel,
    metadata?: Record<string, string>
  ) => JSX.Element;
}[] = [
  {
    id: EntrySection.Sequence,
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence].sequence}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    id: EntrySection.Members,
    sectionContent: (data, metadata) => (
      <MembersSection
        id={data.id}
        identity={data.identity}
        representativeMember={data.representativeMember}
        members={data.members}
        key={EntrySection.Members}
        metadata={metadata}
      />
    ),
  },
];

export default UniRefEntryConfig;
