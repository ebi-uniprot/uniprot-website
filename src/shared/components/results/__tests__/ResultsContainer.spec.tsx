import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ResultsContainer from '../ResultsContainer';

import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import '../../../../uniprotkb/components/__mocks__/mockApi';

// TODO: in this file, fix incorrect use of `act()` when wrapping everything

describe('Results component', () => {
  test('should select a facet', async () => {
    await act(async () => {
      const { history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah',
      });
      expect(history.location.search).toEqual('?query=blah');
      const unreviewedButton = await screen.findByText(
        'Unreviewed (TrEMBL) (455)'
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  test('should deselect a facet', async () => {
    await act(async () => {
      const { history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah&facets=reviewed:false',
      });
      const unreviewedButton = await screen.findByText(
        'Unreviewed (TrEMBL) (455)'
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });

  test('should toggle card view to table', async () => {
    await act(async () => {
      renderWithRedux(<ResultsContainer />, { route: '/uniprotkb?query=blah' });
      const toggle = await screen.findByTestId('table-card-toggle');
      fireEvent.click(toggle);
      const table = await screen.findByText('Entry');
      expect(table).toBeTruthy;
    });
  });

  test('should set sorting', async () => {
    const { history } = renderWithRedux(<ResultsContainer />, {
      route: '/uniprotkb?query=blah',
    });
    let columnHeader = await screen.findByText('Entry');
    act(() => {
      fireEvent.click(columnHeader);
    });
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=ascend'
    );
    columnHeader = await screen.findByText('Entry');
    act(() => {
      fireEvent.click(columnHeader);
    });
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=descend'
    );
    columnHeader = await screen.findByText('Entry');
    act(() => {
      fireEvent.click(columnHeader);
    });
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=ascend'
    );
  });

  test('should display no results page', async () => {
    await act(async () => {
      renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=noresult',
      });

      const page = await screen.findByTestId('no-results-page');

      expect(page).toBeTruthy();
    });
  });
});
