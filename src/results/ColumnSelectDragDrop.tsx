import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CloseIcon } from 'franklin-sites';
import { getBEMClassName } from '../utils/utils';
import './styles/ColumnSelectDragDrop.scss';

const ColumnSelectDragDrop = ({ columns, onDragDrop, onRemove }) => (
  <DragDropContext
    onDragEnd={result => {
      if (result.destination) {
        onDragDrop(result.source.index, result.destination.index);
      }
    }}
  >
    <Droppable
      droppableId="droppable"
      direction="horizontal"
      className="column-select-drag-drop"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={getBEMClassName({
            b: 'column-select-drag-drop',
            e: 'list',
          })}
          {...provided.droppableProps}
        >
          {columns.map((column, index) => (
            <Draggable
              key={column.itemId}
              draggableId={column.itemId}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`button ${getBEMClassName({
                    b: 'column-select-drag-drop',
                    e: ['list', 'item'],
                    m: snapshot.isDragging && 'dragging',
                  })}`}
                  style={provided.draggableProps.style}
                >
                  {column.label}
                  <button
                    type="button"
                    className={getBEMClassName({
                      b: 'column-select-drag-drop',
                      e: ['list', 'item', 'button'],
                    })}
                    onClick={() => onRemove(column)}
                  >
                    <CloseIcon
                      className={getBEMClassName({
                        b: 'column-select-drag-drop',
                        e: ['list', 'item', 'button', 'icon'],
                      })}
                    />
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default ColumnSelectDragDrop;
