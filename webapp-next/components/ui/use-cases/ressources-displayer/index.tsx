import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TRessource } from "../../../../pages/api/ressources/types";
import { TUseCaseStep } from "../../../../pages/api/usecasesteps/types";
import RessourceCard from "../../ressources/ressource-card";

interface Props {
  steps: TUseCaseStep[];
  currentRessource: TRessource;
  setCurrentRessource: (ressource: TRessource) => void;
}

const UseCaseRessourceDisplay = (props: Props) => {
  const { steps, currentRessource, setCurrentRessource } = props;
  const selectedIndex = steps.findIndex(
    (step) => step.ressource.id === currentRessource.id
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // trigger sticky state when scrolling to the top of the container element (when the container is sticky) and when scrolling back to the top of the page (when the container is not sticky)
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        setIsSticky(top === 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={containerRef}
      w="full"
      bg="neutralLightBlue"
      position="sticky"
      top={0}
      py={isSticky ? "1.5rem" : "2.75rem"}
    >
      <Container
        maxW="container.2lg"
        flexDirection="column"
        alignItems={"center"}
        justifyItems={"center"}
      >
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {steps.map((step, index) => {
            return (
              <Box
                minH="full"
                key={step.id}
                onClick={() => setCurrentRessource(step.ressource)}
              >
                <Flex
                  justifyContent="center"
                  w="full"
                  mb={isSticky ? 0 : 6}
                  position="relative"
                >
                  <Box
                    w="34px"
                    h="34px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="full"
                    bg={index !== selectedIndex ? "white" : "primary"}
                    border={
                      index !== selectedIndex ? "1px solid #2f6cff" : "none"
                    }
                  >
                    <Text
                      fontSize="sm"
                      color={index !== selectedIndex ? "primary" : "white"}
                    >
                      {index + 1}
                    </Text>
                  </Box>
                  {index !== steps.length - 1 && (
                    <Box
                      position="absolute"
                      border={"1px solid #2f6cff"}
                      top="50%"
                      left="50%"
                      transform="translate(6%, -50%)"
                      w="full"
                    />
                  )}
                </Flex>
                {!isSticky && (
                  <RessourceCard
                    ressource={step.ressource}
                    isUseCase={true}
                    isSelected={currentRessource.id === step.ressource.id}
                  />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default UseCaseRessourceDisplay;
