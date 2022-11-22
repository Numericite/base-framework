import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "primary",
      color: "primary",
      bg: "transparent",
      _hover: {
        bg: "primary",
        color: "white",
      },
    },
    solid: {
      bg: "primary",
      color: "white",
      border: "2px solid",
      borderColor: "transparent",
      _hover: {
        bg: "transparent",
        borderColor: "primary",
        color: "primary",
      },
    },
    delete: {
      bg: "red",
      color: "white",
      border: "2px solid",
      borderColor: "transparent",
      _hover: {
        bg: "transparent",
        borderColor: "red",
        color: "red",
      },
    },
    neutral: {
      bg: "white",
      color: "neutral",
      border: "1px solid",
      borderColor: "neutral",
      _hover: {
        bg: "neutral",
        borderColor: "neutral",
        color: "white",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

const FormLabels = defineStyleConfig({
  variants: {
    solid: {
      fontWeight: "bold",
    },
  },
  defaultProps: {
    variant: "solid",
  },
});

const theme_extend = {
  styles: {
    global: () => ({
      body: {
        bg: "#F3F7F8",
      },
      // pas fou mais j'ai pas mieux pour override le bg du body
      input: {
        bg: "white !important",
      },
      textarea: {
        bg: "white !important",
      },
      select: {
        bg: "white !important",
      },
      // draftjs custom css
      ".custom-editor": {
        bg: "white",
        borderRadius: "10px",
        border: "1px solid #E2E8F0",
        padding: "20px",
      },
      ".custom-editor:focus": {
        borderColor: "blue",
      },
      ".public-DraftStyleDefault-block": {
        margin: 0,
      },
      ".rdw-editor-toolbar": {
        backgroundColor: "transparent",
        border: 0,
        padding: 0,
      },
    }),
  },
  colors: {
    primary: "rgba(9, 132, 227)",
    primaryShades: {
      30: "rgba(9, 132, 227, 0.03)",
      100: "rgba(9, 132, 227, 0.1)",
      200: "rgba(9, 132, 227, 0.2)",
      300: "rgba(9, 132, 227, 0.3)",
      400: "rgba(9, 132, 227, 0.4)",
      500: "rgba(9, 132, 227, 0.5)",
      600: "rgba(9, 132, 227, 0.6)",
      700: "rgba(9, 132, 227, 0.7)",
      800: "rgba(9, 132, 227, 0.8)",
      900: "rgba(9, 132, 227, 0.9)",
    },
    secondary: "rgba(250, 177, 160)",
    secondaryShades: {
      30: "rgba(250, 177, 160, 0.03)",
      100: "rgba(250, 177, 160, 0.1)",
      200: "rgba(250, 177, 160, 0.2)",
      300: "rgba(250, 177, 160, 0.3)",
      400: "rgba(250, 177, 160, 0.4)",
      500: "rgba(250, 177, 160, 0.5)",
      600: "rgba(250, 177, 160, 0.6)",
      700: "rgba(250, 177, 160, 0.7)",
      800: "rgba(250, 177, 160, 0.8)",
      900: "rgba(250, 177, 160, 0.9)",
    },
    neutral: "#2f3640",
  },
  components: {
    Button,
    FormLabel: FormLabels,
  },
};

export default theme_extend;
