import {
  Box,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";
interface RessourceSummaryProps {
  formik: FormikProps<TRessourceCreationPayload | TRessourceUpdatePayload>;
}
import { ImYoutube2 } from "react-icons/im";
import { FaVimeo } from "react-icons/fa";
import { displayKindReadable } from "../../../../utils/globals/enums";
import parse from "html-react-parser";

const RessourceSummary: React.FC<RessourceSummaryProps> = (props) => {
  const { formik } = props;
  const { values } = formik;

  const kindInfoDisplayer = () => {
    switch (values.kind) {
      case "video":
        return (
          <>
            <Tr>
              <Td>URL de la vidéo : </Td>
              <Td>
                <Link href={values.link}>{values.link}</Link>
              </Td>
            </Tr>
            <Tr>
              <Td>Source de la vidéo : </Td>
              <Td>
                {values.source === "youtube" ? (
                  <Flex alignItems={"center"}>
                    <ImYoutube2 size={40} /> <Text ml={3}>{values.source}</Text>
                  </Flex>
                ) : (
                  <Flex alignItems={"center"}>
                    <FaVimeo size={40} /> <Text ml={3}>{values.source}</Text>
                  </Flex>
                )}
              </Td>
            </Tr>
          </>
        );
      case "link":
        return (
          <Tr>
            <Td>URL du lien : </Td>
            <Td>
              <Link href={values.link} target="_blank">
                {values.link}
              </Link>
            </Td>
          </Tr>
        );
      // case "file":
      //   return (
      //     <Box>
      //       <Text>Fichier : </Text>
      //       <Text>{values.files[0]}</Text>
      //     </Box>
      //   );
      default:
        break;
    }
  };

  return (
    <TableContainer overflowX="hidden" overflowY="scroll">
      <Table
        style={{
          whiteSpace: "pre-wrap",
        }}
        variant={"striped"}
      >
        <Tbody>
          <Tr>
            <Td style={{ width: "40%" }}>Nom de la ressource :</Td>
            <Td>{values.name}</Td>
          </Tr>
          <Tr>
            <Td>Description de la ressource :</Td>
            <Td>{values.description}</Td>
          </Tr>
          <Tr>
            <Td>Thème de la ressource :</Td>
            <Td>{values.theme.name}</Td>
          </Tr>
          <Tr>
            <Td>Type de la ressource :</Td>
            <Td>{displayKindReadable(values.kind)}</Td>
          </Tr>
          <Tr>
            <Td>Contenu de la ressource :</Td>
            <Td>{parse(values.content)}</Td>
          </Tr>
          {kindInfoDisplayer()}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RessourceSummary;
