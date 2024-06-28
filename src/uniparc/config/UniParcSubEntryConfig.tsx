import SequenceSection from '../components/entry/SequenceSection';

import EntrySection from '../types/subEntry';
import SubEntrySimilarProteinsSection from '../components/entry/SubEntry/SubEntrySimilarProteinsSection';

import { UniParcUIModel } from '../adapters/uniParcConverter';

const uniParcSubEntryConfig: Record<
  EntrySection,
  {
    id: EntrySection;
    label: string;
    sectionContent: (entryData: UniParcUIModel) => JSX.Element;
  }
> = {
  [EntrySection.Sequence]: {
    id: EntrySection.Sequence,
    label: 'Sequence',
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        key={EntrySection.Sequence}
      />
    ),
  },
  [EntrySection.SimilarProteins]: {
    id: EntrySection.Sequence,
    label: 'Similar Proteins',
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection
        uniparcId={data.uniParcId}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
};

export default uniParcSubEntryConfig;
