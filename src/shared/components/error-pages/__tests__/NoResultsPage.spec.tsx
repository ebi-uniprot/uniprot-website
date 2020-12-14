import NoResultsPage from '../NoResultsPage';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('NoResultsPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<NoResultsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
