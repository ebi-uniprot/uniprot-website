import { screen, waitFor } from '@testing-library/react';

import ResultsData from '../ResultsData';
import { ViewMode } from '../../../hooks/useViewMode';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import customRender from '../../../__test-helpers__/customRender';

import results from '../../../../uniprotkb/components/__mocks__/results';

describe('ResultsData component', () => {
  it('should render the table view', async () => {
    const { asFragment } = customRender(
      <ResultsData
        setSelectedItemFromEvent={jest.fn()}
        resultsDataObject={{
          allResults: results.results,
          initialLoading: false,
          progress: 1,
          hasMoreData: true,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      {
        route: '/uniprotkb?query=blah',
        initialLocalStorage: {
          'view-mode': 'table' as ViewMode,
          'table columns for uniprotkb': [UniProtKBColumn.accession],
        },
      }
    );
    await screen.findByText('P35575');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the card view with the correct number of cards', async () => {
    const { asFragment } = customRender(
      <ResultsData
        setSelectedItemFromEvent={jest.fn()}
        resultsDataObject={{
          allResults: results.results,
          initialLoading: false,
          progress: 1,
          hasMoreData: true,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      {
        route: '/uniprotkb?query=blah',
        initialLocalStorage: {
          'view-mode': 'card' as ViewMode,
          'table columns for uniprotkb': [UniProtKBColumn.accession],
        },
      }
    );
    const geneLabels = await screen.findAllByText('Gene:');
    expect(geneLabels).toHaveLength(25);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect to the entry page when query matches the accession of the only result', async () => {
    const singleResult = results.results[0];
    const { history } = customRender(
      <ResultsData
        setSelectedItemFromEvent={jest.fn()}
        resultsDataObject={{
          allResults: [singleResult],
          initialLoading: false,
          progress: 1,
          hasMoreData: false,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      { route: `/uniprotkb?query=${singleResult.primaryAccession}` }
    );
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/uniprotkb/${singleResult.primaryAccession}`
      )
    );
  });

  it('should redirect to the entry page when query matches the id of the only result', async () => {
    const singleResult = results.results[0];
    const { history } = customRender(
      <ResultsData
        setSelectedItemFromEvent={jest.fn()}
        resultsDataObject={{
          allResults: [singleResult],
          initialLoading: false,
          progress: 1,
          hasMoreData: false,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      { route: `/uniprotkb?query=${singleResult.uniProtkbId}` }
    );
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/uniprotkb/${singleResult.primaryAccession}`
      )
    );
  });

  it('should redirect to the entry page when "?direct" is specified', async () => {
    const singleResult = results.results[0];
    const { history } = customRender(
      <ResultsData
        setSelectedItemFromEvent={jest.fn()}
        resultsDataObject={{
          allResults: [singleResult],
          initialLoading: false,
          progress: 1,
          hasMoreData: false,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      { route: `/uniprotkb?direct` }
    );
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/uniprotkb/${singleResult.primaryAccession}`
      )
    );
  });
});
