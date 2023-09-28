import { sumBy } from 'lodash-es';

import { bin } from '../SequenceLengthHistogram';

const sequenceLengthCounts = [
  {
    sequenceLength: 1,
    count: 1,
  },
  {
    sequenceLength: 2,
    count: 1,
  },
  {
    sequenceLength: 3,
    count: 1,
  },
  {
    sequenceLength: 4,
    count: 1,
  },
  {
    sequenceLength: 5,
    count: 1,
  },
  {
    sequenceLength: 6,
    count: 1,
  },
];

describe('rebin', () => {
  it('should rebin into bins of size 1', () => {
    const binned = bin(sequenceLengthCounts, 1);
    expect(binned).toEqual(sequenceLengthCounts);
    expect(sumBy(binned, 'count')).toEqual(sequenceLengthCounts.length);
  });
  it('should rebin into bins of size 2', () => {
    const binned = bin(sequenceLengthCounts, 2);
    expect(binned).toEqual([
      { sequenceLength: 0, count: 1 },
      { sequenceLength: 2, count: 2 },
      { sequenceLength: 4, count: 2 },
      { sequenceLength: 6, count: 1 },
    ]);
    expect(sumBy(binned, 'count')).toEqual(sequenceLengthCounts.length);
  });
  it('should rebin into bins of size 3', () => {
    const binned = bin(sequenceLengthCounts, 3);
    expect(binned).toEqual([
      { sequenceLength: 0, count: 2 },
      { sequenceLength: 3, count: 3 },
      { sequenceLength: 6, count: 1 },
    ]);
    expect(sumBy(binned, 'count')).toEqual(sequenceLengthCounts.length);
  });
});
