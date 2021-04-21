import { screen } from '@testing-library/react';

import ResultsData, { ViewMode } from '../ResultsData';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import customRender from '../../../__test-helpers__/customRender';

import results from '../../../../uniprotkb/components/__mocks__/results.json';

describe('ResultsData component', () => {
  const resultsData = (viewMode: ViewMode) => {
    window.localStorage.setItem('view-mode', JSON.stringify(viewMode));
    window.localStorage.setItem(
      'table columns for uniprotkb',
      JSON.stringify([UniProtKBColumn.accession])
    );
    return customRender(
      <ResultsData
        handleEntrySelection={jest.fn()}
        selectedEntries={[]}
        resultsDataObject={{
          allResults: results.results, // TODO: fix ts error
          initialLoading: false,
          progress: 1,
          hasMoreData: true,
          handleLoadMoreRows: jest.fn(),
          total: 1000,
        }}
      />,
      {
        route: '/uniprotkb?query=blah',
      }
    );
  };

  afterEach(() => {
    localStorage.clear();
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
});
