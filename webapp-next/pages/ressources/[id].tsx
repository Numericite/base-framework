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

interface Props {
  ressource: TRessource;
  id: string;
  similarRessources: TRessource[];
}

const RessourcePage: React.FC<Props> = ({
  id,
  ressource,
  similarRessources,
}) => {
  return (
    <Box>
      <RessourceHeader
        title={ressource.name}
        description={ressource.description}
        kind={ressource.kind}
      />
      <Container maxW="container.2lg" my="2.125rem">
        <Flex justifyItems={"space-between"} position="relative">
          <Box w="100%" pr={"1.5rem"}>
            <h1>Ressource {id}</h1>
            <ReactMarkdown>{ressource.content}</ReactMarkdown>
            <ReactMarkdown>{ressource.content}</ReactMarkdown>
            <ReactMarkdown>{ressource.content}</ReactMarkdown>
            <ReactMarkdown>{ressource.content}</ReactMarkdown>
          </Box>
          <Box flexDir={"column"} minW="auto" position="sticky" top={0}>
            <RessourceMenu />
            <RessourceInfos />
          </Box>
        </Flex>
      </Container>
      <Feedback />
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
      id,
      ressource: res,
      similarRessources: similarRes,
    },
  };
};

export default RessourcePage;
