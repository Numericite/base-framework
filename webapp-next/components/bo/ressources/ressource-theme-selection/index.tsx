import { Box, Heading, VStack } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
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
          pageSize: 100,
        },
        filters: {
          themes: formik.values.theme.id,
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
    if (formik.values.personaes.length === 0) {
      formik.setFieldValue("personae_occupations", []);
      setPersonaeOccupations([]);
      formik.setFieldValue("sub_themes", []);
      setSubThemes([]);
    } else {
      const personaeOccupationsIds = personaeOccupations?.map(
        (personaeOccupation) => personaeOccupation.id
      );
      const personaeOccupationsToRemove =
        formik.values.personae_occupations.filter(
          (personaeOccupation) =>
            !personaeOccupationsIds?.includes(personaeOccupation)
        );
      formik.setFieldValue(
        "personae_occupations",
        formik.values.personae_occupations.filter(
          (personaeOccupation) =>
            !personaeOccupationsToRemove.includes(personaeOccupation)
        )
      );

      retrievePersonaeOccupation(formik.values.personaes);
    }
  }, [formik.values.personaes.length, formik.values.theme]);

  useEffect(() => {
    if (formik.values.personae_occupations.length === 0) {
      formik.setFieldValue("sub_themes", []);
      setSubThemes([]);
    } else {
      retrieveSubThemes();
    }
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
          spacing={2}
          formik={formik}
        />
      </Box>
      {personaeOccupations && personaeOccupations.length > 0 && (
        <Box w="full">
          <Heading size="sm" my={4}>
            A quel(s) activité(s) s&apos;adresse cette resource ?
          </Heading>
          <CheckboxDisplayer
            spacing={3}
            items={personaeOccupations}
            props_name={"personae_occupations"}
            formik={formik}
          />
        </Box>
      )}
      {subThemes && subThemes.length > 0 && (
        <Box w="full">
          <Heading size="sm" my={4}>
            Choisissez le sous-thème de la resource
          </Heading>
          <CheckboxDisplayer
            items={subThemes}
            props_name={"sub_themes"}
            spacing={3}
            formik={formik}
          />
        </Box>
      )}
    </VStack>
  );
};

export default RessourceThemeSelection;
