import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import ColumnSelect from '../ColumnSelect';

import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import resultFields from '../../../../uniprotkb/__mocks__/resultFields.json';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { SearchResultsLocations } from '../../../../app/config/urls';

describe('ColumnSelect component', () => {
  // testing implementation?
  let rendered;
  const onChange = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];
  const namespace = Namespace.uniprotkb;

  beforeEach(async () => {
    rendered = renderWithRedux(
      <ColumnSelect onChange={onChange} selectedColumns={selectedColumns} />,
      {
        route: SearchResultsLocations[namespace],
      }
    );
    await waitFor(() => rendered.getAllByTestId('accordion-search-list-item'));
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call to get field data and have the correct number of "data" list items', () => {
    const { getAllByTestId } = rendered;
    const items = getAllByTestId('accordion-search-list-item');
    // Only "data" (ie not DB links) are visible so only count these and subtract one for the
    // accession column which shouldn't be listed as the user can't deslect this
    const nDataListItems = resultFields.reduce(
      (accum, { fields, isDatabaseGroup }) =>
        accum + (!isDatabaseGroup && fields.length),
      -1
    );
    expect(items.length).toBe(nDataListItems);
  });

  test('should call onSelect when unselected item is clicked and do so with selected columns and new item', () => {
    const { getByText } = rendered;
    const item = getByText('Gene Names');
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  test('should call onSelect when already selected item is clicked and do so with selected columns without clicked item', () => {
    const { getAllByText } = rendered;
    // Getting the 2nd item as the 1st one is the drag-and-drop button
    const item = getAllByText('Protein existence')[1];
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinExistence)
    );
  });
});
