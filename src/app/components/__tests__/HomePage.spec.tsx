import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import HomePage from '../HomePage';

describe('HomePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
