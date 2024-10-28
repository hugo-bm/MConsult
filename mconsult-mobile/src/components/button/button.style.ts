import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    padding: 10,
    margin: 20,
    borderRadius: 20,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  out_primary: {
    backgroundColor: COLORS.mainBackground,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },
  out_danger: {
    backgroundColor: COLORS.mainBackground,
    borderColor: COLORS.danger,
  },
  text: {
    color: "#fff",
    fontSize: FONT_SIZE.md,
    textAlign: "center",
  },

  text_out_primary: {
    color: COLORS.primary,
  },
  text_out_danger: {
    color: COLORS.danger,
  },
});

export default styles;
