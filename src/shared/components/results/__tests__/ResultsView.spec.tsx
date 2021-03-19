import { screen, waitFor, fireEvent, act } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ResultsView from '../ResultsView';

import { getSortableColumnToSortColumn } from '../../../../uniprotkb/utils/resultsUtils';

import '../../../../uniprotkb/components/__mocks__/mockApi';
import resultFields from '../../../../uniprotkb/__mocks__/resultFields.json';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { UserPreferences } from '../../../contexts/UserPreferences';
import { ViewMode } from '../ResultsContainer';

describe('ResultsView component', () => {
  const props = {
    handleEntrySelection: jest.fn(),
    selectedEntries: [],
    sortableColumnToSortColumn: getSortableColumnToSortColumn(resultFields),
  };

  it('should render table', async () => {
    const { asFragment } = customRender(<ResultsView {...props} />, {
      initialUserPreferences: {
        'view-mode': ViewMode.TABLE,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      } as UserPreferences,
    });
    await waitFor(() =>
      expect(screen.queryByText('O00311')).toBeInTheDocument()
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should set sorting', async () => {
    const { history } = customRender(<ResultsView {...props} />, {
      initialUserPreferences: {
        'view-mode': ViewMode.TABLE,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      } as UserPreferences,
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

  it('should render cards', async () => {
    const { asFragment } = customRender(<ResultsView {...props} />, {
      initialUserPreferences: {
        'view-mode': ViewMode.CARD,
      } as UserPreferences,
    });
    await waitFor(() =>
      expect(screen.queryAllByText('Gene:')).toHaveLength(25)
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
