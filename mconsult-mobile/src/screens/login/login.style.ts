import React from "react";
import { COLORS } from "../../utils/constants/theme";
import { Linking, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainBackground,
        flex: 1,
        padding: 50,
        justifyContent: "space-between"
    },
    containerLogo: {
        alignItems: "center",        
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        padding: 10,
        borderRadius: 8,
        color: COLORS.inputPalceholder
    },
    containerInput: {
        marginBottom: 12,
    },
    logo: {
        width: 190,
        height: 44,
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    footerText: {
        color: COLORS.gray1
    },
    Link: {
        color: COLORS.primary
    }
});

export default styles;