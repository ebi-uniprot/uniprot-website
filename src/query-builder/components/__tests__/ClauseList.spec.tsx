import { render } from '@testing-library/react';

import { createEmptyClause } from '../../utils/clause';

import ClauseList from '../ClauseList';

let rendered;
let props;

describe('ClauseList component', () => {
  beforeEach(() => {
    props = {
      clauses: [createEmptyClause(0)],
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
    };
    rendered = render(<ClauseList {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
