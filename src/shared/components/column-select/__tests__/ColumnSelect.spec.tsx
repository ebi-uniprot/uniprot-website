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

import { SearchResultsLocations } from '../../../../app/config/urls';

import resultFields from '../../../../uniprotkb/__mocks__/resultFields';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ColumnSelect component', () => {
  // testing implementation?
  let rendered: ReturnType<typeof customRender>;
  let onChange: jest.Mock;
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

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call to get field data and have the correct number of "data" list items', () => {
    const items = screen.getAllByTestId('accordion-search-list-item');
    // Only "data" (ie not DB links) are visible so only count these and
    // subtract one for the accession column which shouldn't be listed as the
    // user can't deselect this
    let nDataListItems = 0;
    for (const { fields, isDatabaseGroup } of resultFields) {
      if (!isDatabaseGroup) {
        nDataListItems += fields.length;
      }
    }
    expect(items.length).toBe(nDataListItems - 1);
  });

  it('should call onChange when unselected item is clicked and do so with selected columns and new item', () => {
    const item = screen.getByText('Gene Names');
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  it('should call onChange when already selected item is clicked and do so with selected columns without clicked item', () => {
    // Getting the 2nd item as the 1st one is the drag-and-drop button
    const item = screen.getAllByText('Protein existence')[1];
    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinExistence)
    );
  });

  it('should call onChange with the correct column order when "Protein name" is dragged to the right', async () => {
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
