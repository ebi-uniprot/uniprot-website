import { ProcessedFeature } from '../../components/views/FeaturesView';
import {
  getZoomedInRange,
  linearTimed,
  rangeTimed,
  withinRange,
  getTargetRange,
} from '../nightingale';

describe('withinRange', () => {
  const testCases: [number, number, number, number, boolean][] = [
    // f0, f1, n0, n1, expected
    [1, 4, 2, 3, true], //  f0 n0 n1 f1
    [1, 3, 2, 4, true], //  f0 n0 f1 n1
    [2, 3, 1, 4, true], //  n0 f0 f1 n1
    [3, 4, 1, 2, false], // n0 n1 f0 f1
    [1, 2, 3, 4, false], // f0 f1 n0 n1
    [1, 2, 1, 2, true], //  f0=n0 f1=n1
    [1, 2, 2, 3, true], //  f0 f1=n0 n1
    [2, 3, 1, 2, true], //  n0 n1=f0 f1
  ];

  test.each(testCases)(
    'should return feature %s-%s is within range of navigation %s-%s as %s',
    (featureStart, featureEnd, nightingaleStart, nightingaleEnd, expected) => {
      expect(
        withinRange(featureStart, featureEnd, {
          'display-start': nightingaleStart,
          'display-end': nightingaleEnd,
        })
      ).toEqual(expected);
    }
  );
});

describe('getZoomedInRange', () => {
  const sequenceLength = 100;
  const testCases = [
    // description, features, range
    ['start', [{ start: 1 }, { start: 25 }], [1, 30]],
    ['end', [{ start: 100 }], [71, 100]],
    ['near start', [{ start: 7 }, { start: 25 }], [2, 31]],
    ['near end', [{ start: 90 }], [71, 100]],
    ['middle', [{ start: 50 }, { start: 90 }], [45, 74]],
  ];
  test.each(testCases)(
    'should handle feature that is %s of sequence',
    (_, features, range) => {
      expect(
        getZoomedInRange(features as ProcessedFeature[], sequenceLength)
      ).toEqual({
        'display-start': range[0],
        'display-end': range[1],
      });
    }
  );
});

describe('linearTimed', () => {
  it('should yield the expected sequence for multiple steps', async () => {
    const start = 0;
    const end = 10;
    const time = 1000; // not actually used
    const steps = 5;
    const expected = [2, 4, 6, 8, 10];

    const result: number[] = [];
    for await (const value of linearTimed(start, end, time, steps)) {
      result.push(value);
    }

    expect(result).toEqual(expected);
  });

  it('should yield only the final value when steps is 1', async () => {
    const start = 0;
    const end = 10;
    const time = 1000; // not actually used
    const steps = 1;
    // When steps === 1, the loop body is skipped and only end is yielded.
    const expected = [10];

    const result: number[] = [];
    for await (const value of linearTimed(start, end, time, steps)) {
      result.push(value);
    }

    expect(result).toEqual(expected);
  });
});

describe('rangeTimed', () => {
  it('should yield correctly interpolated coordinates from [0,0] to [10,20]', async () => {
    const start: [number, number] = [0, 0];
    const end: [number, number] = [10, 20];

    const expected: [number, number][] = [
      [1, 2],
      [2, 4],
      [3, 6],
      [4, 8],
      [5, 10],
      [6, 12],
      [7, 14],
      [8, 16],
      [9, 18],
      [10, 20],
    ];

    const results: [number, number][] = [];
    for await (const result of rangeTimed(start, end)) {
      results.push(result);
    }

    expect(results.length).toBe(expected.length);

    for (const [index, result] of results.entries()) {
      expect(result[0]).toBeCloseTo(expected[index][0]);
      expect(result[1]).toBeCloseTo(expected[index][1]);
    }
  });
});

describe('getTargetRange', () => {
  /*
  featureProportion = 1/3;
  const featureLength = featureRange[1] - featureRange[0]

  */
  const sequenceLength = 1000;
  const testCases = [
    [
      [1, 10], // Feature start/end
      [1, 29], // Expected nightingale range
    ],
    [
      [1, 1000],
      [1, 1000],
    ],
    [
      [10, 110],
      [1, 211],
    ],
    [
      [200, 800],
      [1, 1000],
    ],
    [
      [500, 550],
      [449, 601],
    ],
    [
      [999, 999],
      [956, 1000],
    ],
  ];
  test.each(testCases)(
    'for feature with start/end: %s compute target range %s',
    (featureRange, targetRange) => {
      expect(
        getTargetRange(
          'ZOOM',
          [0, 0],
          featureRange as [number, number],
          sequenceLength
        )
      ).toEqual(targetRange);
    }
  );
});
