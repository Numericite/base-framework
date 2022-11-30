import { defineStyleConfig } from "@chakra-ui/react";

const TagTheme = defineStyleConfig({
  sizes: {
    sm: {
      fontSize: "sm",
      w: "fit-content",
      px: 4,
      py: 3,
      borderRadius: "md",
      justifyContent: "space-between",
      alignItems: "center",
    },
    md: {
      w: "fit-content",
      fontSize: "md",
      px: 6,
      py: 4,
      borderRadius: "md",
      color: "primary",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  variants: {
    neutral: {
      container: {
        bg: "neutral",
        color: "primary",
        border: "1px solid  #E9F1FF",
        fontWeight: "600",
      },
    },
    colored: {
      container: {
        color: "white",
        border: "1px solid  #FFFFFF",
        fontWeight: "600",
      },
    },
  },
});

export default TagTheme;
