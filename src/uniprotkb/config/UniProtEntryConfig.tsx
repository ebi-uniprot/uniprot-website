import { Reference } from '../../supporting-data/citations/adapters/citationsConverter';
import { FunctionUIModel } from '../adapters/functionConverter';
import { SubcellularLocationUIModel } from '../adapters/subcellularLocationConverter';
import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import DiseaseAndDrugsSection from '../components/entry/DiseaseAndDrugsSection';
import ExpressionSection from '../components/entry/ExpressionSection';
import FamilyAndDomainsSection from '../components/entry/FamilyAndDomainsSection';
import FunctionSection from '../components/entry/FunctionSection';
import InteractionSection from '../components/entry/InteractionSection';
import NamesAndTaxonomySection from '../components/entry/NamesAndTaxonomySection';
import ProteinProcessingSection from '../components/entry/ProteinProcessingSection';
import SequenceSection from '../components/entry/SequenceSection';
import SimilarProteinsSection from '../components/entry/similar-proteins/SimilarProteinsSection';
import StructureSection from '../components/entry/StructureSection';
import SubcellularLocationSection from '../components/entry/SubcellularLocationSection';
import EntrySection from '../types/entrySection';

const UniProtKBEntryConfig: {
  id: EntrySection;
  sectionContent: (
    entryData: UniProtkbUIModel,
    communityReferences: Reference[],
    importedVariants: number | 'loading'
  ) => JSX.Element;
}[] = [
  {
    id: EntrySection.Function,
    sectionContent: (data, communityReferences) => (
      <FunctionSection
        data={data[EntrySection.Function] as FunctionUIModel}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence?.value}
        communityReferences={communityReferences}
        key={EntrySection.Function}
      />
    ),
  },
  {
    id: EntrySection.NamesAndTaxonomy,
    sectionContent: (data, communityReferences) => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
        references={data.references}
        communityReferences={communityReferences}
      />
    ),
  },
  {
    id: EntrySection.SubCellularLocation,
    sectionContent: (data) => (
      <SubcellularLocationSection
        data={
          data[EntrySection.SubCellularLocation] as SubcellularLocationUIModel
        }
        sequence={data[EntrySection.Sequence].sequence?.value}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    id: EntrySection.DiseaseVariants,
    sectionContent: (data, _, importedVariants) => (
      <DiseaseAndDrugsSection
        data={data[EntrySection.DiseaseVariants]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence?.value}
        taxId={data[EntrySection.NamesAndTaxonomy].organismData?.taxonId}
        importedVariants={importedVariants}
        key={EntrySection.DiseaseVariants}
      />
    ),
  },
  {
    id: EntrySection.ProteinProcessing,
    sectionContent: (data) => (
      <ProteinProcessingSection
        data={data[EntrySection.ProteinProcessing]}
        sequence={data[EntrySection.Sequence].sequence?.value}
        primaryAccession={data.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    id: EntrySection.Expression,
    sectionContent: (data) => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    id: EntrySection.Interaction,
    sectionContent: (data) => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    id: EntrySection.Structure,
    sectionContent: (data) => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Structure}
        crc64={data[EntrySection.Sequence].sequence?.crc64}
      />
    ),
  },
  {
    id: EntrySection.FamilyAndDomains,
    sectionContent: (data) => (
      <FamilyAndDomainsSection
        data={data[EntrySection.FamilyAndDomains]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence?.value}
        uniParcID={data.extraAttributes?.uniParcId}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    id: EntrySection.Sequence,
    sectionContent: (data) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Sequence}
      />
    ),
  },
  {
    id: EntrySection.SimilarProteins,
    sectionContent: (data) => (
      <SimilarProteinsSection
        {...data[EntrySection.SimilarProteins]}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
