import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: "row",
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
    },

    MyPageMain: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    UserAccountMain: {
        flex: 1,
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        paddingTop: 24,
    },

    accountManageContainer: {
        backgroundColor: theme.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderRadius: 8,
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 12,
        shadowColor: "#000",
        elevation: 5,
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

    infoContainer: {
        backgroundColor: theme.white,
        padding: 16,
        borderRadius: 8,
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 12,
        shadowColor: "#000",
        elevation: 5,
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
        marginLeft: 16,
        paddingVertical: 20,
    },
    logoutText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.gray60,
    },
})