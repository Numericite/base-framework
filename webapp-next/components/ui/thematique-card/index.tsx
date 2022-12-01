import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { TTheme } from "../../../pages/api/themes/types";

interface ThemeCardProps {
  theme: TTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = (props) => {
  const { theme } = props;

  return (
    <Card variant="flat" w="full">
      {"image" in theme && theme.image?.url && (
        <CardHeader p={0} m={0} w="full">
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
        <Heading fontSize={["lg", "md"]} noOfLines={1}>
          {theme.name}
        </Heading>
        <Text fontSize={["md", "sm"]} color="body">
          {theme.description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;
