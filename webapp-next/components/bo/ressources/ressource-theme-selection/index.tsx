import { Box, Heading, VStack } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { TPersonaeOccupation } from "../../../../pages/api/personaeoccupations/types";
import { TPersonae } from "../../../../pages/api/personaes/types";
import {
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";
import { TSubTheme } from "../../../../pages/api/subthemes/types";
import { fetchApi } from "../../../../utils/api/fetch-api";
import CheckboxDisplayer from "./CheckboxDisplayer";

interface RessourceThemeSelectionProps {
  formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>;
}

const RessourceThemeSelection = (props: RessourceThemeSelectionProps) => {
  const { formik } = props;
  const [personaes, setPersonaes] = useState<TPersonae[]>();
  const [personaeOccupations, setPersonaeOccupations] =
    useState<TPersonaeOccupation[]>();
  const [subThemes, setSubThemes] = useState<TSubTheme[]>();

  const [isPersonaesSelected, setIsPersonaesSelected] = useState(false);
  const [isPersonaeOccupationsSelected, setIsPersonaeOccupationsSelected] =
    useState(false);
  const [isSubThemesSelected, setIsSubThemesSelected] = useState(false);

  const retrievePersonae = () => {
    fetchApi.get("/api/personaes/list").then((res) => {
      setPersonaes(res.data);
    });
  };

  const retrievePersonaeOccupation = (ids: number[]) => {
    if (ids.length === 0) return;
    fetchApi
      .get("/api/personaeoccupations/list", {
        pagination: {
          page: 1,
          pageSize: 10,
        },
        filters: {
          personae: {
            id: {
              $in: ids,
            },
          },
        },
      })
      .then((res) => {
        setPersonaeOccupations(res.data);
      });
  };

  const retrieveSubThemes = () => {
    fetchApi
      .get("/api/subthemes/list", {
        pagination: {
          page: 1,
          pageSize: 10,
        },
        filters: {
          id: {
            $in: formik.values.theme.id,
          },
        },
      })
      .then((res) => {
        setSubThemes(res.data);
      });
  };

  useEffect(() => {
    retrievePersonae();
  }, []);

  useEffect(() => {
    retrievePersonaeOccupation(formik.values.personaes as unknown as number[]);
  }, [formik.values.personaes]);

  useEffect(() => {
    retrieveSubThemes();
  }, [formik.values.personae_occupations]);

  return (
    <VStack spacing={4} justify="flex-start" align="flex-start" w="100%">
      <Box w="full">
        <Heading size="sm" my={4}>
          A quel(s) profil(s) s&apos;adresse cette resource ?
        </Heading>
        <CheckboxDisplayer
          items={personaes}
          props_name={"personaes"}
          spacing={5}
          formik={formik}
          onClick={(e) => setIsPersonaesSelected(e.target.checked)}
        />
      </Box>
      {personaeOccupations && personaeOccupations?.length > 0 && (
        <Box w="full">
          <Heading size="sm" my={4}>
            A quel(s) activité(s) s&apos;adresse cette resource ?
          </Heading>
          <CheckboxDisplayer
            spacing={3}
            items={personaeOccupations}
            props_name={"personae_occupations"}
            formik={formik}
            onClick={(e) => setIsPersonaeOccupationsSelected(e.target.checked)}
          />
        </Box>
      )}
      {isPersonaeOccupationsSelected && (
        <Box w="full">
          <Heading size="sm" my={4}>
            Choisissez le sous-thème de la resource
          </Heading>
          <CheckboxDisplayer
            items={subThemes}
            props_name={"sub_themes"}
            spacing={3}
            formik={formik}
            onClick={(e) => setIsSubThemesSelected(e.target.checked)}
          />
        </Box>
      )}
    </VStack>
  );
};

export default RessourceThemeSelection;
