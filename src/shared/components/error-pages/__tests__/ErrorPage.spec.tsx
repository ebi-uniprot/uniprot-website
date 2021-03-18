import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ErrorPage from '../ErrorPage';

import ArtWork from '../svgs/error.svg';

describe('ErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = customRender(
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
