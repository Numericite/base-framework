import { defineStyleConfig } from "@chakra-ui/react";

const InputTheme = defineStyleConfig({
  sizes: {
    sm: {
      field: {
        fontSize: "sm",
        w: "fit-content",
        py: 3,
        alignItems: "center",
        fontWeight: "bold",
        borderRadius: "lg",
        _placeholder: {
          fontSize: "md",
          fontWeight: "light",
        },
      },
    },
    md: {
      field: {
        w: "fit-content",
        fontSize: "md",
        py: 4,
        alignItems: "center",
        fontWeight: "bold",
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
