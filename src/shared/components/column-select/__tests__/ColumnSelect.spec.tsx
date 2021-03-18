import { fireEvent, waitFor, screen } from '@testing-library/react';
import {
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_RIGHT,
} from 'react-beautiful-dnd-test-utils';

import customRender from '../../../__test-helpers__/customRender';

import ColumnSelect from '../ColumnSelect';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { nsToDefaultColumns } from '../../../config/columns';

import { SearchResultsLocations } from '../../../../app/config/urls';

import resultFields from '../../../../uniprotkb/__mocks__/resultFields.json';
import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ColumnSelect component', () => {
  // testing implementation?
  let rendered;
  let onChange;
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];
  const namespace = Namespace.uniprotkb;

  beforeEach(async () => {
    onChange = jest.fn();
    rendered = customRender(
      <ColumnSelect
        onChange={onChange}
        selectedColumns={selectedColumns}
        namespace={namespace}
      />,
      {
        route: SearchResultsLocations[namespace],
      }
    );
    await waitFor(() => rendered.getAllByTestId('accordion-search-list-item'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call to get field data and have the correct number of "data" list items', () => {
    const items = screen.getAllByTestId('accordion-search-list-item');
    // Only "data" (ie not DB links) are visible so only count these and subtract one for the
    // accession column which shouldn't be listed as the user can't deslect this
    const nDataListItems = resultFields.reduce(
      (accum, { fields, isDatabaseGroup }) =>
        accum + (!isDatabaseGroup && fields.length),
      -1
    );
    expect(items.length).toBe(nDataListItems);
  });

  test('should call onChange when unselected item is clicked and do so with selected columns and new item', () => {
    const item = screen.getByText('Gene Names');
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  test('should call onChange when already selected item is clicked and do so with selected columns without clicked item', () => {
    // Getting the 2nd item as the 1st one is the drag-and-drop button
    const item = screen.getAllByText('Protein existence')[1];
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinExistence)
    );
  });

  test('should call onChange with default columns when "Reset to default" button clicked', () => {
    const button = screen.getByText('Reset to default');
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledWith(nsToDefaultColumns[namespace]);
  });

  test('should call onChange with the correct column order when "Protein name" is dragged to the right', async () => {
    const dragEl = screen
      .getAllByText('Protein names')[0]
      .closest(DND_DRAGGABLE_DATA_ATTR);
    await makeDnd({
      getByText: screen.getAllByText,
      getDragEl: () => dragEl,
      direction: DND_DIRECTION_RIGHT,
      positions: 2,
    });
    expect(onChange).toHaveBeenCalledWith([
      UniProtKBColumn.accession,
      UniProtKBColumn.proteinExistence,
      UniProtKBColumn.proteinName,
    ]);
  });
});
