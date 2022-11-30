import { defineStyleConfig } from "@chakra-ui/react";

const RadioTheme = defineStyleConfig({
  baseStyle: {
    control: {
      bg: "white",
      borderColor: "#2F6CFF",
      border: "2px solid",
      _hover: {
        bg: "white",
        color: "#2F6CFF",
      },
      _checked: {
        bg: "white",
        color: "#2F6CFF",
        _hover: {
          bg: "white",
          color: "#2F6CFF",
        },
      },
    },
    label: {
      fontSize: "xs",
      color: "black",
      fontWeight: "400",
      _checked: {
        fontSize: "xs",
        color: "black",
        fontWeight: "600",
      },
    },
  },
});

export default RadioTheme;
