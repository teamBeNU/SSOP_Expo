import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    main: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
    title: {
        marginTop: 32,
        fontSize: 20,
        // fontFamily: "Pretendard",
    },
    flexDirectionRow: {
        flexDirection: "row",
    },
    inputContainer: {
    },
    customInput: {
        /*width: SCREEN_WIDTH - 32,*/
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey60,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
    },
    btnNext: {
        marginHorizontal: 16,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.grey10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: "white",
    },
    inputBirth: {
        flexDirection: "row",
    },
    inputBirth: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey60,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
        textAlign: "center"
    },
    btnMore: {
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey90,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    line: {
        borderBottomColor: theme.grey90,
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    coverView: {
       alignItems: "center",
       paddingHorizontal: 40,
    },
    firstCover: {
        width: SCREEN_WIDTH - 80,
        height: 320,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey90,
        elevation: 5,
        backgroundColor:"red",
    },
    secondCover: {
        width: SCREEN_WIDTH - 80,
        height: 320,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey90,
        elevation: 5,
        backgroundColor:"red",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: "black",
    },
    activeCircle: {
        backgroundColor: theme.skyblue,
    }, 
    inactiveCircle: {
        backgroundColor: theme.grey90,
    },
    avatarContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: "orange",
    },
    avatarView: {
        flex: 1,
        backgroundColor: "blue",
    },
    avatarItemContainer: {
        flex: 1.5,
        backgroundColor: "red",
    },
    avatarItemList: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        marginHorizontal: 20,
        borderBottomColor: theme.grey90,
    },
    avatarDo: {
        zIndex: 0,
    },
    avatarAuto: {
        zIndex: 0,
    },
    avatarRestart: {
        zIndex: 0,
    },
    avatarBg: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 100,
        backgroundColor: "pink",
    },
    btnHome: {
        marginHorizontal: 16,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.grey10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnHomeText: {
        color: "white",
    },
})
