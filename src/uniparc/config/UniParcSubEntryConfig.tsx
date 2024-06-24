import SequenceSection from '../components/entry/SequenceSection';
import XRefsSection from '../components/entry/XRefsSection';

import EntrySection from '../types/subEntry';

import { UniParcAPIModel, UniParcUIModel } from '../adapters/uniParcConverter';
import { UseDataAPIWithStaleState } from '../../shared/hooks/useDataApiWithStale';

const UniParcSubEntryConfig: {
  id: EntrySection;
  label: string;
  sectionContent: (entryData: UniParcUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Sequence,
    label: 'Sequence',
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniParcSubEntryConfig;
