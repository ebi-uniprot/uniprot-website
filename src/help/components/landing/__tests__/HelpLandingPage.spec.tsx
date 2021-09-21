import customRender from '../../../../shared/__test-helpers__/customRender';

import HelpLandingPage from '../HelpLandingPage';

describe('HelpLandingPage', () => {
  it('should render', () => {
    const { asFragment } = customRender(<HelpLandingPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
