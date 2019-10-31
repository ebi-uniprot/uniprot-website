import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClauseList from '../ClauseList';
import { createEmptyClause } from '../utils/clause';
import { resetUuidV1 } from '../../../__mocks__/uuid';

let rendered;
let props;

describe('ClauseList component', () => {
  resetUuidV1();
  beforeEach(() => {
    props = {
      clauses: [createEmptyClause()],
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

  test('should remove a clause', () => {
    const { getByTestId } = rendered;
    fireEvent.click(getByTestId('clause-list-button-remove'));
    expect(props.handleRemoveClause).toHaveBeenCalled();
  });
});
