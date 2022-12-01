import { defineStyleConfig } from "@chakra-ui/react";

const SelectTheme = defineStyleConfig({
  baseStyle: {
    field: {
      border: "1.5px solid",
      borderColor: "#E9F1FF",
      _placeholder: {
        color: "neutralDark",
      },
    },
    icon: {
      color: "primary",
      borderRadius: "50%",
      w: "fit-content",
      h: "fit-content",
      backgroundColor: "#FAFCFF",
    },
  },
  defaultProps: {
    size: "md",
  },
});

export default SelectTheme;
