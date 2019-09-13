import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { getXrefsForSection, XrefUIModel } from '../../utils/XrefUtils';
import EntrySection from '../../types/EntrySection';
import {
  AlternativeProducts,
  SequenceData,
} from '../../../view/uniprotkb/components/SequenceView';
import Comment from '../../types/Comment';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

export enum Flag {
  PRECURSOR = 'Precursor',
  FRAGMENT = 'Fragment',
  FRAGMENTS = 'Fragments',
  FRAGMENT_PRECURSOR = 'Fragment,Precursor',
  FRAGMENTS_PRECURSOR = 'Fragments,Precursor',
}

export type SequenceUIModel = {
  sequence: SequenceData;
  status?: string;
  processing?: string;
  keywordData: KeywordUIModel[];
  alternativeProducts?: AlternativeProducts;
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
  lastUpdateDate?: string;
};

const sequenceKeywords = [KeywordCategory.CODING_SEQUENCE_DIVERSITY];

const sequenceFeatures = [
  FeatureType.COMPBIAS,
  FeatureType.NON_STD,
  FeatureType.UNSURE,
  FeatureType.CONFLICT,
  FeatureType.NON_CONS,
  FeatureType.NON_TER,
];

export const convertSequence = (data: UniProtkbAPIModel) => {
  const sequenceData: SequenceUIModel = {
    sequence: data.sequence,
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  // Deal with flags
  if (data.proteinDescription && data.proteinDescription.flag) {
    sequenceData.status = [
      Flag.FRAGMENT,
      Flag.FRAGMENTS,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? data.proteinDescription.flag
      : 'Complete';

    sequenceData.processing = [
      Flag.PRECURSOR,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? 'The displayed sequence is further processed into a mature form.'
      : undefined;
  }

  // Add the last update
  if (data.entryAudit) {
    sequenceData.lastUpdateDate = `${data.entryAudit.lastSequenceUpdateDate} v${data.entryAudit.sequenceVersion}`;
  }

  // Trembl entries only have a canonical sequence
  if (data.comments) {
    const alternativeProducts = data.comments.find(
      comment => comment.commentType === Comment.ALTERNATIVE_PRODUCTS
    );
    sequenceData.alternativeProducts = (alternativeProducts as unknown) as AlternativeProducts;
  }

  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      sequenceKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      sequenceData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return sequenceFeatures.includes(feature.type);
    });
    sequenceData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.Sequence
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      sequenceData.xrefData = xrefs;
    }
  }
  return sequenceData;
};
