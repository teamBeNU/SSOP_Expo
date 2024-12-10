import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    background: {
        flex: 1
    },
    bottomSheetContainer: {
        height: 254,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 18,
    },
    titleText: {
        flex: 1,
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: -0.32,
    },
    closeBtn: {
        position: "absolute",
        right: 0,
        marginRight: 23,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    btnContainer: {
        paddingVertical: 12,
        marginBottom: 24,
    },
    btn: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    btnText: {
        color: 'black',
        fontFamily: 'PretendardSemibold',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.32,
    },
    btnSubText: {
        color: theme.gray40,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: -0.14,
        marginTop: 8
    },
    line: {
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: theme.gray90,
        marginVertical: 8,
        marginHorizontal: 24,
    }
})