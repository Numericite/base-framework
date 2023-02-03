import {
  Checkbox,
  CheckboxGroup,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import {
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";

interface CheckboxDisplayerProps<TItem> {
  items: TItem[] | undefined;
  spacing: number;
  props_name: "personaes" | "sub_themes" | "personae_occupations";
  formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>;
  onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxDisplayer = <TItem extends { id: number; name: string }>(
  props: CheckboxDisplayerProps<TItem>
) => {
  const { items, spacing, props_name, formik, onClick } = props;

  return (
    <SimpleGrid columns={spacing} spacing={4} py={3} bg="neutral" minW="full">
      <CheckboxGroup>
        {items?.map((item) => (
          <Flex flexDir="column" align="center" justify="center" key={item.id}>
            <Text size="md">{item.name}</Text>
            <Checkbox
              my={2}
              name={props_name}
              isChecked={formik.values[`${props_name}`].includes(item.id)}
              onChange={(e) => {
                onClick && onClick(e);
                formik.setFieldValue(
                  props_name,
                  e.target.checked
                    ? [...formik.values[`${props_name}`], item.id]
                    : [
                        ...formik.values[`${props_name}`].filter(
                          (id: number) => id !== item.id
                        ),
                      ]
                );
              }}
              color="primary"
            />
          </Flex>
        ))}
      </CheckboxGroup>
    </SimpleGrid>
  );
};

export default CheckboxDisplayer;
