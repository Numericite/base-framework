import {
  Box,
  Collapse,
  Container,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TRessource } from "../../../../pages/api/ressources/types";
import { TUseCaseStep } from "../../../../pages/api/usecasesteps/types";
import RessourceCard from "../../ressources/ressource-card";

interface Props {
  steps: TUseCaseStep[];
  currentRessource: TRessource;
  setCurrentRessource: (ressource: TRessource) => void;
  setCurrentPosition: (position: number) => void;
}

const UseCaseRessourceDisplay = (props: Props) => {
  const { steps, currentRessource, setCurrentRessource, setCurrentPosition } =
    props;
  const selectedIndex = steps.findIndex(
    (step) => step.ressource.id === currentRessource.id
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const elementDistance =
          containerRef.current.getBoundingClientRect().top + window.pageYOffset;
        const scrollTop = window.pageYOffset;
        if (Math.floor(scrollTop) - Math.floor(elementDistance) >= 0)
          setIsSticky(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef.current]);

  return (
    <Box
      ref={containerRef}
      w="full"
      bg="neutralLightBlue"
      position="sticky"
      h={"auto"}
      transition="all 0.3s ease-in-out"
      top={0}
      zIndex={3}
      py={isSticky ? "1.25rem" : "2.75rem"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container
        maxW="container.2lg"
        flexDirection="column"
        alignItems={"center"}
        justifyItems={"center"}
      >
        <Collapse startingHeight={38} in={!isSticky || isHovered}>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {steps.map((step, index) => {
              return (
                <Box
                  minH="full"
                  key={step.id}
                  onClick={() => {
                    setCurrentRessource(step.ressource);
                    setCurrentPosition(step.position);
                  }}
                >
                  <Flex
                    justifyContent="center"
                    w="full"
                    mb={6}
                    position="relative"
                  >
                    <Box
                      cursor={"pointer"}
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
                  <RessourceCard
                    ressource={step.ressource}
                    isUseCase={true}
                    isSelected={currentRessource.id === step.ressource.id}
                    isSticky={isSticky}
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        </Collapse>
      </Container>
    </Box>
  );
};

export default UseCaseRessourceDisplay;
