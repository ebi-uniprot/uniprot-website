import { convertSection, UIModel } from './sectionConverter';
import { hasContent } from '../../shared/utils/utils';

import { UniProtkbAPIModel } from './uniProtkbConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { Xref } from '../../shared/types/apiModel';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import { CommentType } from '../types/commentTypes';
import { Evidence } from '../types/modelTypes';

const commentCategories: CommentType[] = ['SUBCELLULAR LOCATION'];

const keywordsCategories: KeywordCategory[] = ['Cellular component'];

const featuresCategories: FeatureType[] = [
  'Topological domain',
  'Transmembrane',
];

export type GoXref = {
  database: 'GO';
  id: string;
  properties: { GoTerm: string };
  evidences?: Evidence[];
};

export type SubcellularLocationUIModel = {
  organismData?: TaxonomyDatum;
  goXrefs?: Xref[];
} & UIModel;

const convertSubcellularLocation = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: GoXref[]
) => {
  const subcellularLocationData: SubcellularLocationUIModel = convertSection(
    data,
    commentCategories,
    keywordsCategories,
    featuresCategories,
    undefined,
    uniProtKBCrossReferences
  );

  // Select xref go terms which are cellular components and discard the rest.
  // P: biological process
  // C: cellular component
  // F: molecular function
  const goXrefs = uniProtKBCrossReferences
    ?.filter(
      (xref) =>
        xref.database === 'GO' &&
        xref.properties?.GoTerm.startsWith('C:') &&
        xref.id
    )
    .map((xref) => ({
      ...xref,
      properties: {
        ...xref.properties,
        GoTerm: xref.properties.GoTerm.replace('C:', ''),
      },
    }));
  subcellularLocationData.goXrefs = goXrefs;

  // If there is no subcellular data, don't add organism data which will cause
  // the section renderer to falsely believe the section should be rendered
  if (hasContent(subcellularLocationData) && data.organism) {
    subcellularLocationData.organismData = data.organism;
  }
  return subcellularLocationData;
};
export default convertSubcellularLocation;
