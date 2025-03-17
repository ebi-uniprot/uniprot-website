import { sleep } from 'timing-functions';

import { AA_ZOOMED } from '../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
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

export const getZoomedInRange = (
  features: ProcessedFeature[],
  sequenceLength: number
): NightingaleViewRange => {
  if (sequenceLength <= AA_ZOOMED) {
    return {
      'display-start': 1,
      'display-end': sequenceLength,
    };
  }
  const OFFSET = 5;
  const minStart = Math.min(...features.map((feature) => feature.start));
  const displayStart =
    // Right at the start
    (minStart < OFFSET && minStart) ||
    // Right at the end
    (minStart > sequenceLength - OFFSET - AA_ZOOMED &&
      sequenceLength - AA_ZOOMED) ||
    // Everything else
    minStart - OFFSET;

  return {
    'display-start': displayStart,
    'display-end': displayStart + AA_ZOOMED,
  };
};

export async function* linearTimed(
  start: number,
  end: number,
  time: number,
  steps: number
): AsyncGenerator<number, void, unknown> {
  const stepSize = (end - start) / steps;
  // Note that sleep time is inaccurate below 50ms
  const stepTime = time / steps;
  for (let step = 1; step < steps; step += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(stepTime);
    yield start + step * stepSize;
  }
  // Ensure the final value is exactly end
  yield end;
}

export async function* rangeTimed(
  start: [number, number],
  end: [number, number]
): AsyncGenerator<[number, number], void, unknown> {
  const distance = [end[0] - start[0], end[1] - start[1]];
  const time = 500;
  const steps = 20;
  for await (const a of linearTimed(0, 1, time, steps)) {
    yield [start[0] + a * distance[0], start[1] + a * distance[1]];
  }
}

export const getTargetRange = (
  featureRange: [number, number],
  sequenceLength: number
): [number, number] => {
  const featureLength = featureRange[1] - featureRange[0] + 1;
  if (featureLength >= sequenceLength) {
    return [1, sequenceLength];
  }
  const padding = Math.max(featureLength, (AA_ZOOMED - featureLength) / 2);
  const start = featureRange[0] - padding;
  const end = featureRange[1] + padding;
  if (start < 1) {
    return [1, Math.max(Math.min(end, sequenceLength), AA_ZOOMED)];
  }
  if (end > sequenceLength) {
    return [Math.max(1, start - AA_ZOOMED), sequenceLength];
  }
  return [Math.round(start), Math.round(end)];
};
