import ButtonTheme from "./components-theme/button-theme";
import RadioTheme from "./components-theme/radio-theme";
import TagTheme from "./components-theme/tag-theme";
import { TabsTheme } from "./components-theme/tabs-theme";
import InputTheme from "./components-theme/input-theme";
<<<<<<< HEAD
import CardTheme from "./components-theme/card-theme";
=======
import SelectTheme from "./components-theme/select-theme";
>>>>>>> fb0df3f (feat: init header on ressource page)

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
<<<<<<< HEAD
    Card: CardTheme,
=======
    Select: SelectTheme,
>>>>>>> fb0df3f (feat: init header on ressource page)
  },
};

export default theme_extend;
