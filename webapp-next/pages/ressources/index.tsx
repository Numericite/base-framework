import SearchBar from "../../components/ui/ressources/searchbar";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RessourceCard from "../../components/ui/ressources/ressource-card";
import { fetchApi } from "../../utils/api/fetch-api";
import { TRessource, TRessourceKindEnum } from "../api/ressources/types";
import { GeneralListQueryParams } from "../api/types";

const Ressources: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ressources, setRessources] = useState<TRessource[]>([]);

  const fetchRessources = (
    _q?: string,
    filters?: {
      theme?: number;
      kind?: TRessourceKindEnum;
    }
  ) => {
    setIsLoading(true);
    let params: GeneralListQueryParams = {
      pagination: { page: 1, pageSize: 12 },
    };

    if (filters) params.filters = filters;
    if (_q) params._q = _q;

    fetchApi
      .get("/api/ressources/list", params)
      .then((response) => {
        setRessources(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchRessources();
  }, []);

  const displayRessources = ressources.map((ressource) => {
    return <RessourceCard key={ressource.id} ressource={ressource} />;
  });

  const displaySkeleton = Array.from(Array(6).keys()).map((_) => (
    <Skeleton key={_} height={64} borderRadius="lg" />
  ));

  return (
    <>
      <Box bg={"neutral"}>
        <Container maxW="container.2lg" py={"2.75rem"} mb={"2.75rem"}>
          <Heading pb={6}>Ressources</Heading>
          <SearchBar
            onSearch={(
              _q?: string,
              theme?: number,
              kind?: TRessourceKindEnum
            ) => {
              fetchRessources(_q, { theme, kind });
            }}
          />
        </Container>
      </Box>
      <Container maxW="container.2lg" pb={6}>
        <SimpleGrid gap={9} columns={[1, 2, 3]}>
          {!isLoading ? displayRessources : displaySkeleton}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Ressources;
