import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import HomePageNonCritical from '../HomePageNonCritical';

describe('HomePage component (non-critical part)', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<HomePageNonCritical />);
    expect(asFragment()).toMatchSnapshot();
  });
});
