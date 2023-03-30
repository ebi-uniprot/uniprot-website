import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import { DiseaseAndDrugsFeatures } from '../types/featureType';
import { convertSection } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

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
