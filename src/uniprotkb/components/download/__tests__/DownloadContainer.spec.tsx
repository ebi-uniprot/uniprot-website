import React from 'react';
import DownloadContainer, { getPreviewFileFormat } from '../DownloadContainer';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import initialState from '../../../../app/state/rootInitialState';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import { FileFormat } from '../../../types/resultsTypes';
import mockFasta from '../../__mocks__/fasta.json';
import '../../__mocks__/mockApi';
import '@testing-library/jest-dom/extend-expect';

describe('getPreviewFileFormat', () => {
  test('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('DownloadContainer component', () => {
  let renderedWithRedux;

  const onCloseMock = jest.fn();

  beforeEach(() => {
    renderedWithRedux = renderWithRedux(
      <DownloadContainer
        onClose={onCloseMock}
        query="nod2"
        selectedFacets={[]}
        selectedEntries={['Q9HC29', 'O43353', 'Q3KP66']}
        totalNumberResults={10}
      />,
      {
        initialState: {
          ...initialState,
          results: {
            ...initialState.results,
            totalNumberResults: 1000,
          },
        },
      }
    );
  });

  test('should go back and not call updateTableColumns action when cancel button is pressed', () => {
    const { getByText } = renderedWithRedux;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should handle download button by opening new tab and then going back', () => {
    const { getAllByText } = renderedWithRedux;
    const downloadButton = getAllByText('Download')[1];
    fireEvent.click(downloadButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should handle preview button click', async () => {
    const { getByText, findByTestId } = renderedWithRedux;
    const previewButton = getByText('Preview 10');
    fireEvent.click(previewButton);
    const preview = await findByTestId('download-preview');
    expect(preview.textContent).toEqual(mockFasta);
  });

  test('should  show column selection component when excel or tsv file type is selected and otherwise hide it', async () => {
    const { getByTestId, findByText } = renderedWithRedux;
    const formatSelect = getByTestId('file-format-select');
    [
      [FileFormat.excel, true],
      [FileFormat.xml, false],
      [FileFormat.tsv, true],
    ].forEach(async (value, columnSelect) => {
      fireEvent.change(formatSelect, { target: { value } });
      const customise = await findByText('Customize data');
      const expectCustomise = expect(customise);
      columnSelect
        ? expectCustomise.toBeInTheDocument()
        : expectCustomise.not.toBeInTheDocument();
    });
  });
});
