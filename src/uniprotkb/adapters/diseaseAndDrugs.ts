import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { DiseaseAndDrugsFeatures } from '../types/featureType';
import KeywordCategory from '../types/keywordCategory';
import { DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

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
