import MembersSection from '../components/entry/MembersSection';
import SequenceSection from '../../shared/components/entry/SequenceSection';

import { UniRefUIModel } from '../adapters/uniRefConverter';
import EntrySection, { getEntrySectionNameAndId } from '../types/entrySection';

const UniRefEntryConfig: {
  name: string;
  id: EntrySection;
  sectionContent: (
    entryData: UniRefUIModel,
    metadata?: Record<string, string>
  ) => JSX.Element;
}[] = [
  {
    ...getEntrySectionNameAndId(EntrySection.Sequence),
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence].sequence}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    ...getEntrySectionNameAndId(EntrySection.Members),
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
