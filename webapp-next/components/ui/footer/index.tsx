import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Image, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  const externalLinks = [
    {
      name: "legifrance.gouv.fr",
      url: "https://www.legifrance.gouv.fr/",
    },
    {
      name: "gouvernement.fr",
      url: "https://www.gouvernement.fr/",
    },
    {
      name: "service-public.fr",
      url: "https://www.service-public.fr/",
    },
    {
      name: "data.gouv.fr",
      url: "https://data.gouv.fr/",
    },
  ];

  const internalLinks = [
    {
      name: "Plan du site",
      url: "/",
    },
    {
      name: "Accessibilité",
      url: "/",
    },
    {
      name: "Mentions légales",
      url: "/",
    },
    {
      name: "Données personnelles",
      url: "/",
    },
    {
      name: "Gestion des cookies",
      url: "/",
    },
  ];

  return (
    <Box borderTopWidth={1} borderTopColor="#E9F1FF" fontFamily={"Marianne"}>
      <Container maxW="container.2lg" py={[6]}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Image src="/logo-marianne.png" alt="Marianne" />
          <Box w={["100%", "100%", "55%"]} fontSize="sm">
            <Text>
              Texte optionnel 3 lignes maximum. <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur et vel quam auctor semper. Cras si amet mollis dolor.
            </Text>
            <Flex mt={4} flexWrap="wrap" fontFamily={"Marianne Bold"}>
              {externalLinks.map((eLink) => (
                <Box key={eLink.name} as="span" mr={6}>
                  <Link href={eLink.url} target="_blank">
                    <Flex alignItems="center">
                      {eLink.name} <ExternalLinkIcon ml={1} />
                    </Flex>
                  </Link>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
        <Box fontSize="xs" color="#9DADBF" mt={10}>
          <Flex flexWrap="wrap">
            {internalLinks.map((iLink) => (
              <Box key={iLink.name} mr={9}>
                <Link as={NextLink} href={iLink.url}>
                  {iLink.name}
                </Link>
              </Box>
            ))}
          </Flex>
          <Flex mt={8}>
            Sauf mention contraire, tous les contenus de ce site sont sous
            &nbsp;
            <Link
              href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
              target="_blank"
            >
              <Flex alignItems="center">
                licence etalab-2.0 <ExternalLinkIcon ml={1} />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
