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
  const stepTime = time / steps;
  for (let step = 1; step < steps; step++) {
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
  for await (const a of linearTimed(0, 1, 1000, 10)) {
    yield [start[0] + a * distance[0], start[1] + a * distance[1]];
  }
}
