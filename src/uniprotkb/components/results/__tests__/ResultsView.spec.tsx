import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ResultsView from '../ResultsView';
import { ViewMode } from '../../../state/resultsInitialState';
import { render } from '@testing-library/react';
import { Column } from '../../../types/columnTypes';
import '../../__mocks__/mockApi';

const props = {
  columns: [Column.accession],
  handleEntrySelection: jest.fn(),
  selectedEntries: [],
};

describe('ResultsView component', () => {
  it('should render table', async () => {
    await act(async () => {
      const { asFragment } = render(
        <Router>
          <ResultsView viewMode={ViewMode.TABLE} {...props} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render cards', async () => {
    await act(async () => {
      const { asFragment } = render(
        <Router>
          <ResultsView viewMode={ViewMode.CARD} {...props} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
