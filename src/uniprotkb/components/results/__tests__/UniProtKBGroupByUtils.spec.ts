import { getPercentageLabel } from '../UniProtKBGroupByUtils';

describe('getPercentageLabel', () => {
  const testCases: [number, string][] = [
    [100, '100%'],
    [99.99, '>99%'],
    [1, '1%'],
    [0.01, '<1%'],
  ];
  test.each(testCases)(
    'should create percentage label',
    (percentage, percentageLabel) => {
      expect(getPercentageLabel(percentage)).toEqual(percentageLabel);
    }
  );
});
