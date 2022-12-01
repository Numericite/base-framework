import { Text } from "@chakra-ui/react";

interface LabelProps {
  label: string;
}

const InputLabel: React.FC<LabelProps> = (props) => {
  const { label } = props;
  return (
    <Text color="#204064" fontWeight={"600"} fontSize="sm">
      {label}
    </Text>
  );
};

export default InputLabel;
