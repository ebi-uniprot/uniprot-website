import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ErrorPage from '../ErrorPage';

describe('ErrorPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <ErrorPage artwork={<img alt="" />} data-testid="test-id">
        test message
      </ErrorPage>
    );
    expect(screen.getByText('test message')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
