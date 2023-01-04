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
import HomeSearchBar from "../homepage/home-search-bar";
import { useState } from "react";
import ChatBot from "../chatbot";

const HomeHeader = () => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [stepQuestion, setStepQuestion] = useState(1);

  const robotSteps = [
    { step: 1, image: "cuteRobot_smile.png" },
    { step: 2, image: "cuteRobot_eye.png" },
    { step: 3, image: "cuteRobot_cute.png" },
    { step: 4, image: "cuteRobot_love.png" },
    { step: 5, image: "cuteRobot_amazing.png" },
    { step: 6, image: "cuteRobot_super.png" },
  ];

  return (
    <Box bg="neutral">
      <Container maxW="container.2lg" pt={[8, 8, 8, 36]} pb={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          pos="relative"
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
            onMouseEnter={() => setShowDialogue(true)}
            onMouseLeave={() => {
              if (stepQuestion === 1) setShowDialogue(false);
            }}
          >
            <ChatBot
              notif={false}
              showDialogue={showDialogue}
              setStepQuestion={setStepQuestion}
            />
          </Box>
          <Box
            display={["none", "none", "none", "block"]}
            w="55%"
            position="relative"
            className="chatbot"
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
              onMouseEnter={() => setShowDialogue(true)}
              onMouseLeave={() => {
                if (stepQuestion === 1) setShowDialogue(false);
              }}
            >
              <Box
                position="absolute"
                top="28%"
                left="46%"
                w="50%"
                h="100%"
                transition={"0.5s"}
              >
                <Image
                  src="/chatbot/cuteRobot_cute.png"
                  alt="robot hi"
                  zIndex={99}
                  style={{
                    transform: "translateX(-50%)translateY(-50%)",
                    opacity: showDialogue && stepQuestion === 1 ? 1 : 0,
                  }}
                  transition={"0.5s"}
                  pos="absolute"
                />
                <Image
                  src="/chatbot/cuteRobot_smile.png"
                  alt="robot hi"
                  style={{ transform: "translateX(-50%)translateY(-50%)" }}
                  transition={"0.5s"}
                  pos="absolute"
                />

                {robotSteps.map((robot, index) => (
                  <Box key={index}>
                    <Image
                      src={"/chatbot/" + robot.image}
                      alt={robot.image}
                      style={{
                        opacity: stepQuestion === robot.step ? 1 : 0,
                        transform: "translateX(-50%)translateY(-50%)",
                      }}
                      transition={"1s"}
                      pos="absolute"
                    />
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
