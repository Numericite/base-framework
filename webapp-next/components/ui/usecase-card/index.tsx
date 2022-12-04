import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { TRessource } from "../../../pages/api/ressources/types";
import { ButtonArrowIcon } from "../../../utils/globals/icons/Icons";
import IconPlaceHolder from "../icon-placeholder";

interface UseCaseProps {
  usecase: any;
}

const UseCaseCard: React.FC<UseCaseProps> = (props) => {
  const { usecase } = props;
  return (
    <Box w="50%" bg="white" alignItems={"flex-start"}>
      <Container
        maxW="container.2lg"
        display="flex"
        flexDirection="column"
        alignItems={"flex-start"}
      >
        <Heading pb={3.5} fontSize={"2.5xl"}>
          {usecase.name}
        </Heading>
        <Text pb={6} color="neutralDark">
          {usecase.description}
        </Text>
        <Box display="flex" flexDirection="row" w="fit-content" gap="3">
          {usecase.ressources.map((ressource: TRessource, index: number) => {
            return <IconPlaceHolder key={index} kind={ressource.kind} />;
          })}
        </Box>
        <Button variant="neutral" mt="2.75rem">
          Voir les cas d&apos;usage{" "}
          <ArrowForwardIcon
            ml={2}
            bgGradient="linear(to-t, #2F80ED, #97F8B1)"
            bgClip="unset"
          />
        </Button>
      </Container>
    </Box>
  );
};

export default UseCaseCard;
