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
import { TRessource } from "../../../../pages/api/ressources/types";
import IconPlaceHolder from "../../icon-placeholder";
import NextLink from "next/link";

interface RessourceProps {
  ressource: TRessource;
  ref?: any;
  clickable?: boolean;
  position?: number;
}

const RessourceCard: React.FC<RessourceProps> = (props) => {
  const { ressource, clickable, ref, position } = props;

  const children = (
    <Box
      ref={ref}
      position="relative"
      w="full"
      cursor={"pointer"}
      _hover={{
        borderRadius: "xl",
        bgGradient: "linear(to-t, #2F80ED, #97F8B1)",
        transition: "linear-gradient 0.2s ease-in-out",
      }}
      p={"1px"}
      h="full"
      boxShadow="0px 54px 67px -50px #F4F9FF"
    >
      {position && (
        <Box borderRadius={50} bg="gray.100" w="fit-content">
          <Text
            position="absolute"
            top={0}
            left={0}
            fontSize="xs"
            fontWeight="bold"
            zIndex={1}
            color="primary"
            p={4}
          >
            {position}
          </Text>
        </Box>
      )}

      <Card
        variant="article"
        w="full"
        h="full"
        borderRadius={"xl"}
        p={3}
        _hover={{
          bgGradient:
            "linear(to-tr, rgba(47, 108, 255, 0.05),rgba(151, 248, 177, 0.05))",
        }}
      >
        <CardHeader py={3.5} m={0} w="full">
          {"image" in ressource && ressource.image?.url && (
            <Image
              src={ressource.image.url}
              position="relative"
              alt=""
              p={0}
              borderRadius={"xl"}
              m={0}
            />
          )}
        </CardHeader>
        <CardBody py={0}>
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

  return clickable ? (
    <NextLink href={`/ressources/${ressource.id}`}>{children}</NextLink>
  ) : (
    children
  );
};

export default RessourceCard;
