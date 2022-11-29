import ButtonTheme from "./components-theme/button-theme";
import { TabsTheme } from "./components-theme/tabs-theme";

const theme_extend = {
  styles: {},
  colors: {
    primary: "#2F6CFF",
    secondary: "#E1006C",
    black: "#1B1D1F",
    neutral: "#FAFCFF",
    lightBlue: "#A2DDF1",
    lightPink: "#FF7E95",
  },

  components: {
    Button: ButtonTheme,
    Tabs: TabsTheme,
  },
};

export default theme_extend;
