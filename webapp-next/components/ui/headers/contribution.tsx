import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

const ContributionHeader = () => {
  return (
    <Box w="full" bg="neutral">
      <Container maxW="container.2lg" py={"2.75rem"}>
        <Heading pb={"1.5rem"}>Contribution</Heading>
        <Flex alignItems={"center"}>
          <Image src="./contribution_header_icon.png" w="10.25rem" />
          <Text color="#6B829B">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            reprehenderit aspernatur totam tempora, ad sequi quidem cum
            cupiditate quo, id, amet sit voluptas inventore aliquid commodi
            optio fuga quam architecto.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default ContributionHeader;
