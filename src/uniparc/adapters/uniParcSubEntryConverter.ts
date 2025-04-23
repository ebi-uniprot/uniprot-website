import { getSource, isSourceDatabase } from '../utils/subEntry';
import uniParcConverter, {
  databaseToEntryType,
  UniParcLiteAPIModel,
  UniParcUIModel,
  UniParcXRef,
} from './uniParcConverter';

export type UniParcSubEntryUIModel = {
  entry: Partial<UniParcUIModel>;
  subEntry: Partial<UniParcXRef> & {
    isSource: boolean;
    source?: Partial<UniParcXRef> | null;
    isUniprotkbEntry: boolean;
  };
};

const uniParcSubEntryConverter = (
  entryData: UniParcLiteAPIModel,
  subEntryData: UniParcXRef
): UniParcSubEntryUIModel | null => {
  const transformedEntryData = uniParcConverter(entryData);

  if (!subEntryData) {
    return null;
  }
  const isUniprotkbEntry = Boolean(
    subEntryData.database && databaseToEntryType.has(subEntryData.database)
  );

  const isSource = isSourceDatabase(subEntryData.database);
  const source = isSource ? undefined : getSource(subEntryData.organism);

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isSource, source, isUniprotkbEntry },
  };
};

export default uniParcSubEntryConverter;
