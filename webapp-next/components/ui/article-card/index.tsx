import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Tag,
  Text
} from '@chakra-ui/react';

interface ArticleCardProps {
  article: any;
}

const ArticleCard: React.FC<ArticleCardProps> = props => {
  const { article } = props;
  return (
    <Box
      w="full"
      _hover={{
        borderRadius: 'xl',
        bgGradient: 'linear(to-t, #97F8B1, #2F80ED)',
        transition: 'linear-gradient 0.2s ease-in-out'
      }}
      p={'1px'}
    >
      <Card variant="article" w="full" h="full" borderRadius={'xl'}>
        <CardHeader p="3.5" m={0} w="full">
          {'image' in article && article.image.url && (
            <Image
              src={article.image.url}
              position="relative"
              alt={article.image.name}
              borderRadius={'xl'}
              m={0}
            />
          )}
          {article.theme && (
            <Tag position={'absolute'} top="3" right="3" variant="neutral">
              {article.theme}
            </Tag>
          )}
        </CardHeader>
        <CardBody px={6}>
          <Heading fontSize={['lg', 'md']} noOfLines={1}>
            {article.name}
          </Heading>
          <Text fontSize={['md', 'sm']} color="neutralDark">
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
