import { createMemoryHistory } from 'history';
import { act, fireEvent, screen, getByText } from '@testing-library/react';

import QueryBuilder from '../QueryBuilder';

import { resetUuidV1 } from '../../../../__mocks__/uuid';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
import apiUrls from '../../../shared/config/apiUrls';
import { Namespace } from '../../../shared/types/namespaces';
import searchTermData from './__mocks__/configure_search-term.json';

import useDataApi from '../../../shared/hooks/useDataApi';
jest.mock('../../../shared/hooks/useDataApi');

// const mock = useDataApi;
// mock
//   .onGet(apiUrls.queryBuilderTerms(Namespace.uniprotkb))
//   .reply(200, searchTermData);

let rendered;

const history = createMemoryHistory();

describe('QueryBuilder', () => {
  beforeEach(async () => {
    resetUuidV1();
    useDataApi.mockReturnValue({
      data: searchTermData,
    });

    await act(async () => {
      rendered = renderWithRedux(<QueryBuilder />, { history });
    });
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add a clause', () => {
    const { getAllByTestId, getByTestId } = rendered;
    fireEvent.click(getByTestId('query-builder-add-field'));
    const clauses = getAllByTestId('search__clause');
    expect(clauses.length).toBe(5);
  });

  test('should remove a clause', () => {
    const { getAllByTestId } = rendered;
    fireEvent.click(getAllByTestId('clause-list-button-remove')[1]);
    const clauses = getAllByTestId('search__clause');
    expect(clauses.length).toBe(3);
  });

  test('should select field', () => {
    let entryNameField = screen.queryByPlaceholderText('P53_HUMAN');
    expect(entryNameField).toBeFalsy();
    const dropdownButton = screen.getByText(/All/, {
      selector: '.button.dropdown',
    });
    const clause = dropdownButton.closest('[data-testid="search__clause"]');
    fireEvent.click(dropdownButton);
    let entryNameFieldOption = getByText(clause, /Entry Name \[ID\]/);
    fireEvent.click(entryNameFieldOption);
    entryNameField = screen.queryByPlaceholderText('P53_HUMAN');
    expect(entryNameField).toBeTruthy();
  });

  test('should submit a simple query', () => {
    const { getByTestId, getAllByTestId, getByPlaceholderText } = rendered;
    const input = getByPlaceholderText(/ydj1/);
    fireEvent.change(input, { target: { value: 'zen' } });
    const all = getByPlaceholderText(/a4_human/);
    fireEvent.change(all, { target: { value: 'eve' } });
    const reviewedLogic = getAllByTestId('query-builder-logic-select');
    // Note this should be 1 as the first line shouldn't have one
    fireEvent.change(reviewedLogic[3], { target: { value: 'OR' } });
    // FIXME: These next lines are the ones triggering the warning even though
    // FIXME: we are indeed using act...
    act(() => {
      fireEvent.submit(getByTestId('query-builder-form'));
    });
    expect(history.location.search).toBe('?query=(gene:zen) OR eve');
  });
});
