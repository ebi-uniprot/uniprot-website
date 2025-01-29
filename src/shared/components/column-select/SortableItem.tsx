import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Chip } from 'franklin-sites';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'grab',
    position: 'relative',
  };

  return (
    <Chip
      innerRef={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onRemove={() => onRemove(id)}
    >
      {id}
    </Chip>
  );
};

export default SortableItem;
