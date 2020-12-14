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
        primaryAccession={data.uniParcId}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    ...getEntrySectionNameAndId(EntrySection.Entries),
    sectionContent: (data, metadata) => (
      <></>
      // <MembersSection
      //   id={data.id}
      //   identity={data.identity}
      //   representativeMember={data.representativeMember}
      //   members={data.members}
      //   key={EntrySection.Members}
      //   metadata={metadata}
      // />
    ),
  },
];

export default UniParcEntryConfig;
