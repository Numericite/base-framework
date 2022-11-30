import ButtonTheme from "./components-theme/button-theme";
import RadioTheme from "./components-theme/radio-theme";

const theme_extend = {
  styles: {},
  colors: {
    primary: "#2F6CFF",
    secondary: "#E1006C",
    black: "#1B1D1F",
    neutral: "#FAFCFF",
  },

  components: {
    Button: ButtonTheme,
    Radio: RadioTheme,
  },
};

export default theme_extend;
