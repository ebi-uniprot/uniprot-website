import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import { CommentType } from '../../types/CommentTypes';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.DOMAIN];

const featuresCategories = [
  FeatureType.DOMAIN,
  FeatureType.REGION,
  FeatureType.REPEAT,
  FeatureType.MOTIF,
  FeatureType.COMPBIAS,
];

const familyAndDomainsComments = [CommentType.DOMAIN, CommentType.SIMILARITY];

const convertFamilyAndDomains = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    familyAndDomainsComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.FamilyAndDomains
  );
};

export default convertFamilyAndDomains;
