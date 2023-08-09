import { render } from '@testing-library/react';

import Timeline from '../Timeline';

describe('Timeline component', () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <Timeline
        first="2000-01-01"
        last="2021-06-07"
        start="2001-03-31"
        end="2019-12-01"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
