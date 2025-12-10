import { UniParcUIModel } from '../adapters/uniParcConverter';
import SequenceSection from '../components/entry/SequenceSection';
import StructureSection from '../components/entry/StructureSection';
import XRefsSection from '../components/entry/XRefsSection';
import EntrySection from '../types/entrySection';

const UniParcEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: UniParcUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Sequence,
    sectionContent: (data) => (
      <SequenceSection
        accession={data.uniParcId}
        data={data[EntrySection.Sequence]}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    id: EntrySection.Structure,
    sectionContent: (data) => (
      <StructureSection
        data={data[EntrySection.Sequence]}
        key={EntrySection.Structure}
      />
    ),
  },
  {
    id: EntrySection.XRefs,
    sectionContent: (data) => (
      <XRefsSection entryData={data} key={EntrySection.XRefs} />
    ),
  },
];

export default UniParcEntryConfig;
