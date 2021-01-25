import ResourceNotFoundPage from '../ResourceNotFoundPage';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('ResourceNotFoundPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<ResourceNotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
