import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchApi } from "../utils/api/fetch-api";
import Navbar from "../components/ui/navbar";

const Home = () => {
  const fetchRessources = () => {
    fetchApi.get("/api/ressources/list").then((response) => {
      response.data.map((r) => {
        if (r.kind === "link") {
          console.log(`simple link  : ${r.link}`);
        } else if (r.kind === "video") {
          console.log(`video on ${r.source} : ${r.link}`);
        } else if (r.kind === "file") {
          console.log(`file with url ${r.files.map((_) => _.url).join(" | ")}`);
        } else if (r.kind === "quiz") {
          console.log(`quiz with questions ${r.questions}`);
        }
      });
    });
  };

  useEffect(() => {
    fetchRessources();
  }, []);

  return (
    <Box>
      <Heading>Hello world</Heading>
    </Box>
  );
};

export default Home;
