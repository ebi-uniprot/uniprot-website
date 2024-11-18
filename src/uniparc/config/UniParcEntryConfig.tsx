import SequenceSection from '../components/entry/SequenceSection';
import XRefsSection from '../components/entry/XRefsSection';

import { PaginatedResults } from '../../shared/hooks/usePagination';
import EntrySection from '../types/entrySection';
import { UniParcUIModel, UniParcXRef } from '../adapters/uniParcConverter';

const UniParcEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniParcUIModel,
    xrefs: PaginatedResults<UniParcXRef>
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
        xRefData={xrefs}
        key={EntrySection.XRefs}
      />
    ),
  },
];

export default UniParcEntryConfig;
