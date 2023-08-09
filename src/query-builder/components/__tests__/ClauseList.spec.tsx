import { render } from '@testing-library/react';

import { createEmptyClause } from '../../utils/clause';

import ClauseList from '../ClauseList';

const props = {
  clauses: [createEmptyClause(0), createEmptyClause(1)],
  searchTerms: [],
  evidences: {
    go: {
      data: [],
      isFetching: false,
    },
    annotation: {
      data: [],
      isFetching: false,
    },
  },
  handleRemoveClause: jest.fn(),
  setClauses: jest.fn(),
  removeClause: jest.fn(),
};

describe('ClauseList component', () => {
  beforeEach(() => {
    props.handleRemoveClause.mockClear();
    props.setClauses.mockClear();
    props.removeClause.mockClear();
  });

  it('should render', () => {
    const { asFragment } = render(<ClauseList {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
