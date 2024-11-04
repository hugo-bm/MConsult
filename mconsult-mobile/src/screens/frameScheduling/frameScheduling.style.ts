import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainBackground,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between"
  },
  calendar: {
    borderColor: COLORS.gray4,
    borderWidth: 1,
    borderEndStartRadius: 10,
    borderEndEndRadius: 10,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 15,
    marginBottom: 10
  },
  picker: {
    borderColor: COLORS.gray3,
    borderWidth: 2,
    borderRadius: 22,
    padding: 4
  }
});

const theme = {
  todayTextColor: COLORS.danger,
  selectedDayBackgroundColor: COLORS.primary,
  selectedDayTextColor: COLORS.light,
  arrowColor: COLORS.primary,
  monthTextColor: COLORS.primary,
  textMonthFontWeight: "bold",
};

export default styles;
export { styles, theme };
