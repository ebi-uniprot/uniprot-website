import { groupBy } from 'lodash-es';
import FeatureType from '../types/featureType';
import { convertSection, UIModel } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';

type GroupedStructureInfo = { [key: string]: Xref[] };

export type StructureUIModel = {
  structures?: GroupedStructureInfo;
} & UIModel;

const featuresCategories: FeatureType[] = ['Helix', 'Beta strand', 'Turn'];

const convertStructure = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) => {
  const structureData: StructureUIModel = convertSection(
    data,
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
