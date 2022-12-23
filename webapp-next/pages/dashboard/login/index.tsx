import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  HStack,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Link,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { fetchApi } from "../../../utils/api/fetch-api";
import { setJwt } from "../../../utils/globals/cookies";
import PasswordField from "../../../components/ui/form/password";
import AppContext from "../../../context/state";

export const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const { updateUser } = React.useContext(AppContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(6, "Trop court!"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const logWithCredentials = async (loginCredentials: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetchApi.post("/api/auth/login", {
        identifier: loginCredentials.email,
        password: loginCredentials.password,
      });
      setJwt(response.jwt);
      updateUser(response.user);
      router.push("/dashboard/bo");
    } catch {
      toast.closeAll();
      toast({
        position: "bottom",
        status: "error",
        title: "Identifiants incorrects",
      });
    }
    setIsLoading(false);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg="white"
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="6" alignItems="center">
          <Flex userSelect="none">
            <Heading fontSize="2xl">Ressourcerie</Heading>
            <Heading
              fontSize="2xl"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
              ml={1.5}
            >
              PFRH
            </Heading>
          </Flex>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })} my={5}>
              Connectez-vous à votre compte
            </Heading>
          </Stack>
        </Stack>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={logWithCredentials}
        >
          {(formik) => (
            <Form>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      w="full"
                      id="email"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </FormControl>
                  <PasswordField
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked>Se rappeler de moi</Checkbox>
                  <Link
                    href="#"
                    fontSize="sm"
                    fontWeight="bold"
                    color="primary"
                  >
                    Mot de passe oublié?
                  </Link>
                </HStack>
                <Stack spacing="6">
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    alignSelf="center"
                  >
                    Se connecter
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
