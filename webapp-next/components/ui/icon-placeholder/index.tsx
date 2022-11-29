import { Box } from "@chakra-ui/react";

interface IconPlaceHolderProps {
  icon: JSX.Element;
  color: string;
}

const IconPlaceHolder: React.FC<IconPlaceHolderProps> = (props) => {
  const { icon, color } = props;

  return (
    <Box
      bg={color}
      w="fit-content"
      justifyContent={"center"}
      alignItems="center"
      justifyItems={"center"}
      display={"flex"}
      p={2}
      borderRadius="md"
    >
      {icon}
    </Box>
  );
};

export default IconPlaceHolder;
