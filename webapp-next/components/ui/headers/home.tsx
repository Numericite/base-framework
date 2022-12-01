import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

const HomeHeader = () => {
  return (
    <Box bg="neutral">
      <Container maxW="container.2lg" pt={[8, 8, 8, 36]} pb={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box w={["100%", "100%", "100%", "45%"]}>
            <Heading as="h1" fontSize="5.5xl">
              Ressourcerie{" "}
              <Text
                as="span"
                bgGradient="linear(to-t, #2F80ED, #97F8B1)"
                bgClip="text"
              >
                RH
              </Text>{" "}
              et{" "}
              <Text as="span" color="primary">
                management
              </Text>
            </Heading>
            <Text fontSize="1.5xl" mt={6} color="neutralDark">
              Lörem ipsum vovis nivönon ködöst.
              <br /> Odegt anoll, om dekinde hihet. Eurologi anonåns.
            </Text>
            <Flex justifyContent="left" alignItems="center" mt={10}>
              <Button>
                Rechercher <ArrowForwardIcon ml={2} />
              </Button>
              <Button variant="neutral" ml={4}>
                À propos <ArrowForwardIcon ml={2} />
              </Button>
            </Flex>
          </Box>
          <Box
            display={["none", "none", "none", "block"]}
            w="55%"
            position="relative"
          >
            <Image
              src="/home_header_rob_body.png"
              alt="Header home rob"
              position="absolute"
              top="25%"
              left="45%"
              style={{
                transform: "translateX(-50%)translateY(-50%)",
              }}
              w="45%"
            />
            <Image src="/home_header_scene.png" alt="Header home scene" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomeHeader;
