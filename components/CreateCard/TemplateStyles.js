import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    font16: {
        fontSize: 16,
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
    marginR8: {
        marginRight: 6,
    },

    container: {
        height: '100%',
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
    title: { 
        marginTop: 32,
        fontSize: 20,
        fontFamily: "PretendardSemiBold",
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
        fontFamily: "Pretendard",
        fontSize: 14,
        color: theme.grey40,
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
        fontFamily: "Pretendard",
    },

    inputBirthContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputBirth: {
        width: '30%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey60,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    inputBirthText: {
        textAlign: "right",
        fontFamily: "Pretendard",
        fontSize: 16,
    },

    birthSecret: {
        alignItems: "flex-end",
        marginTop: 12,
    },
    birthSecretOn: {
        fontSize: 14,
        fontFamily: "Pretendard",
        color: "black",
    },
    birthSecretOff: {        
        fontSize: 14,
        fontFamily: "Pretendard",
        color: theme.grey30,
    },

    btnNext: {
        position: 'absolute',
        bottom: 16,
        // marginTop: 180 - 32,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.grey10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: "white",
        fontFamily: "Pretendard",
        fontSize: 16,
        fontWeight: "600",
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

    coverTitle: {
        fontFamily: "PretendardSemiBold",
        fontSize: 24,
        marginTop: 70,
        textAlign: "center",
    }, 
    coverSubTitle: {
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        marginTop: 12,
        marginBottom: 32,
        textAlign: "center",
    },
    coverContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverScrollView: {
        justifyContent: 'center',
        alignItems: 'center',

    //    paddingHorizontal: 40,
    //    paddingHorizontal: (SCREEN_WIDTH - (SCREEN_WIDTH - 8)) / 2,
        // paddingHorizontal: (SCREEN_WIDTH -(SCREEN_WIDTH - 8)) / 2,
    },
    coverImg: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "orange"
    },
    coverImg1: {
        marginLeft: 48,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "orange"
    },
    coverImg2: {
        paddingRight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "orange"
    },
    firstCover: {
        // width: SCREEN_WIDTH - 80,
        // height: 320,
        // marginRight: 10,
        paddingLeft: 48,
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
        paddingRight: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey90,
        elevation: 5,
        backgroundColor:"red",
    },
    circles: {
        flexDirection: "row",
        justifyContent: "center"
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 20,
        marginHorizontal: 5,
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
        backgroundColor: "pink",
        position: "relative",
    },
    avatarDo: {
        zIndex: 0,
        width: 40,
        height: 104,
        backgroundColor: "rgba(255, 255, 255, 0.80)",
        borderRadius: 26,
        elevation: 4,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 8,
        position: 'absolute',
        top: '50%',
        right: 12,
        transform: [{ translateY: -52 }],  // 요소를 세로 방향으로 부모 요소의 중앙으로 이동. translateY는 y축 방향의 이동(52: avatarDo의 height/2)
    },
    avatarAuto: {
        zIndex: 0,
        width: 100,
        height: 36,
        backgroundColor: theme.grey10,
        borderRadius: 26,
        elevation: 4,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        left: 16,
        bottom: 12,
    },
    avatarAutoText: {
        color: "white",
        fontFamily: "Pretendard",
        fontSize: 14,
    },
    avatarRestart: {
        zIndex: 0,
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.80)",
        borderRadius: 26,
        elevation: 4,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 10,
        //     height: 40,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 12,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    avatarRestartText: {
        
    },
    avatarBg: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: -100,
        backgroundColor: "#B6E96C",
    },
    avatarItemContainer: {
        flex: 1.3,
        backgroundColor: "white",
    },
    avatarItemList: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.grey90,
    },
    avatarItemListTextOn: {
        color: "black",
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "600",
    },
    avatarItemListTextOff: {
        color: theme.grey50,
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "400",
    },

    btnCheckCard: {
        position: 'absolute',
        bottom: 16 + 48 + 8,
        // marginTop: 180 - 32,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
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
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey80,
    },
    btnHomeText: {
        color: theme.grey50,
        fontFamily: "Pretendard",
        fontSize: 16,
        fontWeight: "600",
    },
})