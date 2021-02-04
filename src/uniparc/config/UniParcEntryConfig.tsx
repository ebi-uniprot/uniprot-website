import SequenceSection from '../components/entry/SequenceSection';
import XRefsSection from '../components/entry/XRefsSection';

import { UniParcUIModel } from '../adapters/uniParcConverter';

import EntrySection from '../types/entrySection';

const UniParcEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniParcUIModel,
    metadata?: Record<string, string>
  ) => JSX.Element;
}[] = [
  {
    id: EntrySection.Sequence,
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    id: EntrySection.XRefs,
    sectionContent: (data) => (
      <XRefsSection data={data[EntrySection.XRefs]} key={EntrySection.XRefs} />
    ),
  },
];

export default UniParcEntryConfig;
