import EntrySection from '../types/EntrySection';
import { convertFunction } from './sections/FunctionConverter';
import { FreeTextData } from '../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../view/uniprotkb/components/CatalyticActivityView';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import { convertPathologyAndBiotech } from './sections/PathologyAndBiotechConverter';
import { DiseaseCommentData } from '../../view/uniprotkb/components/DiseaseInvolvementView';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
} from './sections/NamesAndTaxonomyConverter';
import { convertProteinProcessing } from './sections/ProteinProcessingConverter';
import { convertExpression } from './sections/ExpressionConverter';
import { convertSubcellularLocation } from './sections/SubcellularLocationConverter';
import { convertSequence, SequenceUIModel } from './sections/SequenceConverter';
import {
  AlternativeProducts,
  SequenceData,
} from '../../view/uniprotkb/components/SequenceView';
import { Keyword } from '../utils/KeywordsUtil';
import { Xref } from '../utils/XrefUtils';
import { convertInteraction } from './sections/InteractionConverter';
import { convertFamilyAndDomains } from './sections/FamilyAndDomainsConverter';
import { UIModel } from './SectionConverter';

export type UniProtkbAPIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  proteinDescription?: ProteinNamesData;
  comments?: FreeTextData &
    CatalyticActivityData &
    DiseaseCommentData &
    AlternativeProducts[];
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
  sequence: SequenceData;
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  [EntrySection.Function]: UIModel;
  [EntrySection.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySection.SubCellularLocation]: UIModel;
  [EntrySection.PathologyAndBioTech]: UIModel;
  [EntrySection.ProteinProcessing]: UIModel;
  [EntrySection.Expression]: UIModel;
  [EntrySection.Sequence]: SequenceUIModel;
  [EntrySection.Interaction]: UIModel;
  [EntrySection.FamilyAndDomains]: UIModel;
};

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  return {
    primaryAccession: data.primaryAccession,
    uniProtId: data.uniProtId,
    proteinExistence: data.proteinExistence,
    [EntrySection.Function]: convertFunction(data),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(data),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(data),
    [EntrySection.PathologyAndBioTech]: convertPathologyAndBiotech(data),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(data),
    [EntrySection.Expression]: convertExpression(data),
    [EntrySection.Interaction]: convertInteraction(data),
    [EntrySection.Sequence]: convertSequence(data),
    [EntrySection.FamilyAndDomains]: convertFamilyAndDomains(data),
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
