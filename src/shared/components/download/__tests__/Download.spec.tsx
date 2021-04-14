import { fireEvent, screen, waitFor } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import Download, { getPreviewFileFormat } from '../Download';

import { FileFormat } from '../../../types/resultsDownload';
import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';

import '../../../../uniprotkb/components/__mocks__/mockApi';

const initialColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.geneNames,
];

describe('getPreviewFileFormat', () => {
  it('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  it('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('Download component', () => {
  const namespace = Namespace.uniprotkb;
  const query = 'nod2';
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  let onCloseMock;

  beforeEach(() => {
    onCloseMock = jest.fn();

    customRender(
      <Download
        query={query}
        selectedEntries={selectedEntries}
        totalNumberResults={10}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        initialUserPreferences: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
  });

  it('should call onClose when cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose and download link have href with JSON format when format is selected and Download button is clicked', () => {
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });
    const downloadLink = screen.getAllByText(
      'Download'
    )[1] as HTMLAnchorElement;
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(expect.stringContaining('format=json'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose and download link to have href without compressed=true when selected false in the form and Download button is clicked', () => {
    fireEvent.click(screen.getByLabelText('No'));
    const downloadLink = screen.getAllByText(
      'Download'
    )[1] as HTMLAnchorElement;
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(
      expect.not.stringContaining('compressed')
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should handle preview button click', async () => {
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
    async (value, columnSelect) => {
      const formatSelect = screen.getByTestId('file-format-select');
      fireEvent.change(formatSelect, { target: { value } });
      const customise = screen.queryByText('Customize data');
      if (columnSelect) {
        await waitFor(() => {
          expect(customise).toBeInTheDocument();
        });
      } else {
        await waitFor(() => {
          expect(customise).not.toBeInTheDocument();
        });
      }
    }
  );

  it('should change the column selection before preview and download', async () => {
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    let downloadLink = screen.getAllByText('Download')[1] as HTMLAnchorElement;
    expect(downloadLink.href).toEqual(
      expect.stringContaining('fields=accession%2Creviewed%2Cgene_names')
    );
    const removeButton = await screen.findAllByTestId('remove-icon');
    fireEvent.click(removeButton[0]);
    downloadLink = (
      await screen.findAllByText('Download')
    )[1] as HTMLAnchorElement;
    expect(downloadLink.href).toEqual(
      expect.stringContaining('fields=accession%2Cgene_names')
    );
  });

  it('should change Preview button text when Download selected radio is selected', () => {
    fireEvent.click(
      screen.getByLabelText(`Download selected (${selectedEntries.length})`)
    );
    expect(screen.getByText(`Preview ${selectedEntries.length}`)).toBeTruthy();
  });
});
