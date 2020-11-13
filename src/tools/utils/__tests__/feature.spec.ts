import { prepareFeatureForTooltip } from '../feature';
import testData from '../__mocks__/toolTipFeatureTestData.json';

describe('alignment feature utils', () => {
  testData.forEach(({ description, feature, tooltipFeature }) => {
    test(description, () => {
      const prepared = prepareFeatureForTooltip(feature);
      expect(prepared).toEqual(tooltipFeature);
    });
  });
});
