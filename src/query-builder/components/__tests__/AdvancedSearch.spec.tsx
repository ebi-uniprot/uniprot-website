import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AdvancedSearch from '../../../query-builder/components/AdvancedSearch';
import { resetUuidV1 } from '../../../../__mocks__/uuid';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
import { createMemoryHistory } from 'history';
import searchTermData from './__mocks__/configure_search-term.json';
import annotationEvidence from './__mocks__/configure_annotation_ev.json';
import goEvidence from './__mocks__/configure_go_ev.json';
import apiUrls from '../../../shared/config/apiUrls';

const mock = new MockAdapter(axios);
mock.onGet(apiUrls.advancedSearchTerms).reply(200, searchTermData);

mock.onGet(apiUrls.evidences.annotation).reply(200, annotationEvidence);

mock.onGet(apiUrls.evidences.go).reply(200, goEvidence);

let rendered;

const history = createMemoryHistory();

describe('AdvancedSearch shallow components', () => {
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
    expect(clauses.length).toBe(6);
  });

  test('should remove a clause', () => {
    const { getAllByTestId } = rendered;
    fireEvent.click(getAllByTestId('clause-list-button-remove')[1]);
    const clauses = getAllByTestId('search__clause');
    expect(clauses.length).toBe(4);
  });

  test.skip('should select field', () => {
    const { getByText, getByPlaceholderText } = rendered;
    let accession = getByText(/UniProtKB AC/);
    let searchField = getByPlaceholderText('P12345');
    expect(accession).toBeFalsy();
    expect(searchField).toBeFalsy();
    fireEvent.click(getByText(/All/));
    accession = getByText(/UniProtKB AC/);
    fireEvent.click(accession);
    searchField = getByPlaceholderText('P12345');
    expect(searchField).toBeTruthy();
  });

  test.skip('should update input value', () => {
    const action = updateInputValue('1', 'qux');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'qux' },
    });
  });

  test.skip('should update range input value', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 1, rangeTo: 100 },
    };
    const action = updateRangeValue('1', 2, true);
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 2, rangeTo: 100 },
    });
  });

  test.skip('should update evidence', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'garply' },
    };
    const action = updateEvidence('1', 'waldo');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'waldo' },
    });
  });

  test.skip('should update logic operator', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'AND',
    };
    const action = updateLogicOperator('1', 'OR');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'OR',
    });
  });

  test('should submit a query', () => {
    const { getByTestId } = rendered;
    fireEvent.submit(getByTestId('advanced-search-form'));
    expect(history.location.search).toBe('?query=(reviewed:true)');
  });
});
