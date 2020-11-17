import React from 'react';
import { act } from 'react-dom/test-utils';
import ResultsView from '../ResultsView';
import { waitFor } from '@testing-library/react';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { ViewMode } from '../../../../uniprotkb/state/resultsInitialState';

describe('ResultsView component', () => {
  const props = {
    columns: [UniProtKBColumn.accession],
    handleEntrySelection: jest.fn(),
    selectedEntries: [],
  };
  const renderWithProps = async (props) => {
    let rendered;
    await act(async () => {
      rendered = renderWithRedux(
        <div data-loader-scroll="sidebar-content">
          <ResultsView viewMode={ViewMode.TABLE} {...props} />
        </div>
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
