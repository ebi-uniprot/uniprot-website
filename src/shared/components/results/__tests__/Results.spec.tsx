import { screen, waitFor, fireEvent } from '@testing-library/react';

import Results from '../Results';

import customRender from '../../../__test-helpers__/customRender';

import '../../../../uniprotkb/components/__mocks__/mockApi';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { ViewMode } from '../ResultsData';

describe('Results component', () => {
  beforeEach(() => {
    window.localStorage.setItem('view-mode', JSON.stringify(ViewMode.CARD));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  // Testing the button, and testing the 2 views, this is probably enough
  it('should toggle card view to table', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah',
    });
    await screen.findAllByText('Gene:');
    const toggle = await screen.findByTestId('table-card-toggle');
    fireEvent.click(toggle);
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
    window.localStorage.setItem('view-mode', JSON.stringify(ViewMode.TABLE));
    window.localStorage.setItem(
      'table columns for uniprotkb',
      JSON.stringify([UniProtKBColumn.accession])
    );
    const { history } = customRender(<Results />, {
      route: '/uniprotkb?query=blah',
    });
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
});
