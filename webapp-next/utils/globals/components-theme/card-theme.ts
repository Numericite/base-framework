import { defineStyleConfig } from "@chakra-ui/react";

const CardTheme = defineStyleConfig({
  variants: {
    flat: {
      container: {
        bg: "white",
        shadow: "none",
      },
    },
    article: {
      container: {
        bg: "white",
        shadow: "none",
        border: "1px solid #E9F1FF",
      },
    },
  },
});

export default CardTheme;
