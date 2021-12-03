import { groupBy } from 'lodash-es';
import { StructureFeatures } from '../types/featureType';
import { convertSection, UIModel } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

type GroupedStructureInfo = { [key: string]: Xref[] };

export type StructureUIModel = {
  structures?: GroupedStructureInfo;
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
    undefined,
    undefined,
    featuresCategories,
    EntrySection.Structure,
    uniProtKBCrossReferences
  );
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
