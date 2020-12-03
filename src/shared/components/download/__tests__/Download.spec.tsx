import React from 'react';
import { fireEvent } from '@testing-library/react';
import Download, { getPreviewFileFormat } from '../Download';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';
import initialState from '../../../../app/state/rootInitialState';
import { FileFormat } from '../../../types/resultsDownload';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';
import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';
import '../../../../uniprotkb/components/__mocks__/mockApi';

// FIXME: Doing network call through ColumnSelect's logic and Redux
// FIXME: logic. Might need to mock after removing Redux logic to load data.
// NOTE: Causing error when no network available, when any 2 tests below run 🤷🏽‍♂️

describe('getPreviewFileFormat', () => {
  test('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('Download component', () => {
  let renderedWithRedux;
  const namespace = Namespace.uniprotkb;
  const onCloseMock = jest.fn();

  beforeEach(() => {
    renderedWithRedux = renderWithRedux(
      <Download
        query="nod2"
        selectedFacets={[]}
        selectedColumns={[
          UniProtKBColumn.accession,
          UniProtKBColumn.reviewed,
          UniProtKBColumn.id,
        ]}
        selectedEntries={['Q9HC29', 'O43353', 'Q3KP66']}
        totalNumberResults={10}
        onClose={onCloseMock}
      />,
      {
        route: SearchResultsLocations[namespace],
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

  test('should show column selection component when excel or tsv file type is selected and otherwise hide it', async () => {
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

describe.skip('DownloadView component', () => {
  let props, renderedWithRedux;
  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
      onPreview: jest.fn(),
      selectedColumns: defaultTableColumns,
      downloadAll: true,
      fileFormat: FileFormat.tsv,
      compressed: true,
      preview: '',
      loadingPreview: false,
      onSelectedColumnsChange: jest.fn(),
      onDownloadAllChange: jest.fn(),
      onFileFormatChange: jest.fn(),
      onCompressedChange: jest.fn(),
      nSelectedEntries: 5,
      totalNumberResults: 100,
      nPreview: 10,
    };
    renderedWithRedux = renderWithRedux(<DownloadView {...props} />, {
      initialState,
      location: '/download',
    });
  });

  test('should render', () => {
    const { asFragment } = renderedWithRedux;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSubmit when submit button is clicked', () => {
    const { getByTestId } = renderedWithRedux;
    const form = getByTestId('download-form');
    fireEvent.submit(form);
    expect(props.onSubmit).toHaveBeenCalled();
  });

  test('should call onCancel when cancel button is clicked', () => {
    const { getByText } = renderedWithRedux;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(props.onCancel).toHaveBeenCalled();
  });

  test('should call onPreview when preview button is clicked', () => {
    const { getByText } = renderedWithRedux;
    const previewButton = getByText('Preview 10');
    fireEvent.click(previewButton);
    expect(props.onPreview).toHaveBeenCalled();
  });
  test('should call onDownloadAllChange when download selected radio is selected', () => {
    const { getByLabelText } = renderedWithRedux;
    const radio = getByLabelText(/Download selected/);
    fireEvent.click(radio);
    expect(props.onDownloadAllChange).toHaveBeenCalled();
  });

  test('should call onFileFormatChange when file format select is changed', () => {
    const { getByTestId } = renderedWithRedux;
    const formatSelect = getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.gff } });
    expect(props.onFileFormatChange).toHaveBeenCalled();
  });

  test('should call onCompressedChange when no choice is clicked', () => {
    const { getByText } = renderedWithRedux;
    const radio = getByText(/No/);
    fireEvent.click(radio);
    expect(props.onCompressedChange).toHaveBeenCalled();
  });
});
