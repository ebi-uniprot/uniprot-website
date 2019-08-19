import React, { useImperativeHandle, useRef } from 'react'
import {
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DragSourceMonitor,
  DragSource,
  DropTarget,
  DropTargetConnector,
  DragSourceConnector,
} from 'react-dnd'
import { XYCoord } from 'dnd-core'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const DraggableFieldItemType = 'DraggableField';

export interface CardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any
  text: string
  index: number
  moveDraggableField: (dragIndex: number, hoverIndex: number) => void

  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

interface DraggableFieldInstance {
  getNode(): HTMLDivElement | null
}

const DraggableField = React.forwardRef<HTMLDivElement, CardProps>(
  ({ text, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0 : 1
    useImperativeHandle<{}, DraggableFieldInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return (
      <div ref={elementRef} style={{ ...style, opacity }}>
        {text}
      </div>
    )
  },
)

export default DropTarget(
  DraggableFieldItemType,
  {
    hover(
      props: CardProps,
      monitor: DropTargetMonitor,
      component: DraggableFieldInstance,
    ) {
      if (!component) {
        return undefined
      }
      // node = HTML Div element from imperative API
      const node = component.getNode()
      if (!node) {
        return undefined
      }

      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return undefined
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return undefined
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return undefined
      }

      // Time to actually perform the action
      props.moveDraggableField(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      monitor.getItem().index = hoverIndex
      return undefined
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    DraggableFieldItemType,
    {
      beginDrag: (props: CardProps) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(DraggableField),
)
