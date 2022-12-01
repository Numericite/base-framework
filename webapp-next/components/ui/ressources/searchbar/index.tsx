import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import InputLabel from "./label";

const SearchBar: React.FC = () => {
  const multiSelectItems = [
    {
      label: "Thématique",
      value: "thematique",
    },
    {
      label: "Type de ressource",
      value: "type",
    },
    {
      label: "Producteur",
      value: "producteur",
    },
  ];

  const displaySelect = multiSelectItems.map((item) => {
    return (
      <VStack
        key={item.value}
        justify={"flex-start"}
        alignItems="flex-start"
        flexGrow={1}
      >
        <InputLabel label={item.label} />
        <Select w="full" placeholder={item.label} onChange={() => {}} />
      </VStack>
    );
  });

  return (
    <SimpleGrid
      w="full"
      py={6}
      px={9}
      border="1px solid #E9F1FF"
      borderRadius="xl"
      columns={4}
      spacing={9}
    >
      <VStack justify={"flex-start"} alignItems="flex-start">
        <InputLabel label="Saisie" />
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="primary" />
          </InputLeftElement>
          <Input size="md" placeholder="Rechercher une ressource" />
        </InputGroup>
      </VStack>
      {displaySelect}
    </SimpleGrid>
  );
};

export default SearchBar;
