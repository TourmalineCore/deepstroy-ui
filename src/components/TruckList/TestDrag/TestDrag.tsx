/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import 'react-swipeable-list/dist/styles.css';

const elements = [
  {
    id: `one`,
    content: `one`,
  },
  {
    id: `two`,
    content: `two`,
  },
  {
    id: `three`,
    content: `three`,
  },
  {
    id: `fou`,
    content: `fou`,
  },
];

function TestDrag() {
  const [items, setItems] = useState(elements);

  const onDragEnd = (result: any) => {
    const newItems = Array.from(items);

    const [removed] = newItems.splice(result.source.index, 1);

    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable
              // adding a key is important!
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided) => (
                  <div
                    key={item.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TestDrag;
