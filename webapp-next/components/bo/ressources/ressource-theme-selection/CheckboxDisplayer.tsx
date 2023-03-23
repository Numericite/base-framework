import { Box, Checkbox, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import {
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";

interface CheckboxDisplayerProps<TItem> {
  items: TItem[] | undefined;
  spacing: number;
  props_name: "personaes" | "sub_themes" | "personae_occupations";
  formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>;
}

const CheckboxDisplayer = <TItem extends { id: number; name: string }>(
  props: CheckboxDisplayerProps<TItem>
) => {
  const { items, spacing, props_name, formik } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = parseInt(e.currentTarget.id);
    formik.setFieldValue(
      props_name,
      !formik.values[`${props_name}`].includes(id)
        ? [...formik.values[`${props_name}`], id]
        : [...formik.values[`${props_name}`].filter((_: number) => _ !== id)]
    );
  };

  return (
    <SimpleGrid columns={spacing} spacing={4} py={3} minW="full">
      {items?.map((item) => (
        <Flex
          borderRadius={5}
          cursor="pointer"
          p={3}
          key={item.id}
          id={item.id.toString()}
          onClick={(e) => handleClick(e)}
          alignItems="center"
          border="1px solid #2f6cff33"
          bg={
            formik.values[`${props_name}`].includes(item.id)
              ? "#2f6cff33"
              : "white"
          }
        >
          <Checkbox
            mr={4}
            isChecked={formik.values[`${props_name}`].includes(item.id)}
          />
          <Text id={item.id.toString()}>{item.name}</Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default CheckboxDisplayer;
