import { UniRefMember, UniRefUIModel } from '../adapters/uniRefConverter';
import MembersSection from '../components/entry/MembersSection';
import SequenceSection from '../components/entry/SequenceSection';
import EntrySection from '../types/entrySection';

const UniRefEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniRefUIModel,
    members?: UniRefMember[],
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
    sectionContent: (data) => (
      <MembersSection
        id={data.id}
        identity={data.identity}
        representativeMember={data.representativeMember}
        key={EntrySection.Members}
      />
    ),
  },
];

export default UniRefEntryConfig;
