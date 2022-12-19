import SearchBar from "../../components/ui/ressources/searchbar";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import RessourceCard from "../../components/ui/ressources/ressource-card";
import { fetchApi } from "../../utils/api/fetch-api";
import { TRessource, TRessourceKindEnum } from "../api/ressources/types";
import { GeneralListQueryParams } from "../api/types";
import { GetServerSideProps } from "next";

interface RessourcesProps {
  searchParams: {
    _q?: string;
    theme?: number;
    kind?: TRessourceKindEnum;
  };
}

const Ressources: React.FC<RessourcesProps> = (props) => {
  const { searchParams } = props;
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
            searchParams={searchParams}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { _q, theme, kind } = ctx.query;

  return {
    props: {
      searchParams: {
        _q: (_q as string) || null,
        theme: parseInt(theme as string) || null,
        kind: (kind as TRessourceKindEnum) || null,
      },
    },
  };
};

export default Ressources;
