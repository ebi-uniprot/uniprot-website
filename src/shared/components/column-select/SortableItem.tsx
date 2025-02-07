import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Chip } from 'franklin-sites';

import { Column } from '../../config/columns';

import styles from './styles/sortable-item.module.scss';

type Props = {
  id: Column;
  onRemove: (id: Column) => void;
  children: ReactNode;
};

const SortableItem = ({ id, children, onRemove }: Props) => {
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
  };

  return (
    <Chip
      innerRef={setNodeRef}
      style={style}
      className={styles['sortable-item']}
      {...attributes}
      {...listeners}
      onRemove={() => onRemove(id)}
    >
      {children}
    </Chip>
  );
};

export default SortableItem;
