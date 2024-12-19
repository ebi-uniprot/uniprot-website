import { ProcessedFeature } from '../components/views/FeaturesView';

export type NightingaleViewRange = {
  'display-start': number;
  'display-end': number;
};

export const withinRange = (
  featureStart: number,
  featureEnd: number,
  nightingaleViewRange?: NightingaleViewRange
) =>
  nightingaleViewRange
    ? featureEnd >= nightingaleViewRange['display-start'] &&
      nightingaleViewRange['display-end'] >= featureStart
    : true;

export const getRowId = (data: ProcessedFeature) => data.accession;

export const markBackground = (markedData: ProcessedFeature) => {
  const markedId = getRowId(markedData);
  return typeof markedId === 'undefined'
    ? undefined
    : (data: ProcessedFeature) => {
        const rowId = getRowId(data);
        return Boolean(rowId && rowId === markedId);
      };
};

export const markBorder =
  (nightingaleViewRange: NightingaleViewRange) => (datum: ProcessedFeature) =>
    withinRange(datum.start, datum.end, nightingaleViewRange);
