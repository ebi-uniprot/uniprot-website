import { screen } from '@testing-library/react';

import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import ErrorPage from '../ErrorPage';

import ArtWork from '../svgs/error.svg';

describe('ErrorPage component', () => {
  test('should render', async () => {
    const { asFragment } = renderWithRedux(
      <ErrorPage
        artwork={<ArtWork />}
        message="test message"
        data-testid="test-id"
      />
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
