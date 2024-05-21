import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    font16: {
        fontSize: 16,
    },
    main: {
        // height: SCREEN_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
    sub: {
        height: '100%',
    },
    title: { 
        marginTop: 32,
        fontSize: 20,
        // fontFamily: "Pretendard",
    },
    flexDirectionRow: {
        flexDirection: "row",
    },
    informContainer: {
        marginTop: 68,
    },
    inputContainer: {
        marginBottom: 32,
    },
    inputText: {
        marginBottom: 8,
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
    informText: {
        fontSize: 14,
        // fontFamily: "Pretendard",
    },
    birthSecret: {
        fontSize: 14,
        // fontFamily: "Pretendard",
        color: theme.grey30,
    },
    btnView: {
        position: 'absolute',
        bottom: 16,
    },
    btnNext: {
        position: 'absolute',
        bottom: 16,
        // marginTop: 180 - 32,
        width: '100%',
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
        marginRight: 6,
        textAlign: "center"
    },
    btnMores: {
        marginVertical: 32,
    },
    btnMore: {
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    btnOn: {
        borderColor: theme.skyblue,
    },
    btnOff: {
        borderColor: theme.grey90,
    },
    btnTextOn: {
        fontSize: 16,
        color: theme.skyblue,
    },
    btnTextOff: {
        fontSize: 16,
        color: theme.grey20,
    },
    line: {
        borderBottomColor: theme.grey90,
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    addText: {
        color: theme.grey50,
        textAlign: "center",
        marginTop: 80,
        fontSize: 16,
        // fontFamily: "Pretendard",
    },
    radioBtnGruopContainer: {
        flexDirection: 'row',
    },
    radioBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    snsText: {
        fontSize: 16,
        marginBottom: 16,
    },
    margintB16: {
        marginBottom: 16,
    },
    margintB48: {
        marginBottom: 48,
    },
    marginR6: {
        marginRight: 6,
    },
    musicInput: {
        width: '50%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey60,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
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
    subTitle: {
        marginTop: 32,
        fontSize: 20,
        // fontFamily: "Pretendard",
    },
    btnCheckCard: {
        position: 'absolute',
        bottom: 16 + 48 + 8,
        // marginTop: 180 - 32,
        width: '100%',
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
    btnHome: {
        position: 'absolute',
        bottom: 16,
        // marginHorizontal: 16,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey80,
    },
    btnHomeText: {
        color: theme.grey50,
        // fontFamily: "Pretendard",
    },
})
