import { Box, Container, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import RessourceHeader from "../../components/ui/ressources/header";
import { TRessource } from "../api/ressources/types";
import ReactMarkdown from "react-markdown";
import { fetchApi } from "../../utils/api/fetch-api";
import RessourceMenu from "../../components/ui/ressources/ressource-menu";
import RessourceInfos from "../../components/ui/ressources/ressource-info";

interface Props {
  ressource: TRessource;
  id: string;
}

const RessourcePage: React.FC<Props> = ({ id, ressource }) => {
  return (
    <Box>
      <RessourceHeader
        title={ressource.name}
        description={ressource.description}
      />
      <Container maxW="container.2lg" mt="2.125rem">
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
  return {
    props: {
      id,
      ressource: res,
    },
  };
};

export default RessourcePage;
