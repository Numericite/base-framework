import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Fade
} from '@chakra-ui/react';
import NextLink from 'next/link';
import HomeSearchBar from '../homepage/home-search-bar';
import { useState } from 'react';
import ChatBot from '../chatbot';

const HomeHeader = () => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [stepQuestion, setStepQuestion] = useState(0);

  const robotSteps = [
    { step: 1, image: 'cuteRobot_smile.png' },
    { step: 2, image: 'cuteRobot_eye.png' },
    { step: 3, image: 'cuteRobot_cute.png' },
    { step: 4, image: 'cuteRobot_love.png' },
    { step: 5, image: 'cuteRobot_amazing.png' },
    { step: 6, image: 'cuteRobot_super.png' }
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
          <Box w={['100%', '100%', '100%', '45%']}>
            <Heading as="h1" fontSize={['4xl', '4xl', '4xl', '5xl']}>
              Ressourcerie{' '}
              <Text
                as="span"
                bgGradient="linear(to-t, #97F8B1, #2F80ED)"
                bgClip="text"
              >
                RH
              </Text>{' '}
              et{' '}
              <Text as="span" color="primary">
                management
              </Text>{' '}
              en Normandie
            </Heading>
            <Text
              fontSize={['xl', 'xl', 'xl', 'xl']}
              mt={6}
              color="neutralDark"
            >
              Simple et Efficace ! Venez découvrir la fonction publique sous un
              autre angle, grace à notre nouvel espace d’exploration et
              d’expérimentation.
            </Text>
            <Flex justifyContent="left" alignItems="center" mt={10}>
              <NextLink href={'/ressources'}>
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
              if (stepQuestion === 0) setShowDialogue(false);
            }}
          >
            <ChatBot
              toast={false}
              showToast={showDialogue}
              setShowToast={setShowDialogue}
              setStepQuestion={setStepQuestion}
            />
          </Box>
          <Box
            display={['none', 'none', 'none', 'block']}
            w="55%"
            position="relative"
            className="chatbot"
          >
            <Box>
              <Box
                position="absolute"
                top="28%"
                left="46%"
                w="50%"
                h="100%"
                transition={'0.5s'}
              >
                <Image
                  onMouseEnter={() => setShowDialogue(true)}
                  onMouseLeave={() => {
                    if (stepQuestion === 0) setShowDialogue(false);
                  }}
                  src="/chatbot/cuteRobot_cute.png"
                  alt="robot hi"
                  zIndex={99}
                  style={{
                    transform: 'translateX(-50%)translateY(-50%)',
                    opacity: showDialogue && stepQuestion === 0 ? 1 : 0
                  }}
                  transition={'0.5s'}
                  pos="absolute"
                />
                <Image
                  src="/chatbot/cuteRobot_smile.png"
                  alt="robot smile"
                  style={{ transform: 'translateX(-50%)translateY(-50%)' }}
                  transition={'0.5s'}
                  pos="absolute"
                />

                {robotSteps.map((robot, index) => (
                  <Box key={index}>
                    <Image
                      src={'/chatbot/' + robot.image}
                      alt={robot.image}
                      style={{
                        opacity: stepQuestion === robot.step ? 1 : 0,
                        transform: 'translateX(-50%)translateY(-50%)'
                      }}
                      transition={'1s'}
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
