import { useCallback } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info(`swipe action triggered`)}>
      Action name
    </SwipeAction>
  </LeadingActions> 
);

const trailingActions = () => (
  <TrailingActions>
    <SwipeAction
      destructive
      onClick={() => console.info(`swipe action triggered`)}
    >
      Delete
    </SwipeAction>
  </TrailingActions>
);

function TestSwip() {
  const onBeforeCapture = useCallback(() => {
    /* ... */
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /* ... */
  }, []);
  const onDragStart = useCallback(() => {
    /* ... */
  }, []);
  const onDragUpdate = useCallback(() => {
    /* ... */
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <SwipeableList>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable
                index={0}
                draggableId="0"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SwipeableListItem
                      leadingActions={leadingActions()}
                      trailingActions={trailingActions()}
                    >
                      Item content
                    </SwipeableListItem>
                  </div>
                )}

              </Draggable>

              <Draggable
                index={1}
                draggableId="1"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SwipeableListItem
                      leadingActions={leadingActions()}
                      trailingActions={trailingActions()}
                    >
                      Item content
                    </SwipeableListItem>
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </SwipeableList>
    </DragDropContext>
  );
}

export default TestSwip;
