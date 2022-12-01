import { defineStyleConfig } from "@chakra-ui/react";

const ButtonTheme = defineStyleConfig({
  sizes: {
    sm: {
      fontSize: "xs",
      w: "fit-content",
      px: 4,
      py: 3,
      borderRadius: "3xl",
      justifyContent: "space-between",
      alignItems: "center",
      height: "auto",
    },
    md: {
      w: "fit-content",
      fontSize: "sm",
      px: 6,
      py: 4,
      borderRadius: "3xl",
      justifyContent: "space-between",
      alignItems: "center",
      height: "auto",
    },
  },
  variants: {
    primary: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)",
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
