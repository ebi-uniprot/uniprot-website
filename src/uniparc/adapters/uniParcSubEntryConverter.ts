import { getSource, getXRefsForId } from '../utils/subEntry';
import uniParcConverter, {
  UniParcAPIModel,
  UniParcUIModel,
  UniParcXRef,
  databaseToEntryType,
} from './uniParcConverter';

export type UniParcSubEntryUIModel = {
  entry: Partial<UniParcUIModel>;
  subEntry: Partial<UniParcXRef> & {
    source?: UniParcXRef | null;
    isUniprotkbEntry: boolean;
  };
};

const uniParcSubEntryConverter = (
  entryData: UniParcAPIModel,
  subEntryId: string
): UniParcSubEntryUIModel | null => {
  const transformedEntryData = uniParcConverter(entryData);

  const subEntryData = getXRefsForId(
    subEntryId,
    transformedEntryData.uniParcCrossReferences
  );

  if (!subEntryData) {
    return null;
  }
  const isUniprotkbEntry = Boolean(
    subEntryData.database && databaseToEntryType.has(subEntryData.database)
  );
  const source = getSource(
    subEntryData.organism,
    transformedEntryData.cross_references
  );

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, source, isUniprotkbEntry },
  };
};

export default uniParcSubEntryConverter;
