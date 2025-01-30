import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

const HorizontalSortableList = ({ items, onDragDrop, onRemove }) => {
  // Create sensors to detect pointer (mouse, touch, etc.)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragDrop}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} onRemove={onRemove}>
              {item.label}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default HorizontalSortableList;
