import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import ResultsView from '../ResultsView';
import { ViewMode } from '../state/resultsInitialState';
import { render } from '@testing-library/react';

import data from '../../__mockData__/results.json';

describe('ResultsView component', () => {
  test('should render table', () => {
    const props = {
      viewMode: ViewMode.TABLE,
      tableColumns: ['accession'],
      selectedEntries: {},
      results: data.results,
      sort: { column: 'accession', direction: 'descend' },
      handleEntrySelection: jest.fn(),
      handleHeaderClick: jest.fn(),
      handleLoadMoreRows: jest.fn(),
      totalNumberResults: 2,
      sortColumn: null,
      sortDirection: null,
    };
    const { asFragment } = render(
      <Router>
        <ResultsView {...props} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render cards', () => {
    const props = {
      viewMode: ViewMode.CARD,
      tableColumns: ['accession'],
      selectedEntries: {},
      results: data.results,
      sort: { column: 'accession', direction: 'descend' },
      handleEntrySelection: jest.fn(),
      handleHeaderClick: jest.fn(),
      handleLoadMoreRows: jest.fn(),
      totalNumberResults: 2,
      sortColumn: null,
      sortDirection: null,
    };
    const { asFragment } = render(
      <Router>
        <ResultsView {...props} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
