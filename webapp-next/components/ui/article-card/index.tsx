import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import useImageURL from "../../../utils/hooks/useImageURL";

interface ArticleCardProps {
  article: any;
}

const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { article } = props;
  const url = useImageURL(article.image?.url as string);
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
      <Card variant="article" w="full" h="full" borderRadius={"xl"}>
        <CardHeader p="3.5" m={0} w="full">
          <Image
            src={url}
            position="relative"
            alt=""
            borderRadius={"xl"}
            fallbackSrc="https://via.placeholder.com/300"
          />
          <Tag position={"absolute"} top="3" right="3" variant="neutral">
            LE TAAAAG
          </Tag>
        </CardHeader>
        <CardBody px={6}>
          <Heading fontSize={["lg", "md"]} noOfLines={1}>
            {article.name}
          </Heading>
          <Text fontSize={["md", "sm"]} color="body">
            {article.description}
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant="neutral">
            <Text>Lire</Text>
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ArticleCard;
