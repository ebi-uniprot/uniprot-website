import { findSequenceSegments, getFullAlignmentSegments } from '../sequences';

describe('Tool sequences utils', () => {
  it('should find segments', () => {
    const sequences = [
      '1',
      '123',
      '12345--',
      '-2345--',
      '-2345--89-B',
      '-2345--89-B--',
    ];
    const expectedResults = [
      [[1, 1]],
      [[1, 3]],
      [[1, 5]],
      [[2, 5]],
      [
        [2, 5],
        [8, 9],
        [11, 11],
      ],
      [
        [2, 5],
        [8, 9],
        [11, 11],
      ],
    ];

    const results = sequences.map((s) => findSequenceSegments(s));
    expect(results).toEqual(expectedResults);
  });

  // TODO update the tests below / generate mockdata to cover edge cases

  // it('should work with longer query than hit', () => {
  //   const { longQueryMiddleHit } = mockData;
  //   const align = getFullAlignmentSegments(alignment);
  //   expect(align).toEqual(longQueryMiddleHit.result);
  // });

  // it('should work with shorter query than hit', () => {
  //   const { shortQueryLongHit } = mockData;
  //   const align = getFullAlignmentSegments(shortQueryLongHit.hsp, 30, 60);
  //   expect(align).toEqual(shortQueryLongHit.result);
  // });

  // it('should work with gaps', () => {
  //   const { withGaps } = mockData;
  //   const align = getFullAlignmentSegments(withGaps.hsp, 30, 60);
  //   expect(align).toEqual(withGaps.result);
  // });

  // it('should get the correct length', () => {
  //   const { longQueryMiddleHit } = mockData;
  //   const totalLength = getFullAlignmentLength(
  //     longQueryMiddleHit.hsp,
  //     3310,
  //     770
  //   );
  //   expect(totalLength).toBe(3310);
  // });

  // it('should return the right offset', () => {
  //   const { shortQueryLongHit, longQueryMiddleHit } = mockData;
  //   let offset = getOffset(longQueryMiddleHit.hsp);
  //   expect(offset).toBe(771);
  //   offset = getOffset(shortQueryLongHit.hsp);
  //   expect(offset).toBe(40);
  // });

  // it('should remove all features outside of the query/match alignment', () => {
  //   const { features } = mockData;

  //   const filtered = transformFeaturesPositions(features);
  //   expect(filtered).toHaveLength(1);
  //   for (let i = 0; i < features.length; i++) {
  //     expect(filtered[i].start).toEqual(features[i].start - 1);
  //     expect(filtered[i].end).toEqual(features[i].end - 1);
  //   }
  // });
});
