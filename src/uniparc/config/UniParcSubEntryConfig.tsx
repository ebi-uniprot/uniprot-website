import { UniParcSubEntryUIModel } from '../adapters/uniParcSubEntryConverter';
import SubEntryFamilyAndDomains from '../components/sub-entry/SubEntryFamilyAndDomainsSection';
import SubEntryNamesAndTaxonomySection from '../components/sub-entry/SubEntryNamesAndTaxonomySection';
import SubEntrySequenceSection from '../components/sub-entry/SubEntrySequenceSection';
import SubEntrySimilarProteinsSection from '../components/sub-entry/SubEntrySimilarProteinsSection';
import SubEntryStructureSection from '../components/sub-entry/SubEntryStructureSection';
import UniFireInferredSection from '../components/sub-entry/UniFireInferredSection';
import EntrySection from '../types/subEntrySection';
import { entrySectionToLabel } from './UniParcSubEntrySectionLabels';

const uniParcSubEntryConfig: Record<
  EntrySection,
  {
    id: EntrySection;
    label: string;
    sectionContent: (entryData: UniParcSubEntryUIModel) => JSX.Element;
  }
> = {
  [EntrySection.Function]: {
    id: EntrySection.Function,
    label: entrySectionToLabel[EntrySection.Function],
    sectionContent: ({ unifire }) => (
      <UniFireInferredSection
        data={unifire}
        annotationType="comment.function"
        freeTextType="FUNCTION"
        section={EntrySection.Function}
        key={EntrySection.Function}
      />
    ),
  },
  [EntrySection.NamesAndTaxonomy]: {
    id: EntrySection.NamesAndTaxonomy,
    label: entrySectionToLabel[EntrySection.NamesAndTaxonomy],
    sectionContent: (data) => (
      <SubEntryNamesAndTaxonomySection
        data={data}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  [EntrySection.SubcellularLocation]: {
    id: EntrySection.SubcellularLocation,
    label: entrySectionToLabel[EntrySection.SubcellularLocation],
    sectionContent: ({ unifire }) => (
      <UniFireInferredSection
        data={unifire}
        annotationType="comment.subcellular_location"
        freeTextType="SUBCELLULAR LOCATION"
        section={EntrySection.SubcellularLocation}
        key={EntrySection.SubcellularLocation}
      />
    ),
  },
  [EntrySection.Structure]: {
    id: EntrySection.Structure,
    label: entrySectionToLabel[EntrySection.Structure],
    sectionContent: (data) => (
      <SubEntryStructureSection
        data={data.subEntry}
        key={EntrySection.Structure}
      />
    ),
  },
  [EntrySection.FamilyAndDomains]: {
    id: EntrySection.FamilyAndDomains,
    label: entrySectionToLabel[EntrySection.FamilyAndDomains],
    sectionContent: (data) => (
      <SubEntryFamilyAndDomains
        data={data}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  [EntrySection.Sequence]: {
    id: EntrySection.Sequence,
    label: entrySectionToLabel[EntrySection.Sequence],
    sectionContent: (data) => (
      <SubEntrySequenceSection data={data} key={EntrySection.Sequence} />
    ),
  },
  [EntrySection.SimilarProteins]: {
    id: EntrySection.SimilarProteins,
    label: entrySectionToLabel[EntrySection.SimilarProteins],
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection
        uniparcId={data.entry.uniParcId}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
  // Dedicated section for Keywords as we don't know which section they correspond to yet. Ideally we need to have keyword ids to link and the section they belong to.
  [EntrySection.Keywords]: {
    id: EntrySection.Keywords,
    label: entrySectionToLabel[EntrySection.Keywords],
    sectionContent: ({ unifire }) => (
      <UniFireInferredSection
        data={unifire}
        annotationType="keyword"
        freeTextType="KEYWORDS"
        section={EntrySection.Keywords}
        key={EntrySection.Keywords}
      />
    ),
  },
};

export default uniParcSubEntryConfig;
