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
import { TUseCase } from "../../../../pages/api/usecases/types";
import UseCaseCard from "../../usecase-card";
import UseCaseSlider from "./slider";

interface UseCaseProps {
  usecases: TUseCase[]; //A changer en TUseCases[]
}

const UseCasesContainer: React.FC<UseCaseProps> = (props) => {
  const { usecases } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);

  const renderTabs = usecases.map((usecase, index) => {
    return (
      <Tab key={usecase.id}>
        <Text
          fontWeight={"bold"}
          fontSize={"sm"}
          bgGradient={
            tabIndex === index
              ? "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)"
              : "neutral"
          }
          bgClip={tabIndex === index ? "text" : "none"}
        >
          {usecase.name}
        </Text>
      </Tab>
    );
  });

  const renderTabPanels = usecases.map((usecase) => {
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
        key={usecase.id}
      >
        <UseCaseCard usecase={usecase} />
        <UseCaseSlider tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Box w="50%">
          <Image src="./element_usecase.png" />
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
