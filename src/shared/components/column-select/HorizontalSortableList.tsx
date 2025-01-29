import React, { useCallback, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

const HorizontalSortableList = ({ items: foo }) => {
  const [items, setItems] = useState(foo.map((item) => item.label));

  // Create sensors to detect pointer (mouse, touch, etc.)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Reorder items when drag ends
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id.toString());
        const newIndex = prevItems.indexOf(over.id.toString());
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }, []);

  // Remove an item by id
  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item !== id));
  }, []);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {items.map((id) => (
            <SortableItem key={id} id={id} onRemove={removeItem} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default HorizontalSortableList;
