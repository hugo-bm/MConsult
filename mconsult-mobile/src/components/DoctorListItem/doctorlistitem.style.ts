import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
    doctor: {
        flex: 1,
        backgroundColor: COLORS.mainBackground,
        padding: 8,
        borderWidth: 1,
        borderColor: COLORS.gray4,
        flexDirection: "row",
        marginTop: 3,
        marginBottom: 3,
    },
    name: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginTop: 4,
    },
    speciality: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 8
    }
});

export default styles;