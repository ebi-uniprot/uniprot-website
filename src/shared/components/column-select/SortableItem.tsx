import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  onRemove: (id: string) => void;
}

const SortableItem = ({ id, onRemove }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Apply the transform from DnD state
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    margin: '0 8px',
    minWidth: 80,
    height: 80,
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'grab',
    position: 'relative',
  };

  // A simple 'Remove' button in the corner
  const removeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#f44',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
      <button style={removeButtonStyle} onClick={() => onRemove(id)}>
        X
      </button>
    </div>
  );
};

export default SortableItem;
