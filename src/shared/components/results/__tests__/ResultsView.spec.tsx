import React from 'react';
import { act } from 'react-dom/test-utils';
import ResultsView from '../ResultsView';
import { waitFor } from '@testing-library/react';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import { getSortableColumnToSortColumn } from '../../../../uniprotkb/utils/resultsUtils';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import resultFields from '../../../../uniprotkb/__mocks__/resultFields.json';
import { ViewMode } from '../ResultsContainer';

describe('ResultsView component', () => {
  const props = {
    columns: [UniProtKBColumn.accession],
    handleEntrySelection: jest.fn(),
    selectedEntries: [],
    sortableColumnToSortColumn: getSortableColumnToSortColumn(resultFields),
  };
  const renderWithProps = async (props) => {
    let rendered;
    await act(async () => {
      rendered = renderWithRedux(
        <ResultsView viewMode={ViewMode.TABLE} {...props} />
      );
    });
    return rendered;
  };

  it('should render table', async () => {
    const { asFragment, queryByText } = await renderWithProps({
      ...props,
      viewMode: ViewMode.TABLE,
    });
    await waitFor(() => expect(queryByText('O00311')).toBeTruthy());
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render cards', async () => {
    const { asFragment, queryAllByText } = await renderWithProps({
      ...props,
      viewMode: ViewMode.CARD,
    });
    await waitFor(() => expect(queryAllByText('Gene:')).toHaveLength(25));
    expect(asFragment()).toMatchSnapshot();
  });
});
