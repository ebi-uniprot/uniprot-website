import customRender from '../../../__test-helpers__/customRender';

import JobErrorPage from '../JobErrorPage';

describe('JobErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = customRender(<JobErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
