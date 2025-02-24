import { ProcessedFeature } from '../../components/views/FeaturesView';
import { getZoomedInRange, withinRange } from '../nightingale';

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
