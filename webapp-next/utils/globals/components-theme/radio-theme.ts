import { defineStyleConfig } from "@chakra-ui/react";
import { withTheme } from "@emotion/react";

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
      color: "black",
      fontWeight: "400",
      fontSize: "xs",
      _checked: {
        fontSize: "xs",
        color: "black",
        fontWeight: "600",
      },
    },
  },
  variants: {
    gradient: {
      control: {
        w: "20px",
        h: "20px",
        borderColor: "primary",
        _checked: {
          bg: "linear-gradient(180deg, #97F8B1 0%, #2F6CFF 100%)",
          color: "white",
          p: "1px",
          border: "none",
          _hover: {
            bg: "linear-gradient(180deg, #97F8B1 0%, #2F6CFF 100%)",
            color: "white",
            border: "none",
          },
        },
      },
    },
  },
});

export default RadioTheme;
