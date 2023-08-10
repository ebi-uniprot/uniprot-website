import customRender from '../../../__test-helpers__/customRender';

import ServiceUnavailablePage from '../ServiceUnavailablePage';

describe('ServiceUnavailablePage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<ServiceUnavailablePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
