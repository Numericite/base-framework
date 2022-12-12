import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  kind: string;
}

const RessourceHeader: React.FC<Props> = (props) => {
  const { title, description, kind } = props;

  const displayImage = () => {
    switch (kind) {
      case "link":
        return "/RessourcePage.png";
      case "video":
        return "/VideoRessource.png";
      case "file":
        return "/contribution_header_icon.png";
      case "text":
        return "/contribution_header_icon.png";
      case "quizz":
        return "/QuizzRessource.png";
    }
  };

  return (
    <Box bg="#FAFCFF" w="auto">
      <Container maxW="container.2lg" py="2.75rem">
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
          <Image src={displayImage()} alt={title} mr={"1.25rem"} />
          <Text color="#6B829B" overflowX={"hidden"}>
            {description}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default RessourceHeader;
