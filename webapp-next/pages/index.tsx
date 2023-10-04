import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/api/fetch-api";
import HomeHeader from "../components/ui/headers/home";
import UseCasesContainer from "../components/ui/homepage/usecases";
import { TTheme } from "./api/themes/types";
import { TRessource } from "./api/ressources/types";
import GridCardDisplayer from "../components/ui/homepage/grid-card-displayer";
import ThemeCard from "../components/ui/thematique-card";
import RessourceCard from "../components/ui/ressources/ressource-card";
import { TUseCase } from "./api/usecases/types";
import Infos from "../components/ui/infos";

const Home = () => {
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [ressources, setRessources] = useState<TRessource[]>([]);
  const [useCases, setUseCases] = useState<TUseCase[]>([]);

  const fetchRessources = () => {
    fetchApi
      .get("/api/ressources/list", {
        pagination: { page: 1, pageSize: 3 },
        filters: {
          status: "published",
        },
      })
      .then((response) => {
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
        renderCard={(theme: TTheme) => (
          <ThemeCard key={theme.id} theme={theme} />
        )}
      />
      <GridCardDisplayer
        title="Dernières ressources"
        items={ressources}
        renderCard={(ressource: TRessource) => (
          <RessourceCard
            key={ressource.id}
            ressource={ressource}
            clickable={true}
          />
        )}
      />

      <Infos />
    </Box>
  );
};

export default Home;
