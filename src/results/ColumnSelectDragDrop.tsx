import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TimesIcon } from 'franklin-sites';
import './styles/ColumnSelectDragDrop.scss';

const getItemStyle = (isDragging, draggableStyle) => {
  if (isDragging) {
    return { ...draggableStyle, background: 'teal' };
  }
  return draggableStyle;
};

const getListStyle = isDraggingOver => {
  if (isDraggingOver) {
    return { background: 'lightblue' };
  }
};

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
          className="column-select-drag-drop__list"
          style={getListStyle(snapshot.isDraggingOver)}
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
                  className="column-select-drag-drop__list__item"
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {column.label}
                  <button
                    type="button"
                    className="column-select-drag-drop__list__item__button"
                    onClick={() => onRemove(column)}
                  >
                    <TimesIcon className="column-select-drag-drop__list__item__button__icon" />
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
