import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import HomeSearchBar from "../homepage/home-search-bar";
import { useEffect, useState } from "react";
import {FiArrowLeftCircle} from "react-icons/fi"
import {BsArrowRight} from "react-icons/bs"
import { TChatBotUser } from "../../../pages/api/chatbotusers/types";
import { TChatBotOccupation } from "../../../pages/api/chatbotoccupations/types";
import { TChatBotInformation } from "../../../pages/api/chatbotinformations/types";
import { fetchApi } from "../../../utils/api/fetch-api"


const HomeHeader = () => {
  const [chatBotUsers, setchatBotUsers] = useState<TChatBotUser[]>([]);
  const [chatBotOccupations, setchatBotOccupations] = useState<TChatBotOccupation[]>([]);
  const [chatBotInformation, setchatBotInformation] = useState<TChatBotInformation[]>([]);
  const [selectedValue, setSelectedValue] = useState({user: "", occupation: "", information: "", moreInformation: ""})
  const [showDialogue, setshowDialogue] = useState(false);
  const [step, setStep] = useState(1);

  const robotSteps = [
    {step: 1, image: "cuteRobot_smile.png"},
    {step: 2, image: "cuteRobot_eye.png"},
    {step: 3, image: "cuteRobot_cute.png"},
    {step: 4, image: "cuteRobot_love.png"},
    {step: 5, image: "cuteRobot_amazing.png"},
    {step: 6, image: "cuteRobot_super.png"},
  ]

  const fetchChatBotUsers = () => {
    fetchApi
      .get("/api/chatbotusers/list", { pagination: { page: 1, pageSize: 100 }})
      .then((response) => {
        setchatBotUsers(response.data);
      });
  };

  const fetchChatBotOccupations = () => {
    fetchApi
      .get("/api/chatbotoccupations/list", { pagination: { page: 1, pageSize: 100 }})
      .then((response) => {
        setchatBotOccupations(response.data);
      });
  };

  const fetchChatBotInformation = () => {
    fetchApi
      .get("/api/chatbotinformations/list", { pagination: { page: 1, pageSize: 100 }})
      .then((response) => {
        setchatBotInformation(response.data);
      });
  };

  const scrollbarStyle = { '::-webkit-scrollbar':{height:'6px', background: "#f1f1f1"},"::-webkit-scrollbar-thumb": {background: "#2F6CFF"} }

  // const users = ["Agent de la fonction publique", "Employé(e)s du secteur privé", "Étudiants", "En recherche d'emploi", "Retraités"];
  
  // const occupations = ["Directeur", "DRH", "Stage", "En reconversion professionnelle", "Futurs retraités", "Manageur", "Entreprise", "Étudiants en parcours dans la FP", "Demandeurs d'emplois longue durée", "Retraités actés", "Apprentis", "Employés", "Étudiant en fin de parcours souhaitant intégrer la FP", "Demandeurs d'emplois en transition", "Autres (Opérationnels)"]

  // const information = ["Entrer et travailler dans la fonction publique", "Être agent public au quotidien", "Comment évoluer au sein de la fonction publique", "Outils et méthodes pro", "Qualité de vie et conditions de travail", "Travailler avec et pour la fonction publique"]

  // const information_bis = ["Cartographie des métiers", "Informations sur un métier spécifique", "Recrutement", "Concours", "Carrière et rémunération", "Fin de contrat", "Droits dans la fonction publique", "Mobilité interne", "Formation et accompagnement","Quitter la fonction publique", "Préparer ma retraite", "Management", "Pilotage", "Organisation du travail", "Conduite de projets", "Compétences relationelles", "Gestion des conflits", "Télétravail", "Santé", "Aides et préstations", "Prévention", " Marchés publics", "Conventions et partenariats", "Besoins de la FP"]

  const botRessources = [
    {name: "Ressource 1", icon: "icon_computer.png"},
    {name: "Ressource 2", icon: "icon_play.png"},
    {name: "Ressource 3", icon: "icon_document.png"},
  ]

  const backButton = () => {
    return (
      <Flex alignItems="center" mb={4}><HStack cursor="pointer" onClick={() =>{setStep(step -1)}}><FiArrowLeftCircle color="blue"/> <Text ml={1} fontSize={12} fontWeight={"500"} _hover={{textDecor: "underline"}}>Précédent</Text></HStack></Flex> 
    )
  }

  useEffect(() => {
    fetchChatBotUsers();
    fetchChatBotOccupations();
    fetchChatBotInformation();
  }, []);

  return (
    <Box bg="neutral">
      <Container maxW="container.2lg" pt={[8, 8, 8, 36]} pb={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box w={["100%", "100%", "100%", "45%"]}>
            <Heading as="h1" fontSize={["4xl", "4xl", "4xl", "5.5xl"]}>
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
            <Text
              fontSize={["xl", "xl", "xl", "1.5xl"]}
              mt={6}
              color="neutralDark"
            >
              Lörem ipsum vovis nivönon ködöst.
              <br /> Odegt anoll, om dekinde hihet. Eurologi anonåns.
            </Text>
            <Flex justifyContent="left" alignItems="center" mt={10}>
              <NextLink href={"/ressources"}>
                <Button>
                  Ressources <ArrowForwardIcon ml={2} />
                </Button>
              </NextLink>
              <NextLink href="/about">
                <Button variant="neutral" ml={4}>
                  À propos <ArrowForwardIcon ml={2} />
                </Button>
              </NextLink>
            </Flex>
          </Box>
          <Box
            display={["none", "none", "none", "block"]}
            w="55%"
            position="relative"
            className="chatBot"
          >
            <Box
              pos="absolute"
              right="53%"
              top="30%"
              bg="white"
              w="32px"
              h="32px"
              transition={"0.5s"}
              zIndex={999}
              style={{
                transform: "translateY(-50%)",
                rotate: "45deg",
                opacity: showDialogue ? 1 : 0,
              }}
            />
            <Box
              onMouseEnter={() => setshowDialogue(true)}
              onMouseLeave={() => {if(step === 1) setshowDialogue(false)}}
            >
              <Box
                background="white"
                borderRadius="16px"
                p={6}
                pos="absolute"
                top="30%"
                left="0%"
                width={step === 1 ? "65%" : "auto"}
                maxW='100%'
                zIndex={999}
                transition={"0.8s"}
                style={{
                  opacity: showDialogue ? 1 : 0,
                }}
              >
                {step === 1 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    <Text>Bonjour,</Text>
                    <Text>
                      Je suis {""}
                      <Text
                        as="span"
                        bgGradient={
                          "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"
                        }
                        bgClip={"text"}
                      >
                        Rob’
                      </Text>
                      , puis-je t’aider à trouver ce que tu recherches ?
                    </Text>
                    <Flex mt={4}>
                      <Button variant="neutral" mr={4} onClick={() => setshowDialogue(false)}>
                        Non
                      </Button>
                      <Button
                        bgGradient="linear(to-t, #2F80ED, #97F8B1)"
                        onClick={() => setStep(2)}
                      >
                        Oui <ArrowForwardIcon ml={2} />
                      </Button>
                    </Flex>
                  </Box>
                )}
                {step === 2 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    <Text>Super !</Text>
                    <Text>
                      Dis m’en plus sur toi,{""}
                      <Text
                        ml={2}
                        as="span"
                        bgGradient={
                          "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"
                        }
                        bgClip={"text"}
                      >
                        tu es
                      </Text>{" "}
                      ?
                    </Text>
                    <HStack py={3.5} align="flex-start" overflowX="auto" sx={scrollbarStyle}>
                      {chatBotUsers.map((user, index) => (
                        <Button key={index} variant="gray" mb={2} onClick={() => {
                          setSelectedValue({...selectedValue, user: user.name})
                          setStep(3)
                          }}>
                          {user.name}
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                )}
                {step === 3 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    {backButton()}
                    <Text>Quelle est ma situation ?</Text>
                    <HStack spacing={5} pt={3.5} pb={5} align="center" overflowX="auto" sx={scrollbarStyle}>
                      {chatBotOccupations.filter(occupation => occupation.chat_bot_user.name === selectedValue.user).map((occupation, index) => (
                        <Button key={index} variant="gray" onClick={() => {
                          setSelectedValue({...selectedValue, occupation: occupation.occupation})
                          setStep(4)
                          }}>
                          {occupation.occupation}
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                )}
                {step === 4 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    {backButton()}
                    <Text>Je cherche des informations sur...</Text>
                    <HStack spacing={5} pt={3.5} pb={5} align="center" overflowX="auto" sx={scrollbarStyle}>
                      {chatBotInformation.filter(info => info.chat_bot_users.some((information: any) =>
                              information.name === selectedValue.user
                            )).map((information, index) => (
                        <Button key={index} variant="gray" onClick={() => {
                          setSelectedValue({...selectedValue, information: information.information})
                          setStep(5)
                          }}>
                          {information.information}
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                )}
                {step === 5 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    {backButton()}
                    <Text>Et plus précisément sur...</Text>
                    <HStack spacing={5} pt={3.5} pb={5} align="center" overflowX="auto" sx={scrollbarStyle}>
                      {chatBotInformation.find(information => information.information === selectedValue.information)?.chat_bot_more_informations.map((info_bis, index) => (
                        <Button key={index} variant="gray" onClick={() => {
                          setSelectedValue({...selectedValue, moreInformation: info_bis.information})
                          setStep(6)
                          }}>
                          {info_bis.information}
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                )}
                {step === 6 && (
                  <Box
                    fontSize={["xl", "xl", "xl", "1.5xl"]}
                    color="#204064"
                    fontWeight="bold"
                  >
                    {backButton()}
                    <Text>
                    Voici les{""}
                      <Text
                        ml={2}
                        as="span"
                        bgGradient={
                          "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"
                        }
                        bgClip={"text"}
                      >
                       ressources
                      </Text>{" "}
                      que je peux te proposer :
                    </Text>
                    <VStack spacing={5} mt={3.5} align="left">
                      {botRessources.map((ressource, index) => (
                        <Box key={index}>
                          <Flex
                            w='100%'
                            justifyContent={"space-between"}
                            px={"14px"}
                            py={"16px"}
                            border={"1px solid #E9F1FF"}
                            borderRadius={16}
                            alignItems="center"
                            cursor="pointer"
                          >
                            <Text fontSize={"14px"} color="#1B1D1F">{ressource.name}</Text>
                            <Image src={'/chatbot/' + ressource.icon} alt="icone ressource"/>
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                    <NextLink href={"/ressources"}>
                      <Flex align="center" width="fit-content" mt={4} cursor="pointer" _hover={{textDecor: "underline"}}>
                        <Text color="#204064" fontSize="12px" fontWeight="500" mr={2} display='flex'>Voir toutes les ressources</Text>
                        <BsArrowRight color="blue"/>
                      </Flex>
                    </NextLink>
                  </Box>
                )}
              </Box>
              <Box
                position="absolute"
                top="28%"
                left="46%"
                w="50%"
                h="100%"
                transition={"0.5s"}
              >
                <Image src="/chatbot/cuteRobot_cute.png" alt="robot hi" zIndex={99} style={{transform: "translateX(-50%)translateY(-50%)", opacity: showDialogue && step === 1 ? 1 : 0}} transition={"0.5s"} pos="absolute" />
                <Image src="/chatbot/cuteRobot_smile.png" alt="robot hi" style={{transform: "translateX(-50%)translateY(-50%)"}} transition={"0.5s"} pos="absolute" />

                {robotSteps.map((robot,index) => (
                  <Box key={index}>
                    <Image src={"/chatbot/" + robot.image} alt={robot.image} style={{opacity: step === robot.step ? 1 : 0, transform: "translateX(-50%)translateY(-50%)"}} transition={"1s"} pos="absolute"/>
                  </Box> 
                ))}
              </Box>
            </Box>
            <Image src="/home_header_scene.png" alt="Header home scene" />
          </Box>
        </Flex>
        <HomeSearchBar />
      </Container>
    </Box>
  );
};

export default HomeHeader;
