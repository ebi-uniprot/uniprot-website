import { render } from '@testing-library/react';

import FeaturesView from '../UniProtKBFeaturesView';

import FeaturesUIData from './__mocks__/featuresUIData';

describe('FeaturesView component', () => {
  test('it renders without crashing', () => {
    const { asFragment } = render(
      <FeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
