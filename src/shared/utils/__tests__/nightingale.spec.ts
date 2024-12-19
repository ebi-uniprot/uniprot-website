import { withinRange } from '../nightingale';

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
