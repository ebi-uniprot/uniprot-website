import { Except } from 'type-fest';

import * as logging from '../../shared/utils/logging';
import { Evidence } from '../../uniprotkb/types/modelTypes';
import { UniSaveStatus } from '../../uniprotkb/types/uniSave';
import annotationTypeToSection, {
  type SectionObject,
} from '../config/UniFireAnnotationTypeToSection';
import SubEntrySection from '../types/subEntrySection';
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
  unisave?: UniSaveStatus;
  unifire?: Partial<Record<SubEntrySection, ModifiedPrediction[]>>;
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
  predictions: Prediction[];
};

export type ModifiedPrediction = Except<Prediction, 'evidence'> & {
  evidence: Evidence[];
  sectionObject: SectionObject;
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
  entryData?: UniParcLiteAPIModel,
  subEntryData?: UniParcXRef,
  unisaveData?: UniSaveStatus,
  uniFireData?: UniFireModel
): UniParcSubEntryUIModel | null => {
  if (!entryData || !subEntryData) {
    return null;
  }

  const transformedEntryData = uniParcConverter(entryData);

  const isUniprotkbEntry = Boolean(
    subEntryData.database && databaseToEntryType.has(subEntryData.database)
  );

  const isSource = isSourceDatabase(subEntryData.database);
  const source = isSource ? undefined : subEntryData;

  const unifire: Partial<Record<SubEntrySection, ModifiedPrediction[]>> = {};
  for (const prediction of uniFireData?.predictions || []) {
    const sectionObject = annotationTypeToSection[prediction.annotationType];
    // Sanity check
    if (!sectionObject) {
      logging.warn('missing case for unifire', {
        extra: { data: prediction.annotationType },
      });
      continue;
    }
    // Add proper evidence
    const modifiedPrediction: ModifiedPrediction = {
      ...prediction,
      evidence: constructPredictionEvidences(prediction.evidence),
      sectionObject,
    };
    // Add correct section if not there yet
    if (!(sectionObject.section in unifire)) {
      unifire[sectionObject.section] = [];
    }
    // Assign to correct section
    unifire[sectionObject.section]?.push(modifiedPrediction);
  }

  return {
    entry: transformedEntryData,
    subEntry: { ...subEntryData, isSource, source, isUniprotkbEntry },
    unisave: unisaveData,
    unifire: uniFireData?.predictions.length ? unifire : undefined,
  };
};

export default uniParcSubEntryConverter;
