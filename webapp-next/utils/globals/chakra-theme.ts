import ButtonTheme from "./components-theme/button-theme";
import RadioTheme from "./components-theme/radio-theme";
import TagTheme from "./components-theme/tag-theme";
import { TabsTheme } from "./components-theme/tabs-theme";
import InputTheme from "./components-theme/input-theme";
import CardTheme from "./components-theme/card-theme";

const theme_extend = {
  styles: {},
  fonts: {
    heading: `Poppins`,
    body: `Poppins`,
  },
  colors: {
    primary: "#2F6CFF",
    secondary: "#E1006C",
    black: "#1B1D1F",
    neutral: "#FAFCFF",
    neutralDark: "#6B829B",
    lightBlue: "#A2DDF1",
    lightPink: "#FF7E95",
  },
  fontSizes: {
    "1.5xl": "1.375rem",
    "2.5xl": "1.75rem",
    "5.5xl": "3.5rem",
    "7.5xl": "5.5rem",
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
