import SearchBar from "../../components/ui/ressources/searchbar";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RessourceCard from "../../components/ui/ressources/ressource-card";
import { fetchApi } from "../../utils/api/fetch-api";
import { TRessource } from "../api/ressources/types";

const Ressources: React.FC = () => {
  const [ressources, setRessources] = useState<TRessource[]>([]);

  const fetchRessources = () => {
    fetchApi.get("/api/ressources/list").then((response) => {
      setRessources(response.data);
    });
  };

  useEffect(() => {
    fetchRessources();
  }, []);

  const displayRessources = ressources.map((ressource) => {
    return <RessourceCard key={ressource.id} ressource={ressource} />;
  });

  return (
    <>
      <Box bg={"neutral"}>
        <Container maxW="container.2lg" py={"2.75rem"} mb={"2.75rem"}>
          <Heading pb={6}>Ressources</Heading>
          <SearchBar />
        </Container>
      </Box>
      <Container maxW="container.2lg" pb={6}>
        <SimpleGrid gap={9} columns={[1, 2, 3]}>
          {displayRessources}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Ressources;
