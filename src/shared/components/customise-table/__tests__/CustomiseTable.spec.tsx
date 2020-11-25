import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import CustomiseTable from '../CustomiseTable';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';

const route = SearchResultsLocations[Namespace.uniprotkb];

describe('CustomiseTable component', () => {
  let rendered;
  const onSave = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];

  beforeEach(async () => {
    rendered = renderWithRedux(
      <CustomiseTable onSave={onSave} selectedColumns={selectedColumns} />,
      { route }
    );
    await waitFor(() => rendered.getAllByTestId('accordion-search-list-item'));
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSave prop with initial selected columns when cancel button is pressed', () => {
    const { getByText } = rendered;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onSave).toHaveBeenCalledWith(selectedColumns);
  });

  test('should go back and call updateTableColumns action when customise table form is submitted', () => {
    const { getByTestId, getByText } = rendered;
    const item = getByText('Gene Names');
    fireEvent.click(item);
    const form = getByTestId('customise-table-form');
    fireEvent.submit(form);
    expect(onSave).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });
});

describe('CustomiseTable component with a subset of props', () => {
  test('should call onSave prop with empty array when no initial selected columns are provided and cancel button is pressed', async () => {
    const onSave = jest.fn();
    let rendered;
    await act(async () => {
      rendered = renderWithRedux(<CustomiseTable onSave={onSave} />, {
        route,
      });
    });
    const cancelButton = rendered.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onSave).toHaveBeenCalledWith([]);
  });
});
