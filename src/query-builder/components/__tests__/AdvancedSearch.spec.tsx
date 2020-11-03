import React from 'react';
import { createMemoryHistory } from 'history';
import { act, fireEvent, screen, getByText } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AdvancedSearch from '../../../query-builder/components/AdvancedSearch';

import { resetUuidV1 } from '../../../../__mocks__/uuid';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
import apiUrls from '../../../shared/config/apiUrls';
import { Namespace } from '../../../shared/types/namespaces';

import searchTermData from './__mocks__/configure_search-term.json';

const mock = new MockAdapter(axios);
mock
  .onGet(apiUrls.advancedSearchTerms(Namespace.uniprotkb))
  .reply(200, searchTermData);

let rendered;

const history = createMemoryHistory();

describe('AdvancedSearch', () => {
  beforeEach(async () => {
    resetUuidV1();
    await act(async () => {
      rendered = renderWithRedux(<AdvancedSearch />, { history });
    });
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add a clause', () => {
    const { getAllByTestId, getByTestId } = rendered;
    fireEvent.click(getByTestId('advanced-search-add-field'));
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
    const reviewedLogic = getAllByTestId('advanced-search-logic-select');
    // Note this should be 1 as the first line shouldn't have one
    fireEvent.change(reviewedLogic[3], { target: { value: 'OR' } });
    // FIXME: These next lines are the ones triggering the warning even though
    // FIXME: we are indeed using act...
    act(() => {
      fireEvent.submit(getByTestId('advanced-search-form'));
    });
    expect(history.location.search).toBe('?query=(gene:zen) OR eve');
  });
});
