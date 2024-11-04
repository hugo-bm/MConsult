import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../utils/constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackground,
        borderWidth: 1,
        borderColor: COLORS.gray4,
        padding: 12,
        marginBottom: 3,
        marginTop: 3
    },
    title: {
        fontSize: FONT_SIZE.md,

        color: COLORS.gray1,
        marginBottom: 6,
    },
    specialty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.inputPalceholder,
        marginBottom: 4,
    },
    moreInfoContainer: {
        flexDirection: "row",
    },
    dateTime: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray1,
        marginTop: 3
    },
    appointmentInfoContainer: {
        flex: 1,
        justifyContent: "center"
    },
    dateTimeContainer: {
        flexDirection: "row",
        marginTop: 3
    },
    actionContainer: {
    
    },
    icon: {
        width: 19,
        height: 19,
        objectFit: "cover",
        marginRight: 4,  
    }
});

export default styles;