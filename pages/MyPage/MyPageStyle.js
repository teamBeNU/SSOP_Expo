import { StyleSheet } from "react-native"
import { theme } from "../../theme"

export const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: "row",
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
    },

    MyPageMain: {
        // paddingHorizontal: 16,
        flex: 1,
        backgroundColor: theme.gray99,
        paddingTop: 12,
    },
    UserAccountMain: {
        flex: 1,
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        paddingTop: 24,
    },

    accountManageContainer: {
        marginHorizontal: 16,
        backgroundColor: theme.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        // Android - Shadow
        elevation: 3,
        // IOS - Shadow
        shadowColor: 'rgba(73, 81, 100)',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.09,
        shadowRadius: 16,
    },
    userName: {
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        color: "black",
    },
    accountManageText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.skyblue,
    },

    loginBtn: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    loginText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.skyblue,
        letterSpacing: -0.4,
        marginBottom: 8,
    },
    loginSubText: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray40,
        letterSpacing: -0.32,
    },

    infoContainer: {
        backgroundColor: theme.white,
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        // Android - Shadow
        elevation: 3,
        // IOS - Shadow
        shadowColor: 'rgba(73, 81, 100)',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.09,
        shadowRadius: 16,
    },
    infoBtn: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 18.5,
        paddingRight: 8,
    },
    infoText: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        color: "black",
    },

    logoutContainer: {
        marginVertical: 20,
        width: '30%',
        marginHorizontal: 16, 
    },
    logoutText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.gray40,
        letterSpacing: -0.14,
        marginLeft: 16
    },
    deleteText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray60,
        letterSpacing: -0.14,
    },
})