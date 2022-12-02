import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchApi } from "../utils/api/fetch-api";
import Navbar from "../components/ui/navbar";
import HomeHeader from "../components/ui/headers/home";
import Infos from "../components/ui/infos";

const Home = () => {
  // const [themes, setThemes] = useState<TTheme[]>([]);
  // const [ressources, setRessources] = useState<TRessource[]>([]);

  // const fetchRessources = () => {
  //   fetchApi.get("/api/ressources/list").then((response) => {
  //     console.log(response);
  //     setRessources(response.data);
  //   });
  // };

  // const fetchThematiques = () => {
  //   fetchApi.get("/api/themes/list").then((response) => {
  //     setThemes(response.data);
  //   });
  // };

  // useEffect(() => {
  //   fetchThematiques();
  //   fetchRessources();
  // }, []);

  return (
    <Box>
      <HomeHeader />
      <Infos />
    </Box>
  );
};

export default Home;
