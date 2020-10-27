import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { convertSection } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories = [KeywordCategory.DISEASE];

const featuresCategories = [FeatureType.MUTAGEN];

const commentsCategories = [
  CommentType.DISEASE,
  CommentType.ALLERGEN,
  CommentType.BIOTECHNOLOGY,
  CommentType.DISRUPTION_PHENOTYPE,
  CommentType.TOXIC_DOSE,
  CommentType.PHARMACEUTICAL,
];

const convertDiseaseAndDrugs = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.DiseaseAndDrugs
  );
};

export default convertDiseaseAndDrugs;
