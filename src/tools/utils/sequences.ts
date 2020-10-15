/* eslint-disable camelcase */
import { v1 } from 'uuid';

import { MSAInput } from '../components/AlignmentView';
import {
  ProcessedFeature,
  FeatureData,
  LocationModifier,
} from '../../uniprotkb/components/protein-data-views/FeaturesView';
import { Sequence } from '../components/Wrapped';

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
          end: offset + al.from - 1,
          shape: 'line',
          color: colour,
        },
        ...findSequenceSegments(al.sequence).map(([start, end]) => ({
          start: offset + (al.from - 1) + start,
          end: offset + (al.from - 1) + end,
          color: colour,
        })),
        {
          start: offset + al.to + countGaps(al.sequence) + 1,
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

export const getNumberOfInsertions = (sequence: string, endPosition: number) =>
  (sequence.slice(0, endPosition).match(/-/g) || []).length;

export const getEndCoordinate = (sequence: string, endPosition: number) =>
  endPosition - getNumberOfInsertions(sequence, endPosition);

// Jie has said that if it is unknown, you can ignore value
// These erroneous features are temporary and will eventually be removed
export const removeFeaturesWithUnknownModifier = (features?: FeatureData) =>
  features?.filter(
    ({ location: { start, end } }) =>
      start.modifier !== LocationModifier.UNKNOWN &&
      end.modifier !== LocationModifier.UNKNOWN
  );

export const createGappedFeature = (feature, sequence) => {
  /*
  input: feature and sequence are both 1-based
  */
  const BLOCK = /(?<insertion>[-]+)|(?<protein>[^-]+)/g;

  let proteinIndex = 1;
  const fragments = [];

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = BLOCK.exec(sequence)) !== null) {
    if (match?.groups?.protein) {
      if (
        proteinIndex + match[0].length >= feature.start &&
        proteinIndex <= feature.end
      ) {
        fragments.push({
          // start: match.index + 1,
          start: match.index + 1 + Math.max(0, feature.start - proteinIndex),
          end:
            match.index +
            Math.min(match[0].length, feature.end - proteinIndex + 1),
        });
      }
      proteinIndex += match[0].length;
    } else if (proteinIndex > feature.start && proteinIndex < feature.end) {
      fragments.push({
        start: match.index + 1,
        end: match.index + match[0].length,
        shape: 'line',
      });
    }
  }
  const gappedFeature = {
    ...feature,
    start: fragments[0].start,
    end: fragments[fragments.length - 1].end,
  };
  if (fragments.length > 1) {
    gappedFeature.locations = [{ fragments }];
  }
  return gappedFeature;
};

export const createGappedFeature2 = (feature, sequence /* full sequence */) => {
  const { start, end } = feature;

  // Gap positions in the full sequence
  // Format: [start, end, length of gap, start index for debugging]
  const gaps = [];
  const fragments = []; // rectangular features to represent feature blocks

  const regex = /[-]+/g;
  let match;

  // We cut off the sequence from where the feature starts before searching for
  // gaps. This is because gaps that come before the start of the feature don't
  // count, but they will mess up with our search in the sequence, if they are
  // not removed from the sequence. One should be subtracted from 'start' value
  // because string functions work on a 0-based array.
  while ((match = regex.exec(sequence.substring(start - 1))) !== null) {
    // We need to keep track of how many gaps we have encountered
    // so far in the sequence and account for those gaps in our feature
    // poistions.
    const prevoiusGaps = gaps.reduce((count, gap) => count + gap.length, 0); // number of previous gaps + length of current one

    // Recording the gap details
    gaps.push({
      // start of the gap: index - previous gaps + 1 because index starts from 0
      start: match.index - prevoiusGaps + 1,
      // end of the gap: index - previous gaps + length of current gap
      end: match.index - prevoiusGaps + match[0].length,
      // length of current gap
      length: match[0].length,
      // index is the index of the first '-' found in the sequence. this index value
      // is moved forward to the next match e.g. 2 and then 5 if sequence is '01-34-6'
      rawIndex: match.index,
    });
  }

  // Now that gaps positions and length are ready, we can move on to create the
  // fragments that represent the feature itself rather the gaps.
  //
  // Calculating start: if this the first fragment we are creating, we need to
  // take the start of the feature as the start of our fragment.
  // If this is not the first fragment that we are creating, we need to find the
  // end of previous gap -- where the previous gap ended in the sequence, and use
  // that point + 1 as our starting point.
  //
  // Example: sequence '01-34--78'. feature [0,8]. gaps[[2,2],[5,6]].
  // first fragment: start would be 0 which is the start of the feature.
  // second fragment: start would be 2, which is the end of first gap, + 1
  // thid fragment: start would be 6, whish is then eod of second gap, + 1
  //
  // Calculating end: the start of current gap -- remember we are creating the rectangular
  // feature that is behind the gap right ahead of it. Current gap -- in the loop, points to
  // the gap ahead.
  gaps.forEach((gapAhead, index) => {
    const lastGap = index === 0 ? gaps[0] : gaps[index - 1];

    // Check here if the feature hasn't already ended before overlapping with this gap
    // TODO is this right?
    // if (index !== 0 && end >= lastGap.end) {
    //   return;
    // }

    fragments.push({
      ...feature,
      start: index === 0 ? start : lastGap.end + 1,
      end: end < gapAhead.start ? end : gapAhead.start - 1,
    });
  });

  // Creating he last fragment after the last gap
  if (gaps.length > 0) {
    const veryLastGap = gaps[gaps.length - 1];
    // if the end position of the last gap is smaller than the feature's end position
    // TODO is thie 'if' redundant?
    if (veryLastGap.end < end) {
      fragments.push({
        ...feature,
        // Our starting point is the very end position of the very last gap
        start: veryLastGap.end + 1,
        end,
      });
    }
  }

  // console.log("--- gaps:", gaps);
  // console.log("--- frags:", fragments);

  // If no fragments were created, then simply return the original feature
  // without any modifications.
  // If fragments were created, add them to the feature and then return the
  // modified feature;
  return fragments.length === 0
    ? feature
    : {
        ...feature,
        locations: [
          {
            fragments,
          },
        ],
      };
};
