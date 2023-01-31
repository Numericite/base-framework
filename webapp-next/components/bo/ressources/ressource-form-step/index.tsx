import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, FormikProps } from "formik";
import dynamic from "next/dynamic";
import {
  TRessourceCreationPayload,
  TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";
import { TTheme } from "../../../../pages/api/themes/types";
import {
  displayKindReadable,
  ressourceKindEnum,
} from "../../../../utils/globals/enums";
import KindRessourceDisplayer from "../kind-input-create";
import "react-quill/dist/quill.snow.css";
import RessourceSummary from "../ressource-summary";

interface RessourceFormStepProps {
  formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>;
  step: number;
  themes: TTheme[];
}

interface RessourceFormStepElement {
  id: number;
  componentToDisplay: (
    formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>
  ) => JSX.Element;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RessourceFormStep: React.FC<RessourceFormStepProps> = (props) => {
  const { formik, step, themes } = props;

  const stepElements: RessourceFormStepElement[] = [
    {
      id: 1,
      componentToDisplay: (
        formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>
      ) => (
        <>
          <FormControl
            isRequired={true}
            isInvalid={!!formik.errors.name && formik.touched.name}
          >
            <FormLabel htmlFor="name">Nom</FormLabel>
            <Input
              w="full"
              id="name"
              name="name"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <FormErrorMessage>{formik.errors.name as string}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired={true}
            isInvalid={
              !!formik.errors.description && formik.touched.description
            }
          >
            <FormLabel htmlFor="name">Description</FormLabel>
            <Input
              w="full"
              id="description"
              name="description"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <FormErrorMessage>
              {formik.errors.description as string}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired={true}
            isInvalid={
              !!formik.errors.theme?.name && formik.touched.theme?.name
            }
          >
            <FormLabel htmlFor="name">Thématique associée</FormLabel>
            <Select
              id="kind"
              name="theme"
              onBlur={formik.handleBlur}
              onChange={(e) =>
                formik.setFieldValue(
                  "theme",
                  themes.find((theme) => theme.name === e.target.value)
                )
              }
              value={formik.values.theme?.name}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl
            isRequired={true}
            isInvalid={!!formik.errors.content && formik.touched.content}
          >
            <FormLabel htmlFor="name">Contenu</FormLabel>
            <Field name="content">
              {({ field }: any) => {
                return (
                  <>
                    <ReactQuill
                      style={{ height: "15rem", marginBottom: "1.25rem" }}
                      value={formik.values.content}
                      theme="snow"
                      onChange={field.onChange(field.name)}
                    />
                  </>
                );
              }}
            </Field>
          </FormControl>
        </>
      ),
    },
    {
      id: 2,
      componentToDisplay: (
        formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>
      ) => (
        <>
          <FormControl
            isRequired={true}
            isInvalid={!!formik.errors.kind && formik.touched.kind}
          >
            <FormLabel htmlFor="kind">Type de ressource</FormLabel>
            <Select
              id="kind"
              name="kind"
              onChange={formik.handleChange}
              value={formik.values.kind}
            >
              {ressourceKindEnum.map((kind) => (
                <option key={kind} value={kind}>
                  {displayKindReadable(kind)}
                </option>
              ))}
            </Select>
          </FormControl>
          <KindRessourceDisplayer kind={formik.values.kind} formik={formik} />
        </>
      ),
    },
    {
      id: 3,
      componentToDisplay: (
        formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>
      ) => <RessourceSummary formik={formik} />,
    },
  ];

  return (
    stepElements.find((el) => el.id === step)?.componentToDisplay(formik) || (
      <></>
    )
  );
};

export default RessourceFormStep;
