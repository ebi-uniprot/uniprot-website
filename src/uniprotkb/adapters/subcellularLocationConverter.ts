import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { convertSection, UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { CommentType } from '../types/commentTypes';
import { OrganismData } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';

const commentCategories = [CommentType.SUBCELLULAR_LOCATION];

const keywordsCategories = [KeywordCategory.CELLULAR_COMPONENT];

const featuresCategories = [FeatureType.TOPO_DOM, FeatureType.TRANSMEM];

export type SubcellularLocationUIModel = {
  organismData?: OrganismData;
} & UIModel;

const convertSubcellularLocation = (data: UniProtkbAPIModel) => {
  const subcellularLocationData: SubcellularLocationUIModel = convertSection(
    data,
    commentCategories,
    keywordsCategories,
    featuresCategories,
    undefined
  );
  if (data.organism) {
    subcellularLocationData.organismData = data.organism;
  }
  return subcellularLocationData;
};
export default convertSubcellularLocation;
