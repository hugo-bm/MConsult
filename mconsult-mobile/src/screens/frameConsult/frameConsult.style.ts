import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";


const styles = StyleSheet.create({
    frame: {
        backgroundColor: COLORS.mainBackground,
        flex:1,
        padding: 12
    },
    title: {
        color: COLORS.primary,
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
        marginBottom: 15,
        marginLeft: 10
    },
    errorMsg: {
        marginTop: 25,
        color: COLORS.secondary,
        fontSize: FONT_SIZE.lg,
        alignSelf: "center"
    }
});

export default styles;