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
        marginRight: 8,
    },
    flexDirectionRow: {
        flexDirection: "row",
    },

    container: {
        // width: SCREEN_WIDTH,
        // height: '100%',
        height: SCREEN_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
    },
    title: { 
        marginTop: 32,
        fontSize: 20,
        fontFamily: "PretendardSemiBold",
    },

    informContainer: {
        marginTop: 68,
    },
    inputContainer: {
        marginBottom: 32,
    },
    inputText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        color: theme.gray40,
        marginBottom: 8,
    },
    customInput: {
        height: 48,
        borderRadius: 8,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
    },
    customInputText: {
        fontFamily: "PretendardRegular",
        fontFamily: 16,
        fontWeight: "400",
        fontStyle: "normal",
    },
    inputError: {
        borderWidth:1,
        borderStyle: "solid",
        borderColor: theme.red,
    },
    inputErrorText: {
        color: theme.red,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 8,
        marginTop: 8,
    },

    inputBirthContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputBirth: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    inputBirthText: {
        textAlign: "right",
        fontFamily: "PretendardRegular",
        fontSize: 16,
    },
    
    doneIcon: {
        marginRight: 4,
        color: theme.skyblue,
    },
    birthSecret: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 12,
    },
    birthSecretOn: {
        fontSize: 14,
        fontFamily: "PretendardRegular",
        color: "black",
    },
    birthSecretOff: {        
        fontSize: 14,
        fontFamily: "PretendardRegular",
        color: theme.gray30,
    },

    btnNext: {
        position: 'absolute',
        // bottom: 16,  // contair의 height: '100%',
        bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        // paddingVertical: 8,
        // paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: theme.white,
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        fontWeight: "600",
    },

    btnMores: {
        marginTop: 32,
        marginBottom: 24,
        flexWrap: "wrap",
    },
    btnMore: {
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },

    btnOn: {
        borderColor: theme.skyblue,
    },
    btnOff: {
        borderColor: theme.gray90,
    },
    btnTextOn: {
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: theme.skyblue,
    },
    btnTextOff: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontWeight: "400",
        fontStyle: "normal",
        color: theme.gray20,
    },

    line: {
        borderBottomColor: theme.gray90,
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    addText: {
        color: theme.gray50,
        textAlign: "center",
        marginTop: 80,
        fontSize: 16,
        // fontFamily: "PretendardRegular",
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
        flex: 1,
        height: 48,
        borderRadius: 8,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    coverTitle: {
        fontFamily: "PretendardSemiBold",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "600",
        marginTop: 70,
        textAlign: "center",
    }, 
    coverSubTitle: {
        fontFamily: "Pretendard",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        marginTop: 12,
        marginBottom: 32,
        textAlign: "center",
    },
    coverScrollView: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    coverImg: {
        width: SCREEN_WIDTH*0.8,
        height: SCREEN_WIDTH*0.8*1.2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        // 그림자가 안보여서 임시 border
        borderWidth: 1,
        borderColor: theme.gray90,
        borderRadius: 10
    },
    circles: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
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
        backgroundColor: theme.gray90,
    },

    avatarNext: {
        color: theme.skyblue,
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
    },

    cardDone: {
        width: SCREEN_WIDTH - 32,
        height: SCREEN_WIDTH - 32,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 48,
        marginTop: "20%",
    },
    btnDone: {
        position: 'absolute',
        bottom: 60+16,
        width: '100%',
        marginHorizontal: 16,
    },
    btnCheckCard: {
        // position: 'absolute',
        // bottom: 16 + 48 + 8,
        // marginTop: 180 - 32,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        // marginHorizontal: 16,
        // paddingVertical: 8,
        // paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnHome: {
        // position: 'absolute',
        // bottom: 16,
        // marginHorizontal: 16,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        // marginHorizontal: 16,
        // paddingVertical: 8,
        // paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.gray80,
        backgroundColor: "white",

        marginTop: 8,
    },
    btnHomeText: {
        color: theme.gray50,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontWeight: "600",
    },
})