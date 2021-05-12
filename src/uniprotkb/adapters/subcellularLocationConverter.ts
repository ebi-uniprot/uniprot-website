import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { convertSection, UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { CommentType } from '../types/commentTypes';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { Xref } from '../../shared/types/apiModel';

const commentCategories: CommentType[] = ['SUBCELLULAR LOCATION'];

const keywordsCategories: KeywordCategory[] = ['Cellular component'];

const featuresCategories: FeatureType[] = [
  'Topological domain',
  'Transmembrane',
];

export type SubcellularLocationUIModel = {
  organismData?: TaxonomyDatum;
} & UIModel;

const convertSubcellularLocation = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) => {
  const subcellularLocationData: SubcellularLocationUIModel = convertSection(
    data,
    commentCategories,
    keywordsCategories,
    featuresCategories,
    undefined,
    uniProtKBCrossReferences
  );
  if (data.organism) {
    subcellularLocationData.organismData = data.organism;
  }
  return subcellularLocationData;
};
export default convertSubcellularLocation;
