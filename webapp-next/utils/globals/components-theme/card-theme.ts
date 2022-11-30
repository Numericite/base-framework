import { defineStyleConfig } from "@chakra-ui/react";

const CardTheme = defineStyleConfig({
  variants: {
    flat: {
      container: {
        bg: "white",
        shadow: "none",
      },
    },
  },
});

export default CardTheme;
