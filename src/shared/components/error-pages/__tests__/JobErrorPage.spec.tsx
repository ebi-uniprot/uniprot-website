import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import JobErrorPage from '../JobErrorPage';

describe('JobErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<JobErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
