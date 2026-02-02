import { type ProcessedFeature } from '../../../shared/components/views/FeaturesView';
import testData from '../__mocks__/toolTipFeatureTestData.json';
import { prepareFeatureForTooltip } from '../feature';

describe('alignment feature utils', () => {
  testData.forEach(({ description, feature, tooltipFeature }) => {
    test(description, () => {
      const prepared = prepareFeatureForTooltip(feature as ProcessedFeature);
      expect(prepared).toEqual(tooltipFeature);
    });
  });
});
