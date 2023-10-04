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
import { useState } from "react";

interface ThemeCardProps {
  theme: TTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = (props) => {
  const { theme } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      variant="flat"
      w="full"
      cursor={"pointer"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        <Heading as={NextLink} href={`/ressources?theme=${theme.id}`}>
          <Heading
            fontSize={["lg", "md"]}
            noOfLines={1}
            textDecoration={isHovered ? "underline" : "none"}
          >
            {theme.name}
          </Heading>
        </Heading>
        <Text
          fontSize={["md", "sm"]}
          color="neutralDark"
          textDecoration={isHovered ? "underline" : "none"}
        >
          {theme.description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;
