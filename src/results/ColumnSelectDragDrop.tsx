import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CloseIcon } from 'franklin-sites';
import { getBEMClassName as bem } from '../utils/utils';
import { SelectedColumn } from './types/resultsTypes';
import { Column } from '../model/types/ColumnTypes';
import './styles/ColumnSelectDragDrop.scss';

type ColumnSelectDragDropProps = {
  columns: SelectedColumn[];
  onDragDrop: (srcIndex: number, destIndex: number) => void;
  onRemove: (columnId: Column) => void;
};

const ColumnSelectDragDrop: React.FC<ColumnSelectDragDropProps> = ({
  columns,
  onDragDrop,
  onRemove,
}) => (
  <DragDropContext
    onDragEnd={result => {
      if (result.destination) {
        onDragDrop(result.source.index, result.destination.index);
      }
    }}
  >
    <Droppable droppableId="droppable" direction="horizontal">
      {droppableProvided => (
        <div
          ref={droppableProvided.innerRef}
          className={bem({
            b: 'column-select-drag-drop',
            e: 'list',
          })}
          {...droppableProvided.droppableProps}
        >
          {columns.map(({ itemId, label }, index) => (
            <Draggable key={itemId} draggableId={itemId} index={index}>
              {(draggableProvided, snapshot) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  className={`button ${bem({
                    b: 'column-select-drag-drop',
                    e: ['list', 'item'],
                    m: snapshot.isDragging && 'dragging',
                  })}`}
                  style={draggableProvided.draggableProps.style}
                >
                  {label}
                  <button
                    type="button"
                    data-testid="column-select-dnd-remove-button"
                    className={bem({
                      b: 'column-select-drag-drop',
                      e: ['list', 'item', 'button'],
                    })}
                    onClick={() => onRemove(itemId)}
                  >
                    <CloseIcon
                      className={bem({
                        b: 'column-select-drag-drop',
                        e: ['list', 'item', 'button', 'icon'],
                      })}
                    />
                  </button>
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
