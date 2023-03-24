import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { TTheme } from "../../../pages/api/themes/types";
import NextLink from "next/link";

interface ThemeCardProps {
  theme: TTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = (props) => {
  const { theme } = props;

  return (
    <Card variant="flat" w="full" cursor={"pointer"}>
      {"image" in theme && theme.image?.url && (
        <CardHeader
          p={0}
          m={0}
          w="full"
          as={NextLink}
          href={`/ressources?theme=${theme.id}`}
        >
          <Image
            src={theme.image.url}
            borderRadius="md"
            backgroundSize={"cover"}
            alt={theme.name}
            m={0}
          />
        </CardHeader>
      )}
      <CardBody px={0}>
        <Heading
          as={NextLink}
          fontSize={["lg", "md"]}
          noOfLines={1}
          href={`/ressources?theme=${theme.id}`}
        >
          {theme.name}
        </Heading>
        <Text fontSize={["md", "sm"]} color="neutralDark">
          {theme.description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;
