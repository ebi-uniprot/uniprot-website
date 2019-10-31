import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'core-js/stable';
import { cleanup, waitForElement, fireEvent } from '@testing-library/react';
import ResultsContainer from '../ResultsContainer';
import { act } from 'react-dom/test-utils';
import results from '../../__mockData__/results.json';
import entry from '../../__mockData__/swissprot_entry.json';
import searchInitialState from '../../search/state/searchInitialState';
import resultsInitialState, { ViewMode } from '../state/resultsInitialState';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

var mock = new MockAdapter(axios);

mock
  .onGet(/\/uniprotkb\/search/)
  .reply(200, results, { 'x-total-records': 25 });
mock.onGet(/\/uniprotkb\//).reply(200, entry);

describe('Results component', () => {
  afterEach(cleanup);

  test('should call to get results', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    await act(async () =>
      renderWithRedux(<ResultsContainer />, { route: '/uniprotkb?query=blah' })
    );
    expect(getSpy).toHaveBeenCalled();
  });

  test('should select/deselect a facet', async () => {
    await act(async () => {
      const { getByText, history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah',
      });
      let unreviewedButton = await waitForElement(() =>
        getByText('Unreviewed (TrEMBL) (455)')
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual(
        '?query=blah&facets=reviewed:false'
      );
      unreviewedButton = await waitForElement(() =>
        getByText('Unreviewed (TrEMBL) (455)')
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });

  test('should toggle card view to table', async () => {
    await act(async () => {
      const { container, getByTestId, getByText } = renderWithRedux(
        <ResultsContainer />,
        { route: '/uniprotkb?query=blah' }
      );
      const toggle = await waitForElement(() =>
        getByTestId('table-card-toggle')
      );
      expect(container.querySelector('div')).toBeNull;
      fireEvent.click(toggle);
      const table = await waitForElement(() => getByText('Entry'));
      expect(table).toBeTruthy;
    });
  });

  test('should handle selection', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    const { container, debug, getByText } = renderWithRedux(
      <ResultsContainer />,
      { initialState: state, route: '/uniprotkb?query=blah' }
    );
    const checkbox = await waitForElement(() =>
      container.querySelector('input[type=checkbox]')
    );
    // As the checkbox selection currently has no effect on the
    // UI we can't test much at the moment
    expect(checkbox.checked).toBeFalsy;
    fireEvent.click(checkbox); // de-select
    expect(checkbox.checked).toBeTruthy;
  });

  test('should set sorting', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    const { getByText, history } = renderWithRedux(<ResultsContainer />, {
      initialState: state,
      route: '/uniprotkb?query=blah',
    });
    let columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe('?query=blah&sort=accession');
    columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=ascend'
    );
    columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=descend'
    );
  });
});
