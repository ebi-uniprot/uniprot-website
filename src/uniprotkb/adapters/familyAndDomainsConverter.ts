import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';

const keywordsCategories: KeywordCategory[] = ['Domain'];

const featuresCategories: FeatureType[] = [
  'Domain',
  'Region',
  'Repeat',
  'Motif',
  'Compositional bias',
];

const familyAndDomainsComments: CommentType[] = ['DOMAIN', 'SIMILARITY'];

const convertFamilyAndDomains = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    familyAndDomainsComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.FamilyAndDomains,
    uniProtKBCrossReferences
  );

export default convertFamilyAndDomains;
