import ServiceUnavailablePage from '../ServiceUnavailablePage';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('ServiceUnavailablePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<ServiceUnavailablePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
