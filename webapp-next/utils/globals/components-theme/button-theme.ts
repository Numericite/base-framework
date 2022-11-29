import { defineStyleConfig } from "@chakra-ui/react";

const ButtonTheme = defineStyleConfig({
  sizes: {
    sm: {
      fontSize: "sm",
      w: "fit-content",
      px: 4,
      py: 3,
      borderRadius: "3xl",
      justifyContent: "space-between",
      alignItems: "center",
    },
    md: {
      w: "fit-content",
      fontSize: "md",
      px: 6,
      py: 4,
      borderRadius: "3xl",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  variants: {
    primary: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "secondary",
        transition: "all 0.2s ease-in-out",
      },
    },
    neutral: {
      bg: "neutral",
      color: "black",
      _hover: {
        bg: "black",
        color: "white",
        transition: "all 0.2s ease-in-out",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});

export default ButtonTheme;
