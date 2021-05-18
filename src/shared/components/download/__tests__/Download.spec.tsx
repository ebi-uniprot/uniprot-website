import { fireEvent, screen, waitFor } from '@testing-library/react';
import queryString from 'query-string';

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

describe.only('Download component', () => {
  const namespace = Namespace.uniprotkb;
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();

    customRender(
      <Download
        selectedEntries={selectedEntries}
        totalNumberResults={10}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
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
      if (columnSelect) {
        await waitFor(() => screen.getByText('Customize data'));
      } else {
        expect(screen.queryByText('Customize data')).not.toBeInTheDocument();
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
    expect(
      screen.getByText(`Preview ${selectedEntries.length}`)
    ).toBeInTheDocument();
  });
});

describe('Download with passed query and selectedQuery props', () => {
  it('should use query and selectedQuery if provided as props rather than using the query from the url', async () => {
    const namespace = Namespace.uniprotkb;
    const onCloseMock = jest.fn();
    const query = '(proteome:UP000002494)';
    const selectedQuery =
      '(proteome:UP000002494) AND (proteomecomponent:"Chromosome 1" OR proteomecomponent:"Chromosome 2")';
    const numberSelectedEntries = 123;
    const totalNumberResults = 456;

    customRender(
      <Download
        query={query}
        selectedQuery={selectedQuery}
        numberSelectedEntries={numberSelectedEntries}
        totalNumberResults={totalNumberResults}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/proteomes/UP000002494',
        initialUserPreferences: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    let downloadLink = screen.getAllByText('Download')[1] as HTMLAnchorElement;
    expect(downloadLink.href).toEqual(
      expect.stringContaining(queryString.stringify({ query }))
    );
    fireEvent.click(
      screen.getByLabelText(`Download selected (${numberSelectedEntries})`)
    );
    downloadLink = screen.getAllByText('Download')[1] as HTMLAnchorElement;
    expect(downloadLink.href).toEqual(
      expect.stringContaining(queryString.stringify({ query: selectedQuery }))
    );
  });
});
