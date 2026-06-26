import * as logging from '../../shared/utils/logging';
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
  unisave?: UniSaveStatus;
  unifire?: UniFireModel;
};

export type Prediction = {
  evidence: string[];
  annotationType: string;
  annotationValue?: string;
  start?: number;
  end?: number;
};

export type UniFireModel = {
  accession: string;
  predictions: Prediction[] | ModifiedPrediction[];
};

export type ModifiedPrediction = Omit<Prediction, 'evidence'> & {
  evidence: Evidence[];
};

// Sources observed in both UniFIRE and precomputed data for UniParc entries.
// Sorted longest-prefix-first so that more-specific prefixes (e.g. 'PIRNR')
// cannot be shadowed by a shorter one (e.g. 'PI') during startsWith matching.
const SOURCE_BY_PREFIX: ReadonlyArray<readonly [string, string]> = [
  ['PIRNR', 'PIRNR'], // 5 chars
  ['ARBA', 'ARBA'], // 4 chars
  ['PRU', 'PROSITE-ProRule'], // 3 chars
  ['UR', 'UniRule'], // 2 chars
  ['RU', 'RuleBase'], // 2 chars
] as const;

const DEFAULT_EVIDENCE_SOURCE = 'UniRule';

const sourceForEvidenceId = (id: string): string => {
  const match = SOURCE_BY_PREFIX.find(([prefix]) => id.startsWith(prefix));
  if (match) {
    return match[1];
  }
  logging.warn(
    `Unknown UniFire evidence ID prefix; defaulting source to ${DEFAULT_EVIDENCE_SOURCE}`,
    { extra: { id } }
  );
  return DEFAULT_EVIDENCE_SOURCE;
};

export const constructPredictionEvidences = (
  evidences: string[] | undefined
): Evidence[] => {
  return (
    evidences?.map((e) => {
      if (typeof e === 'string') {
        return {
          evidenceCode: 'ECO:0000256',
          source: sourceForEvidenceId(e),
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
  unisaveData?: UniSaveStatus,
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

  // Build a new UniFireModel rather than mutating the caller's object: the raw
  // `uniFireData` is also fed to `uniFireToUniProtkbConverter`, whose validation
  // expects the unmodified `Prediction[]` shape.
  let convertedUniFire = uniFireData;
  if (uniFireData?.predictions) {
    const modifiedPredictions = uniFireData.predictions.map((prediction) => ({
      ...prediction,
      evidence: constructPredictionEvidences(
        prediction.evidence as string[]
      ) as Evidence[],
    }));
    convertedUniFire = {
      ...uniFireData,
      predictions: modifiedPredictions as ModifiedPrediction[],
    };
  }

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isSource, source, isUniprotkbEntry },
    unisave: unisaveData,
    unifire: convertedUniFire,
  };
};

export default uniParcSubEntryConverter;
