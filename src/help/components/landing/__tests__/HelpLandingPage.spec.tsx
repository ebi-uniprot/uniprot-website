import customRender from '../../../../shared/__test-helpers__/customRender';

import HelpLandingPage from '../HelpLandingPage';

jest.mock(
  '../../../../shared/components/error-component/ErrorBoundary',
  () => ({
    __esModule: true,
    default: () => '{{ ErrorBoundary }}',
  })
);

describe('HelpLandingPage', () => {
  it('should render', async () => {
    const { asFragment } = customRender(<HelpLandingPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
