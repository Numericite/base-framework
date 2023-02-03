import { Box, Container, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import RessourceHeader from "../../components/ui/ressources/header";
import { TRessource } from "../api/ressources/types";
import ReactMarkdown from "react-markdown";
import { fetchApi } from "../../utils/api/fetch-api";
import RessourceMenu from "../../components/ui/ressources/ressource-menu";
import RessourceInfos from "../../components/ui/ressources/ressource-info";
import Feedback from "../../components/ui/feedback";
import RessourceSimilar from "../../components/ui/ressources/ressource-similar";
import { useMediaQueryAdapter } from "../../utils/hooks/useMediaQuery";

interface Props {
  ressource: TRessource;
  similarRessources: TRessource[];
}

const RessourcePage: React.FC<Props> = ({ ressource, similarRessources }) => {
  const isLargerThan768 = useMediaQueryAdapter("(min-width: 768px)");
  const ressourceBody = <ReactMarkdown>{ressource.content}</ReactMarkdown>;

  return (
    <Box w="full">
      <RessourceHeader
        title={ressource.name}
        description={ressource.description}
        kind={ressource.kind}
      />
      <Container maxW="container.2lg" my="2.125rem">
        <Flex justifyItems={"space-between"} position="relative">
          {isLargerThan768 && (
            <Box w="100%" pr={"1.5rem"}>
              {ressourceBody}
              {ressourceBody}
              {ressourceBody}
            </Box>
          )}
          <Box flexDir={"column"} minW="auto" position="sticky" top={0}>
            <RessourceMenu />
            {!isLargerThan768 && (
              <Box w="100%" px={"1.5rem"}>
                {ressourceBody}
              </Box>
            )}
            <RessourceInfos />
          </Box>
        </Flex>
      </Container>
      <Feedback id={ressource.id} />
      <RessourceSimilar similarRessources={similarRessources} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetchApi
    .get("/api/ressources/find", { id: parseInt(id as string) })
    .then((response) => {
      return response;
    });

  const theme = res.theme;
  const similarRes = await fetchApi
    .get("/api/ressources/list", {
      pagination: { page: 1, pageSize: 12 },
      filters: { theme: theme.id },
    })
    .then((response) => {
      return response.data;
    });

  return {
    props: {
      ressource: res,
      similarRessources: similarRes,
    },
  };
};

export default RessourcePage;
