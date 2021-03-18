import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import Download, { getPreviewFileFormat } from '../Download';

import { SearchResultsLocations } from '../../../../app/config/urls';

import { FileFormat } from '../../../types/resultsDownload';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../../types/namespaces';

import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('getPreviewFileFormat', () => {
  test('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('Download component', () => {
  const namespace = Namespace.uniprotkb;
  const query = 'nod2';
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  const onCloseMock = jest.fn();
  beforeEach(() => {
    customRender(
      <Download
        query={query}
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
    jest.resetAllMocks();
  });

  test('should call onClose when cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onClose and download link have href with JSON format when format is selected and Download button is clicked', () => {
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });
    const downloadLink = screen.getAllByText('Download')[1];
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(expect.stringContaining('format=json'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onClose and download link to have href without compressed=true when selected false in the form and Download button is clicked', () => {
    fireEvent.click(screen.getByLabelText('No'));
    const downloadLink = screen.getAllByText('Download')[1];
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(
      expect.not.stringContaining('compressed')
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should handle preview button click', async () => {
    const previewButton = screen.getByText('Preview 10');
    fireEvent.click(previewButton);
    const preview = await screen.findByTestId('download-preview');
    expect(preview.textContent).toEqual(mockFasta);
  });

  test.each([
    [FileFormat.excel, true],
    [FileFormat.xml, false],
    [FileFormat.tsv, true],
  ])(
    'should show column selection component when %s file type is selected and otherwise hide it',
    (value, columnSelect) => {
      const formatSelect = screen.getByTestId('file-format-select');
      fireEvent.change(formatSelect, { target: { value } });
      const customise = screen.queryByText('Customize data');
      if (columnSelect) {
        expect(customise).toBeInTheDocument();
      } else {
        expect(customise).not.toBeInTheDocument();
      }
    }
  );

  test('should change Preview button text when Download selected radio is selected', () => {
    fireEvent.click(
      screen.getByLabelText(`Download selected (${selectedEntries.length})`)
    );
    expect(screen.getByText(`Preview ${selectedEntries.length}`)).toBeTruthy();
  });
});
