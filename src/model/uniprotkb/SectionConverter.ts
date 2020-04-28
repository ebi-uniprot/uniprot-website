import idx from 'idx';
import { getXrefsForSection, XrefUIModel } from '../utils/XrefUtils';
import Comment, { CommentType, FreeTextComment } from '../types/CommentTypes';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import EntrySection from '../types/EntrySection';
import KeywordCategory from '../types/KeywordCategory';
import FeatureType from '../types/FeatureType';
import { UniProtkbAPIModel } from './UniProtkbConverter';

export type UIModel = {
  commentsData: Map<CommentType, Comment[]>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

export const convertSection = (
  data: UniProtkbAPIModel,
  sectionComments?: CommentType[],
  sectionKeywords?: KeywordCategory[],
  sectionFeatures?: FeatureType[],
  section?: EntrySection
) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  const {
    comments,
    keywords,
    features,
    uniProtKBCrossReferences,
    genes,
    organism,
    uniProtkbId,
  } = data;
  if (sectionComments && comments) {
    sectionComments.forEach(commentType => {
      convertedData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }
  if (sectionKeywords && keywords) {
    convertedData.keywordData = getKeywordsForCategories(
      keywords,
      sectionKeywords
    );
  }
  if (sectionFeatures && features) {
    convertedData.featuresData = features.filter(feature => {
      return sectionFeatures.includes(feature.type);
    });
  }
  if (section && uniProtKBCrossReferences) {
    const commonName = idx(organism, o => o.commonName);
    const ecNumbers = idx(
      data,
      o => o.proteinDescription.recommendedName.ecNumbers
    );
    // These are needed because the implicit database GPCRDB depends on the existence of a similarity
    // comment with the text "Belongs to the G-protein coupled receptor"'],
    const similarityComments = convertedData.commentsData.get(
      CommentType.SIMILARITY
    ) as FreeTextComment[];
    convertedData.xrefData = getXrefsForSection(
      uniProtKBCrossReferences,
      section,
      genes,
      commonName,
      similarityComments,
      uniProtkbId,
      ecNumbers
    );
  }
  return convertedData;
};
