import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { TPersonae } from "../../../pages/api/personaes/types";
import { TPersonaeOccupation } from "../../../pages/api/personaeoccupations/types";
import { fetchApi } from "../../../utils/api/fetch-api";
import { TTheme } from "../../../pages/api/themes/types";
import { ChatBotProps, ChatBotStep, ChatBotStepResponse } from "./interfaces";
import { steps } from "./steps";
import { BsArrowRight } from "react-icons/bs";
import IconPlaceHolder from "../icon-placeholder";
import { TRessource } from "../../../pages/api/ressources/types";
import Loader from "../loader";

const ChatBot: React.FC<ChatBotProps> = (props) => {
  let {
    toast,
    showToast,
    setShowToast,
    stepQuestion,
    setStepQuestion,
    isEditing,
  } = props;

  const [personaes, setPersonaes] = useState<TPersonae[]>();
  const [personaeOccupations, setPersonaeOccupations] =
    useState<TPersonaeOccupation[]>();
  const [themes, setThemes] = useState<TTheme[]>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState({
    help: false,
    personae: 0,
    occupation: 0,
    theme: 0,
    subTheme: 0,
    nextStep: stepQuestion ? stepQuestion : 0,
  });
  const [currentStep, setCurrentStep] = useState<ChatBotStep>();
  const [step, setStep] = useState(stepQuestion ? stepQuestion : 0);
  const [akinatorRessources, setAkinatorRessources] = useState<TRessource[]>(
    []
  );
  const [akinatorLoading, setAkinatorLoading] = useState<boolean>(true);

  const fetchPersonaes = () => {
    fetchApi
      .get("/api/personaes/list", { pagination: { page: 1, pageSize: 100 } })
      .then((response) => {
        setPersonaes(response.data);
      });
  };

  const fetchPersonaeOccupations = () => {
    fetchApi
      .get("/api/personaeoccupations/list", {
        pagination: { page: 1, pageSize: 100 },
      })
      .then((response) => {
        setPersonaeOccupations(response.data);
      });
  };

  const fetchThemes = () => {
    fetchApi
      .get("/api/themes/list", { pagination: { page: 1, pageSize: 100 } })
      .then((response) => {
        setThemes(response.data);
      });
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const getResponsesFromStep = (
    stepIndex: number,
    tmpPersonae: TPersonae[],
    tmpPersonaeOccupations: TPersonaeOccupation[],
    tmpThemes: TTheme[]
  ) => {
    switch (stepIndex) {
      case 1:
        return tmpPersonae.map((_) => ({
          label: _.name,
          value: _.id,
          checked: selectedValue.personae === _.id,
        }));
      case 2:
        return tmpPersonaeOccupations
          .filter((_) => _.personae.id === selectedValue.personae)
          .map((_) => ({
            label: _.name,
            value: _.id,
            checked: selectedValue.occupation === _.id,
          }));
      case 3:
        return tmpThemes
          .filter((_) =>
            _.personaes?.map((p) => p.id).includes(selectedValue.personae)
          )
          .map((_) => ({
            label: _.name,
            value: _.id,
            checked: selectedValue.theme === _.id,
          }));
      case 4:
        const theme = tmpThemes.find((_) => _.id === selectedValue.theme);
        if (theme)
          return theme.sub_themes?.map((_) => ({
            label: _.name,
            value: _.id,
            checked: selectedValue.subTheme === _.id,
          }));
        break;
    }

    return [];
  };

  useEffect(() => {
    if (step === 5) {
      fetchApi
        .get("/api/ressources/akinator", {
          pagination: {
            page: 1,
            pageSize: 3,
          },
          ...selectedValue,
        })
        .then((responses) => {
          setAkinatorRessources(responses.data);
          setAkinatorLoading(false);
        });
    }
  }, [step]);

  useEffect(() => {
    if (personaes && personaeOccupations && themes && showToast) {
      if (setStepQuestion) setStepQuestion(selectedValue.nextStep);

      if (selectedValue.nextStep > 0) {
        let responses: ChatBotStepResponse[] | undefined = getResponsesFromStep(
          selectedValue.nextStep,
          personaes,
          personaeOccupations,
          themes
        );

        setCurrentStep({
          ...steps[selectedValue.nextStep],
          responses,
        });
        setStep(selectedValue.nextStep);
      } else {
        setCurrentStep({
          ...steps[0],
        });
        setStep(0);
      }
    }
  }, [personaes, personaeOccupations, themes, showToast, selectedValue]);

  useEffect(() => {}, [selectedValue]);

  useEffect(() => {
    fetchPersonaes();
    fetchPersonaeOccupations();
    fetchThemes();
  }, []);

  const homeStyle = step === 0 ? "40%" : step === 1 ? "60%" : "max-content";
  const toastStyle = step === 0 ? "30%" : "40%";
  const scrollbarStyle = {
    "::-webkit-scrollbar": { width: "4px" },
    "::-webkit-scrollbar-thumb": { background: "#000" },
  };

  const backButton = (
    slug?: "personae" | "occupation" | "theme" | "subTheme"
  ) => {
    if (!toast)
      return (
        <Flex alignItems="center" mb={4}>
          <HStack
            cursor="pointer"
            onClick={() => {
              if (slug) {
                selectedValue[slug] = 0;
              }
              setSelectedValue({ ...selectedValue, nextStep: step - 1 });
              if (setStepQuestion) setStepQuestion(step - 1);
            }}
          >
            <FiArrowLeftCircle color="blue" />{" "}
            <Text
              ml={1}
              fontSize={12}
              fontWeight={"500"}
              _hover={{ textDecor: "underline" }}
            >
              Précédent
            </Text>
          </HStack>
        </Flex>
      );
  };

  if (!currentStep || !personaes || !personaeOccupations || !themes)
    return <></>;

  const displayQuestion = (tmpStep: ChatBotStep) => {
    const stepIndex = steps.findIndex((s) => s.slug === tmpStep.slug);
    return (
      <Flex flexDir={"column"} key={tmpStep.slug}>
        <Flex alignItems="center">
          {toast && (
            <Image
              src="/chatbot/Rob.png"
              alt="Rob"
              mr={4}
              display={["none", "none", "none", "flex"]}
            />
          )}
          <Box>
            {step > 0 && tmpStep.slug !== "help" && backButton(tmpStep.slug)}
            <Flex flexDir="column" alignItems="flex-start">
              <Text
                as={"div"}
                color="#204064"
                fontSize={
                  currentStep.slug === tmpStep.slug
                    ? ["xl", "xl", "xl", "20px"]
                    : ["xl", "xl", "xl", "16px"]
                }
                fontWeight={600}
                opacity={currentStep.slug === tmpStep.slug ? 1 : 0.7}
              >
                {tmpStep.title}
              </Text>
            </Flex>
            <Flex py={3.5} align="flex-start" flexWrap="wrap" gap={2}>
              {tmpStep.responses ? (
                tmpStep.responses.map((response, index) => (
                  <Button
                    key={index}
                    variant={"gray"}
                    color={response.checked ? "white" : "#1B1D1F"}
                    bgGradient={
                      response.checked ? "linear(to-t, #97F8B1, #2F80ED)" : ""
                    }
                    mb={2}
                    onClick={() => {
                      selectedValue[tmpStep.slug] = response.value as never;
                      selectedValue.nextStep = stepIndex + 1;
                      setSelectedValue({ ...selectedValue });
                      setTimeout(() => {
                        scrollToBottom();
                      }, 100);
                    }}
                  >
                    {response.label}
                  </Button>
                ))
              ) : (
                <Flex mt={4}>
                  <Button
                    variant="neutral"
                    mr={4}
                    onClick={() => {
                      setShowToast(false);
                    }}
                  >
                    Non
                  </Button>
                  <Button
                    bgGradient="linear(to-t, #97F8B1, #2F80ED)"
                    onClick={() => {
                      setSelectedValue({
                        ...selectedValue,
                        help: true,
                        nextStep: 1,
                      });
                    }}
                  >
                    Oui <ArrowForwardIcon ml={2} />
                  </Button>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>
        {toast && step > 1 && <Divider my={2} />}
      </Flex>
    );
  };

  const displayOldQuestions = () => {
    if (step < 2) return <></>;

    return [...Array(step - 1)].map((n, index) => {
      let tmpStep: ChatBotStep = steps[index + 1];
      tmpStep.responses = getResponsesFromStep(
        index + 1,
        personaes,
        personaeOccupations,
        themes
      );
      return displayQuestion(tmpStep);
    });
  };

  return (
    <>
      {showToast && (
        <>
          {!toast && (
            <Box
              pos="absolute"
              right="30%"
              top="30%"
              bg="white"
              w="32px"
              h="32px"
              transition={"0.8s"}
              zIndex={999}
              style={{
                transform: "translateY(-50%)",
                rotate: "45deg",
                opacity: showToast ? 1 : 0,
              }}
            />
          )}
          <Box
            className="chatbot-questions-box"
            background="white"
            borderRadius="16px"
            p={6}
            overflowY="auto"
            overflowX="hidden"
            pos={toast ? "fixed" : "absolute"}
            boxShadow={toast ? "lg" : "none"}
            top={toast ? "auto" : "30%"}
            left={toast ? "auto" : "45%"}
            right={toast ? ["0", "0", "0", "5%"] : "auto"}
            bottom={toast ? "0" : "auto"}
            width={toast ? ["100%", "100%", "100%", toastStyle] : homeStyle}
            sx={scrollbarStyle}
            maxW={toast ? ["100%", "100%", "100%", "40%"] : "630px"}
            maxH={toast ? "80%" : "auto"}
            zIndex={990}
            border={"1px solid #E9F1FF"}
            transition={"0.8s"}
            style={{
              opacity: showToast ? 1 : 0,
            }}
          >
            {toast && step > 0 && (
              <Box
                pos="sticky"
                top={1}
                float="right"
                cursor="pointer"
                zIndex={99}
                onClick={() => setShowToast(false)}
              >
                <CloseIcon color="blue" cursor="pointer" />
              </Box>
            )}
            {toast && displayOldQuestions()}
            {step < 5 && displayQuestion(currentStep)}
            {step >= 5 && !isEditing && (
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
                  {akinatorLoading ? (
                    <Box h={32}>
                      <Loader />
                    </Box>
                  ) : (
                    akinatorRessources.map((ressource, index) => (
                      <NextLink
                        href={"/ressources/" + ressource.id}
                        key={index}
                      >
                        <Flex
                          w="100%"
                          justifyContent={"space-between"}
                          px={"14px"}
                          py={"16px"}
                          border={"1px solid #E9F1FF"}
                          borderRadius={16}
                          alignItems="center"
                          cursor="pointer"
                        >
                          <Text
                            fontSize={"14px"}
                            color="#1B1D1F"
                            noOfLines={1}
                            paddingRight={4}
                          >
                            {ressource.name}
                          </Text>
                          <IconPlaceHolder kind={ressource.kind} />
                        </Flex>
                      </NextLink>
                    ))
                  )}
                </VStack>
                <NextLink
                  href={{
                    pathname: "/ressources",
                    query: {
                      personae: selectedValue.personae,
                      occupation: selectedValue.occupation,
                      theme: selectedValue.theme,
                      subTheme: selectedValue.subTheme,
                    },
                  }}
                >
                  <Flex
                    align="center"
                    width="fit-content"
                    mt={4}
                    cursor="pointer"
                    _hover={{ textDecor: "underline" }}
                  >
                    <Text
                      color="#204064"
                      fontSize="12px"
                      fontWeight="500"
                      mr={2}
                      display="flex"
                    >
                      Voir plus de ressources pour cette recherche
                    </Text>
                    <BsArrowRight color="blue" />
                  </Flex>
                </NextLink>
              </Box>
            )}
            {step >= 5 && isEditing && (
              <Flex justifyContent="center" pt={3}>
                <NextLink
                  href={{
                    pathname: "/ressources",
                    query: {
                      personae: selectedValue.personae,
                      occupation: selectedValue.occupation,
                      theme: selectedValue.theme,
                      subTheme: selectedValue.subTheme,
                    },
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowToast(false);
                    }}
                  >
                    Afficher les ressources
                    <ArrowForwardIcon ml={2} />
                  </Button>
                </NextLink>
              </Flex>
            )}
            <Box ref={bottomRef} />
          </Box>
        </>
      )}
    </>
  );
};

export default ChatBot;
