import SubEntryStructureSection from '../components/sub-entry/SubEntryStructureSection';
import SubEntryFamilyAndDomains from '../components/sub-entry/SubEntryFamilyAndDomainsSection';
import SubEntrySequenceSection from '../components/sub-entry/SubEntrySequenceSection';
import SubEntrySimilarProteinsSection from '../components/sub-entry/SubEntrySimilarProteinsSection';

import EntrySection from '../types/subEntry';
import { UniParcSubEntryUIModel } from '../adapters/uniParcSubEntryConverter';

const uniParcSubEntryConfig: Record<
  EntrySection,
  {
    id: EntrySection;
    label: string;
    sectionContent: (entryData: UniParcSubEntryUIModel) => JSX.Element;
  }
> = {
  [EntrySection.Structure]: {
    id: EntrySection.Structure,
    label: 'Structure',
    sectionContent: (data) => (
      <SubEntryStructureSection
        data={data.subEntry}
        key={EntrySection.Structure}
      />
    ),
  },
  [EntrySection.FamilyAndDomains]: {
    id: EntrySection.FamilyAndDomains,
    label: 'Family & Domains',
    sectionContent: (data) => <SubEntryFamilyAndDomains data={data.entry} />,
  },
  [EntrySection.Sequence]: {
    id: EntrySection.Sequence,
    label: 'Sequence',
    sectionContent: (data) => (
      <SubEntrySequenceSection data={data} key={EntrySection.Sequence} />
    ),
  },
  [EntrySection.SimilarProteins]: {
    id: EntrySection.SimilarProteins,
    label: 'Similar Proteins',
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection
        uniparcId={data.entry.uniParcId}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
};

export default uniParcSubEntryConfig;
