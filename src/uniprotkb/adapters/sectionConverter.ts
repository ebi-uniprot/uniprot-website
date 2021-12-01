import { getXrefsForSection, XrefUIModel } from '../utils/xrefUtils';
import Comment, { CommentType, FreeTextComment } from '../types/commentTypes';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import { FeatureData } from '../components/protein-data-views/UniProtKBFeaturesView';
import EntrySection from '../types/entrySection';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { DatabaseInfoMaps } from '../utils/database';

export type UIModel = {
  commentsData: Map<CommentType, Comment[] | undefined>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

export const convertSection = (
  data: UniProtkbAPIModel,
  dbMaps: DatabaseInfoMaps,
  sectionComments?: CommentType[],
  sectionKeywords?: KeywordCategory[],
  sectionFeatures?: FeatureType[],
  section?: EntrySection,
  uniProtKBCrossReferences?: Xref[]
) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  const { comments, keywords, features, genes, organism, uniProtkbId } = data;
  if (sectionComments && comments) {
    sectionComments.forEach((commentType) => {
      convertedData.commentsData.set(
        commentType,
        comments.filter((comment) => comment.commentType === commentType)
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
    convertedData.featuresData = features.filter((feature) =>
      sectionFeatures.includes(feature.type)
    );
  }
  if (section && uniProtKBCrossReferences) {
    // These are needed because the implicit database GPCRDB depends on the existence of a similarity
    // comment with the text "Belongs to the G-protein coupled receptor"'],
    const similarityComments = convertedData.commentsData.get('SIMILARITY') as
      | FreeTextComment[]
      | undefined;
    convertedData.xrefData = getXrefsForSection(
      dbMaps,
      uniProtKBCrossReferences,
      section,
      genes,
      organism?.commonName,
      similarityComments,
      uniProtkbId,
      data?.proteinDescription?.recommendedName?.ecNumbers
    );
  }
  return convertedData;
};
