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
          bgGradient: "linear-gradient(270deg, #97F8B1 0%, #2F6CFF 100%)",
          bgClip: "text",
        },
        color: "neutralDark",
      },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "custom",
  },
});

export { TabsTheme };
