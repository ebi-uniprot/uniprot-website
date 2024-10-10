import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ErrorComponent from '../ErrorComponent';

describe('ErrorPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <ErrorComponent artwork={<img alt="" />} data-testid="test-id">
        test message
      </ErrorComponent>
    );
    expect(screen.getByText('test message')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
