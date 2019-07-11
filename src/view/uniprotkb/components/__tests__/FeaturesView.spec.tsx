import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FeaturesView from '../FeaturesView';
import FeaturesUIDataJson from '../__mocks__/FeaturesUIData.json';

afterEach(cleanup);

describe('FeaturesView component', () => {
  test('it renders without crashing', () => {
    const { asFragment } = render(
      <FeaturesView
        features={FeaturesUIDataJson}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
