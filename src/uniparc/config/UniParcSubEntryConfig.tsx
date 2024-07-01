import SequenceSection from '../components/entry/SequenceSection';

import EntrySection from '../types/subEntry';
import SubEntryStructureSection from '../components/entry/sub-entry/SubEntryStructureSection';
import SubEntryFamilyAndDomains from '../components/entry/sub-entry/SubEntryFamilyAndDomainsSection';
import SubEntrySimilarProteinsSection from '../components/entry/sub-entry/SubEntrySimilarProteinsSection';

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
      <SequenceSection
        data={data.entry[EntrySection.Sequence]}
        isCollapsible={false}
        key={EntrySection.Sequence}
      />
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
