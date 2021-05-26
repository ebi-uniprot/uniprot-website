import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { convertSection } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';

const keywordsCategories: KeywordCategory[] = ['Disease'];

const featuresCategories: FeatureType[] = ['Mutagenesis'];

const commentsCategories: CommentType[] = [
  'DISEASE',
  'ALLERGEN',
  'DISRUPTION PHENOTYPE',
  'TOXIC DOSE',
  'PHARMACEUTICAL',
];

const convertDiseaseAndDrugs = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.DiseaseAndDrugs,
    uniProtKBCrossReferences
  );

export default convertDiseaseAndDrugs;
