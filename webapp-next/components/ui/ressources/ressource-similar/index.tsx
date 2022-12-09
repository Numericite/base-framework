import { Box, Container, Heading } from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";
import { Provider, Carousel } from "chakra-ui-carousel";
import RessourceCard from "../ressource-card";

interface Props {
  similarRessources: TRessource[];
}

const RessourceSimilar: React.FC<Props> = ({ similarRessources }) => {
  return (
    <Box bg="#FAFCFF" w="100%" py="5.25rem">
      <Container minW="container.2lg">
        <Heading mb={"2.75rem"}>Ressources similaires</Heading>
        <Provider>
          <Carousel gap={20}>
            {similarRessources.map((ressource) => {
              return <RessourceCard ressource={ressource} key={ressource.id} />;
            })}
          </Carousel>
        </Provider>
      </Container>
    </Box>
  );
};

export default RessourceSimilar;
