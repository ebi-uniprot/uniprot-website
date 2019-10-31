import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_LEFT,
} from 'react-beautiful-dnd-test-utils';
import { ColumnSelectTab } from '../types/resultsTypes';
import { Column } from '../../model/types/ColumnTypes';
import ColumnSelectDragDrop from '../ColumnSelectDragDrop';

describe('ColumnSelectDragDrop component', () => {
  let props, rendered;
  beforeEach(() => {
    props = {
      columns: [
        {
          tabId: ColumnSelectTab.data,
          accordionId: 'Names & Taxonomy',
          itemId: Column.id,
          label: 'Entry Name',
        },
        {
          tabId: ColumnSelectTab.data,
          accordionId: 'Names & Taxonomy',
          itemId: Column.proteinName,
          label: 'Protein names',
        },
        {
          tabId: ColumnSelectTab.data,
          accordionId: 'Names & Taxonomy',
          itemId: Column.geneNames,
          label: 'Gene Names',
        },
      ],
      onDragDrop: jest.fn(),
      onRemove: jest.fn(),
    };
    rendered = render(<ColumnSelectDragDrop {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onDragDrop with correct arguments when item is moved', async () => {
    const getDragElFn = text => () =>
      getByText(text).closest(DND_DRAGGABLE_DATA_ATTR);
    const { getByText } = rendered;
    await makeDnd({
      getByText,
      getDragEl: getDragElFn('Gene Names'),
      direction: DND_DIRECTION_LEFT,
      positions: 1,
    });
    expect(props.onDragDrop).toBeCalledWith(2, 1);
  });

  test('should call onRemove', () => {
    const { getAllByTestId } = rendered;
    const removeButtons = getAllByTestId('column-select-dnd-remove-button');
    const removeButton = removeButtons[0];
    fireEvent.click(removeButton);
    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });
});
