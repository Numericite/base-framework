import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../../../../../components/ui/back-button/back-button";
import Loader from "../../../../../components/ui/loader";
import { fetchApi } from "../../../../../utils/api/fetch-api";
import {
  TRessource,
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../api/ressources/types";
import * as yup from "yup";
import { TTheme } from "../../../../api/themes/types";

import RessourceFormStep from "../../../../../components/bo/ressources/ressource-form-step";
import ButtonContainer from "../../../../../components/bo/ressources/ressource-button-container";

const RessourceCreate = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [ressource, setRessource] = useState<TRessource>();
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(1);

  let initialValues: TRessourceCreationPayload | TRessourceUpdatePayload = {
    name: "",
    kind: "link",
    description: "",
    content: "",
    theme: themes && (themes[0] as TTheme),
    link: "",
  };

  if (ressource && ressource.id) {
    initialValues = {
      ...ressource,
    };
  }

  const fetchRessource = () => {
    setIsLoading(true);
    fetchApi
      .get("/api/ressources/find", { id: parseInt(id as string) })
      .then((response) => {
        setRessource(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (id && id !== "new") {
      fetchRessource();
    }
  }, [id]);

  const fetchThemes = () => {
    fetchApi
      .get("/api/themes/list", { pagination: { page: 1, pageSize: 1000 } })
      .then((response) => {
        setThemes(response.data);
      });
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Le nom est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
    theme: yup.object().required("Le thème est obligatoire"),
    content: yup.string().required("Le contenu est obligatoire"),
  });

  const validate = (
    tmpRessource: TRessourceUpdatePayload | TRessourceCreationPayload
  ) => {
    setIsLoading(true);

    if ("id" in tmpRessource) {
      fetchApi
        .put("/api/ressources/update", { ...tmpRessource })
        .then(() => {
          toast({
            title: `${ressource?.name} modifié avec succès`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/dashboard/bo/ressources");
        })
        .catch(() => {
          toast({
            title: `Erreur lors de la modification de ${ressource?.name}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      fetchApi
        .post("/api/ressources/create", { ...tmpRessource })
        .then(() => {
          toast({
            title: `${tmpRessource.name} créé avec succès`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/dashboard/bo/ressources");
        })
        .catch(() => {
          toast({
            title: `Erreur lors de la création de ${tmpRessource.name}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if ((id !== "new" && !ressource) || themes.length === 0 || isLoading)
    return <Loader />;

  return (
    <>
      <Box mb={4}>
        <BackButton />
      </Box>
      <Container maxW="container.md">
        {id === "new" ? (
          <Heading>Créer une ressource</Heading>
        ) : (
          <Heading>
            Modifier la ressource{" "}
            <Text
              as="span"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
            >
              {ressource?.name}
            </Text>
          </Heading>
        )}
        <Box mt={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={validate}
          >
            {(formik) => {
              return (
                <Form>
                  <Stack spacing={6}>
                    <RessourceFormStep
                      step={step}
                      formik={formik}
                      themes={themes}
                    />
                  </Stack>
                  <ButtonContainer
                    formik={formik}
                    step={step}
                    setStep={setStep}
                    id={id}
                  />
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </>
  );
};

export default RessourceCreate;
