import { useEffect, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

import { SelectedColumn } from '../../../uniprotkb/types/resultsTypes';
import { Column } from '../../config/columns';

import './styles/column-select-drag-drop.scss';

type Props = {
  columns: SelectedColumn[];
  onDragDrop: (event: DragEndEvent) => void;
  onRemove: (columnId: Column) => void;
};

const ColumnSelectDragDrop = ({ columns, onDragDrop, onRemove }: Props) => {
  // Create sensors to detect pointer (mouse, touch, etc.)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
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
    <DndContext sensors={sensors} onDragEnd={onDragDrop}>
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {columns.map((column) => (
            <SortableItem key={column.id} id={column.id} onRemove={onRemove}>
              {column.label}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ColumnSelectDragDrop;
