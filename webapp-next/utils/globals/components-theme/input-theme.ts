import { defineStyleConfig } from "@chakra-ui/react";

const InputTheme = defineStyleConfig({
  sizes: {
    sm: {
      field: {
        fontSize: "xs",
        w: "fit-content",
        py: 3,
        alignItems: "center",
        fontWeight: "bold",
        borderRadius: "lg",
        backgroundColor: "#E9F1FF",
        _placeholder: {
          fontSize: "md",
          fontWeight: "light",
        },
      },
    },
    md: {
      field: {
        w: "fit-content",
        fontSize: "sm",
        py: 4,
        alignItems: "center",
        fontWeight: "bold",
        backgroundColor: "#E9F1FF",
        borderRadius: "lg",
        _placeholder: {
          fontSize: "md",
          fontWeight: "light",
        },
      },
    },
  },

  defaultProps: {
    size: "md",
  },
});

export default InputTheme;
