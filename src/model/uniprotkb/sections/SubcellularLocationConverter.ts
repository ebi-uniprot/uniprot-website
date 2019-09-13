import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.CELLULAR_COMPONENT];

const featuresCategories = [FeatureType.TOPO_DOM, FeatureType.TRANSMEM];

const convertSubcellularLocation = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    undefined,
    keywordsCategories,
    featuresCategories,
    undefined
  );
};

export default convertSubcellularLocation;
