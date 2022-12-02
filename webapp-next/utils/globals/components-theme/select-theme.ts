import { defineStyleConfig } from "@chakra-ui/react";

const SelectTheme = defineStyleConfig({
  baseStyle: {
    field: {
      minHeight: "60px",
      border: "1.5px solid",
      borderColor: "#E9F1FF",
      color: "neutralDark",
      py: "1.125rem",
      px: 5,
      pr: 12,
      _placeholder: {
        color: "neutralDark",
      },
    },
    icon: {
      color: "primary",
      borderRadius: "50%",
      w: 7,
      h: 7,
      backgroundColor: "#FAFCFF",
      mr: 2,
    },
  },
  defaultProps: {
    size: "md",
  },
});

export default SelectTheme;
