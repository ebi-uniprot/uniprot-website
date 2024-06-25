import SequenceSection from '../components/entry/SequenceSection';

import EntrySection from '../types/subEntry';
import SimilarProteinsSection from '../../uniprotkb/components/entry/similar-proteins/SimilarProteinsSection';

import { UniParcUIModel } from '../adapters/uniParcConverter';

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
  {
    id: EntrySection.SimilarProteins,
    label: 'Similar Proteins',
    sectionContent: (data) => (
      <SimilarProteinsSection
        isoforms={data[EntrySection.SimilarProteins]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
];

export default UniParcSubEntryConfig;
