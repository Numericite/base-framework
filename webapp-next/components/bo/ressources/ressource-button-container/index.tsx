import { Box, Button, Flex } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import {
	TRessourceCreationPayload,
	TRessourceUpdatePayload,
} from "../../../../pages/api/ressources/types";

interface ButtonContainerProps {
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	id?: string | string[] | undefined;
	formik: FormikProps<TRessourceUpdatePayload | TRessourceCreationPayload>;
}

const ButtonContainer: React.FC<ButtonContainerProps> = (props) => {
	const { step, setStep, id, formik } = props;

	return (
		<Box mt={10} display="flex" justifyContent="center">
			{step === 1 && (
				<Button
					type="button"
					variant="primary"
					disabled={
						formik.errors.name ||
							formik.errors.description ||
							formik.errors.theme ||
							formik.errors.content
							? true
							: false
					}
					onClick={() => setStep(2)}
				>
					Suivant
				</Button>
			)}
			{step > 1 && step <= 3 && (
				<Flex justifyContent={"space-around"} w="fit-content" px={6}>
					<Button
						type="button"
						variant="neutral"
						mr={3}
						onClick={() => setStep(step - 1)}
					>
						Précédent
					</Button>
					<Button
						type="button"
						variant="primary"
						disabled={Object.keys(formik.errors).length !== 0}
						onClick={() => setStep(step + 1)}
					>
						Suivant
					</Button>
				</Flex>
			)}
			{step === 4 && (
				<Flex justifyContent={"space-around"} w="fit-content" px={6}>
					<Button
						type="button"
						variant="neutral"
						mr={3}
						onClick={() => setStep(step - 1)}
					>
						Précédent
					</Button>
					<Button
						type="submit"
						variant="primary"
						onClick={() => formik.handleSubmit}
					>
						{id === "new" ? "Valider la création" : "Valider la modification"}
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default ButtonContainer;
