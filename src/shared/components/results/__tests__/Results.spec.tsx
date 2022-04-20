import { screen, waitFor, fireEvent } from '@testing-library/react';

import Results from '../Results';

import customRender from '../../../__test-helpers__/customRender';

import '../../../../uniprotkb/components/__mocks__/mockApi';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { ViewMode } from '../../../hooks/useViewMode';

describe('Results component', () => {
  // Testing the button, and testing the 2 views, this is probably enough
  it('should toggle card view to table', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah',
      initialLocalStorage: { 'view-mode': 'cards' as ViewMode },
    });
    await screen.findAllByText('Gene:');
    const radio = await screen.findByRole('radio', { name: /table/i });
    fireEvent.click(radio);
    const table = await screen.findByText('Entry');
    expect(table).toBeInTheDocument();
  });

  it('should display no results page', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=noresults',
    });
    const page = await screen.findByTestId('no-results-page');
    expect(page).toBeInTheDocument();
  });

  it('should set sorting in table view', async () => {
    const { history } = customRender(<Results />, {
      route: '/uniprotkb?query=blah',
      initialLocalStorage: {
        'view-mode': 'table' as ViewMode,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    let columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?dir=ascend&query=blah&sort=accession'
      );
    });
    columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?dir=descend&query=blah&sort=accession'
      );
    });
    columnHeader = await screen.findByText('Entry');
    await waitFor(() => {
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?dir=ascend&query=blah&sort=accession'
      );
    });
  });

  it('should show card view if URL has view=cards as well as fields', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah&view=cards&fields=accession,id',
      initialLocalStorage: {
        'view-mode': 'table' as ViewMode,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    const cards = await screen.findAllByText('Gene:');
    expect(cards).not.toHaveLength(0);
  });

  it('should show table view if URL has no view specified but has fields', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah&fields=accession,id',
      initialLocalStorage: {
        'view-mode': 'cards' as ViewMode,
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    const table = await screen.findByText('Entry');
    expect(table).toBeInTheDocument();
  });
});
