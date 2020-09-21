import React from 'react';

// check if it's the same logic, if so, move up to shared folder
import SequenceSection from '../../uniprotkb/components/entry/SequenceSection';

import { UniRefUIModel } from '../adapters/uniRefConverter';
import EntrySection from '../types/entrySection';

const UniProtKBEntryConfig: {
  name: EntrySection;
  sectionContent: (entryData: UniRefUIModel) => JSX.Element;
}[] = [
  // {
  //   name: EntrySection.Members,
  //   sectionContent: (data: UniRefUIModel): JSX.Element => (
  //     <MembersSection
  //       data={data[EntrySection.Members]}
  //       primaryAccession={data.primaryAccession}
  //       sequence={data[EntrySection.Sequence].sequence.value}
  //       key={EntrySection.Members}
  //     />
  //   ),
  // },
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

export default UniProtKBEntryConfig;
