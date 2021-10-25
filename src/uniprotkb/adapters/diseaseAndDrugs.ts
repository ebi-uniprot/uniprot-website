import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import { DiseaseAndDrugsFeatures } from '../types/featureType';
import { convertSection } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';

const keywordsCategories: KeywordCategory[] = ['Disease'];

export const diseaseAndDrugsFeaturesToColumns: Readonly<
  Record<DiseaseAndDrugsFeatures, UniProtKBColumn>
> = { Mutagenesis: UniProtKBColumn.ftMutagen };

const featuresCategories = Object.keys(
  diseaseAndDrugsFeaturesToColumns
) as DiseaseAndDrugsFeatures[];

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
