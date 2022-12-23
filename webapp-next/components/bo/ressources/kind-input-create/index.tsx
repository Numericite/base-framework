import { Box, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface KindRessourceDisplayerProps {
  kind: string;
  setRessourceKind: Dispatch<SetStateAction<any>>;
}

const KindRessourceDisplayer = (props: KindRessourceDisplayerProps) => {
  const { kind, setRessourceKind } = props;

  const displayRessourceKindFormElement = () => {
    switch (kind) {
      case "file":
        return <Input />;
      case "video":
        return <Input />;
      case "link":
        return <Input />;
      case "quiz":
        return <Input />;

      default:
        break;
    }
  };

  return <Box>{displayRessourceKindFormElement()}</Box>;
};

export default KindRessourceDisplayer;
