import {
  findSequenceSegments,
  getFullAlignmentSegments,
  getNumberOfInsertions,
  getEndCoordinate,
  createGappedFeature,
} from '../sequences';
import featuresMock from '../__mocks__/features.json';
import sequenceChunkPairsMock from '../__mocks__/sequences.json';

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

  describe('getEndCoordinate', () => {
    const sequence = '123-';
    it('should exclude insertions (-) from the count', () => {
      expect(getEndCoordinate(sequence, 4)).toEqual(3);
    });
    it('should return just the index when no insertions (-) are present', () => {
      expect(getEndCoordinate(sequence, 3)).toEqual(3);
    });
  });

  describe('getNumberOfInsertions', () => {
    const sequence = '123-';
    it('should exclude insertions (-) from the count', () => {
      expect(getNumberOfInsertions(sequence, 4)).toEqual(1);
    });
    it('should return just the index when no insertions (-) are present', () => {
      expect(getNumberOfInsertions(sequence, 3)).toEqual(0);
    });
  });

  describe('createGappedFeature', () => {
    it('should return feature untouched as there are no insertions', () => {
      const sequence = '1234567890';
      const feature = {
        start: 1,
        end: 10,
      };

      expect(createGappedFeature(feature, sequence)).toEqual({
        start: 1,
        end: 10,
      });
    });

    it('should return feature after insertion gap', () => {
      const sequence = '-123456789';
      const feature = {
        start: 1,
        end: 7,
      };

      expect(createGappedFeature(feature, sequence)).toEqual({
        start: 2,
        end: 8,
      });
    });

    it('should return correct start, end and fragments', () => {
      const sequence = '1-23456789';
      const feature = {
        start: 1,
        end: 9,
      };

      expect(createGappedFeature(feature, sequence)).toEqual({
        start: 1,
        end: 10,
        locations: [
          {
            fragments: [
              { start: 1, end: 1 },
              { start: 2, end: 2, shape: 'line' },
              { start: 3, end: 10 },
            ],
          },
        ],
      });
    });

    // it('should return correct start, end and fragments', () => {
    //   const sequence = '1-23456789';
    //   const feature = {
    //     start: 3,
    //     end: 5,
    //   };

    //   expect(createGappedFeature(feature, sequence)).toEqual({
    //     start: 4,
    //     end: 6,
    //   });
    // });

    // it('should return correct start, end and fragments', () => {
    //   const sequence = {
    //     sequence: '1-34567890',
    //     start: 101,
    //     end: 109,
    //   };

    //   const feature = {
    //     start: 1,
    //     end: 116,
    //   };

    //   expect(createGappedFeature(feature, sequence)).toEqual({
    //     start: 101,
    //     end: 116,
    //     locations: [
    //       {
    //         fragments: [
    //           { start: 101, end: 101 },
    //           { start: 102, end: 102, shape: 'line' },
    //           { start: 103, end: 116 },
    //         ],
    //       },
    //     ],
    //   });
    // });

    it('should return correct start, end and fragments', () => {
      const sequence = '--123--45-';
      const feature = {
        start: 1,
        end: 5,
      };

      expect(createGappedFeature(feature, sequence)).toEqual({
        start: 3,
        end: 9,
        locations: [
          {
            fragments: [
              { start: 3, end: 5 },
              { start: 6, end: 7, shape: 'line' },
              { start: 8, end: 9 },
            ],
          },
        ],
      });
    });
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
