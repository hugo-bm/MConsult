import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainBackground,
        flex:1,
    },
    banner: {
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: 10
    },
    name: {
        color: COLORS.light,
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
        marginBottom: 4,

    },
    specialty: {
        color: COLORS.gray4,
        fontSize: FONT_SIZE.sm, 
    }
});

export default styles