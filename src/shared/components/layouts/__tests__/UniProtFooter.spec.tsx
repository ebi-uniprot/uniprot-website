import customRender from '../../../__test-helpers__/customRender';

import UniProtFooter from '../UniProtFooter';

let component;

describe('HomePage component', () => {
  beforeEach(() => {
    component = customRender(<UniProtFooter />);
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });
});
