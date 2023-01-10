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
import ChatBot from "../../components/ui/chatbot";
import CustomBreadcrumb from "../../components/ui/breadcrumb";
import { useEffect } from "react";

interface RessourcesProps {
  searchParams: {
    _q?: string;
    theme?: number;
    kind?: TRessourceKindEnum;
  };
  responseParams: {
    personae: number;
    occupation: number;
    theme: number;
    subTheme: number;
  };
}

const Ressources: React.FC<RessourcesProps> = (props) => {
  const { searchParams, responseParams } = props;
  const [path, setPath] = useState({
    personae: "",
    occupation: "",
    theme: "",
    subTheme: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ressources, setRessources] = useState<TRessource[]>([]);
  const [showToast, setShowToast] = useState(false);
  const toggleState = (show: boolean) => {
    setShowToast(show);
  };

  const fetchResponses = () => {
    Promise.all([
      fetchApi.get("/api/personaes/find", { id: responseParams.personae }),
      fetchApi.get("/api/personaeoccupations/find", {
        id: responseParams.occupation,
      }),
      fetchApi.get("/api/themes/find", { id: responseParams.theme }),
      fetchApi.get("/api/subthemes/find", { id: responseParams.subTheme }),
    ]).then(
      ([
        responsePersonae,
        responsePersonaeOccupation,
        responseTheme,
        responseSubTheme,
      ]) => {
        setPath({
          personae: responsePersonae.name,
          occupation: responsePersonaeOccupation.name,
          theme: responseTheme.name,
          subTheme: responseSubTheme.name,
        });
      }
    );
  };

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

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <>
      {showToast && (
        <Box
          background="rgba(32, 64, 100, 0.3)"
          pos="absolute"
          w="100%"
          h="100%"
          top="0"
          left="0"
          zIndex={99}
          onClick={() => {
            setShowToast(false);
          }}
        />
      )}
      <Box bg={"neutral"}>
        <Container maxW="container.2lg" py={"2.75rem"} mb={"2.75rem"}>
          <Heading pb={6}>Ressources</Heading>
          <ChatBot
            toast={true}
            showToast={showToast}
            setShowToast={setShowToast}
            stepQuestion={5}
            responseParams={responseParams}
          />
          <Box>
            {responseParams.personae ? (
              <CustomBreadcrumb
                path={path}
                toggleState={(show) => {
                  toggleState(show);
                }}
              />
            ) : (
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
            )}
          </Box>
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
  const { _q, theme, kind, personae, occupation, subTheme } = ctx.query;

  return {
    props: {
      searchParams: {
        _q: (_q as string) || null,
        theme: parseInt(theme as string) || null,
        kind: (kind as TRessourceKindEnum) || null,
      },
      responseParams: {
        personae: parseInt(personae as string) || null,
        occupation: parseInt(occupation as string) || null,
        theme: parseInt(theme as string) || null,
        subTheme: parseInt(subTheme as string) || null,
      },
    },
  };
};

export default Ressources;
