import React, { useCallback, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getItems, reorder } from './utils';

function List() {
  const [items, setItems] = useState(getItems(10));
  const [selected, setSelected] = useState(getItems(5, 10));

  const handleDragEnd = useCallback((result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsRR = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems({
      ...itemsRRR,
    });
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {
              items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style,
                      // )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <br />
      <Droppable droppableId="droppable2">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {
              selected.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {
                    ((provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style,
                        // )}
                      >
                        {item.content}
                      </div>
                    ))
                  }
                </Draggable>
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
