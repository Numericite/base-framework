import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "../../../../utils/globals/tools";

interface DragNDropComponentProps<TItem> {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  element: (item: TItem) => JSX.Element;
  dropppableId: string;
}

const DragNDropComponent = <TItem,>(props: DragNDropComponentProps<TItem>) => {
  const { items, element, setItems } = props;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const tmpItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(tmpItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={props.dropppableId} direction="horizontal">
        {(provided) => (
          <SimpleGrid
            columns={[1, 2, 3]}
            ref={provided.innerRef}
            {...provided.droppableProps}
            w="100%"
            spacing={4}
          >
            {items.map((item, index) => (
              <Draggable
                key={index}
                draggableId={`item-${index}`}
                index={index}
              >
                {(provided) => (
                  <Box
                    my={2}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    minH={[200, 200, 200]}
                  >
                    {element(item)}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </SimpleGrid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragNDropComponent;
