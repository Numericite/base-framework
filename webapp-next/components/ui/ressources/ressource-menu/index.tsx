import { Box, Heading, ListItem, OrderedList } from "@chakra-ui/react";

const RessourceMenu = () => {
  return (
    <Box
      bg="#FAFCFF"
      borderRadius={"xl"}
      py="1.5rem"
      px="1.875rem"
      alignItems="start"
      w="auto"
      maxH="auto"
      mb="2.125rem"
    >
      <Heading size="sm" mb={"0.875rem"}>
        Sommaire
      </Heading>
      <OrderedList spacing={4}>
        <ListItem>Lorem Ipsum</ListItem>
        <ListItem>Lorem Ipsum</ListItem>
        <ListItem>Lorem Ipsum</ListItem>
        <ListItem>Lorem Ipsum</ListItem>
      </OrderedList>
    </Box>
  );
};

export default RessourceMenu;
