import customRender from '../../../__test-helpers__/customRender';

import ErrorComponent from '../ErrorComponent';

describe('ErrorComponent', () => {
  test('should render', () => {
    const { asFragment } = customRender(<ErrorComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
