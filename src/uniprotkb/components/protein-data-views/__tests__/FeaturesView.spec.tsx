import customRender from '../../../../shared/__test-helpers__/customRender';

import FeaturesView from '../UniProtKBFeaturesView';

import FeaturesUIData from './__mocks__/featuresUIData';

describe('FeaturesView component', () => {
  test('it renders without crashing', () => {
    const { asFragment } = customRender(
      <FeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
