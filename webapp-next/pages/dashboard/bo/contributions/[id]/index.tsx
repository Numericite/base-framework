import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  FaBook,
  FaAddressCard,
  FaUser,
  FaBrain,
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
} from "react-icons/fa";
import BackButton from "../../../../../components/ui/back-button/back-button";
import { fetchApi } from "../../../../../utils/api/fetch-api";
import { TContribution } from "../../../../api/contributions/types";

interface IContributionPageProps {
  contribution: TContribution;
}

const ContributionPage = (props: IContributionPageProps) => {
  const { contribution } = props;
  const toast = useToast();
  const router = useRouter();

  const handleValidation = () => {
    let tmpContribution = contribution;
    tmpContribution.isAccepted = true;
    fetchApi
      .put("/api/contributions/update", tmpContribution)
      .then(() => {
        toast({
          title: "La contribution a bien été validée !",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/dashboard/bo/contributions");
      })
      .catch((error) => {
        toast({
          title: "Une erreur est survenue",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const displayResource = (
    file:
      | {
          id: number;
          url: string;
        }
      | File
      | null,
    index: number
  ) => {
    if (file !== null && "url" in file) {
      let extension = file.url.split(".").pop();
      switch (extension) {
        case "pdf":
          return (
            <Td>
              <Button
                key={index}
                variant="outline"
                onClick={() =>
                  window.open(process.env.NEXT_PUBLIC_STRAPI_URL + file.url)
                }
                h={"auto"}
                my={4}
              >
                <Box mr={3}>
                  <FaFilePdf />
                </Box>
                Consulter le document
              </Button>
            </Td>
          );
        case "png":
        case "jpg":
        case "jpeg":
          return (
            <Td>
              <Image
                key={index}
                src={file.url}
                alt="Ressource"
                w={"full"}
                h={"auto"}
                my={4}
              />
            </Td>
          );
        case "docx":
        case "doc":
        case "xlsx":
        case "xls":
          return (
            <Td>
              <Button
                key={index}
                variant="outline"
                onClick={() =>
                  window.open(process.env.NEXT_PUBLIC_STRAPI_URL + file.url)
                }
                h={"auto"}
                my={4}
              >
                <Box mr={3}>
                  {extension === "xlsx" || extension === "xls" ? (
                    <FaFileExcel />
                  ) : (
                    <FaFileWord />
                  )}
                </Box>
                Consulter le document
              </Button>
            </Td>
          );
        default:
          break;
      }
    }
  };

  return (
    <>
      <Box mb={4}>
        <BackButton />
      </Box>
      <Container maxW="container.lg">
        <Heading>Contribution n° {contribution.id}</Heading>
        <TableContainer overflowX="hidden" my={10}>
          <Table
            style={{
              whiteSpace: "pre-wrap",
            }}
            variant={"striped"}
          >
            <Tbody>
              <Tr>
                <Td>
                  <Flex>
                    <FaUser />
                    <Text ml={3}>Contributeur / Contributrice :</Text>
                  </Flex>
                </Td>
                {contribution.first_name && contribution.last_name && (
                  <Td>
                    {contribution.first_name.charAt(0).toUpperCase() +
                      contribution.first_name.slice(1)}{" "}
                    {contribution.last_name.charAt(0).toUpperCase() +
                      contribution.last_name.slice(1)}
                  </Td>
                )}
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    <FaAddressCard />
                    <Text ml={3}>Fonction :</Text>
                  </Flex>
                </Td>
                <Td>{contribution.job_title}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    <FaAddressCard />
                    <Text ml={3}>Adresse email :</Text>
                  </Flex>
                </Td>
                <Td>{contribution.email}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    <FaBook />
                    <Text ml={3}>Thème :</Text>
                  </Flex>
                </Td>
                <Td>{contribution.theme?.name}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    <FaFolder />
                    <Text ml={3}>Contenu proposé :</Text>
                  </Flex>
                </Td>
                <Td>{contribution.description}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    <FaBrain />
                    <Text ml={3}>Ressource proposée :</Text>
                  </Flex>
                </Td>

                {contribution.link && (
                  <Td>
                    <Link href={contribution.link} target="_blank" />
                  </Td>
                )}
                {contribution.files &&
                  contribution.files.map((file, index) =>
                    displayResource(file, index)
                  )}
              </Tr>
            </Tbody>
            <TableCaption>
              {!contribution.isAccepted ? (
                <Button variant="primary" onClick={() => handleValidation()}>
                  Valider la contribution
                </Button>
              ) : (
                <Flex
                  w="full"
                  justifyContent="center"
                  alignContent="center"
                  align={"center"}
                >
                  <BsCheckCircleFill color="green" />
                  <Text fontSize={"md"} fontWeight={"bold"} ml={4}>
                    Contribution validée
                  </Text>
                </Flex>
              )}
            </TableCaption>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetchApi
    .get("/api/contributions/find", {
      id: parseInt(id as string),
    })
    .then((response) => {
      return response;
    });

  return {
    props: {
      contribution: res || null,
    },
  };
};

export default ContributionPage;
