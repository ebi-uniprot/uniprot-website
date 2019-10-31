import React from 'react';
import { render } from '@testing-library/react';
import { Search } from '../SearchContainer';

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
    const { asFragment } = render(<Search {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
