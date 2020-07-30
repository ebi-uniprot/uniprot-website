import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createEmptyClause } from '../../../utils/clause';
import AdvancedSearch from '../AdvancedSearch';
import { resetUuidV1 } from '../../../../../__mocks__/uuid';

let rendered;
let props;

describe('AdvancedSearch shallow components', () => {
  beforeEach(() => {
    resetUuidV1();
    props = {
      dispatchAddClause: jest.fn(),
      handleAdvancedSubmitClick: jest.fn(),
      dispatchFetchSearchTermsIfNeeded: jest.fn(),
      dispatchfetchEvidencesIfNeeded: jest.fn(),
      dispatchCopyQueryClausesToSearch: jest.fn(),
      dispatchSetPreSelectedClauses: jest.fn(),
      history: {
        push: jest.fn(),
      },
      clauses: [...Array(4)].map(() => createEmptyClause()),
      namespace: 'UniProtKB',
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
    };
    rendered = render(<AdvancedSearch {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call to fetch search terms', () => {
    expect(props.dispatchFetchSearchTermsIfNeeded).toHaveBeenCalled();
  });

  test('should call to fetch evidences', () => {
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith('go');
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith(
      'annotation'
    );
  });

  test('should add field rows', () => {
    const { getByTestId } = rendered;
    fireEvent.click(getByTestId('advanced-search-add-field'));
    expect(props.dispatchAddClause).toHaveBeenCalled();
  });

  test('should submit a query', () => {
    const { getByTestId } = rendered;
    fireEvent.submit(getByTestId('advanced-search-form'));
    expect(props.handleAdvancedSubmitClick).toHaveBeenCalled();
  });
});
