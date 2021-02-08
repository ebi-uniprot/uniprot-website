import { render } from '@testing-library/react';

import BuscoLabel from '../BuscoLabel';

describe('BuscoLabel', () => {
  it('should render', () => {
    const { asFragment } = render(<BuscoLabel />);
    expect(asFragment()).toMatchSnapshot();
  });
});
