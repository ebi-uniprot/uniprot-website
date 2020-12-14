import JobErrorPage from '../JobErrorPage';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('JobErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<JobErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
