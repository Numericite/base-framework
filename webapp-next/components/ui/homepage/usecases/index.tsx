import {
  Box,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import UseCaseCard from "../../usecase-card";

const UseCasesContainer = () => {
  const fakeUsecases = [
    {
      key: "Rupture 1.0",
      name: "La rupture conventionnelle",
      description: "Qu'est ce que l'entreprise peut y gagner ?",
      ressources: [
        {
          name: "Ressource 1",
          kind: "file",
        },
        {
          name: "Ressource 2",
          kind: "video",
        },
        {
          name: "Ressource 3",
          kind: "link",
        },
      ],
    },
    {
      key: "Augmentation 2.0",
      name: "L'augmentation des employés en CDI",
      description: "Comment on fait pour augmenter des employés en CDI ?",
      ressources: [
        {
          name: "Ressource 1",
          kind: "file",
        },
        {
          name: "Ressource 2",
          kind: "video",
        },
        {
          name: "Ressource 3",
          kind: "link",
        },
      ],
    },
  ];

  const renderTabs = fakeUsecases.map((usecase) => {
    return (
      <Tab key={usecase.key}>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          {usecase.name}
        </Text>
      </Tab>
    );
  });

  const renderTabPanels = fakeUsecases.map((usecase) => {
    return (
      <TabPanel
        borderRadius={"xl"}
        shadow={"0px 54px 67px -50px #F4F9FF"}
        key={usecase.key}
      >
        <Flex
          bg="white"
          px="4rem"
          borderRadius="xl"
          boxShadow={"0px 54px 67px -50px #F4F9FF4"}
        >
          <UseCaseCard usecase={usecase} />
        </Flex>
      </TabPanel>
    );
  });

  return (
    <Box
      w="full"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
    >
      <Container maxW="container.2lg">
        <Heading textAlign={"center"} pt={"5.25rem"}>
          Explorez les cas d&apos;usage
        </Heading>
        <Tabs
          py={"2.75rem"}
          variant="custom"
          align="center"
          w="full"
          fontWeight={"bold"}
        >
          <TabList>{renderTabs}</TabList>
          <TabPanels>{renderTabPanels}</TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default UseCasesContainer;
