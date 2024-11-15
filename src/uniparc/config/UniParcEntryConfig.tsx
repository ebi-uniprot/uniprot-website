import SequenceSection from '../components/entry/SequenceSection';
import XRefsSection from '../components/entry/XRefsSection';

import EntrySection from '../types/entrySection';

import { UniParcAPIModel, UniParcUIModel } from '../adapters/uniParcConverter';
import { UseDataAPIWithStaleState } from '../../shared/hooks/useDataApiWithStale';

const UniParcEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniParcUIModel,
    xrefs: UseDataAPIWithStaleState<UniParcAPIModel>
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
    sectionContent: (data, xrefs) => (
      <XRefsSection
        entryData={data}
        xrefData={xrefs}
        key={EntrySection.XRefs}
      />
    ),
  },
];

export default UniParcEntryConfig;
