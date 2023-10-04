import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BackButton from "../../../../../components/ui/back-button/back-button";
import Loader from "../../../../../components/ui/loader";
import { fetchApi } from "../../../../../utils/api/fetch-api";
import {
  TUseCase,
  TUseCaseCreationPayload,
  TUseCaseUpdatePayload,
  TUseCaseWithoutSteps,
} from "../../../../api/usecases/types";
import * as yup from "yup";
import RessourceCard from "../../../../../components/ui/ressources/ressource-card";
import DragNDropComponent from "../../../../../components/bo/usecases/dragndrop";
import { TRessource } from "../../../../api/ressources/types";
import RessourceModal from "../../../../../components/bo/usecases/ressource-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  TUseCaseStep,
  TUseCaseStepCreationPayload,
} from "../../../../api/usecasesteps/types";

const UseCaseCreate = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [useCase, setUseCase] = useState<TUseCase>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ressources, setRessources] = useState<TRessource[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoveredCardId, setHoveredCardId] = useState<number>();

  const fetchUseCase = () => {
    setIsLoading(true);
    fetchApi
      .get("/api/usecases/find", { id: parseInt(id as string) })
      .then((res) => {
        setUseCase(res);
        setRessources(res.steps.map((step) => step.ressource));
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

  if ((id !== "new" && !useCase) || isLoading) return <Loader />;

  const initialValues: TUseCaseCreationPayload | TUseCaseUpdatePayload = {
    name: useCase?.name || "",
    description: useCase?.description || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Le titre est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
  });

  const displayDeleteButton = (item: TRessource) => {
    return (
      <Box
        position="absolute"
        top={2}
        right={2}
        w={4}
        h={4}
        borderRadius={50}
        zIndex={1}
        bg="red.500"
        cursor="pointer"
        onClick={() =>
          setRessources(ressources.filter((res) => res.id !== item.id))
        }
      >
        <AiFillCloseCircle color="white" />
      </Box>
    );
  };

  const handleSubmit = async (
    tmpUseCase: TUseCaseCreationPayload | TUseCaseUpdatePayload
  ) => {
    setIsLoading(true);
    let usecase: TUseCaseWithoutSteps;
    if (id !== "new") {
      try {
        const res = await fetchApi.put("/api/usecases/update", {
          id: parseInt(id as string),
          ...tmpUseCase,
        });
        usecase = res;
      } catch (e) {
        toast({
          title: "Erereur à la création du cas d'usage",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const res = await fetchApi.post("/api/usecases/create", {
          ...tmpUseCase,
        });
        usecase = res;
      } catch (e) {
        toast({
          title: "Erereur à la création du cas d'usage",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    let tmpUseCaseSteps = ressources.map((ressource, index) => {
      return {
        position: index + 1,
        ressource: ressource.id,
        use_case: usecase.id,
      };
    });
    tmpUseCaseSteps.forEach((step) => {
      fetchApi
        .post("/api/usecasesteps/create", {
          ...step,
        })
        .catch(() => {
          toast({
            title: "Erereur à la création du cas d'usage",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    });
    toast({
      title: "Le cas d'usage a été créé avec succès !",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsLoading(false);
    router.push("/dashboard/bo/usecases");
  };

  return (
    <>
      <Box>
        <BackButton />
      </Box>
      <Container maxW="container.lg">
        {id === "new" ? (
          <Heading>Créer un cas d{"'"}usage</Heading>
        ) : (
          <Heading>Modifier le cas d{"'"}usage </Heading>
        )}
        <Box mt={8}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <VStack spacing={4}>
                    <FormControl
                      isRequired={true}
                      isInvalid={!!formik.errors.name && formik.touched.name}
                    >
                      <FormLabel htmlFor="name">
                        Titre du cas d&apos;usage
                      </FormLabel>
                      <Input
                        id="name"
                        name="name"
                        w="full"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {
                        <FormErrorMessage>
                          {formik.errors.name}
                        </FormErrorMessage>
                      }
                    </FormControl>
                    <FormControl
                      isRequired={true}
                      isInvalid={
                        !!formik.errors.description &&
                        formik.touched.description
                      }
                    >
                      <FormLabel htmlFor="description">
                        Description du cas d&apos;usage
                      </FormLabel>
                      <Textarea
                        id="description"
                        name="description"
                        w="full"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                      />
                      {
                        <FormErrorMessage>
                          {formik.errors.description}
                        </FormErrorMessage>
                      }
                    </FormControl>
                  </VStack>
                  {id === "new" && ressources?.length === 0 ? (
                    <Flex flexDir="column" alignItems={"center"} mt={4}>
                      <Text>
                        Vous n&apos;avez pas encore de ressources, vous pouvez
                        en créer une en cliquant sur le bouton ci-dessous
                      </Text>
                      <Button mt={4} onClick={onOpen}>
                        <Text>Ajouter une ressource</Text>
                      </Button>
                    </Flex>
                  ) : (
                    <Flex flexDir="column" mt={4} alignItems="center">
                      <DragNDropComponent
                        items={ressources || []}
                        dropppableId="ressources-list"
                        setItems={setRessources}
                        element={(item) => (
                          <Box
                            onMouseEnter={() => setHoveredCardId(item.id)}
                            onMouseLeave={() => setHoveredCardId(undefined)}
                            w="full"
                            h="full"
                            position="relative"
                          >
                            <RessourceCard
                              ressource={item}
                              position={
                                1 +
                                ressources.findIndex(
                                  (res) => res.id === item.id
                                )
                              }
                              clickable={false}
                            />
                            {hoveredCardId === item.id &&
                              displayDeleteButton(item)}
                          </Box>
                        )}
                      />

                      <Button mt={4} size="sm" onClick={onOpen}>
                        <Text>Ajouter une ressource</Text>
                      </Button>
                    </Flex>
                  )}
                  <RessourceModal
                    ressources={ressources}
                    onClose={onClose}
                    isOpen={isOpen}
                    setRessources={setRessources}
                  />
                  <Divider mt={8} w="full" />
                  <Flex mt={8} justifyContent="flex-end">
                    <Button type="submit">
                      {id === "new" ? (
                        <Text>Créer le cas d&apos;usage</Text>
                      ) : (
                        <Text>Modifier le cas d&apos;usage</Text>
                      )}
                    </Button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </>
  );
};

export default UseCaseCreate;
