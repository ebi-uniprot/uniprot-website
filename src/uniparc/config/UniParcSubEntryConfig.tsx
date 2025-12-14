import { UniParcSubEntryUIModel } from '../adapters/uniParcSubEntryConverter';
import SubEntryFamilyAndDomains from '../components/sub-entry/SubEntryFamilyAndDomainsSection';
import SubEntryKeywordsSection from '../components/sub-entry/SubEntryKeywordsSection';
import SubEntryNamesAndTaxonomySection from '../components/sub-entry/SubEntryNamesAndTaxonomySection';
import SubEntrySequenceSection from '../components/sub-entry/SubEntrySequenceSection';
import SubEntrySimilarProteinsSection from '../components/sub-entry/SubEntrySimilarProteinsSection';
import SubEntryStructureSection from '../components/sub-entry/SubEntryStructureSection';
import UniFireInferredSection from '../components/sub-entry/UniFireInferredSection';
import EntrySection from '../types/subEntrySection';
import { groupTypesBySection } from './UniFireAnnotationTypeToSection';

const uniParcSubEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: UniParcSubEntryUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Function,
    sectionContent: (data) => (
      <UniFireInferredSection
        data={data}
        annotationTypes={groupTypesBySection(EntrySection.Function)}
        section={EntrySection.Function}
        key={EntrySection.Function}
      />
    ),
  },
  {
    id: EntrySection.NamesAndTaxonomy,
    sectionContent: (data) => (
      <SubEntryNamesAndTaxonomySection
        data={data}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    id: EntrySection.SubcellularLocation,
    sectionContent: (data) => (
      <UniFireInferredSection
        data={data}
        annotationTypes={groupTypesBySection(EntrySection.SubcellularLocation)}
        section={EntrySection.SubcellularLocation}
        key={EntrySection.SubcellularLocation}
      />
    ),
  },
  {
    id: EntrySection.Expression,
    sectionContent: (data) => (
      <UniFireInferredSection
        data={data}
        annotationTypes={groupTypesBySection(EntrySection.Expression)}
        section={EntrySection.Expression}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    id: EntrySection.ProteinProcessing,
    sectionContent: (data) => (
      <UniFireInferredSection
        data={data}
        annotationTypes={groupTypesBySection(EntrySection.ProteinProcessing)}
        section={EntrySection.ProteinProcessing}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    id: EntrySection.Interaction,
    sectionContent: (data) => (
      <UniFireInferredSection
        data={data}
        annotationTypes={groupTypesBySection(EntrySection.Interaction)}
        section={EntrySection.Interaction}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    id: EntrySection.Structure,
    sectionContent: (data) => (
      <SubEntryStructureSection data={data} key={EntrySection.Structure} />
    ),
  },
  {
    id: EntrySection.FamilyAndDomains,
    sectionContent: (data) => (
      <SubEntryFamilyAndDomains
        data={data}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    id: EntrySection.Sequence,
    sectionContent: (data) => (
      <SubEntrySequenceSection data={data} key={EntrySection.Sequence} />
    ),
  },
  {
    id: EntrySection.SimilarProteins,
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection
        uniparcId={data.entry.uniParcId}
        subEntry={data.subEntry}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
  // Dedicated section for Keywords and GO as we don't know which section they correspond to yet. Ideally we need to have keyword ids to link and the section they belong to.
  {
    id: EntrySection.KeywordsAndGO,
    sectionContent: ({ unifire }) => (
      <SubEntryKeywordsSection
        data={unifire}
        key={EntrySection.KeywordsAndGO}
      />
    ),
  },
];

export default uniParcSubEntryConfig;
