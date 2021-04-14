import { screen, waitFor, fireEvent, act } from '@testing-library/react';

import ResultsData, { ViewMode } from '../ResultsData';

import customRender from '../../../__test-helpers__/customRender';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { UserPreferences } from '../../../contexts/UserPreferences';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ResultsData component', () => {
  const resultsData = (viewMode: ViewMode) =>
    customRender(<ResultsData />, {
      route: '/uniprotkb?query=blah',
      initialUserPreferences: {
        'view-mode': viewMode,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      } as UserPreferences,
    });

  it('should render the table view', async () => {
    const { asFragment } = resultsData(ViewMode.TABLE);
    await screen.findByText('O00311');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the card view with the correct number of cards', async () => {
    const { asFragment } = resultsData(ViewMode.CARD);
    const geneLabels = await screen.findAllByText('Gene:');
    expect(geneLabels).toHaveLength(25);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set sorting in table view', async () => {
    const { history } = resultsData(ViewMode.TABLE);
    let columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=ascend'
      );
    });
    columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=descend'
      );
    });
    columnHeader = await screen.findByText('Entry');
    await waitFor(() => {
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?query=blah&sort=accession&dir=ascend'
      );
    });
  });

  // Testing the button, and testing the 2 views, this is probably enough
  it('should toggle card view to table', async () => {
    await act(async () => {
      resultsData(ViewMode.CARD);
      const toggle = await screen.findByTestId('table-card-toggle');
      fireEvent.click(toggle);
      const table = await screen.findByText('Entry');
      expect(table).toBeInTheDocument();
    });
  });

  it('should display no results page', async () => {
    await act(async () => {
      customRender(<ResultsData />, {
        route: '/uniprotkb?query=noresult',
      });
      const page = await screen.findByTestId('no-results-page');
      expect(page).toBeInTheDocument();
    });
  });
});
