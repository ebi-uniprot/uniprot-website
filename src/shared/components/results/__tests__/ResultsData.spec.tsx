import { screen } from '@testing-library/react';

import ResultsData, { ViewMode } from '../ResultsData';

import customRender from '../../../__test-helpers__/customRender';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { UserPreferences } from '../../../contexts/UserPreferences';

import response from '../../../../uniprotkb/components/__mocks__/response';

describe('ResultsData component', () => {
  const resultsData = (viewMode: ViewMode) =>
    customRender(
      <ResultsData
        handleEntrySelection={jest.fn()}
        selectedEntries={[]}
        resultsDataObject={{
          allResults: response.data.results,
          initialLoading: false,
          progress: 1,
          hasMoreData: true,
          handleLoadMoreRows: jest.fn(),
          total: +response.headers['x-totalrecords'],
        }}
      />,
      {
        route: '/uniprotkb?query=blah',
        initialUserPreferences: {
          'view-mode': viewMode,
          'table columns for uniprotkb': [UniProtKBColumn.accession],
        } as UserPreferences,
      }
    );

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
