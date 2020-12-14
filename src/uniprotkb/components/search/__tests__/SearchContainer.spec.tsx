import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import Search from '../SearchContainer';

const props = {
  dispatchCopyQueryClausesToSearch: jest.fn(),
  location: {
    search: '',
  },
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
};

describe('Search shallow components', () => {
  test('should render', () => {
    const { asFragment } = renderWithRouter(<Search {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
