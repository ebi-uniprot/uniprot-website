import React from 'react';
import { fireEvent } from '@testing-library/react';
import DownloadView from '../DownloadView';
import { defaultTableColumns } from '../../../state/resultsInitialState';
import { FileFormat } from '../../../types/resultsTypes';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import initialState from '../../../../app/state/rootInitialState';

// FIXME: Doing network call through ColumnSelectContainer's logic and Redux
// FIXME: logic. Might need to mock after removing Redux logic to load data.
// NOTE: Causing error when no network available, when any 2 tests below run 🤷🏽‍♂️

describe('DownloadView component', () => {
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
    const { getByTestId, queryByText } = renderedWithRedux;
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
