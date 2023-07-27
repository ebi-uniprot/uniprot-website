import { getPercentageLabel } from '../UniProtKBGroupByUtils';

describe('getPercentageLabel', () => {
  const testCases: [number, string][] = [
    [100, '100%'],
    [99.99, '≈100%'],
    [1, '1%'],
    [0.01, '≈0%'],
  ];
  test.each(testCases)(
    'should create percentage label',
    (percentage, percentageLabel) => {
      expect(getPercentageLabel(percentage)).toEqual(percentageLabel);
    }
  );
});
