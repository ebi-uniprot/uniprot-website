import customRender from '../../../../shared/__test-helpers__/customRender';

import HomePageNonCritical from '../NonCritical';

describe('non-critical HomePage component', () => {
  test('should render', () => {
    const { asFragment } = customRender(<HomePageNonCritical />);
    expect(asFragment()).toMatchSnapshot();
  });
});
