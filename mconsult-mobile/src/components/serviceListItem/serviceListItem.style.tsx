import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
  services: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.gray4,
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 3,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 8,
  },
  priceContainer: { flexDirection: "row",marginTop: 5, },
  label: {color: COLORS.gray3, fontSize: FONT_SIZE.sm, marginRight: 7},
  name: {
    fontSize: FONT_SIZE.md,
    color: COLORS.secondary,
    marginTop: 4,
  },
  price: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  actionBtnContainer: {
    flexDirection: "row",
  },
});

export default styles;
