import { defineStyleConfig } from "@chakra-ui/react";

const TabsTheme = defineStyleConfig({
  sizes: {
    sm: {
      tablist: {
        px: 2,
        py: 1,
      },
      tab: {
        fontSize: "xs",
        px: 4,
        py: 3,
      },
    },
  },
  variants: {
    custom: {
      tablist: {
        bg: "#FAFCFF",
        p: 1.5,
        alignItems: "center",
        w: "fit-content",
        borderRadius: "xl",
      },
      tab: {
        minW: "max-content",
        _selected: {
          bg: "#FFFFFF",
          shadow: "sm",
          borderRadius: "md",
          fontWeight: "500",
        },
        color: "neutralDark",
      },
    },
    blueVersion: {
      tablist: {
        bg: "#FFFFFF",
        p: 1.5,
        alignItems: "center",
        w: "fit-content",
        borderRadius: "xl",
      },
      tab: {
        minW: "max-content",
        borderRadius: "full",
        border: "1px solid #E9F1FF",
        marginRight: 3,
        fontWeight: "800",
        letterSpacing: "0.5px",
        _selected: {
          bg: "#E9F1FF",
          color: "#2F6CFF",
          fontWeight: "800",
          border: "1px solid #E9F1FF",
          borderRadius: "full",
        },
      },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "custom",
  },
});

export { TabsTheme };
