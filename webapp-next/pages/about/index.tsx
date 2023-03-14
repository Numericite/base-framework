import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const About: React.FC = () => {
  const tabPannels = [
    {
      id: 1,
      title: "Qu'est-ce qu'une ressourcerie ?",
      content:
        "Content de la ressourcerie, c'est quoi ? c'est le pannel 1, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor. ",
      subContent:
        "Content de niveau 2 du pannel 1, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor. ",
    },
    {
      id: 2,
      title: "A qui s'adresser ?",
      content:
        "C'est pour qui ? c'est le pannel 2, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor.",
      subContent:
        "Content de niveau 2 du pannel 2; Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor. ",
    },
    {
      id: 3,
      title: "D'où vient l'initiative ?",
      content:
        "Qui a lancé ? c'est le pannel 3, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor.",
      subContent:
        "Content de niveau 2 du pannel 3, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning renera fastän onas aden donade har donde. Sepoligt herade pons. Embrejsa sor. ",
    },
  ];

  const valueCards = [
    {
      id: 1,
      title: "Accueillante",
      icon: "hand-holding-user.png",
    },
    {
      id: 2,
      title: "Efficace",
      icon: "target.png",
    },
    {
      id: 3,
      title: "Originale",
      icon: "atom.png",
    },
    {
      id: 4,
      title: "Audacieuse",
      icon: "plus.png",
    },
  ];

  return (
    <Box>
      <Box w="full" bg="neutral" py={"2.75rem"}>
        <Container maxW="container.2lg">
          <Heading as="h3" size="xl" mb={"1.5rem"}>
            A propos
          </Heading>
          <Text color="neutralDark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </Text>
        </Container>
      </Box>
      <Container maxW="container.2lg" py={"4rem"}>
        <Flex>
          <Image src="about.png" alt="about" />
          <Box ml={"2rem"}>
            <Heading as="h3" size="lg" mb={"1.5rem"}>
              Une ressourcerie RH et management spécifique à la{" "}
              <Text
                as="span"
                bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
                bgClip={"text"}
              >
                Fonction Publique
              </Text>
            </Heading>
            <Tabs variant={"soft-rounded"} colorScheme="blue">
              <TabList w="full">
                {tabPannels.map((tabPannel) => (
                  <Tab key={tabPannel.id}>{tabPannel.title}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {tabPannels.map((tabPannel) => (
                  <TabPanel key={tabPannel.id}>
                    <Text>{tabPannel.content}</Text>
                    <Flex pt={"1.25rem"}>
                      <Box
                        bgGradient={
                          "linear-gradient(360deg, #97F8B1 0%, #2F6CFF 100%)"
                        }
                        borderRadius={"full"}
                        mr={"0.875rem"}
                        w={"3px"}
                        bgClip={"border-box"}
                      />
                      <Text color={"neutralDark"}>{tabPannel.subContent}</Text>
                    </Flex>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Container>
      <Box w="full" bg="neutral" py={"2.75rem"}>
        <Container maxW="container.2lg">
          <Flex>
            <Box w={"60%"} mr={"3.75rem"}>
              <Heading as="h3" size="lg" mb={"1.5rem"}>
                Les{" "}
                <Heading
                  as="span"
                  size="lg"
                  bgGradient={
                    "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"
                  }
                  bgClip={"text"}
                >
                  valeurs
                </Heading>{" "}
                de notre espace{" "}
              </Heading>
              <Text color="dark">
                Content de la ressourcerie, c&apos;est quoi ? c&apos;est le
                pannel 1, Lörem ipsum besade yna. Harabelt raliga. Pol
                dohegeska, terabalogi exoren, misk. Olig hemira didat setödyt,
                presade. Faning renera fastän onas aden donade har donde.
                Sepoligt herade pons. Embrejsa sor.
              </Text>
              <Flex pt={"1.25rem"}>
                <Box
                  bgGradient={
                    "linear-gradient(360deg, #97F8B1 0%, #2F6CFF 100%)"
                  }
                  borderRadius={"full"}
                  mr={"0.875rem"}
                  w={"3px"}
                  bgClip={"border-box"}
                />
                <Text color={"neutralDark"}>
                  Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska,
                  terabalogi exoren, misk. Olig hemira didat setödyt, presade.
                  Faning renera fastän onas aden donade ha
                </Text>
              </Flex>
            </Box>
            <SimpleGrid columns={2} spacing={5} w="40%">
              {valueCards.map((valueCard) => (
                <Box
                  bg="neutralLightBlue"
                  borderRadius={"md"}
                  alignItems={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  py={"1.25rem"}
                  key={valueCard.id}
                >
                  <Image
                    src={valueCard.icon}
                    alt={valueCard.icon}
                    w={"3.3rem"}
                    pb={"0.625rem"}
                  />
                  <Text>{valueCard.title}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Container>
      </Box>
      <Box>
        <Container maxW="container.2lg" py={"4rem"}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </Text>
        </Container>
      </Box>
      <Box w="full" bg="neutral" py={"2.75rem"}>
        <Container maxW="container.2lg">
          <Heading as="h3" size="lg" mb={"1.5rem"}>
            Qui sommes nous ?
          </Heading>
          <Text color="dark">
            Content de la ressourcerie, c&apos;est quoi ? c&apos;est le pannel
            1, Lörem ipsum besade yna. Harabelt raliga. Pol dohegeska,
            terabalogi exoren, misk. Olig hemira didat setödyt, presade. Faning
            renera fastän onas aden donade har donde. Sepoligt herade pons.
            Embrejsa sor.
          </Text>
          <Flex pt={"1.25rem"}>
            <Box
              bgGradient={"linear-gradient(360deg, #97F8B1 0%, #2F6CFF 100%)"}
              borderRadius={"full"}
              mr={"0.875rem"}
              w={"3px"}
              bgClip={"border-box"}
            />

            <Text color="neutralDark">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
