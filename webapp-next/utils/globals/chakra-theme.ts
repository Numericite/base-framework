import ButtonTheme from "./components-theme/button-theme";
import InputTheme from "./components-theme/input-theme";

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
    Input: InputTheme,
  },
};

export default theme_extend;
