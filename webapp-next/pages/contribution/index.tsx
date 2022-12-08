import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { ChangeEvent } from "react";
import ContributionHeader from "../../components/ui/headers/contribution";

interface Field {
  key: string;
  name: string;
  kind: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: Option[];
}

interface Option {
  key: string;
  value: string;
  label: string;
}

const Contributions: React.FC = () => {
  const themeOptions: Option[] = [
    {
      key: "1",
      value: "1",
      label: "Thématique 1",
    },
    {
      key: "2",
      value: "2",
      label: "Thématique 2",
    },
    {
      key: "3",
      value: "3",
      label: "Thématique 3",
    },
  ];
  const ressourceOptions: Option[] = [
    {
      key: "1",
      value: "1",
      label: "Ressource 1",
    },
    {
      key: "2",
      value: "2",
      label: "Ressource 2",
    },
    {
      key: "3",
      value: "3",
      label: "Ressource 3",
    },
  ];

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
      options: themeOptions,
    },
    {
      key: "ressource",
      name: "ressource",
      kind: "select",
      label: "Type de ressource",
      placeholder: "Le type de ressource",
      required: true,
      options: ressourceOptions,
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
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        );

      case "textarea":
        return (
          <GridItem key={field.key} colSpan={3}>
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
    <Box>
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
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  w="full"
                  gap={10}
                  pt={"3.375rem"}
                >
                  {fields.map((field) =>
                    displayField(field, values, handleChange, handleBlur)
                  )}
                </Grid>
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
