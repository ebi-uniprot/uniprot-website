import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories = [KeywordCategory.DOMAIN];

const featuresCategories = [
  FeatureType.DOMAIN,
  FeatureType.REGION,
  FeatureType.REPEAT,
  FeatureType.MOTIF,
  FeatureType.COMPBIAS,
];

const familyAndDomainsComments = [CommentType.DOMAIN, CommentType.SIMILARITY];

const convertFamilyAndDomains = (data: UniProtkbAPIModel) =>
  convertSection(
    data,
    familyAndDomainsComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.FamilyAndDomains
  );

export default convertFamilyAndDomains;
