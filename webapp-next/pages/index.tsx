import { ArrowRightIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Radio,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ui/article-card";
import RessourceCard from "../components/ui/ressource-card";
import ThemeCard from "../components/ui/thematique-card";
import { fetchApi } from "../utils/api/fetch-api";
import { TRessource } from "./api/ressources/types";
import { TTheme } from "./api/themes/types";

const Home = () => {
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [ressources, setRessources] = useState<TRessource[]>([]);

  const fetchRessources = () => {
    fetchApi.get("/api/ressources/list").then((response) => {
      console.log(response);
      setRessources(response.data);
    });
  };

  const fetchThematiques = () => {
    fetchApi.get("/api/themes/list").then((response) => {
      setThemes(response.data);
    });
  };

  useEffect(() => {
    fetchThematiques();
    fetchRessources();
  }, []);

  const displayThemeCards = themes.map((theme, index) => {
    return <ThemeCard theme={theme} key={index} />;
  });

  const displayRessourcesCards = ressources.map((ressource, index) => {
    return <RessourceCard ressource={ressource} key={index} />;
  });

  return (
    <Container minW="5xl">
      <Heading textAlign="center" w="full" pt={10}>
        Numéricité base webapp
      </Heading>
      <Flex justify={"space-between"}>
        <Button variant={"primary"} size="md" w={100}>
          Test <ArrowRightIcon />
        </Button>
        <Tag variant={"neutral"}>Superbe Tag </Tag>
        <Radio>GROS TEST</Radio>
      </Flex>
      <SimpleGrid columns={[1, 2, 3]} gap={5} mt={10}>
        {displayThemeCards}
        <ArticleCard article={{}} />
        {displayRessourcesCards}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
