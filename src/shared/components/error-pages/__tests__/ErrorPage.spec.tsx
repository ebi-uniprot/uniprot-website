import React from 'react';
import ErrorPage from '../ErrorPage';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import ArtWork from '../svgs/error.svg';

describe('ErrorPage component', () => {
  test('should render', async () => {
    const { asFragment, queryByText } = renderWithRedux(
      <ErrorPage artwork={<ArtWork />} message="test message" testid="testid" />
    );
    expect(await queryByText('test message')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
