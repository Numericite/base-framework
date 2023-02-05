import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";

interface RessourceInfosProps {
	ressource: TRessource;
}

const RessourceInfos = (props: RessourceInfosProps) => {
	const { ressource } = props;

	const openExternalRessource = () => {
		if (ressource.kind === 'file') {
			ressource.files?.forEach((file) => {
				window.open(file.url, '_blank', 'noreferrer');
			})
		} else if (ressource.kind === 'link' || ressource.kind === 'video') {
			window.open(ressource.link, '_blank', 'noreferrer');
		}
	}

	return (
		<Box bg="#FAFCFF" borderRadius={"xl"} py="1.5rem" px="1.875rem" maxH="auto">
			{
				(ressource.kind === 'file' || ressource.kind === 'link' || ressource.kind === 'video') && (
					<Box>
						<Heading size="sm" mb={"0.375rem"}>
							Accéder à la ressource
						</Heading>
						<Text color="#6B829B" fontSize={"sm"} my={2}>
							La ressource est ouverte à tous. Vous pouvez y accéder dès maintenant :
						</Text>
						<Button mt={2} w="100%" justifyContent={"center"} size="sm" onClick={openExternalRessource} >
							{
								ressource.kind === 'file' && (<>Télécharger le fichier <DownloadIcon ml={3} /></>)
							}
							{
								ressource.kind === 'link' && (<>Accéder au site <ExternalLinkIcon ml={3} /></>)
							}
							{
								ressource.kind === 'video' && (<>Accéder à la vidéo source <ExternalLinkIcon ml={3} /></>)
							}
						</Button>
					</Box>
				)
			}
			{/* <Heading size="sm" mt="1.5rem" mb={"0.375rem"}>
				L&apos;équipe
			</Heading>
			<Text color="#6B829B" fontSize={"sm"}>
				Cette ressource a été créée par ....
			</Text>

			<Heading size="sm" mt="1.5rem" mb={"0.375rem"}>
				Partenaires
			</Heading>
			<Text color="#6B829B" fontSize={"sm"}>
				Cette ressource a été créée avec le soutien de ....
			</Text> */}
		</Box>
	);
};

export default RessourceInfos;
