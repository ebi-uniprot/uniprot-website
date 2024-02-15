import FunctionSection from '../components/entry/FunctionSection';
import NamesAndTaxonomySection from '../components/entry/NamesAndTaxonomySection';
import DiseaseAndDrugsSection from '../components/entry/DiseaseAndDrugsSection';
import ProteinProcessingSection from '../components/entry/ProteinProcessingSection';
import ExpressionSection from '../components/entry/ExpressionSection';
import SubcellularLocationSection from '../components/entry/SubcellularLocationSection';
import SequenceSection from '../components/entry/SequenceSection';
import InteractionSection from '../components/entry/InteractionSection';
import FamilyAndDomainsSection from '../components/entry/FamilyAndDomainsSection';
import StructureSection from '../components/entry/StructureSection';
import SimilarProteinsSection from '../components/entry/similar-proteins/SimilarProteinsSection';

import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import { FunctionUIModel } from '../adapters/functionConverter';
import { SubcellularLocationUIModel } from '../adapters/subcellularLocationConverter';
import EntrySection from '../types/entrySection';
import { Reference } from '../../supporting-data/citations/adapters/citationsConverter';

const UniProtKBEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniProtkbUIModel,
    communityReferences: Reference[],
    importedVariants: number | 'loading',
    hasGenomicCoordinates: boolean | 'loading'
  ) => JSX.Element;
}[] = [
  {
    id: EntrySection.Function,
    sectionContent: (data, communityReferences) => (
      <FunctionSection
        data={data[EntrySection.Function] as FunctionUIModel}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        communityReferences={communityReferences}
        key={EntrySection.Function}
      />
    ),
  },
  {
    id: EntrySection.NamesAndTaxonomy,
    sectionContent: (data) => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
        references={data.references}
      />
    ),
  },
  {
    id: EntrySection.SubCellularLocation,
    sectionContent: (data, communityReferences) => (
      <SubcellularLocationSection
        data={
          data[EntrySection.SubCellularLocation] as SubcellularLocationUIModel
        }
        sequence={data[EntrySection.Sequence].sequence.value}
        // communityReferences={communityReferences}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    id: EntrySection.DiseaseVariants,
    sectionContent: (data, communityReferences, importedVariants) => (
      <DiseaseAndDrugsSection
        data={data[EntrySection.DiseaseVariants]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        taxId={data[EntrySection.NamesAndTaxonomy].organismData?.taxonId}
        importedVariants={importedVariants}
        // communityReferences={communityReferences}
        key={EntrySection.DiseaseVariants}
      />
    ),
  },
  {
    id: EntrySection.ProteinProcessing,
    sectionContent: (data, communityReferences) => (
      <ProteinProcessingSection
        data={data[EntrySection.ProteinProcessing]}
        sequence={data[EntrySection.Sequence].sequence.value}
        primaryAccession={data.primaryAccession}
        // communityReferences={communityReferences}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    id: EntrySection.Expression,
    sectionContent: (data, communityReferences) => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        // communityReferences={communityReferences}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    id: EntrySection.Interaction,
    sectionContent: (data, communityReferences) => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        // communityReferences={communityReferences}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    id: EntrySection.Structure,
    sectionContent: (data, communityReferences) => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        // communityReferences={communityReferences}
        key={EntrySection.Structure}
        crc64={data[EntrySection.Sequence].sequence.crc64}
      />
    ),
  },
  {
    id: EntrySection.FamilyAndDomains,
    sectionContent: (data, communityReferences) => (
      <FamilyAndDomainsSection
        data={data[EntrySection.FamilyAndDomains]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        // communityReferences={communityReferences}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    id: EntrySection.Sequence,
    sectionContent: (data, communityReferences, _, hasGenomicCoordinates) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        hasGenomicCoordinates={hasGenomicCoordinates}
        // communityReferences={communityReferences}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    id: EntrySection.SimilarProteins,
    sectionContent: (data) => (
      <SimilarProteinsSection
        isoforms={data[EntrySection.SimilarProteins]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
