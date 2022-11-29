import ButtonTheme from "./components-theme/button-theme";
import TagTheme from "./components-theme/tag-theme";

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
    Tag: TagTheme,
  },
};

export default theme_extend;
