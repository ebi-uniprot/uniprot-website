import { render } from '@testing-library/react';

import BuscoLegend from '../BuscoLegend';

describe('BuscoLabel', () => {
  it('should render', () => {
    const { asFragment } = render(<BuscoLegend />);
    expect(asFragment()).toMatchSnapshot();
  });
});
