import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
    frame: {
        backgroundColor: COLORS.mainBackground,
        flex:1,
        padding: 12
    },
    title: {
        color: COLORS.gray1,
        fontSize: FONT_SIZE.md,
        marginBottom: 15,
        marginLeft: 10
    },
    errMsg: {
        color: COLORS.gray3,
        fontSize: FONT_SIZE.md,
        marginBottom: 15,
        marginLeft: 10
    }
});

export default styles