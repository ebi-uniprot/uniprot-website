import { screen } from '@testing-library/react';

import ResultsData from '../ResultsData';

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
          'view-mode': 'table',
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
          'view-mode': 'cards',
          'table columns for uniprotkb': [UniProtKBColumn.accession],
        },
      }
    );
    const geneLabels = await screen.findAllByText('Gene:');
    expect(geneLabels).toHaveLength(25);
    expect(asFragment()).toMatchSnapshot();
  });
});
