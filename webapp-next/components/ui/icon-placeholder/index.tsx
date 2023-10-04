import { Box } from "@chakra-ui/react";
import {
	FileIcon,
	QuizIcon,
	VideoIcon,
	LinkIcon,
} from "../../../utils/globals/icons/Icons";

interface IconPlaceHolderProps {
	kind: string;
}

const IconPlaceHolder: React.FC<IconPlaceHolderProps> = (props) => {
	const { kind } = props;

	const itemList = [
		{
			kind: "file",
			icon: <FileIcon fill="white" />,
			color: "primary",
		},
		{
			kind: "link",
			icon: <LinkIcon fill="white" />,
			color: "#A2DDF1",
		},
		{
			kind: "video",
			icon: <VideoIcon fill="white" />,
			color: "secondary",
		},
		{
			kind: "quiz",
			icon: <QuizIcon fill="white" />,
			color: "lightPink",
		},
	];

	const elementToRender = itemList.find((item) => item.kind === kind);

	return (
		<Box
			bg={elementToRender?.color}
			w={"fit-content"}
			h={"fit-content"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			p={2}
			borderRadius="md"
		>
			{elementToRender?.icon}
		</Box>
	);
};

export default IconPlaceHolder;
