import { sleep } from 'timing-functions';

import { AA_ZOOMED } from '../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
import { type ProcessedFeature } from '../components/views/FeaturesView';

/**
 * Represents the visible range in the Nightingale view.
 * - 'display-start': The starting position of the displayed region.
 * - 'display-end': The ending position of the displayed region.
 */
export type NightingaleViewRange = {
  'display-start': number;
  'display-end': number;
};

/**
 * Determines if a feature (defined by its start and end positions)
 * falls within a given Nightingale view range.
 *
 * @param featureStart - The starting position of the feature.
 * @param featureEnd - The ending position of the feature.
 * @param nightingaleViewRange - The current visible range.
 * @returns True if the feature is within the range; otherwise, false.
 */
export const withinRange = (
  featureStart: number,
  featureEnd: number,
  nightingaleViewRange?: NightingaleViewRange
) =>
  nightingaleViewRange
    ? featureEnd >= nightingaleViewRange['display-start'] &&
      nightingaleViewRange['display-end'] >= featureStart
    : true;

/**
 * Retrieves the unique identifier for a given processed feature.
 *
 * @param data - The processed feature data.
 * @returns The accession (unique identifier) of the feature.
 */
export const getRowId = (data: ProcessedFeature) => data.accession;

/**
 * Creates a function to check if a given feature should have its background marked,
 * based on whether its identifier matches the marked feature's identifier.
 *
 * @param markedData - The processed feature to be marked.
 * @returns A function that takes a feature and returns true if it matches the marked feature.
 */
export const markBackground = (markedData: ProcessedFeature) => {
  const markedId = getRowId(markedData);
  return typeof markedId === 'undefined'
    ? undefined
    : (data: ProcessedFeature) => {
        const rowId = getRowId(data);
        return Boolean(rowId && rowId === markedId);
      };
};

/**
 * Creates a function that checks if a feature should have its border marked,
 * based on whether its range overlaps with a given Nightingale view range.
 *
 * @param nightingaleViewRange - The visible range in the Nightingale view.
 * @returns A function that takes a feature and returns true if it overlaps with the range.
 */
export const markBorder =
  (nightingaleViewRange: NightingaleViewRange) => (datum: ProcessedFeature) =>
    withinRange(datum.start, datum.end, nightingaleViewRange);

/**
 * Determines the zoomed-in view range for the Nightingale view based on a set of features
 * and the total sequence length.
 *
 * If the sequence is shorter than or equal to the AA_ZOOMED threshold, the entire sequence is shown.
 * Otherwise, the range is calculated based on the minimum start position among features,
 * adjusted with an OFFSET value.
 *
 * @param features - An array of processed features.
 * @param sequenceLength - The total length of the sequence.
 * @returns The Nightingale view range with 'display-start' and 'display-end'.
 */
export const getZoomedInRange = (
  features: ProcessedFeature[],
  sequenceLength: number
): NightingaleViewRange => {
  // If the entire sequence is shorter than or equal to the zoom threshold,
  // display the full sequence.
  if (sequenceLength <= AA_ZOOMED) {
    return {
      'display-start': 1,
      'display-end': sequenceLength,
    };
  }
  const OFFSET = 5;
  // Find the smallest start position among all features.
  const minStart = Math.min(...features.map((feature) => feature.start));
  // Calculate the starting position for the display.
  // This takes into account three cases:
  // 1. The feature is near the beginning of the sequence.
  // 2. The feature is near the end of the sequence.
  // 3. The feature is somewhere in the middle.
  const displayStart =
    // Near the start: use minStart if it's less than OFFSET.
    (minStart < OFFSET && minStart) ||
    // Near the end: adjust to show the last AA_ZOOMED residues.
    (minStart > sequenceLength - OFFSET - AA_ZOOMED &&
      sequenceLength - AA_ZOOMED) ||
    // Otherwise, subtract the OFFSET from minStart.
    minStart - OFFSET;

  return {
    'display-start': displayStart,
    'display-end': displayStart + AA_ZOOMED,
  };
};

/**
 * An asynchronous generator that yields a series of numbers from start to end,
 * transitioning linearly over a specified total time and number of steps.
 *
 * Useful for smooth animations or timed transitions.
 *
 * @param start - The starting value.
 * @param end - The ending value.
 * @param time - Total time (in milliseconds) for the transition.
 * @param steps - The number of intermediate steps.
 * @yields A number representing the current step's interpolated value.
 */
export async function* linearTimed(
  start: number,
  end: number,
  time: number,
  steps: number
): AsyncGenerator<number, void, unknown> {
  const stepSize = (end - start) / steps;
  // Note: sleep duration accuracy may degrade below 50ms.
  const stepTime = time / steps;
  for (let step = 1; step < steps; step += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(stepTime);
    yield start + step * stepSize;
  }
  // Ensure that the final value is exactly equal to the provided end value.
  yield end;
}

/**
 * An asynchronous generator that yields a series of two-element number arrays (ranges),
 * transitioning smoothly from a starting range to an ending range.
 *
 * This is particularly useful for animating navigation within the Nightingale view.
 *
 * @param start - The starting navigation range [start, end].
 * @param end - The navigation range to transition to [start, end].
 * @yields A two-element array representing the current interpolated range.
 */
export async function* rangeTimed(
  start: [number, number], // Starting Nightingale navigation range.
  end: [number, number] // Target Nightingale navigation range.
): AsyncGenerator<[number, number], void, unknown> {
  // Calculate the differences between the starting and target ranges.
  const distance = [end[0] - start[0], end[1] - start[1]];
  const time = 500; // Total transition time in milliseconds.
  const steps = 20; // Number of steps in the transition.
  // Use the linearTimed generator to produce a smooth interpolation factor 'a' from 0 to 1.
  for await (const a of linearTimed(0, 1, time, steps)) {
    yield [start[0] + a * distance[0], start[1] + a * distance[1]];
  }
}

/**
 * Calculates the target range for a given feature within a sequence,
 * ensuring the range is padded appropriately and stays within sequence bounds.
 *
 * @param featureRange - A two-element array representing the feature's range [start, end].
 * @param sequenceLength - The total length of the sequence.
 * @returns A two-element array representing the target range [start, end].
 */
export const getTargetRange = (
  featureRange: [number, number],
  sequenceLength: number
): [number, number] => {
  // Calculate the length of the feature.
  const featureLength = featureRange[1] - featureRange[0] + 1;
  // If the feature covers the entire sequence, return the full sequence range.
  if (featureLength >= sequenceLength) {
    return [1, sequenceLength];
  }
  // Determine padding to ensure the feature is centered, but at minimum the padding
  // is either the feature's length or half the difference between AA_ZOOMED and the feature length.
  const padding = Math.max(featureLength, (AA_ZOOMED - featureLength) / 2);
  const start = featureRange[0] - padding;
  const end = featureRange[1] + padding;
  // If the calculated start is less than 1, adjust the range to start at 1.
  if (start < 1) {
    return [1, Math.max(Math.min(end, sequenceLength), AA_ZOOMED)];
  }
  // If the calculated end exceeds the sequence length, adjust to end at the sequence's limit.
  if (end > sequenceLength) {
    return [Math.max(1, start - AA_ZOOMED), sequenceLength];
  }
  // Otherwise, return the rounded range values.
  return [Math.round(start), Math.round(end)];
};
