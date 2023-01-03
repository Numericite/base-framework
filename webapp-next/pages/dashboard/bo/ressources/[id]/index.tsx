import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
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
import {
  displayKindReadable,
  ressourceKindEnum,
} from "../../../../../utils/globals/enums";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import KindRessourceDisplayer from "../../../../../components/bo/ressources/kind-input-create";

const RessourceCreate = () => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [ressource, setRessource] = useState<TRessource>({} as TRessource);
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let initialValues: TRessourceCreationPayload | TRessourceUpdatePayload = {
    name: ressource?.name || "",
    kind: ressource?.kind || "link" || "quiz" || "video" || "file",
    description: ressource?.description || "",
    content: ressource?.content || "",
    theme: ressource?.theme || (themes && (themes[0] as TTheme)),
  };

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

  if (id !== "new") {
    (initialValues as TRessourceUpdatePayload).id = ressource?.id || 0;
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Le nom est obligatoire"),
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
      <Container maxW="container.sm">
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
                  <Stack spacing={8}>
                    <FormControl>
                      <FormLabel htmlFor="name">Nom</FormLabel>
                      <Input
                        w="full"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Description</FormLabel>
                      <Input
                        w="full"
                        id="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Thématique associée</FormLabel>
                      <Select
                        id="kind"
                        name="theme"
                        onChange={(e) =>
                          formik.setFieldValue(
                            "theme",
                            themes.find(
                              (theme) => theme.name === e.target.value
                            )
                          )
                        }
                        value={formik.values.theme?.name}
                      >
                        {themes.map((theme) => (
                          <option key={theme.id} value={theme.name}>
                            {theme.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Contenu</FormLabel>
                      <Field name="content">
                        {({ field }: any) => (
                          <ReactQuill
                            style={{ height: "10rem", marginBottom: "3.25rem" }}
                            value={formik.values.content}
                            onChange={field.onChange(field.name)}
                          />
                        )}
                      </Field>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Type de ressource</FormLabel>
                      <Select
                        id="kind"
                        name="kind"
                        onChange={formik.handleChange}
                        value={formik.values.kind}
                      >
                        {ressourceKindEnum.map((kind) => (
                          <option key={kind} value={kind}>
                            {displayKindReadable(kind)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <KindRessourceDisplayer
                      kind={formik.values.kind}
                      ressource={ressource as TRessource}
                      formik={formik}
                    />
                  </Stack>
                  <Box mt={10} display="flex" justifyContent="center">
                    <Button type="submit" variant="primary">
                      {id === "new"
                        ? "Valider la création"
                        : "Valider la modification"}
                    </Button>
                  </Box>
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
