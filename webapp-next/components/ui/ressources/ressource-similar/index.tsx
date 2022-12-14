import { Box, Container, Heading, Flex } from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";
import RessourceCard from "../ressource-card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChakraCarousel from "../../chakra-carousel";

interface Props {
  similarRessources: TRessource[];
}

const RessourceSimilar: React.FC<Props> = ({ similarRessources }) => {
  const elements = similarRessources.map((ressource) => {
    return <RessourceCard key={ressource.id} ressource={ressource} />;
  });

  return (
    <Box bg="#FAFCFF" w="100%" py="5.25rem">
      <Container maxW="container.2lg">
        <Heading mb={"2.75rem"}>Ressources similaires</Heading>
        <ChakraCarousel gap={8}>{elements}</ChakraCarousel>
      </Container>
    </Box>
  );
};

export default RessourceSimilar;
