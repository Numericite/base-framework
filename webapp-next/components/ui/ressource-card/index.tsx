import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import { TRessource } from "../../../pages/api/ressources/types";
import IconPlaceHolder from "../icon-placeholder";

interface RessourceProps {
  ressource: TRessource;
}

const RessourceCard: React.FC<RessourceProps> = (props) => {
  const { ressource } = props;
  return (
    <Box
      w="full"
      _hover={{
        borderRadius: "xl",
        bgGradient: "linear(to-t, #2F80ED, #97F8B1)",
        transition: "linear-gradient 0.2s ease-in-out",
      }}
      p={"1px"}
    >
      <Card
        variant="article"
        w="full"
        h="full"
        borderRadius={"xl"}
        _hover={{
          bgGradient:
            "linear(to-tr, rgba(47, 108, 255, 0.05),rgba(151, 248, 177, 0.05))",
        }}
      >
        <CardHeader p={3.5} m={0} w="full">
          {"image" in ressource && ressource.image?.url && (
            <Image
              src={ressource.image.url}
              position="relative"
              alt=""
              borderRadius={"xl"}
              m={0}
            />
          )}
        </CardHeader>
        <CardBody py={0} px={6}>
          <Heading pb={3.5} fontSize={["lg", "md"]}>
            {ressource.name}
          </Heading>
          <Text fontSize={["md", "sm"]} color="neutralDark">
            {ressource.description}
          </Text>
        </CardBody>
        <CardFooter>
          <Flex w="full" justifyContent={"space-between"}>
            {ressource.theme && (
              <Tag variant="neutral" fontSize={"xs"}>
                {ressource.theme.name}
              </Tag>
            )}
            <IconPlaceHolder kind={ressource.kind} />
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default RessourceCard;
