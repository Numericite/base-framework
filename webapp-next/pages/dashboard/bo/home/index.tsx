import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsBook, BsInboxFill, BsPeople } from "react-icons/bs";
import HomeCard from "../../../../components/bo/home/home-card";
import AppContext from "../../../../context/state";
import { fetchApi } from "../../../../utils/api/fetch-api";
import { TUser } from "../../../api/users/types";

const BackOffice = () => {
  const [user, setUser] = useState<TUser>();
  const [ressourcesCount, setRessourcesCount] = useState<number>(0);
  const [contributionsCount, setContributionsCount] = useState<number>(0);
  const [usecasesCount, setUsecasesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const retrieveCounts = async () => {
    setIsLoading(true);
    fetchApi
      .get("/api/ressources/list", {
        pagination: { page: 1, pageSize: 12 },
      })
      .then((response) => {
        setRessourcesCount(response.pagination.total);
      });
    fetchApi
      .get("/api/contributions/list", {
        pagination: { page: 1, pageSize: 12 },
      })
      .then((response) => {
        setContributionsCount(response.pagination.total);
      });
    fetchApi
      .get("/api/usecases/list", {
        pagination: { page: 1, pageSize: 12 },
      })
      .then((response) => {
        setUsecasesCount(response.pagination.total);
      });
    setIsLoading(false);
  };

  const cardsToDisplay = [
    {
      title: "Ressources",
      count: ressourcesCount,
      icon: <BsBook size={20} />,
      bgColor: "blue.100",
    },
    {
      title: "Contributions",
      count: contributionsCount,
      icon: <BsPeople size={20} />,
      bgColor: "green.100",
    },
    {
      title: "Cas d'usages",
      count: usecasesCount,
      icon: <BsInboxFill size={20} />,
      bgColor: "yellow.100",
    },
  ];

  useEffect(() => {
    retrieveCounts();
  }, []);

  return (
    <Container maxW="container.2lg" my="2.125rem">
      <Heading>Bienvenue {user?.username}</Heading>
      <SimpleGrid my={5} columns={[1, 3]} spacing={10}>
        {cardsToDisplay.map((card, index) => (
          <HomeCard
            key={index}
            title={card.title}
            count={card.count}
            icon={card.icon}
            bgColor={card.bgColor}
            isLoading={isLoading}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BackOffice;
