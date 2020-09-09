/* eslint-disable camelcase */

import { MSAInput } from '../components/MSAWrapper';
import {
  ProcessedFeature,
  FeatureData,
} from '../../uniprotkb/components/protein-data-views/FeaturesView';

export const findSequenceSegments = (seq: string) => {
  const ranges: number[][] = [];
  const newRange = () => ({
    start: null,
    end: null,
  });

  type SegmentRange = {
    start: number | null;
    end: number | null;
  };

  let range: SegmentRange = newRange();

  [...seq].forEach((ch, i) => {
    if (ch !== '-') {
      if (range.start === null) {
        range.start = i + 1;
      }
    } else if (range.start !== null && range.end === null) {
      range.end = i;
      ranges.push([range.start, range.end]);
      range = newRange();
    }

    if (i === seq.length - 1 && range.start !== null && range.end === null) {
      range.end = i + 1;
      ranges.push([range.start as number, range.end as number]);
      range = newRange();
    }
  });

  return ranges;
};

export const getFullAlignmentLength = (
  alignment: MSAInput[],
  alignmentLength: number
) => {
  /**
   * prefix|align|suffix
   *     --|=====|-----
   * ------|=====|---------
   */
  const prefix = Math.max(...alignment.map(({ from }) => from));
  const suffix = Math.max(...alignment.map(({ length, to }) => length - to));
  return prefix - 1 + alignmentLength + suffix;
};

export type SegmentTrackData = {
  start: number;
  end: number;
  shape?: string;
  color: string;
};

export type FullAlignmentSegments = {
  name?: string;
  accession?: string;
  sequence: string;
  from: number;
  to: number;
  length: number;
  features?: FeatureData;
  trackData: SegmentTrackData[];
};

export const getFullAlignmentSegments = (alignment: MSAInput[]) => {
  // franklin $colour-sapphire-blue
  const colour = '#014371';

  const countGaps = (seq: string) => {
    const matches = seq.match(/-/g);
    return matches ? matches.length : 0;
  };

  const maxFrom = Math.max(...alignment.map(({ from }) => from));

  return alignment.map((al) => {
    const offset = maxFrom - al.from > 0 ? maxFrom - al.from : 0;
    return {
      ...al,
      trackData: [
        {
          start: offset,
          end: offset + al.from,
          shape: 'line',
          color: colour,
        },
        ...findSequenceSegments(al.sequence).map(([start, end]) => ({
          start: offset + (al.from - 1) + start,
          end: offset + (al.from - 1) + end,
          color: colour,
        })),
        {
          start: offset + al.to + countGaps(al.sequence),
          end: offset + al.length + countGaps(al.sequence),
          shape: 'line',
          color: colour,
        },
      ],
    };
  });
};

export const transformFeaturesPositions = (features: ProcessedFeature[]) =>
  features.map((feature) => ({
    ...feature,
    start: feature.start - 1,
    end: feature.end - 1,
  }));
