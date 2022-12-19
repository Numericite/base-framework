import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
  Button,
  GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TRessourceKindEnum } from "../../../../pages/api/ressources/types";
import { TTheme } from "../../../../pages/api/themes/types";
import { fetchApi } from "../../../../utils/api/fetch-api";
import {
  displayKindReadable,
  ressourceKindEnum,
} from "../../../../utils/globals/enums";
import InputLabel from "../../ressources/searchbar/label";
import { removeNullAndUndefinedNestedFields } from "../../../../utils/globals/tools";

interface SearchParams {
  _q?: string;
  theme?: number;
  kind?: TRessourceKindEnum;
}

const HomeSearchBar = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    _q: undefined,
    theme: undefined,
    kind: undefined,
  });
  const [themes, setThemes] = useState<TTheme[]>([]);

  const fetchThemes = () => {
    return fetchApi
      .get("/api/themes/list", { pagination: { page: 1, pageSize: 1000 } })
      .then((response) => {
        setThemes(response.data);
      });
  };

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleClick = () => {
    router.push({
      pathname: "/ressources",
      query: removeNullAndUndefinedNestedFields(searchParams),
    });
  };

  return (
    <Container maxW="container.2lg" mb="3.625">
      <SimpleGrid
        w="full"
        py={6}
        px={"2.125rem"}
        border="1px solid #E9F1FF"
        borderRadius="xl"
        columns={[1, 2, 5]}
        spacing={7}
        bg="white"
      >
        <GridItem colSpan={2}>
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
                name="_q"
                onChange={handleChanges}
                placeholder="Rechercher une ressource"
                pl={10}
              />
            </InputGroup>
          </VStack>
        </GridItem>

        <VStack
          key="theme"
          justify={"flex-start"}
          alignItems="flex-start"
          flexGrow={1}
        >
          <InputLabel label="Thématique" />
          <Select
            onChange={handleChanges}
            w="full"
            name="theme"
            placeholder="Toutes les thématiques"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </Select>
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
            name="kind"
            onChange={handleChanges}
          >
            {ressourceKindEnum.map((kind) => (
              <option key={kind} value={kind}>
                {displayKindReadable(kind)}
              </option>
            ))}
          </Select>
        </VStack>
        <VStack justify="flex-end" alignItems="center" flexGrow={1}>
          <Button mb={1.5} alignContent="center" onClick={handleClick}>
            Rechercher <ArrowForwardIcon ml={2} />
          </Button>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default HomeSearchBar;
