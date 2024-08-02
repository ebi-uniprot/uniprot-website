import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import UniProtKBFeaturesView from '../UniProtKBFeaturesView';

import FeaturesUIData from './__mocks__/featuresUIData';

describe('FeaturesView component', () => {
  it('should render without crashing', async () => {
    const { asFragment } = customRender(
      <UniProtKBFeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    await screen.findByText('Features');
    expect(asFragment()).toMatchSnapshot();
  });
});
