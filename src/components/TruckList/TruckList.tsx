import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TruckItem from './TruckItem/TruckItem';

function TruckList({
  trucks,
  onDelete,
  onAcceptLoading,
  onChangeSide,
  viewonly,
  onChangePriority,
}: {
  trucks: TruckType[];
  onDelete: (truckNumber: string) => unknown;
  onChangeSide: (truckNumber: string, side: string) => unknown;
  onChangePriority: (truckNumber: string, number: number) => unknown;
  viewonly: boolean;
}) {
  if (!trucks.length) {
    return (
      <span>Пока нет ни одной машины ожидающей досмотра в городе</span>
    );
  }

  const handleDragEnd = useCallback((result: any) => {
    // dropped outside the list

  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SwipeableList
        fullSwipe={false}
        className="truck-list"
        type={Type.IOS}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
            >
              {trucks
                .map((truck, index) => (
                  <Draggable
                    key={truck.id}
                    draggableId={String(truck.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SwipeableListItem
                          key={truck.truckNumber}
                          blockSwipe={viewonly}
                          className="truck-list__item"
                          leadingActions={(
                            <TrailingActions>
                              <SwipeAction
                                onClick={() => onAcceptLoading(truck.truckNumber)}
                              >
                                <div className="truck-list__loaded">
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    fixedWidth
                                  />
                                  <span>Погрузка окончена</span>
                                </div>
                              </SwipeAction>
                            </TrailingActions>
                          )}
                          trailingActions={(
                            <TrailingActions>
                              <SwipeAction
                                destructive
                                onClick={() => onDelete(truck.truckNumber)}
                              >
                                <div className="truck-list__delete">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    fixedWidth
                                  />
                                  <span>Удалить?</span>
                                </div>
                              </SwipeAction>
                            </TrailingActions>
                          )}
                        >
                          <TruckItem
                            key={truck.truck}
                            id={truck.id}
                            priorityNumber={index + 1}
                            truck={truck.truck}
                            truckNumber={truck.truckNumber}
                            driver={truck.driver}
                            status={truck.status}
                            serviceUp={truck.serviceUp}
                            side={truck.side}
                            products={truck.products}
                            viewonly={viewonly}
                            onChangeSide={onChangeSide}
                            onChangePriority={onChangePriority}
                          />
                        </SwipeableListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </SwipeableList>
    </DragDropContext>
  );
}

export default TruckList;
