import {
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import UseCaseCard from "../../usecase-card";
import UseCaseSlider from "./slider";

interface UseCaseProps {
  usecases: any[]; //A changer en TUseCases[]
}

const UseCasesContainer = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

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
        bg="white"
        minH="100%"
        borderRadius="xl"
        px={"4rem"}
        py={0}
        justifyContent="space-between"
        boxShadow={"0px 54px 67px -50px #F4F9FF"}
        display="flex"
        key={usecase.key}
      >
        <UseCaseCard usecase={usecase} />
        <UseCaseSlider tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Box w="50%">
          <Image />
        </Box>
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
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList mb={"2.75rem"}>{renderTabs}</TabList>
          <TabPanels>{renderTabPanels}</TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default UseCasesContainer;
