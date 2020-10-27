import React from 'react';

import MembersSection from '../components/entry/MembersSection';
import SequenceSection from '../components/entry/SequenceSection';

import { UniRefUIModel } from '../adapters/uniRefConverter';
import EntrySection, { EntrySectionIDs } from '../types/entrySection';

const UniRefEntryConfig: {
  name: EntrySection;
  id: typeof EntrySectionIDs[EntrySection];
  sectionContent: (entryData: UniRefUIModel) => JSX.Element;
}[] = [
  {
    name: EntrySection.Members,
    id: EntrySectionIDs[EntrySection.Members],
    sectionContent: (data: UniRefUIModel): JSX.Element => (
      <MembersSection
        data={data[EntrySection.Members]}
        key={EntrySection.Members}
      />
    ),
  },
  {
    name: EntrySection.Sequence,
    id: EntrySectionIDs[EntrySection.Sequence],
    sectionContent: (data: UniRefUIModel): JSX.Element => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.representativeMember.accessions[0]}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniRefEntryConfig;
