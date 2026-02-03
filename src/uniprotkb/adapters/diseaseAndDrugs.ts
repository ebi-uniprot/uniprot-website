import { type Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { type CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { type DiseaseAndDrugsFeatures } from '../types/featureType';
import type KeywordCategory from '../types/keywordCategory';
import { type DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories: KeywordCategory[] = ['Disease'];

export const diseaseAndDrugsFeaturesToColumns: Readonly<
  Record<DiseaseAndDrugsFeatures, UniProtKBColumn>
> = {
  Mutagenesis: UniProtKBColumn.ftMutagen,
  'Natural variant': UniProtKBColumn.ftVariant,
};

const featuresCategories = Object.keys(
  diseaseAndDrugsFeaturesToColumns
) as DiseaseAndDrugsFeatures[];

const commentsCategories: CommentType[] = [
  'DISEASE',
  'ALLERGEN',
  'DISRUPTION PHENOTYPE',
  'TOXIC DOSE',
  'PHARMACEUTICAL',
  'BIOTECHNOLOGY',
];

const convertDiseaseAndDrugs = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    databaseInfoMaps,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.DiseaseVariants,
    uniProtKBCrossReferences
  );

export default convertDiseaseAndDrugs;
