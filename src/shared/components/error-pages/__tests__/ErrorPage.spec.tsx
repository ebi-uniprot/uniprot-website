import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ErrorPage from '../ErrorPage';

describe('ErrorPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <ErrorPage
        artwork={<img alt="" />}
        message="test message"
        data-testid="test-id"
      />
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
