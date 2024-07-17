import customRender from '../../../__test-helpers__/customRender';

import ServiceUnavailable from '../ServiceUnavailable';

describe('ServiceUnavailablePage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<ServiceUnavailable />);
    expect(asFragment()).toMatchSnapshot();
  });
});
