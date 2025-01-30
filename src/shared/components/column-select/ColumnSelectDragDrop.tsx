import { FC, useEffect, useRef } from 'react';
import { DragEndEvent } from '@dnd-kit/core';

import { SelectedColumn } from '../../../uniprotkb/types/resultsTypes';
import { Column } from '../../config/columns';
import HorizontalSortableList from './HorizontalSortableList';

import './styles/column-select-drag-drop.scss';

export type ColumnSelectDragDropProps = {
  columns: SelectedColumn[];
  onDragDrop: (event: DragEndEvent) => void;
  onRemove: (columnId: Column) => void;
};

const ColumnSelectDragDrop: FC<
  React.PropsWithChildren<ColumnSelectDragDropProps>
> = ({ columns, onDragDrop, onRemove }) => {
  const previousColumns = useRef(columns);

  useEffect(() => {
    // This useEffect scrolls to the rightmost of the drag and drop list whenever
    // a user selects a new column. This is to make it clear to the user that
    // their column selection has been registered and is present in the list.
    if (columns.length > previousColumns.current.length) {
      const dndList = document.querySelector('.column-select-drag-drop__list');
      if (dndList) {
        dndList.scrollLeft = dndList.scrollWidth;
      }
    }
    previousColumns.current = columns;
  }, [columns]);

  return (
    <HorizontalSortableList
      items={columns}
      onDragDrop={onDragDrop}
      onRemove={onRemove}
    />
  );
};

export default ColumnSelectDragDrop;
