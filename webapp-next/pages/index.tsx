import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/api/fetch-api";
import HomeHeader from "../components/ui/headers/home";
import UseCasesContainer from "../components/ui/homepage/usecases";
import { TTheme } from "./api/themes/types";
import { TRessource } from "./api/ressources/types";
import GridCardDisplayer from "../components/ui/homepage/grid-card-displayer";
import ThemeCard from "../components/ui/thematique-card";
import RessourceCard from "../components/ui/ressource-card";
import { TUseCase } from "./api/usecases/types";

const Home = () => {
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [ressources, setRessources] = useState<TRessource[]>([]);
  const [useCases, setUseCases] = useState<TUseCase[]>([]);

  const fetchRessources = () => {
    fetchApi.get("/api/ressources/list").then((response) => {
      setRessources(response.data);
    });
  };

  const fetchThematiques = () => {
    fetchApi.get("/api/themes/list").then((response) => {
      setThemes(response.data);
    });
  };

  const fetchUseCases = () => {
    fetchApi.get("/api/usecases/list").then((response) => {
      setUseCases(response.data.slice(0, 3));
    });
  };

  useEffect(() => {
    fetchThematiques();
    fetchRessources();
    fetchUseCases();
  }, []);

  return (
    <Box>
      <HomeHeader />
      <UseCasesContainer usecases={useCases} />
      <GridCardDisplayer
        title="Thématiques"
        items={themes}
        bgColor="#FAFCFF"
        renderCard={(theme: TTheme) => <ThemeCard theme={theme} />}
      />
      <GridCardDisplayer
        title="Dernières ressources"
        items={ressources}
        renderCard={(ressource: TRessource) => (
          <RessourceCard ressource={ressource} />
        )}
      />
    </Box>
  );
};

export default Home;
