import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createEmptyClause } from '../../utils/clause';
import AdvancedSearch from '../../../query-builder/components/AdvancedSearch';
import { resetUuidV1 } from '../../../../__mocks__/uuid';
import useDataApi from '../../../shared/hooks/useDataApi';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

jest.mock('../../../shared/hooks/useDataApi');

let rendered;
let props;

useDataApi.mockImplementation(() => ({ data: [] }));

describe('AdvancedSearch shallow components', () => {
  beforeEach(() => {
    resetUuidV1();
    props = {
      dispatchAddClause: jest.fn(),
      handleAdvancedSubmitClick: jest.fn(),
      dispatchCopyQueryClausesToSearch: jest.fn(),
      dispatchSetPreSelectedClauses: jest.fn(),
      history: {
        push: jest.fn(),
      },
      clauses: [...Array(4)].map(() => createEmptyClause()),
      namespace: 'UniProtKB',
    };
    rendered = renderWithRedux(<AdvancedSearch {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
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
