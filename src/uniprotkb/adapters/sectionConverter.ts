import { type Xref } from '../../shared/types/apiModel';
import { type FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';
import type Comment from '../types/commentTypes';
import { type CommentType, type FreeTextComment } from '../types/commentTypes';
import type EntrySection from '../types/entrySection';
import type FeatureType from '../types/featureType';
import type KeywordCategory from '../types/keywordCategory';
import { type DatabaseInfoMaps } from '../utils/database';
import {
  getKeywordsForCategories,
  type KeywordUIModel,
} from '../utils/KeywordsUtil';
import { getXrefsForSection, type XrefUIModel } from '../utils/xrefUtils';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

export type UIModel = {
  commentsData: Map<CommentType, Comment[] | undefined>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureDatum[];
  xrefData: XrefUIModel[];
};

export const convertSection = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
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
      databaseInfoMaps,
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
