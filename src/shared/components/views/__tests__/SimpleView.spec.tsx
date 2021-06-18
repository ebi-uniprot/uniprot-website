import { render } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import SimpleView from '../SimpleView';

describe('SimpleView component', () => {
  test('should render', () => {
    const { asFragment } = render(<SimpleView termValue="blah" />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('should render with link', () => {
    const { asFragment } = customRender(
      <SimpleView termValue="blah" linkTo="linkto" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
