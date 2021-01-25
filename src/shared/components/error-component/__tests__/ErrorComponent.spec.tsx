import { render } from '@testing-library/react';

import ErrorComponent from '../ErrorComponent';

describe('ErrorComponent', () => {
  test('should render', () => {
    const { asFragment } = render(<ErrorComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
