import { ChatBotStep } from "./interfaces";
import { Text } from "@chakra-ui/react";

export const steps: ChatBotStep[] = [
  {
    title: (
      <Text>
        Bonjour,
        <br />
        Je suis
        <Text
          as="span"
          bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
          bgClip={"text"}
        >
          {" "}
          Rob’{" "}
        </Text>
        , puis-je t’aider à trouver ce que tu recherches ?
      </Text>
    ),
    slug: "help",
  },
  {
    title: (
      <Text>
        Super !
        <br />
        Dis m’en plus sur toi,
        <Text
          as="span"
          bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
          bgClip={"text"}
        >
          {" "}
          tu es{" "}
        </Text>
        ?
      </Text>
    ),
    slug: "personae",
  },
  {
    title: (
      <Text>
        Très bien...
        <br />
        Quelle est ta situation
        <Text
          as="span"
          bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
          bgClip={"text"}
        >
          {" "}
          professionnelle{" "}
        </Text>
        ?
      </Text>
    ),
    slug: "occupation",
  },
  {
    title: (
      <Text>
        Hm hm...
        <br />
        {"Est ce qu'une de ces"}
        <Text
          as="span"
          bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
          bgClip={"text"}
        >
          {" "}
          thématiques{" "}
        </Text>
        concerne ta recherche ?
      </Text>
    ),
    slug: "theme",
  },
  {
    title: (
      <Text>
        Je vois !
        <br />
        Et plus
        <Text
          as="span"
          bgGradient={"linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"}
          bgClip={"text"}
        >
          {" "}
          précisemment{" "}
        </Text>
        sur...
      </Text>
    ),
    slug: "subTheme",
  },
];
