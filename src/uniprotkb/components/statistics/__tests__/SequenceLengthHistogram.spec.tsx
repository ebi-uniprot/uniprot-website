import { sum } from 'lodash-es';

import { bin } from '../SequenceLengthHistogram';

const sequenceLengthCounts = new Map([
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
]);

describe('rebin', () => {
  it('should rebin into bins of size 1', () => {
    const binned = bin(sequenceLengthCounts, 1);
    expect(binned).toEqual(sequenceLengthCounts);
    expect(sum(Array.from(binned.values()))).toEqual(sequenceLengthCounts.size);
  });
  it('should rebin into bins of size 2', () => {
    const binned = bin(sequenceLengthCounts, 2);
    expect(Array.from(binned)).toEqual([
      [0, 1],
      [2, 2],
      [4, 2],
      [6, 1],
    ]);
    expect(sum(Array.from(binned.values()))).toEqual(sequenceLengthCounts.size);
  });
  it('should rebin into bins of size 3', () => {
    const binned = bin(sequenceLengthCounts, 3);
    expect(Array.from(binned)).toEqual([
      [0, 2],
      [3, 3],
      [6, 1],
    ]);
    expect(sum(Array.from(binned.values()))).toEqual(sequenceLengthCounts.size);
  });
});
