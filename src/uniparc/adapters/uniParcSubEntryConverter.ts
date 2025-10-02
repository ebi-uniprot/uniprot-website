import { Evidence } from '../../uniprotkb/types/modelTypes';
import { isSourceDatabase } from '../utils/subEntry';
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
  unifire?: UniFireModel;
};

export type Prediction = {
  evidence: string[];
  annotationType: string;
  annotationValue: string;
};

export type UniFireModel = {
  accession: string;
  predictions: Prediction[];
};

export type ModifiedPrediction = {
  evidence: Evidence[];
  annotationType: string;
  annotationValue: string;
};

const uniParcSubEntryConverter = (
  entryData: UniParcLiteAPIModel,
  subEntryData: UniParcXRef,
  uniFireData?: UniFireModel
): UniParcSubEntryUIModel | null => {
  const transformedEntryData = uniParcConverter(entryData);

  if (!subEntryData) {
    return null;
  }

  const isUniprotkbEntry = Boolean(
    subEntryData.database && databaseToEntryType.has(subEntryData.database)
  );

  const isSource = isSourceDatabase(subEntryData.database);
  const source = isSource ? undefined : subEntryData;

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isSource, source, isUniprotkbEntry },
    unifire: uniFireData,
  };
};

export default uniParcSubEntryConverter;
