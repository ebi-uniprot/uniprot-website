import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import UniProtFooter from '../UniProtFooter';

let component;

describe('HomePage component', () => {
  beforeEach(() => {
    component = renderWithRedux(<UniProtFooter />);
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });
});
