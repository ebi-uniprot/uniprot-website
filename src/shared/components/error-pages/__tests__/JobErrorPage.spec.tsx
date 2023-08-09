import customRender from '../../../__test-helpers__/customRender';

import JobErrorPage from '../JobErrorPage';

describe('JobErrorPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<JobErrorPage message={<b>Foo</b>} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
