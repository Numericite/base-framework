import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { TRessource } from "../../../pages/api/ressources/types";
import IconPlaceHolder from "../icon-placeholder";

interface UseCaseProps {
  usecase: any;
}

const UseCaseCard: React.FC<UseCaseProps> = (props) => {
  const { usecase } = props;
  return (
    <Box
      w="50%"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems={"flex-start"}
      px="4rem"
      my={"4.5rem"}
    >
      <Heading pb={3.5} fontSize={"2.5xl"} textAlign="start">
        {usecase.name}
      </Heading>
      <Text pb={6} color="neutralDark" textAlign="start">
        {usecase.description}
      </Text>
      <Box display="flex" flexDirection="row" w="fit-content" gap="3">
        {usecase.ressources.map((ressource: TRessource, index: number) => {
          return <IconPlaceHolder key={index} kind={ressource.kind} />;
        })}
      </Box>
      <Button variant="neutral" mt="2.75rem">
        Voir les cas d&apos;usage <ArrowForwardIcon ml={2} />
      </Button>
    </Box>
  );
};

export default UseCaseCard;
