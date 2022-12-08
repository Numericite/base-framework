import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import ContributionHeader from "../../components/ui/headers/contribution";
import { fetchApi } from "../../utils/api/fetch-api";
import { TRessource } from "../api/ressources/types";
import { TTheme } from "../api/themes/types";

interface Field {
  key: string;
  name: string;
  kind: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: TTheme[] | TRessource[];
}

const Contributions: React.FC = () => {
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [ressources, setRessources] = useState([]);

  const fetchThemes = () => {
    return fetchApi
      .get("/api/themes/list", { pagination: { page: 1, pageSize: 1000 } })
      .then((response) => {
        setThemes(response.data);
      });
  };

  const fetchRessources = () => {
    return fetchApi
      .get("/api/ressources/list", { pagination: { page: 1, pageSize: 1000 } })
      .then((response) => {
        setRessources(response.data);
      });
  };

  useEffect(() => {
    fetchThemes();
    fetchRessources();
  }, []);

  const fields: Field[] = [
    {
      key: "firstname",
      name: "firstname",
      kind: "text",
      label: "Prénom",
      placeholder: "Votre prénom",
      required: true,
    },
    {
      key: "lastname",
      name: "lastname",
      kind: "text",
      label: "Nom",
      placeholder: "Votre nom",
      required: true,
    },
    {
      key: "fonction",
      name: "fonction",
      kind: "text",
      label: "Fonction",
      placeholder: "Votre fonction",
      required: true,
    },
    {
      key: "theme",
      name: "theme",
      kind: "select",
      label: "Thématique",
      placeholder: "La thématique",
      required: true,
      options: themes,
    },
    {
      key: "ressource",
      name: "ressource",
      kind: "select",
      label: "Type de ressource",
      placeholder: "Le type de ressource",
      required: true,
      options: ressources,
    },
    {
      key: "productor",
      name: "productor",
      kind: "text",
      label: "Producteur",
      placeholder: "Le producteur",
      required: true,
    },
    {
      key: "comment",
      name: "comment",
      kind: "textarea",
      label: "Commentaire",
      placeholder: "Veuillez saisir un commentaire",
      required: false,
    },
  ];

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const displayField = (
    field: Field,
    values: any,
    handleChange: (e: ChangeEvent<any>) => void,
    handleBlur: any
  ) => {
    switch (field.kind) {
      case "select":
        return (
          <GridItem key={field.key} colSpan={1}>
            <FormControl isRequired={field.required}>
              <FormLabel color="#204064" fontWeight={"bold"}>
                {field.label}
              </FormLabel>
              <Select
                key={field.name}
                w="full"
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={handleChange}
                required={field.required}
                onBlur={handleBlur}
              >
                {field.options?.map((option: any) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        );

      case "textarea":
        return (
          <GridItem key={field.key} colSpan={[1, 1, 3]}>
            <FormControl isRequired={field.required}>
              <FormLabel color="#204064" fontWeight={"bold"}>
                {field.label}
              </FormLabel>
              <Textarea
                key={field.name}
                w="full"
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={handleChange}
                required={field.required}
                onBlur={handleBlur}
              />
            </FormControl>
          </GridItem>
        );

      case "text":
        return (
          <GridItem key={field.key} colSpan={1}>
            <FormControl isRequired={field.required}>
              <FormLabel color="#204064" fontWeight={"bold"}>
                {field.label}
              </FormLabel>
              <Input
                key={field.name}
                w="full"
                name={field.name}
                placeholder={field.placeholder}
                type={field.kind}
                value={values[field.name]}
                onChange={handleChange}
                required={field.required}
                onBlur={handleBlur}
              />
            </FormControl>
          </GridItem>
        );
      default:
        break;
    }
  };

  return (
    <Box w="full">
      <ContributionHeader />
      <Container minW="container.2lg">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            fonction: "",
            theme: "",
            ressource: "",
            productor: "",
            comment: "",
          }}
          fields={fields}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Flex
                justifyContent="space-between"
                flexDir={"column"}
                alignItems="center"
              >
                <SimpleGrid
                  columns={[1, 2, 3]}
                  w="full"
                  gap={10}
                  pt={"3.375rem"}
                >
                  {fields.map((field) =>
                    displayField(field, values, handleChange, handleBlur)
                  )}
                </SimpleGrid>
                <Button mt="2.75rem" mb="3.375rem" type="submit">
                  <Text mr={3}>Envoyer ma contribution</Text>
                  <ArrowForwardIcon />
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Contributions;
