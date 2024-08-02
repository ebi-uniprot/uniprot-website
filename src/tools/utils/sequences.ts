import { getColorByType } from '@nightingale-elements/nightingale-track/dist/nightingale-track';
import { MSAInput } from '../types/alignment';
import { FeatureDatum } from '../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { ProcessedFeature } from '../../shared/components/views/FeaturesView';

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
    return [
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
    ];
  });
};

export const getNumberOfInsertions = (sequence: string, endPosition: number) =>
  (sequence.slice(0, endPosition).match(/-/g) || []).length;

export const getEndCoordinate = (sequence: string, endPosition: number) =>
  endPosition - getNumberOfInsertions(sequence, endPosition);

// Jie has said that if it is unknown, you can ignore value
// These erroneous features are temporary and will eventually be removed
export const removeFeaturesWithUnknownModifier = (
  features: FeatureDatum[] = []
) =>
  features
    .filter(
      ({ location: { start, end } }) =>
        start.modifier !== 'UNKNOWN' && end.modifier !== 'UNKNOWN'
    )
    .filter(Boolean);

export const createGappedFeature = (
  feature: ProcessedFeature,
  sequence: string,
  from: number
) => {
  /*
  input: feature and sequence are both 1-based
  */

  const BLOCK = /(?<insertion>[-]+)|(?<protein>[^-]+)/g;

  let proteinIndex = from;
  const fragments: { start: number; end: number; shape?: 'line' }[] = [];
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = BLOCK.exec(sequence)) !== null) {
    if (match?.groups?.protein) {
      if (
        proteinIndex + match[0].length >= feature.start &&
        proteinIndex <= feature.end
      ) {
        fragments.push({
          start: match.index + 1 + Math.max(0, feature.start - proteinIndex),
          end:
            match.index +
            Math.min(match[0].length, feature.end - proteinIndex + 1),
        });
      }
      proteinIndex += match[0].length;
    } else if (proteinIndex > feature.start && proteinIndex <= feature.end) {
      fragments.push({
        start: match.index + 1,
        end: match.index + match[0].length,
        shape: 'line',
      });
    }
  }
  if (!fragments.length) {
    // At this point the feature start & end must be before the BLAST match's from.
    return;
  }

  const gappedFeature = {
    ...feature,
    start: fragments[0].start,
    end: fragments[fragments.length - 1]?.end,
  };

  if (fragments.length > 1) {
    gappedFeature.locations = [{ fragments }];
  }
  // eslint-disable-next-line consistent-return
  return gappedFeature;
};

export const findSequenceFeature = (
  accession: string,
  alignment: MSAInput[]
) => {
  for (const sequence of alignment) {
    if (sequence?.features) {
      const foundFeature = sequence.features.find(
        (feature) => feature.accession === accession
      );
      if (foundFeature) {
        return foundFeature;
      }
    }
  }
  return null;
};

export type MSAFeature = {
  residues: { from: number; to: number };
  sequences: { from: number; to: number };
  id: string;
  borderColor: string;
  fillColor: string;
  mouseOverFillColor: string;
  mouseOverBorderColor: string;
};

export const getMSAFeature = (
  feature: ProcessedFeature,
  sequence: string,
  sequenceIndex: number,
  from: number
): MSAFeature | null => {
  const gappedFeature = createGappedFeature(feature, sequence, from);
  if (!gappedFeature) {
    return null;
  }
  const borderColor = getColorByType(gappedFeature.type);
  return {
    residues: { from: gappedFeature.start, to: gappedFeature.end },
    sequences: { from: sequenceIndex, to: sequenceIndex },
    id: feature.accession,
    borderColor,
    fillColor: 'transparent',
    mouseOverFillColor: 'transparent',
    mouseOverBorderColor: borderColor,
  };
};
