import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";

interface RessourceInfosProps {
  ressource: TRessource;
}

const RessourceInfos = (props: RessourceInfosProps) => {
  const { ressource } = props;
  return (
    <Box bg="#FAFCFF" borderRadius={"xl"} py="1.5rem" px="1.875rem" maxH="auto">
      <Heading size="sm" mb={"0.375rem"}>
        Accéder à la ressource
      </Heading>
      <Text color="#6B829B" fontSize={"sm"}>
        La ressource est ouverte à tous. Vous pouvez y accéder dès maintenant :
      </Text>
      <Button mt={2} w="100%" justifyContent={"center"} size="sm">
        Accéder au site <ArrowForwardIcon ml={3} />
      </Button>

      <Heading size="sm" mt="1.5rem" mb={"0.375rem"}>
        L&apos;équipe
      </Heading>
      <Text color="#6B829B" fontSize={"sm"}>
        Cette ressource a été créée par ....
      </Text>

      <Heading size="sm" mt="1.5rem" mb={"0.375rem"}>
        Partenaires
      </Heading>
      <Text color="#6B829B" fontSize={"sm"}>
        Cette ressource a été créée avec le soutien de ....
      </Text>
    </Box>
  );
};

export default RessourceInfos;
