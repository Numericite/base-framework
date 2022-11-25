import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchApi } from "../utils/api/fetch-api";

const Home = () => {
  const fetchRessources = () => {
    fetchApi.get("/api/ressources/list").then((response) => {
      response.data.map((r) => {
        if (r.kind === "link") {
          console.log(`simple link  : ${r.link}`);
        } else if (r.kind === "video") {
          console.log(`video on ${r.source} : ${r.link}`);
        }
      });
    });
  };

  useEffect(() => {
    fetchRessources();
  }, []);

  return (
    <Container>
      <Heading textAlign="center" w="full" pt={10}>
        Numéricité base webapp
      </Heading>
    </Container>
  );
};

export default Home;
