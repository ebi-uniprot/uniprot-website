import React from 'react';

import MembersSection from '../components/entry/MembersSection';
import SequenceSection from '../components/entry/SequenceSection';

import { UniRefUIModel } from '../adapters/uniRefConverter';
import EntrySection from '../types/entrySection';

const UniRefEntryConfig: {
  name: EntrySection;
  sectionContent: (entryData: UniRefUIModel) => JSX.Element;
}[] = [
  {
    name: EntrySection.Members,
    sectionContent: (data: UniRefUIModel): JSX.Element => (
      <MembersSection
        data={data[EntrySection.Members]}
        key={EntrySection.Members}
      />
    ),
  },
  {
    name: EntrySection.Sequence,
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
