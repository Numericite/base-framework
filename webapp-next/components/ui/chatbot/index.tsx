import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { TPersonae } from "../../../pages/api/personaes/types";
import { TPersonaeOccupation } from "../../../pages/api/personaeoccupations/types";
import { fetchApi } from "../../../utils/api/fetch-api";
import { TTheme } from "../../../pages/api/themes/types";
import { ChatBotProps, ChatBotStep, ChatBotStepResponse } from "./interfaces";
import { steps } from "./steps";

const ChatBot: React.FC<ChatBotProps> = (props) => {
  let { notif, showDialogue, setStepQuestion } = props;

  const [personaes, setPersonaes] = useState<TPersonae[]>();
  const [personaeOccupations, setPersonaeOccupations] =
    useState<TPersonaeOccupation[]>();
  const [themes, setThemes] = useState<TTheme[]>();

  const [selectedValue, setSelectedValue] = useState({
    help: false,
    personae: 0,
    occupation: 0,
    theme: 0,
    subTheme: 0,
  });
  const [currentStep, setCurrentStep] = useState<ChatBotStep>();
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

  const botRessources = [
    { name: "Ressource 1", icon: "icon_computer.png" },
    { name: "Ressource 2", icon: "icon_play.png" },
    { name: "Ressource 3", icon: "icon_document.png" },
  ];

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
            _.personaes.map((p) => p.id).includes(selectedValue.personae)
          )
          .map((_) => ({
            label: _.name,
            value: _.id,
            checked: selectedValue.theme === _.id,
          }));
      case 4:
        const theme = tmpThemes.find((_) => _.id === selectedValue.theme);
        if (theme)
          return theme.sub_themes.map((_) => ({
            label: _.name,
            value: _.id,
            checked: selectedValue.subTheme === _.id,
          }));
        break;
    }

    return [];
  };

  useEffect(() => {
    if (personaes && personaeOccupations && themes) {
      console.log(step);
      if (setStepQuestion) setStepQuestion(step);

      if (step > 0) {
        let responses: ChatBotStepResponse[] = getResponsesFromStep(
          step,
          personaes,
          personaeOccupations,
          themes
        );

        setCurrentStep({
          ...steps[step],
          responses,
        });
      } else {
        setCurrentStep({
          ...steps[0],
        });
      }
    }
  }, [step, personaes, personaeOccupations, themes]);

  useEffect(() => {
    fetchPersonaes();
    fetchPersonaeOccupations();
    fetchThemes();
  }, []);

  const homeStyle = step === 0 ? "40%" : step === 1 ? "60%" : "max-content";
  const notifStyle = step === 0 ? "30%" : "40%";
  const scrollbarStyle = {
    "::-webkit-scrollbar": { width: "4px", background: "#f1f1f1" },
    "::-webkit-scrollbar-thumb": { background: "#2F6CFF" },
  };

  const backButton = () => {
    if (!notif)
      return (
        <Flex alignItems="center" mb={4}>
          <HStack
            cursor="pointer"
            onClick={() => {
              setStep(step - 1);
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
    return (
      <Flex flexDir={"column"}>
        <Flex alignItems="center">
          {notif && <Image src="/chatbot/Rob.png" alt="Rob" mr={4} />}
          <Box>
            {step > 0 && backButton()}
            <Flex flexDir="column" alignItems="flex-start">
              <Box
                fontSize={
                  currentStep.slug === tmpStep.slug
                    ? ["xl", "xl", "xl", "20px"]
                    : ["xl", "xl", "xl", "16px"]
                }
                fontWeight={currentStep.slug === tmpStep.slug ? 600 : 500}
                opacity={currentStep.slug === tmpStep.slug ? 1 : 0.7}
              >
                {tmpStep.title}
              </Box>
            </Flex>
            <Flex py={3.5} align="flex-start" flexWrap="wrap" gap={2}>
              {tmpStep.responses ? (
                tmpStep.responses.map((response, index) => (
                  <Button
                    key={index}
                    variant={"gray"}
                    color={response.checked ? "white" : "#1B1D1F"}
                    bgGradient={
                      response.checked ? "linear(to-t, #2F80ED, #97F8B1)" : ""
                    }
                    mb={2}
                    onClick={() => {
                      selectedValue[tmpStep.slug] = response.value as never;
                      setSelectedValue(selectedValue);
                      setStep(step + 1);
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
                      showDialogue = false;
                    }}
                  >
                    Non
                  </Button>
                  <Button
                    bgGradient="linear(to-t, #2F80ED, #97F8B1)"
                    onClick={() => {
                      setStep(step + 1);
                      setSelectedValue({ ...selectedValue, help: true });
                    }}
                  >
                    Oui <ArrowForwardIcon ml={2} />
                  </Button>
                </Flex>
              )}
            </Flex>
            {notif && step > 1 && <Divider my={2} />}
          </Box>
        </Flex>
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
      {!notif ? (
        <Box
          ref={ref}
          className="chatbot-questions-box"
          background="white"
          borderRadius="16px"
          p={6}
          pos="absolute"
          top="30%"
          left="45%"
          width={homeStyle}
          maxW="70%"
          zIndex={999}
          transition={"0.8s"}
          style={{
            opacity: showDialogue ? 1 : 0,
          }}
        >
          <Box
            fontSize={["xl", "xl", "xl", "1.5xl"]}
            color="#204064"
            fontWeight="bold"
          >
            {displayQuestion(currentStep)}
          </Box>
        </Box>
      ) : (
        <Box
          ref={ref}
          className="chatbot-questions-box"
          background="white"
          borderRadius="16px"
          p={6}
          pos="fixed"
          boxShadow="lg"
          right="5%"
          bottom="0px"
          width={notifStyle}
          maxW="40%"
          maxH="80%"
          sx={scrollbarStyle}
          overflowY="scroll"
          zIndex={999}
          transition={"0.8s"}
          style={{
            opacity: showDialogue ? 1 : 0,
          }}
        >
          {displayOldQuestions()}
          {displayQuestion(currentStep)}
        </Box>
      )}
    </>
  );
};

export default ChatBot;
