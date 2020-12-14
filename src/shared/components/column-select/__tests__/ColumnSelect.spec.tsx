import { fireEvent, waitFor } from '@testing-library/react';
import {
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_LEFT,
  DND_DIRECTION_RIGHT,
} from 'react-beautiful-dnd-test-utils';

import ColumnSelect from '../ColumnSelect';

import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import resultFields from '../../../../uniprotkb/__mocks__/resultFields.json';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { nsToDefaultColumns } from '../../../config/columns';

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
    rendered = renderWithRedux(
      <ColumnSelect onChange={onChange} selectedColumns={selectedColumns} />,
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

  test('should call onChange when unselected item is clicked and do so with selected columns and new item', () => {
    const { getByText } = rendered;
    const item = getByText('Gene Names');
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  test('should call onChange when already selected item is clicked and do so with selected columns without clicked item', () => {
    const { getAllByText } = rendered;
    // Getting the 2nd item as the 1st one is the drag-and-drop button
    const item = getAllByText('Protein existence')[1];
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinExistence)
    );
  });

  test('should call onChange with default columns when "Reset to default" button clicked', () => {
    const { getByText } = rendered;
    const button = getByText('Reset to default');
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledWith(nsToDefaultColumns[namespace]);
  });

  test('should call onChange with the correct column order when "Protein name" is dragged to the right', async () => {
    const { getAllByText } = rendered;
    const dragEl = (await getAllByText('Protein names')[0]).closest(
      DND_DRAGGABLE_DATA_ATTR
    );
    await makeDnd({
      getByText: getAllByText,
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

  test('should throw an error when no namespace is provided', () => {
    // Don't pollute the console with red warning text - we're already testing
    // that we're throwing an error. This is reset after each test.
    console.error = jest.fn();
    expect(() =>
      renderWithRedux(
        <ColumnSelect onChange={onChange} selectedColumns={selectedColumns} />,
        {
          route: '/',
        }
      )
    ).toThrowError('No namespace provided');
  });

  test('should not raise an exception when no default or must have columns are listed', () => {
    expect(() =>
      renderWithRedux(
        <ColumnSelect onChange={onChange} selectedColumns={selectedColumns} />,
        {
          route: `/${Namespace.keywords}`, // Keywords is not expected to have columns but is a valid namespace
        }
      )
    ).not.toThrowError();
  });
});
