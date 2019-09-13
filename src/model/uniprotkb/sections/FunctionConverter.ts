import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [
  KeywordCategory.MOLECULAR_FUNCTION,
  KeywordCategory.BIOLOGICAL_PROCESS,
  KeywordCategory.LIGAND,
];

const featuresCategories = [
  FeatureType.DOMAIN,
  FeatureType.REPEAT,
  FeatureType.CA_BIND,
  FeatureType.ZN_FING,
  FeatureType.DNA_BIND,
  FeatureType.NP_BINDL,
  FeatureType.REGION,
  FeatureType.COILED,
  FeatureType.MOTIF,
  FeatureType.ACT_SITE,
  FeatureType.METAL,
  FeatureType.BINDING,
  FeatureType.SITE,
];

const commentsCategories = [
  Comment.FUNCTION,
  Comment.CATALYTIC_ACTIVITY,
  Comment.PATHWAY,
  Comment.MISCELLANEOUS,
];

const convertFunction = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.Function
  );
};

export default convertFunction;
