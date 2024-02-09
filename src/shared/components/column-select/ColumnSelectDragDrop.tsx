import { FC, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Chip } from 'franklin-sites';
import cn from 'classnames';

import { SelectedColumn } from '../../../uniprotkb/types/resultsTypes';
import { Column } from '../../config/columns';

import './styles/column-select-drag-drop.scss';

export type ColumnSelectDragDropProps = {
  columns: SelectedColumn[];
  onDragDrop: (srcIndex: number, destIndex: number) => void;
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
    <DragDropContext
      onDragEnd={(result) => {
        if (result.destination) {
          onDragDrop(result.source.index, result.destination.index);
        }
      }}
    >
      <Droppable droppableId="droppable" direction="horizontal">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            className="column-select-drag-drop__list"
            {...droppableProvided.droppableProps}
          >
            {columns.map(({ itemId, label }, index) => (
              <Draggable
                key={itemId}
                draggableId={itemId}
                index={index}
                disableInteractiveElementBlocking
              >
                {(draggableProvided, snapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Chip
                      disabled={false}
                      onRemove={() => onRemove(itemId)}
                      className={cn({
                        'chip--dragging': snapshot.isDragging,
                      })}
                    >
                      {label}
                    </Chip>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnSelectDragDrop;
