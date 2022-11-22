import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BackButtonProps } from "./interface";

const BackButton = ({ route }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (route) router.push(route);
        else router.back();
      }}
    >
      <ArrowBackIcon mr={2} /> Retour
    </Button>
  );
};

export default BackButton;
