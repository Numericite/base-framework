import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TUseCase } from "../../../pages/api/usecases/types";
import IconPlaceHolder from "../icon-placeholder";

interface UseCaseProps {
  usecase: TUseCase;
}

const UseCaseCard: React.FC<UseCaseProps> = (props) => {
  const { usecase } = props;
  const router = useRouter();
  return (
    <Box
      maxW="50%"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems={"flex-start"}
      px={[0, 0, "4rem"]}
      my={"4.5rem"}
    >
      <Heading pb={3.5} fontSize={["md", "2.5xl"]} textAlign="start">
        {usecase.name}
      </Heading>
      <Text
        pb={6}
        color="neutralDark"
        textAlign="start"
        fontSize={["sm", "md"]}
      >
        {usecase.description}
      </Text>
      <Box display="flex" flexDirection="row" w="fit-content" gap="3">
        {usecase.steps.map((step, index) => {
          return <IconPlaceHolder key={index} kind={step.ressource.kind} />;
        })}
      </Box>
      <Button
        variant="neutral"
        mt="2.75rem"
        onClick={() => {
          router.push(`/use-cases/${usecase.id}`);
        }}
      >
        Voir les cas d&apos;usage <ArrowForwardIcon ml={2} />
      </Button>
    </Box>
  );
};

export default UseCaseCard;
