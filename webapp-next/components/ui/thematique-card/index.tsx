import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { TTheme } from "../../../pages/api/themes/types";
import useImageURL from "../../../utils/hooks/useImageURL";

interface ThemeCardProps {
  theme: TTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = (props) => {
  const { theme } = props;
  const imageURL = useImageURL(theme.image?.url as string);

  return (
    <Card variant="flat" w="full">
      {"image" in theme && (
        <CardHeader p={0} m={0} w="full">
          <Image
            src={imageURL}
            borderRadius="md"
            backgroundSize={"cover"}
            alt={theme.name}
          />
        </CardHeader>
      )}
      <CardBody px={0}>
        <Heading fontSize={["lg", "md"]} noOfLines={1}>
          {theme.name}
        </Heading>
        <Text fontSize={["md", "sm"]}>{theme.description}</Text>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;
