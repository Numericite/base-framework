import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import InputLabel from "./label";
import {
  displayKindReadable,
  ressourceKindEnum,
} from "../../../../utils/globals/enums";
import { useEffect, useState } from "react";
import { fetchApi } from "../../../../utils/api/fetch-api";
import { TTheme } from "../../../../pages/api/themes/types";
import { TRessourceKindEnum } from "../../../../pages/api/ressources/types";
import { useDebounce } from "usehooks-ts";
import { NextRouter, useRouter } from "next/router";
import { removeNullAndUndefinedNestedFields } from "../../../../utils/globals/tools";

type SearchBarProps = {
  onSearch: (_q?: string, theme?: number, kind?: TRessourceKindEnum) => void;
  searchParams: {
    _q?: string;
    theme?: number;
    kind?: TRessourceKindEnum;
  };
};

const SearchBar = ({ searchParams, onSearch }: SearchBarProps) => {
  const [q, setQ] = useState<string>((searchParams._q as string) || "");
  const debouncedQ = useDebounce<string>(q, 300);

  const router: NextRouter = useRouter();

  const updateUrl = () => {
    router.replace(
      {
        pathname: "/ressources",
        query: removeNullAndUndefinedNestedFields(search),
      },
      undefined,
      { shallow: true }
    );
  };

  const [themes, setThemes] = useState<TTheme[]>([]);
  const [search, setSearch] = useState<{
    _q?: string;
    theme?: number;
    kind?: TRessourceKindEnum;
  }>(searchParams);

  const fetchThemes = () => {
    return fetchApi
      .get("/api/themes/list", { pagination: { page: 1, pageSize: 1000 } })
      .then((response) => {
        setThemes(response.data);
      });
  };

  useEffect(() => {
    if (onSearch && search && !!themes.length) {
      onSearch(search._q, search.theme, search.kind);
      updateUrl();
    }
  }, [search]);

  useEffect(() => {
    console.log(searchParams);
    if (searchParams)
      onSearch(searchParams._q, searchParams.theme, searchParams.kind);
  }, [searchParams]);

  useEffect(() => {
    setSearch({ ...search, _q: debouncedQ });
  }, [debouncedQ]);

  useEffect(() => {
    fetchThemes();
  }, []);

  if (!themes.length)
    return (
      <SimpleGrid
        w="full"
        py={6}
        px={9}
        border="1px solid #E9F1FF"
        borderRadius="xl"
        columns={[1, 2, 3]}
        spacing={9}
      >
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} />
      </SimpleGrid>
    );

  return (
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
        <InputGroup w="full">
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
            w="full"
            placeholder="Rechercher une ressource"
            pl={10}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
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
          w="full"
          placeholder="Toutes le thématiques"
          value={search.theme}
          onChange={(e) => {
            setSearch({
              ...search,
              theme:
                e.target.value !== "" ? parseInt(e.target.value) : undefined,
            });
          }}
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
          value={search.kind}
          onChange={(e) => {
            setSearch({
              ...search,
              kind: e.target.value !== "" ? e.target.value : undefined,
            });
          }}
        >
          {ressourceKindEnum.map((kind) => (
            <option key={kind} value={kind}>
              {displayKindReadable(kind)}
            </option>
          ))}
        </Select>
      </VStack>
    </SimpleGrid>
  );
};

export default SearchBar;
