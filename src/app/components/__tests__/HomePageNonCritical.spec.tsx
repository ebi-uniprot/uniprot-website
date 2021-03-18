import customRender from '../../../shared/__test-helpers__/customRender';

import HomePageNonCritical from '../HomePageNonCritical';

describe('HomePage component (non-critical part)', () => {
  test('should render', () => {
    const { asFragment } = customRender(<HomePageNonCritical />);
    expect(asFragment()).toMatchSnapshot();
  });
});
