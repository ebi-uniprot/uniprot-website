import FeatureType from '../../types/FeatureType';
import { convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const featuresCategories = [FeatureType.HELIX, FeatureType.STRAND];

const convertStructure = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    undefined,
    undefined,
    featuresCategories,
    EntrySection.Structure
  );
};

export default convertStructure;
