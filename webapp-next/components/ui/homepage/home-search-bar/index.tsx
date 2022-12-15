import { SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Heading,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import InputLabel from "../../ressources/searchbar/label";

const HomeSearchBar = () => {
  return (
    <Container maxW="container.2lg">
      <SimpleGrid
        w="full"
        py={6}
        px={9}
        border="1px solid #E9F1FF"
        borderRadius="xl"
        columns={[1, 2, 3]}
        spacing={9}
        bg="white"
      >
        <VStack alignItems="flex-start" w="full">
          <InputLabel label="Saisie" />
          <InputGroup minW="100%">
            <InputLeftElement
              pointerEvents="none"
              display="flex"
              alignItems="center"
              w={12}
            >
              <SearchIcon color="primary" />
            </InputLeftElement>
            <Input
              size="md"
              minW="100%"
              placeholder="Rechercher une ressource"
              pl={10}
            />
          </InputGroup>
        </VStack>

        <VStack
          key="theme"
          justify={"flex-start"}
          alignItems="flex-start"
          flexGrow={1}
        >
          <InputLabel label="Thématique" />
          <Select
            onChange={() => {}}
            w="full"
            placeholder="Toutes le thématiques"
          ></Select>
        </VStack>
        <VStack
          key="kind"
          justify={"flex-start"}
          alignItems="flex-start"
          flexGrow={1}
        >
          <InputLabel label="Type de ressource" />
          <Select
            w="full"
            placeholder="Tous les types"
            onChange={() => {}}
          ></Select>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default HomeSearchBar;
