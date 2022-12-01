import { Box, Heading } from "@chakra-ui/react";

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
      <Heading>Hello world</Heading>
    </Box>
  );
};

export default Home;
