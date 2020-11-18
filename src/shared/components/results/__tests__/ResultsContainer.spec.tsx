import React from 'react';
import axios from 'axios';
import { cleanup, fireEvent } from '@testing-library/react';
import ResultsContainer from '../ResultsContainer';
import { act } from 'react-dom/test-utils';
import resultsInitialState, {
  ViewMode,
} from '../../../../uniprotkb/state/resultsInitialState';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';
import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('Results component', () => {
  afterEach(cleanup);

  test('should call to get results', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    await act(async () =>
      renderWithRedux(<ResultsContainer />, { route: '/uniprotkb?query=blah' })
    );
    expect(getSpy).toHaveBeenCalled();
  });

  test('should select a facet', async () => {
    await act(async () => {
      const { findByText, history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah',
      });
      expect(history.location.search).toEqual('?query=blah');
      const unreviewedButton = await findByText('Unreviewed (TrEMBL) (455)');
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  test('should deselect a facet', async () => {
    await act(async () => {
      const { findByText, history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah&facets=reviewed:false',
      });
      const unreviewedButton = await findByText('Unreviewed (TrEMBL) (455)');
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });

  test('should toggle card view to table', async () => {
    await act(async () => {
      const state = {
        results: {
          ...resultsInitialState,
          viewMode: ViewMode.TABLE,
          results: {
            data: [{}],
          },
        },
      };
      const { container, findByTestId, findByText } = renderWithRedux(
        <ResultsContainer />,
        {
          initialState: state,
          route: '/uniprotkb?query=blah',
        }
      );
      const toggle = await findByTestId('table-card-toggle');
      expect(container.querySelector('div')).toBeNull;
      fireEvent.click(toggle);
      const table = await findByText('Entry');
      expect(table).toBeTruthy;
    });
  });

  test('should set sorting', async () => {
    const state = {
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    // NOTE: not sure act() should wrap that much code
    await act(async () => {
      const { history, findByText } = renderWithRedux(<ResultsContainer />, {
        initialState: state,
        route: '/uniprotkb?query=blah',
      });
      let columnHeader = await findByText('Entry');
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=ascend'
      );
      columnHeader = await findByText('Entry');
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=descend'
      );
      columnHeader = await findByText('Entry');
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=ascend'
      );
    });
  });

  test('should display no results page', async () => {
    const state = {
      results: { ...resultsInitialState },
    };

    const { findByTestId } = renderWithRedux(<ResultsContainer />, {
      initialState: state,
      route: '/uniprotkb?query=noresult',
    });

    const page = await findByTestId('no-results-page');
    expect(page).toBeTruthy();
  });
});
