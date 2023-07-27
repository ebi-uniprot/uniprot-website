import { render } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import SimpleView from '../SimpleView';

describe('SimpleView component', () => {
  it('should render', () => {
    const { asFragment } = render(<SimpleView termValue="blah" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render with link', () => {
    const { asFragment } = customRender(
      <SimpleView termValue="blah" linkTo="linkto" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
