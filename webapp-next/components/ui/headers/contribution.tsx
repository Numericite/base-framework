import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

const ContributionHeader = () => {
  return (
    <Box w="full" bg="neutral">
      <Container maxW="container.2lg" py={"2.75rem"}>
        <Heading pb={"1.5rem"}>Contribution</Heading>
        <Flex alignItems={"center"}>
          <Image src="./contribution_header_icon.png" w="10.25rem" />
          <Text color="#6B829B">
            Vous avez des ressources numériques RH et management intéressantes à
            partager ? Nous serions ravis de les inclure sur notre plateforme !
            Remplissez simplement ce formulaire de contribution et notre équipe
            se chargera de les examiner pour qu&apos;elles soient rapidement
            accessibles à tous.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default ContributionHeader;
