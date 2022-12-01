
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchApi } from "../utils/api/fetch-api";
import Navbar from "../components/ui/navbar";


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

    <Box>
      <Heading>Hello world</Heading>
    </Box>

  );
};

export default Home;
