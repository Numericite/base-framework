import { Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchApi } from "../../../../../utils/api/fetch-api";
import { TUseCase } from "../../../../api/usecases/types";

const UseCaseCreate = () => {
  const router = useRouter();
  const { id } = router.query;
  const [useCase, setUseCase] = useState<TUseCase>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(useCase);

  const fetchUseCase = () => {
    setIsLoading(true);
    fetchApi
      .get("/api/usecases/find", { id: parseInt(id as string) })
      .then((res) => {
        console.log(res);
        setUseCase(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (id && id !== "new") {
      fetchUseCase();
    }
  }, [id]);

  return <Container maxW="container.xl"></Container>;
};

export default UseCaseCreate;
