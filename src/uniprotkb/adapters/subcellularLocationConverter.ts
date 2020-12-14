import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { CommentType } from '../types/commentTypes';

const commentCategories = [CommentType.SUBCELLULAR_LOCATION];

const keywordsCategories = [KeywordCategory.CELLULAR_COMPONENT];

const featuresCategories = [FeatureType.TOPO_DOM, FeatureType.TRANSMEM];

const convertSubcellularLocation = (data: UniProtkbAPIModel) =>
  convertSection(
    data,
    commentCategories,
    keywordsCategories,
    featuresCategories,
    undefined
  );

export default convertSubcellularLocation;
