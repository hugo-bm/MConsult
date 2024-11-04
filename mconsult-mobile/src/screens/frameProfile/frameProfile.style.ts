import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainBackground,
        flex: 1,
        paddingTop: 12
    },
    item: {
        borderWidth: 1,
        borderColor: COLORS.gray4,
        paddingLeft: 8,
        paddingTop: 17,
        paddingBottom: 17,
    },
    title: {
        color: COLORS.gray3,
        fontSize: FONT_SIZE.sm,
        marginBottom: 2
    },
    text: {
         color: COLORS.dark,
         fontSize: FONT_SIZE.md,
         marginLeft: 14,
         marginBottom: 4
     }
});

export default styles;