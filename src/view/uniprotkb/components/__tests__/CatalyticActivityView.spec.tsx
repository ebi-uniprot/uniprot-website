import React from 'react';
import { render } from '@testing-library/react';
import CatalyticActivityView from '../CatalyticActivityView';
import CatalyticActivityUIDataJson from '../__mocks__/CatalyticActivityUIData.json';

describe('Catalytic activity', () => {
  test('should render catalytic activity', () => {
    const { asFragment } = render(
      <CatalyticActivityView comments={CatalyticActivityUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
