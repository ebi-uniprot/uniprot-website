import { groupBy } from 'lodash-es';

import { type Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { type AlternativeProductsComment } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { type StructureFeatures } from '../types/featureType';
import { type DatabaseInfoMaps } from '../utils/database';
import { constructIsoformSequence } from './extractIsoformsConverter';
import { convertSection, type UIModel } from './sectionConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

type GroupedStructureInfo = { [key: string]: Xref[] };
export type IsoformSequences = {
  isoformId: string;
  sequence: string;
}[];

export type StructureUIModel = {
  structures?: GroupedStructureInfo;
  isoforms?: IsoformSequences;
} & UIModel;

export const structureFeaturesToColumns: Readonly<
  Record<StructureFeatures, UniProtKBColumn>
> = {
  Helix: UniProtKBColumn.ftHelix,
  'Beta strand': UniProtKBColumn.ftStrand,
  Turn: UniProtKBColumn.ftTurn,
};

const featuresCategories = Object.keys(
  structureFeaturesToColumns
) as StructureFeatures[];

const convertStructure = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const structureData: StructureUIModel = convertSection(
    data,
    databaseInfoMaps,
    ['ALTERNATIVE PRODUCTS'],
    undefined,
    [...featuresCategories, 'Alternative sequence'],
    EntrySection.Structure,
    uniProtKBCrossReferences
  );

  const canonicalSequence = data.sequence?.value || '';

  let isoforms: IsoformSequences = [];
  if (structureData.commentsData.size) {
    const alternativeProducts = structureData.commentsData.get(
      'ALTERNATIVE PRODUCTS'
    ) as AlternativeProductsComment[] | undefined;
    const variantSequences = structureData.featuresData.filter(
      (feature) => feature.type === 'Alternative sequence'
    );

    isoforms =
      alternativeProducts?.[0]?.isoforms?.map((isoform) => {
        if (isoform.isoformSequenceStatus === 'Displayed') {
          return {
            isoformId: isoform.isoformIds[0],
            sequence: canonicalSequence,
          };
        }
        return constructIsoformSequence(
          isoform,
          variantSequences,
          canonicalSequence
        );
      }) ?? [];
  }

  if (isoforms.length > 0) {
    structureData.isoforms = isoforms;
  }

  // Extract xrefs to PDB
  if (uniProtKBCrossReferences) {
    const structureInfo = uniProtKBCrossReferences
      .filter((ref) => ref.database === 'PDB')
      .map((item) => {
        const method = item.properties && item.properties.Method;
        return { ...item, method };
      });
    const groupedStructureInfo = groupBy(structureInfo, (item) => item.method);
    structureData.structures = groupedStructureInfo as GroupedStructureInfo;
  }
  return structureData;
};

export default convertStructure;
