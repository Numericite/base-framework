import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
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
        "Cet espace consiste en la mise en commun de ressources et de solutions utiles aux administrations publiques sur les thématiques du développement RH et du management. On y retrouve des ressources diversifiées (références juridiques, apports de connaissances, outils techniques,…) dans des formats variés (vidéos, PDF téléchargeables, liens vers d'autres sites). L'objectif ? Réunir en un seul espace des ressources dispersées, mettre en partage des pratiques et expériences des administrations normandes et donner un éclairage à des initiatives qui manquent de visibilité.",
      subContent:
        "Comme toutes les ressourceries, cet espace est contributif : tout le monde peut y déposer des contenus. Service RH, managers, agents publics ou personnes extérieures à l'Administration peuvent proposer un document, partager une expérience, ou donner accès à un outil sur l'espace de contribution (soumis à validation du Comité éditorial).",
    },
    {
      id: 2,
      title: "A qui s'adresse-t-elle ?",
      content:
        "Les personnels des services RH, les managers et tous les agents publics, fonctionnaires comme contractuels affectés dans les services publics normands, peuvent trouver dans cet espace, des ressources en concordance avec leurs activités professionnelles ou leurs carrières. Plus largement, tout le monde peut y glaner des informations sur la fonction publique pour mieux la connaître : étudiants, demandeurs d'emploi, partenaires du secteur privé, etc.",
    },
    {
      id: 3,
      title: "D'où vient l'initiative ?",
      content:
        "Les administrations publiques et leurs personnels sont confrontés à une masse considérable d'informations et de sites internet éparpillés. De son côté, la PFRH est souvent sollicitée par des services ou par des agents des 3 versants de la fonction publique pour répondre à des questions d'ordre RH ou managérial. Elle rencontre également des étudiants, demandeurs d'emploi, entreprises et associations quand elle travaille, entre autres, à la promotion de l'emploi public. L'équipe de la PFRH a alors décidé de simplifier l'accès à l'information en créant cette ressourcerie contributive alimentée par ses soins mais aussi par les premiers experts : les utilisateurs de cet espace eux-mêmes.",
      subContent:
        "La ressourcerie vous propose une aide pour chercher et trouver les documents les plus pertinents grâce à un assistant doté d'une intelligence artificielle : Rob le robot.",
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
            Les ressourceries, vous connaissez ? Ce sont des lieux de collecte,
            de réemploi et de valorisation d&apos;objets et de matériaux. Dans
            la Ressourcerie RH et management de Normandie, vous ne trouverez ni
            table, ni vaisselle ni briques anciennes mais des informations, des
            outils, des conseils pratiques, des connaissances sur les grands
            thèmes de la RH et du management dans les administrations publiques.
            Pour faire le tri, ROB le robot vous aidera à accéder facilement aux
            ressources qui vous intéressent.
          </Text>
        </Container>
      </Box>
      <Container maxW="container.2lg" py={"4rem"}>
        <Flex>
          <Image
            src="about.png"
            alt="about"
            w="390px"
            h="390px"
            alignSelf={"flex-start"}
          />
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
              <Text as="span" color="primary">
                {" "}
                ...et normande{" "}
              </Text>
            </Heading>
            <Tabs variant={"blueVersion"} colorScheme="blue">
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
                        minW={"1px"}
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
              <Text color="dark" py={1}>
                <Text as="span" color="primary" fontWeight="bold">
                  Accueillante :
                </Text>{" "}
                parce que trop de sites internet sont froids et formatés, nous
                voulons être un espace chaleureux et ouvert, intuitif et simple
                d&apos;accès, positif et optimiste, qui donne envie de
                découvrir.
              </Text>
              <Text color="dark" py={1}>
                <Text as="span" color="primary" fontWeight="bold">
                  Efficace :
                </Text>{" "}
                parce que trop de sites internet sont froids et formatés, nous
                voulons être un espace chaleureux et ouvert, intuitif et simple
                d&apos;accès, positif et optimiste, qui donne envie de
                découvrir.
              </Text>
              <Text color="dark" py={1}>
                <Text as="span" color="primary" fontWeight="bold">
                  Originale :
                </Text>{" "}
                dépassant les préjugés sur les administrations publiques, cette
                ressourcerie propose une approche différente pour défricher des
                terres inconnues ou mal connues.
              </Text>
              <Text color="dark" py={1}>
                <Text as="span" color="primary" fontWeight="bold">
                  Audacieuse :
                </Text>{" "}
                la Ressourcerie RH et management ose, elle expérimente et
                s&apos;améliore en continue. La ressourcerie aspire également à
                structurer et dynamiser la communauté régionale des services RH
                et les managers.
              </Text>
              <Flex pt={"1.25rem"}>
                <Box
                  bgGradient={
                    "linear-gradient(360deg, #97F8B1 0%, #2F6CFF 100%)"
                  }
                  borderRadius={"full"}
                  mr={"0.875rem"}
                  minW={"1px"}
                  bgClip={"border-box"}
                />
                <Text color={"neutralDark"}>
                  Cette ressourcerie a vocation à mettre la lumière sur
                  certaines thématiques RH insuffisamment valorisées. Or, la
                  politique RH peut être considérée comme une politique publique
                  à part entière.
                </Text>
              </Flex>
            </Box>
            <SimpleGrid
              columns={2}
              h="fit-content"
              alignSelf={"center"}
              spacing={10}
              w="40%"
            >
              {valueCards.map((valueCard) => (
                <Box
                  bg="neutralLightBlue"
                  borderRadius={"md"}
                  alignItems={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                  maxH={"10rem"}
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
                  <Text fontWeight={"600"}>{valueCard.title}</Text>
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
            Les agents de la Plateforme d&apos;appui RH interministérielle
            (PFRH) de Normandie se cachent derrière cette Ressourcerie. La PFRH
            est un service de la Préfecture de Région et de la Direction
            générale de l&apos;Administration et de la Fonction publique
            (DGAFP), rattaché au Secrétariat général pour les Affaires
            régionales (SGAR). Son rôle est d&apos;accompagner et de conseiller
            les administrations publiques normandes dans les domaines des
            ressources humaines et du management. L&apos;équipe de la PFRH,
            c&apos;est 5 conseiller(e)s, 1 chargé(e) de formation et 1
            directeur/directrice qui sont à votre écoute.
          </Text>
          <Flex pt={"1.25rem"}>
            <Box
              bgGradient={"linear-gradient(360deg, #97F8B1 0%, #2F6CFF 100%)"}
              borderRadius={"full"}
              mr={"0.875rem"}
              minW={"1px"}
              bgClip={"border-box"}
            />
            <Box>
              <Text color="neutralDark">
                Vous voulez en savoir plus sur les missions d&apos;une PFRH ?
              </Text>
              <Link
                color="neutralDark"
                href="https://www.youtube.com/watch?v=3VOuJdG0unM"
                target={"_blank"}
                rel="noopener noreferrer"
                textAlign={"center"}
                verticalAlign={"middle"}
              >
                Présentation des PFRH <ExternalLinkIcon />
              </Link>
              <Text color="neutralDark">
                Vous voulez en savoir plus sur la PFRH de Normandie ?
              </Text>
            </Box>
          </Flex>
          <Flex
            w="full"
            pt={5}
            justifyContent="center"
            alignContent={"center"}
            flexDir="column"
          >
            <Text color="dark" alignSelf={"center"}>
              Vous voulez nous contacter?
            </Text>
            <Link
              alignSelf={"center"}
              href="mailto:plate-forme-rh@normandie.gouv.fr"
            >
              plate-forme-rh@normandie.gouv.fr
            </Link>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
