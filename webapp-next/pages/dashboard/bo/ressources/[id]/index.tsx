import {
  Box,
  Container,
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
import FormikListener from "../../../../../utils/globals/formik-listener";
import axios from "axios";
import { getJwt } from "../../../../../utils/globals/cookies";
import { TContribution } from "../../../../api/contributions/types";
import { TPersonae } from "../../../../api/personaes/types";
import { TPersonaeOccupation } from "../../../../api/personaeoccupations/types";
import { TSubTheme } from "../../../../api/subthemes/types";

const RessourceCreate = () => {
  const router = useRouter();
  const toast = useToast();
  const { id, contribution_id } = router.query;
  const [ressource, setRessource] = useState<TRessource>();
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [contribution, setContribution] = useState<TContribution>();

  const jwt = getJwt();

  let initialValues: TRessourceCreationPayload | TRessourceUpdatePayload = {
    name: "",
    kind: "link",
    description: "",
    content: "",
    theme: themes && (themes[0] as TTheme),
    link: "",
    personaes: [],
    personae_occupations: [],
    sub_themes: [],
    status: "draft",
  };

  if (ressource && ressource.id) {
    if (ressource.kind === "file") {
      const { files, ...ressourceWithoutFiles } = ressource;
      initialValues = {
        ...ressourceWithoutFiles,
        personaes: (ressourceWithoutFiles.personaes as TPersonae[])?.map(
          (p) => p.id
        ),
        personae_occupations: (
          ressourceWithoutFiles.personae_occupations as TPersonaeOccupation[]
        )?.map((p) => p.id),
        sub_themes: (ressourceWithoutFiles.sub_themes as TSubTheme[])?.map(
          (p) => p.id
        ),
        contribution: null,
      };
    } else {
      initialValues = {
        ...ressource,
        personaes: (ressource.personaes as TPersonae[])?.map((p) => p.id),
        personae_occupations: (
          ressource.personae_occupations as TPersonaeOccupation[]
        )?.map((p) => p.id),
        sub_themes: (ressource.sub_themes as TSubTheme[])?.map((p) => p.id),
        contribution: null,
      };
    }
  }

  if (contribution_id && contribution) {
    initialValues = {
      ...initialValues,
      description: contribution.description,
      theme: contribution.theme
        ? contribution.theme
        : themes && (themes[0] as TTheme),
      link: contribution.link ? contribution.link : "",
      contribution: contribution.id,
    };
  }
  if (contribution && contribution.files) {
    initialValues = {
      ...initialValues,
      kind: "file",
      files: contribution.files[0] as File | undefined,
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

  useEffect(() => {
    if (contribution_id) {
      fetchApi
        .get("/api/contributions/find", {
          id: parseInt(contribution_id as string),
        })
        .then((response) => {
          setContribution(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [contribution_id]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Le nom est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
    theme: yup.object().required("Le thème est obligatoire"),
    content: yup.string().required("Le contenu est obligatoire"),
  });

  const validate = async (
    tmpRessource: TRessourceUpdatePayload | TRessourceCreationPayload
  ) => {
    setIsLoading(true);

    let ressource_id, tmpFiles, child_id;

    if (tmpRessource.kind === "file") {
      const { files, ...tmpRessourceWithoutFiles } = tmpRessource;
      tmpFiles = files;
      tmpRessource = tmpRessourceWithoutFiles;
    }
    try {
      if ("id" in tmpRessource) {
        await fetchApi.put("/api/ressources/update", {
          ...tmpRessource,
        });
        if (contribution_id && contribution) {
          contribution.status = "published";
          await fetchApi.put("/api/contributions/update", { ...contribution });
        }
        ressource_id = tmpRessource.id;
        child_id = tmpRessource.child_id;
      } else {
        const response = await fetchApi.post("/api/ressources/create", {
          ...tmpRessource,
        });
        ressource_id = response.id;
        child_id = response.child_id;
      }
      if (tmpFiles && child_id) {
        let formData = new FormData();
        let file = new File([tmpFiles], tmpFiles.name, {
          type: tmpFiles.type,
        });
        formData.append("files", file);
        formData.append("ref", "api::ressource-file.ressource-file");
        formData.append("refId", child_id.toString());
        formData.append("field", "files");
        await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
      setIsLoading(false);
      router.push("/dashboard/bo/ressources");
    } catch (e) {
      toast({
        title: `Erreur lors de la ${
          "id" in tmpRessource ? "modification" : "création"
        } de ${tmpRessource.name}`,
        status: "error",
        duration: 5000,
        isClosable: true,
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
      <Container maxW="container.2lg">
        {ressource?.contribution ? (
          <Heading>Transformer une contribution en ressource</Heading>
        ) : id === "new" ? (
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
                  <FormikListener
                    values={formik.values}
                    onValueChange={(key: string, value: any) => {
                      if (key === "kind" && value === "video") {
                        formik.setFieldValue("source", "youtube");
                      }
                    }}
                  />
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
