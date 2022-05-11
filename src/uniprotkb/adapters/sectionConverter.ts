import { getXrefsForSection, XrefUIModel } from '../utils/xrefUtils';
import Comment, {
  CommentType,
  DiseaseComment,
  FreeTextComment,
} from '../types/commentTypes';
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

const reDiseaseAcronym = /^in (?<acronym>[^;]+);/i;

export type UIModel = {
  commentsData: Map<CommentType, Comment[] | undefined>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
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
    const naturalVariants = features?.filter(
      (variant) => variant.type === 'Natural variant'
    );
    for (const commentType of sectionComments) {
      const commentsOfType = comments.filter(
        (comment) => comment.commentType === commentType
      );
      if (commentType === 'DISEASE' && naturalVariants) {
        // Tie natural variants to specific diseases (not all will match)
        for (const variant of naturalVariants) {
          // Extract acronym from the description
          const acronym =
            variant.description?.match(reDiseaseAcronym)?.groups?.acronym;
          if (acronym && variant.featureId) {
            // Find a disease with that acronym and assign it this variant
            const comment = (commentsOfType as DiseaseComment[]).find(
              (comment) => comment.disease?.acronym === acronym
            );
            if (comment) {
              // Assign to object because this bit of code might run multiple
              // times so adding to a list might create duplicate variants
              if (!comment.variants) {
                comment.variants = {};
              }
              comment.variants[variant.featureId] = variant;
            }
          }
        }
      }
      convertedData.commentsData.set(commentType, commentsOfType);
    }
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
