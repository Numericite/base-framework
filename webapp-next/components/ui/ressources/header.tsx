import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
}

const RessourceHeader: React.FC<Props> = (props) => {
  const { title, description } = props;
  return (
    <Box bg="#FAFCFF" w="full">
      <Container minW="container.2lg" py="2.75rem">
        <Box>
          <Breadcrumb>
            <BreadcrumbItem color="#6B829B" fontWeight={"bold"}>
              <Text>Ressources</Text>
            </BreadcrumbItem>
            <BreadcrumbItem fontWeight={"bold"}>
              <Text>{title}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Heading py="1.5rem">{title}</Heading>
        <Flex alignItems={"center"}>
          <Image src="/RessourcePage.png" alt={title} mr={"1.25rem"} />
          <Text color="#6B829B">{description}</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default RessourceHeader;
