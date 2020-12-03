import React from 'react';
import { fireEvent } from '@testing-library/react';
import Download, { getPreviewFileFormat } from '../Download';
import renderWithRouter from '../../../__test-helpers__/RenderWithRouter';
import { FileFormat } from '../../../types/resultsDownload';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';
import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import * as utils from '../../../utils/utils';

describe('getPreviewFileFormat', () => {
  test('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('Download component', () => {
  let rendered;
  const namespace = Namespace.uniprotkb;
  const query = 'nod2';
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  const onCloseMock = jest.fn();
  let downloadFileInNewTab;

  beforeEach(() => {
    downloadFileInNewTab = jest.spyOn(utils, 'downloadFileInNewTab');
    rendered = renderWithRouter(
      <Download
        query={query}
        selectedFacets={[]}
        selectedColumns={[
          UniProtKBColumn.accession,
          UniProtKBColumn.reviewed,
          UniProtKBColumn.id,
        ]}
        selectedEntries={selectedEntries}
        totalNumberResults={10}
        onClose={onCloseMock}
      />,
      {
        route: SearchResultsLocations[namespace],
      }
    );
  });

  afterEach(() => {
    downloadFileInNewTab.mockRestore();
  });

  test('should call onClose when cancel button is clicked', () => {
    const { getByText } = rendered;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onClose and downloadFileInNewTab with JSON format when format is selected and Download button is clicked', () => {
    const { getAllByText, getByTestId } = rendered;
    const formatSelect = getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });
    fireEvent.click(getAllByText('Download')[1]);
    expect(downloadFileInNewTab).toHaveBeenCalledWith(
      expect.stringContaining('format=json')
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onClose and downloadFileInNewTab without compressed=true when selected false in the form and Download button is clicked', () => {
    const { getAllByText, getByLabelText } = rendered;
    fireEvent.click(getByLabelText('No'));
    fireEvent.click(getAllByText('Download')[1]);
    expect(downloadFileInNewTab).toHaveBeenCalledWith(
      expect.not.stringContaining('compressed')
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should handle preview button click', async () => {
    const { getByText, findByTestId } = rendered;
    const previewButton = getByText('Preview 10');
    fireEvent.click(previewButton);
    const preview = await findByTestId('download-preview');
    expect(preview.textContent).toEqual(mockFasta);
  });

  test('should show column selection component when excel or tsv file type is selected and otherwise hide it', async () => {
    const { getByTestId, findByText } = rendered;
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

  test('should change Preview button text when Download selected radio is selected', () => {
    const { getByLabelText, getByText } = rendered;
    fireEvent.click(
      getByLabelText(`Download selected (${selectedEntries.length})`)
    );
    expect(getByText(`Preview ${selectedEntries.length}`)).toBeTruthy();
  });
});
