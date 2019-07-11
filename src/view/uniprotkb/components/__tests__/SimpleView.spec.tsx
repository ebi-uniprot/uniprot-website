import React from 'react';
import { render } from '@testing-library/react';
import SimpleView from '../SimpleView';
import { MemoryRouter as Router } from 'react-router-dom';

describe('SimpleView component', () => {
  test('should render', () => {
    const { asFragment } = render(<SimpleView termValue="blah" />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('should render with link', () => {
    const { asFragment } = render(
      <Router>
        <SimpleView termValue="blah" linkTo="linkto" />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
