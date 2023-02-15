import { Box, Flex, Heading, Tag, Text, Image } from "@chakra-ui/react";
import _ from "lodash";
// import Image from "next/image";
import { TUseCase } from "../../../../pages/api/usecases/types";

const UseCaseHeader = ({ useCase }: { useCase: TUseCase }) => {
  return (
    <Flex
      w="full"
      bg="neutral"
      justify="center"
      align="center"
      flexDir="column"
    >
      <>
        <Flex mt="2.5rem" align={"center"}>
          <Image
            src="/element_usecase.png"
            alt="use-case-image"
            w={"6.25rem"}
          />
          <Heading size="xl">{useCase.name}</Heading>
        </Flex>
        <Text color="neutralText">{useCase.description}</Text>
        <Box mt={"1.5rem"} mb="2.75rem">
          {_.uniqBy(
            useCase.steps.map((step) => {
              return <Tag key={step.id}>{step.ressource.theme.name}</Tag>;
            }),
            "step.ressource.theme.name"
          )}
        </Box>
      </>
    </Flex>
  );
};

export default UseCaseHeader;
