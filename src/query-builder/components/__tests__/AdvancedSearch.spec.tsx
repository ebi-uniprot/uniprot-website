import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createEmptyClause } from '../../utils/clause';
import AdvancedSearch from '../../../query-builder/components/AdvancedSearch';
import { resetUuidV1 } from '../../../../__mocks__/uuid';
import useDataApi from '../../../shared/hooks/useDataApi';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
import { createMemoryHistory } from 'history';

jest.mock('../../../shared/hooks/useDataApi');

let rendered;
let props;

const history = createMemoryHistory();
// TODO: actually mock the data here and check that it's rendered properly
useDataApi.mockImplementation(() => ({ data: [] }));

describe('AdvancedSearch shallow components', () => {
  beforeEach(() => {
    resetUuidV1();
    rendered = renderWithRedux(<AdvancedSearch />, { history });
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add a clause', () => {
    const { getAllByTestId, getByTestId } = rendered;
    fireEvent.click(getByTestId('advanced-search-add-field'));
    const clauses = getAllByTestId('search__clause');
    expect(clauses.length).toBe(6);
  });

  test('should remove a clause', () => {
    const { getAllByTestId } = rendered;
    fireEvent.click(getAllByTestId('clause-list-button-remove')[1]);
    const clauses = getAllByTestId('search__clause');
    expect(clauses.length).toBe(4);
  });

  test('should submit a query', () => {
    const { getByTestId } = rendered;
    fireEvent.submit(getByTestId('advanced-search-form'));
    expect(history.location.search).toBe('?query=(reviewed:true)');
  });
});
