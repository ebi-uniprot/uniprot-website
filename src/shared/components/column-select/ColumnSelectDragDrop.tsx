import { FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Chip } from 'franklin-sites';
import cn from 'classnames';

import { getBEMClassName as bem } from '../../utils/utils';

import { SelectedColumn } from '../../../uniprotkb/types/resultsTypes';
import { Column } from '../../config/columns';

import './styles/column-select-drag-drop.scss';

export type ColumnSelectDragDropProps = {
  columns: SelectedColumn[];
  onDragDrop: (srcIndex: number, destIndex: number) => void;
  onRemove: (columnId: Column) => void;
};

const ColumnSelectDragDrop: FC<ColumnSelectDragDropProps> = ({
  columns,
  onDragDrop,
  onRemove,
}) => (
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
          className={bem({
            b: 'column-select-drag-drop',
            e: 'list',
          })}
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

export default ColumnSelectDragDrop;
