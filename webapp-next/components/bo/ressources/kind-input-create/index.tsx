import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";

interface KindRessourceDisplayerProps {
  kind: string;
  ressource: TRessource;
  formik: any;
}

const KindRessourceDisplayer = (props: KindRessourceDisplayerProps) => {
  const { kind, ressource, formik } = props;

  // const handleFileChange = (e: any) => {
  //   console.log("E", e.target.files[0]);
  //   formData.append("files", e.target.files[0]);
  //   console.log("FORM DATA", formData);
  // };

  const displayRessourceKindFormElement = () => {
    switch (kind) {
      case "file":
        return (
          <Input
            // value={("files" in ressource && ressource.files[0].url) || ""}
            type="file"
            w="100%"
            // onChange={(e) => handleFileChange(e)}
          />
        );
      case "video":
        return (
          <VStack>
            <FormControl>
              <FormLabel htmlFor="link">Lien de la vidéo</FormLabel>
              <Input
                w="full"
                id="link"
                name="link"
                type="text"
                value={formik.values?.link || ""}
                onChange={(e) => formik.setFieldValue("link", e.target.value)}
              />
            </FormControl>
            <HStack
              w="full"
              alignContent="flex-start"
              alignItems={"self-start"}
              justifyContent="space-between"
              justifyItems={"center"}
            >
              <FormControl>
                <FormLabel htmlFor="source">Source</FormLabel>
                <Select
                  w="full"
                  id="source"
                  name="source"
                  value={formik.values?.source || "youtube"}
                  onChange={(e) =>
                    formik.setFieldValue("source", e.target.value)
                  }
                >
                  <option value="youtube">Youtube</option>
                  <option value="vimeo">Vimeo</option>
                </Select>
              </FormControl>
              <FormControl justifyItems={"center"} justifySelf="center">
                <FormLabel htmlFor="autoplay">Lecture automatique</FormLabel>
                <Checkbox
                  id="autoplay"
                  name="autoplay"
                  mx="50%"
                  checked={formik.values.autoplay}
                  onChange={(e) =>
                    formik.setFieldValue("autoplay", e.target.checked)
                  }
                />
              </FormControl>
            </HStack>
          </VStack>
        );
      case "link":
        return (
          <FormControl>
            <FormLabel htmlFor="link">Lien</FormLabel>
            <Input
              w="full"
              placeholder="Veuillez saisir le lien vers la ressource"
              id="link"
              name="link"
              type="text"
              value={formik.values.link}
              onChange={(e) => formik.setFieldValue("link", e.target.value)}
            />
          </FormControl>
        );
      // case "quiz":
      //   return (
      //     <FormControl>
      //       <FormLabel htmlFor="quiz">Lien</FormLabel>
      //       <Input
      //         w="full"
      //         placeholder="Veuillez saisir le lien vers la ressource"
      //         id="quiz"
      //         name="quiz"
      //         type="text"
      //         onChange={(e) => setRessourceKind({ quiz: e.target.value })}
      //       />
      //     </FormControl>
      //   );

      default:
        break;
    }
  };

  return <Box w="100%">{displayRessourceKindFormElement()}</Box>;
};

export default KindRessourceDisplayer;
