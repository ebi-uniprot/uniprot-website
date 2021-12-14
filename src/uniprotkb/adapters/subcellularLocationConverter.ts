import { convertSection, UIModel } from './sectionConverter';
import { hasContent } from '../../shared/utils/utils';

import { UniProtkbAPIModel } from './uniProtkbConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { Xref } from '../../shared/types/apiModel';
import KeywordCategory from '../types/keywordCategory';
import { SubcellularLocationFeatures } from '../types/featureType';
import { CommentType } from '../types/commentTypes';
import { Evidence, GoEvidenceType } from '../types/modelTypes';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

const commentCategories: CommentType[] = ['SUBCELLULAR LOCATION'];

const keywordsCategories: KeywordCategory[] = ['Cellular component'];

export const subcellularLocationFeaturesToColumns: Readonly<
  Record<SubcellularLocationFeatures, UniProtKBColumn>
> = {
  Intramembrane: UniProtKBColumn.ftIntramem,
  'Topological domain': UniProtKBColumn.ftTopoDom,
  Transmembrane: UniProtKBColumn.ftTransmem,
};

const featuresCategories = Object.keys(
  subcellularLocationFeaturesToColumns
) as SubcellularLocationFeatures[];

// Select xref go terms which are cellular components and discard the rest.
// P: biological process
// C: cellular component
// F: molecular function
export const getAndPrepareSubcellGoXrefs = (
  uniProtKBCrossReferences?: Xref[]
) =>
  (
    uniProtKBCrossReferences?.filter(
      (xref) =>
        xref.database === 'GO' &&
        xref.properties?.GoTerm.startsWith('C:') &&
        xref.id
    ) as GoXref[]
  )?.map((xref) => ({
    ...xref,
    properties: {
      ...xref.properties,
      GoTerm: xref.properties.GoTerm.replace('C:', ''),
    },
  }));

export type GoXref = {
  database: 'GO';
  id: string;
  properties: { GoTerm: string; GoEvidenceType: GoEvidenceType };
  evidences?: Evidence[];
};

export type SubcellularLocationUIModel = {
  primaryAccession: string;
  organismData?: TaxonomyDatum;
  goXrefs?: GoXref[];
} & UIModel;

const convertSubcellularLocation = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const subcellularLocationData: SubcellularLocationUIModel = {
    ...convertSection(
      data,
      databaseInfoMaps,
      commentCategories,
      keywordsCategories,
      featuresCategories,
      undefined,
      uniProtKBCrossReferences
    ),
    primaryAccession: data.primaryAccession,
    goXrefs: getAndPrepareSubcellGoXrefs(uniProtKBCrossReferences),
  };

  // If there is no subcellular data, don't add organism data which will cause
  // the section renderer to falsely believe the section should be rendered
  if (hasContent(subcellularLocationData) && data.organism) {
    subcellularLocationData.organismData = data.organism;
  }
  return subcellularLocationData;
};
export default convertSubcellularLocation;
