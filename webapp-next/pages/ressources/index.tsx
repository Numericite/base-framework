import SearchBar from "../../components/ui/ressources/searchbar";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  keyframes,
} from "@chakra-ui/react";
import { useState } from "react";
import RessourceCard from "../../components/ui/ressources/ressource-card";
import { fetchApi } from "../../utils/api/fetch-api";
import {
  TRessource,
  TRessourceAkinatorParams,
  TRessourceKindEnum,
} from "../api/ressources/types";
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
  akinatorParams: {
    personae: number;
    occupation: number;
    theme: number;
    subTheme: number;
    status: "published";
  };
}

const Ressources: React.FC<RessourcesProps> = (props) => {
  const { searchParams, akinatorParams } = props;
  const [akinatorPath, setAkinatorPath] = useState({
    personae: "",
    occupation: "",
    theme: "",
    subTheme: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ressources, setRessources] = useState<TRessource[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleState = (show: boolean, isEditing: boolean) => {
    setShowToast(show);
    setIsEditing(isEditing);
  };

  const fetchAkinatorParamsValues = () => {
    Promise.all([
      fetchApi.get("/api/personaes/find", { id: akinatorParams.personae }),
      fetchApi.get("/api/personaeoccupations/find", {
        id: akinatorParams.occupation,
      }),
      fetchApi.get("/api/themes/find", { id: akinatorParams.theme }),
      fetchApi.get("/api/subthemes/find", { id: akinatorParams.subTheme }),
    ]).then(
      ([
        responsePersonae,
        responsePersonaeOccupation,
        responseTheme,
        responseSubTheme,
      ]) => {
        setAkinatorPath({
          personae: responsePersonae.name,
          occupation: responsePersonaeOccupation.name,
          theme: responseTheme.name,
          subTheme: responseSubTheme.name,
        });
      }
    );
  };

  const fetchRessourcesAkinator = () => {
    setIsLoading(true);
    fetchApi
      .get("/api/ressources/akinator", {
        pagination: { page: 1, pageSize: 10 },
        filters: {
          status: "published",
        },
        ...akinatorParams,
      })
      .then((response) => {
        setRessources(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchRessourcesClassic = (
    _q?: string,
    filters?: {
      theme?: number;
      kind?: TRessourceKindEnum;
    }
  ) => {
    setIsLoading(true);
    let params: GeneralListQueryParams = {
      pagination: { page: 1, pageSize: 12 },
      filters: {
        status: "published",
      },
    };

    if (filters) params.filters = { ...params.filters, ...filters };
    if (_q) params._q = _q;

    fetchApi
      .get("/api/ressources/list", params)
      .then((response) => {
        setRessources(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  const displayRessources = ressources.map((ressource) => {
    return (
      <RessourceCard
        key={ressource.id}
        ressource={ressource}
        clickable={true}
      />
    );
  });

  const displaySkeleton = Array.from(Array(6).keys()).map((_) => (
    <Skeleton key={_} height={64} borderRadius="lg" />
  ));

  useEffect(() => {
    if (akinatorParams.personae) {
      fetchAkinatorParamsValues();
      fetchRessourcesAkinator();
    }
  }, [akinatorParams]);

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
            stepQuestion={1}
            isEditing={isEditing}
          />
          <Box>
            {akinatorParams.personae ? (
              <CustomBreadcrumb
                path={akinatorPath}
                toggleState={(show, isEditing) => {
                  toggleState(show, isEditing);
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
                  fetchRessourcesClassic(_q, { theme, kind });
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
      akinatorParams: {
        personae: parseInt(personae as string) || null,
        occupation: parseInt(occupation as string) || null,
        theme: parseInt(theme as string) || null,
        subTheme: parseInt(subTheme as string) || null,
      },
    },
  };
};

export default Ressources;
