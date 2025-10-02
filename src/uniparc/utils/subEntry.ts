import { generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';
import { Evidence } from '../../uniprotkb/types/modelTypes';
import {
  ModifiedPrediction,
  Prediction,
} from '../adapters/uniParcSubEntryConverter';

export const getSubEntryPath = (
  accession: string,
  subEntryId: string,
  subPage?: string
) =>
  generatePath(LocationToPath[Location.UniParcSubEntry], {
    accession,
    subEntryId,
    subPage,
  });

const reSourceDatabase = /^(refseq|ensembl|embl)/i;

export const isSourceDatabase = (database?: string) =>
  Boolean(database && reSourceDatabase.test(database));

export const getSubEntryProteomes = (
  properties: { key: string; value: string }[] | undefined
): { [key: string]: string } => {
  const proteomeComponentObject: { [key: string]: string } = {};
  if (properties) {
    properties.forEach((property) => {
      if (property.key === 'sources') {
        const [, proteomeId, ...component] = property.value.split(':');
        if (!proteomeComponentObject[proteomeId]) {
          proteomeComponentObject[proteomeId] = component.join(':');
        }
      }
    });
  }
  return proteomeComponentObject;
};

export const constructPredictionEvidences = (
  evidences: string[] | undefined
): Evidence[] => {
  return (
    evidences?.map((e) => ({
      evidenceCode: 'ECO:0000256',
      source: e.startsWith('ARBA') ? 'ARBA' : 'UniRule',
      id: e,
    })) || []
  );
};

const filterPredictions = (
  predictions: Prediction[] | undefined,
  annotationType: string
) => {
  return (
    predictions
      ?.filter((prediction) => prediction.annotationType === annotationType)
      .map((prediction) => ({
        ...prediction,
        evidence: constructPredictionEvidences(prediction.evidence) || [],
      })) || []
  );
};

export const getPredictionsByType = (
  predictions: Prediction[] | undefined,
  annotationType: string | string[]
): ModifiedPrediction[] => {
  if (Array.isArray(annotationType)) {
    return annotationType
      .map((type) => filterPredictions(predictions, type))
      .flat();
  }
  return filterPredictions(predictions, annotationType);
};
