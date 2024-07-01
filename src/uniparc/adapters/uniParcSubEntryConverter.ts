import { getXRefsForId } from '../utils/subEntry';
import uniParcConverter, {
  UniParcAPIModel,
  UniParcUIModel,
  UniParcXRef,
  databaseToEntryType,
} from './uniParcConverter';

export type UniParcSubEntryUIModel = {
  entry: Partial<UniParcUIModel>;
  subEntry: Partial<UniParcXRef> & {
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
  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isUniprotkbEntry },
  };
};

export default uniParcSubEntryConverter;
