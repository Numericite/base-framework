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
import NextLink from "next/link";

const Infos = () => {
  return (
    <Container maxW="container.2lg" py={[12, 12, 12, 20]}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        flexDirection={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
      >
        <Box w={["100%", "100%", "100%", "30%"]}>
          <Heading fontSize={["3xl", "3xl", "3xl", "5xl"]} mt={[8, 8, 8, 0]}>
            Lorem ipsum{" "}
            <Text
              as="span"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
            >
              dolors
            </Text>{" "}
            asit met ?
          </Heading>
          <Text
            fontSize={["xl", "xl", "xl", "1.5xl"]}
            mt={4}
            color="neutralDark"
          >
            Lörem ipsum vovis nivönon ködöst. Odegt anoll !
          </Text>
          <NextLink href="/about">
            <Button variant="neutral" mt={16}>
              En savoir plus <ArrowForwardIcon ml={4} />
            </Button>
          </NextLink>
        </Box>
        <Box w={["100%", "100%", "100%", "70%"]} pl={[0, 0, 0, 16]}>
          <Image src="/home_infos.png" alt="Home infos illustration" />
        </Box>
      </Flex>
    </Container>
  );
};

export default Infos;
