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
        w: "100%",
      },
      tab: {
        _selected: {
          bg: "#FFFFFF",
          shadow: "sm",
          borderRadius: "md",
          fontWeight: "500",
          color: "black",
        },
        color: "#6B829B",
      },
    },
  },
});

export { TabsTheme };
