import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.mainBackground,
    flex: 1,
    flexDirection: "column",
    padding: 5,
    justifyContent: "space-around",
    borderColor: COLORS.inputPalceholder,
    borderRadius: 20,
    borderWidth: 1,
    maxHeight: 450,
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow in Android
  },
  header: {
    paddingTop: 15,
    alignItems: "center",
    borderColor: COLORS.gray1,
    borderWidth: 0,
    borderBottomWidth: 2,

    paddingBottom: 12,
  },
  headerText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  footer: {
    alignItems: "center",
    marginTop: 12,
    borderWidth: 0,
  },
});

export default styles;
