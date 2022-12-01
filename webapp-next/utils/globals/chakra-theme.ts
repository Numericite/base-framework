import ButtonTheme from "./components-theme/button-theme";
import RadioTheme from "./components-theme/radio-theme";
import TagTheme from "./components-theme/tag-theme";
import { TabsTheme } from "./components-theme/tabs-theme";
import InputTheme from "./components-theme/input-theme";
import CardTheme from "./components-theme/card-theme";

const theme_extend = {
  styles: {},
  colors: {
    primary: "#2F6CFF",
    secondary: "#E1006C",
    black: "#1B1D1F",
    neutral: "#FAFCFF",
    body: "#6B829B",
    lightBlue: "#A2DDF1",
    lightPink: "#FF7E95",
  },
  fontSizes: {
    xs: "0.875rem",
    sm: "1rem",
    md: "1.375rem",
    lg: "3rem",
    xl: "4.5rem",
    "2xl": "5.5rem",
  },
  p: {
    xs: "0.875rem",
  },

  sizes: {
    container: {
      "2lg": "1124px",
    },
  },

  components: {
    Button: ButtonTheme,
    Radio: RadioTheme,
    Tag: TagTheme,
    Tabs: TabsTheme,
    Input: InputTheme,
    Card: CardTheme,
  },
};

export default theme_extend;
