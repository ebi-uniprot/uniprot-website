import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import ServiceUnavailablePage from '../ServiceUnavailablePage';

describe('ServiceUnavailablePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<ServiceUnavailablePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
