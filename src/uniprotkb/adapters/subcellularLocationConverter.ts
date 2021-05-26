import { convertSection, UIModel } from './sectionConverter';
import { hasContent } from '../../shared/utils/utils';

import { UniProtkbAPIModel } from './uniProtkbConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { Xref } from '../../shared/types/apiModel';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { CommentType } from '../types/commentTypes';

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

  // If there is no subcellular data, don't add organism data which will cause
  // the section render to falsely believe the section should be rendered
  if (hasContent(subcellularLocationData) && data.organism) {
    subcellularLocationData.organismData = data.organism;
  }
  return subcellularLocationData;
};
export default convertSubcellularLocation;
