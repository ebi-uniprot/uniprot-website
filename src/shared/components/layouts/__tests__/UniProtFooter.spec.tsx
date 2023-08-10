import customRender from '../../../__test-helpers__/customRender';

import UniProtFooter from '../UniProtFooter';

describe('HomePage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<UniProtFooter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
