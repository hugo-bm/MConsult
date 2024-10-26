import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
    btn_primary: {
        backgroundColor: COLORS.primary,
        borderWidth: 2,
        borderColor: COLORS.primary,
        padding: 10,
        margin: 20,
        borderRadius: 20,
    },
    text_primary: {
        color: "#fff",
        fontSize: FONT_SIZE.md,
        textAlign: "center"
    },
    btn_out_primary: {
        backgroundColor: COLORS.mainBackground,
        borderWidth: 2,
        borderColor: COLORS.primary,
        padding: 10,
        margin: 20,
        borderRadius: 20,},

    text_out_primary: {
        color: COLORS.primary,
        fontSize: FONT_SIZE.md,
        textAlign: "center"
    },
})

export default styles;