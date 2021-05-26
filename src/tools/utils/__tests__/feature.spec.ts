import { prepareFeatureForTooltip } from '../feature';

import { ProcessedFeature } from '../../../shared/components/views/FeaturesView';

import testData from '../__mocks__/toolTipFeatureTestData.json';

describe('alignment feature utils', () => {
  testData.forEach(({ description, feature, tooltipFeature }) => {
    test(description, () => {
      const prepared = prepareFeatureForTooltip(feature as ProcessedFeature);
      expect(prepared).toEqual(tooltipFeature);
    });
  });
});
