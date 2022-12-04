import { Container, Flex, Heading, SimpleGrid, Image } from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";
import { TTheme } from "../../../../pages/api/themes/types";

interface GridCardDisplayerProps {
  title: string;
  items: TTheme[] | TRessource[] | any[];
  renderCard: (item: TTheme | TRessource | any) => JSX.Element;
}

const GridCardDisplayer = (props: GridCardDisplayerProps) => {
  const { title, items, renderCard } = props;

  return (
    <Container maxW="container.2lg" mt={"5.25rem"}>
      <Flex alignItems={"center"} mb="2.75rem">
        <Image
          src={"/Ellipse.png"}
          alt="ellipse"
          w={"24px"}
          h={"24px"}
          mr={2.5}
        />
        <Heading fontSize={"4xl"} fontWeight="600">
          {title}
        </Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} w="full" gap={8}>
        {items.map((item) => {
          return renderCard(item);
        })}
      </SimpleGrid>
    </Container>
  );
};

export default GridCardDisplayer;
