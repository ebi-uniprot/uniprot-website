import customRender from '../../../__test-helpers__/customRender';

import Contact from '../Contact';

describe('Contact component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<Contact />);
    expect(asFragment()).toMatchSnapshot();
  });
});
