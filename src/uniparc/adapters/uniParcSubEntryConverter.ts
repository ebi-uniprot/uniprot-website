import { type Evidence } from '../../uniprotkb/types/modelTypes';
import { type UniSaveStatus } from '../../uniprotkb/types/uniSave';
import { isSourceDatabase } from '../utils/subEntry';
import uniParcConverter, {
  databaseToEntryType,
  type UniParcLiteAPIModel,
  type UniParcUIModel,
  type UniParcXRef,
} from './uniParcConverter';

export type UniParcSubEntryUIModel = {
  entry: Partial<UniParcUIModel>;
  subEntry: Partial<UniParcXRef> & {
    isSource: boolean;
    source?: Partial<UniParcXRef> | null;
    isUniprotkbEntry: boolean;
  };
  unisave: UniSaveStatus;
  unifire?: UniFireModel;
};

export type Prediction = {
  evidence: string[];
  annotationType: string;
  annotationValue: string;
  start?: number;
  end?: number;
};

export type UniFireModel = {
  accession: string;
  predictions: Prediction[] | ModifiedPrediction[];
};

export type ModifiedPrediction = Prediction & {
  evidence: Evidence[];
};

const constructPredictionEvidences = (
  evidences: string[] | undefined
): Evidence[] => {
  return (
    evidences?.map((e) => {
      if (typeof e === 'string') {
        return {
          evidenceCode: 'ECO:0000256',
          source: e.startsWith('ARBA') ? 'ARBA' : 'UniRule',
          id: e,
        };
      }
      return e;
    }) || []
  );
};

const uniParcSubEntryConverter = (
  entryData: UniParcLiteAPIModel,
  subEntryData: UniParcXRef,
  unisaveData: UniSaveStatus,
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

  if (uniFireData?.predictions) {
    const modifiedPredictions = uniFireData.predictions.map((prediction) => ({
      ...prediction,
      evidence: constructPredictionEvidences(
        prediction.evidence as string[]
      ) as Evidence[],
    }));
    uniFireData.predictions = modifiedPredictions as ModifiedPrediction[];
  }

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isSource, source, isUniprotkbEntry },
    unisave: unisaveData,
    unifire: uniFireData,
  };
};

export default uniParcSubEntryConverter;
