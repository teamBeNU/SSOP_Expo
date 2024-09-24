import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    font16: {
        fontSize: 16,
    },
    paddingB0: {
        paddingBottom: 0,
    },
    paddingB25: {
        paddingBottom: "25%",
    },
    paddingB250: {
        paddingBottom: 250,
    },
    marginB16: {
        marginBottom: 16,
    },
    marginB40: {
        marginBottom: 40,
    },
    marginB48: {
        marginBottom: 48,
    },
    marginB100: {
        marginBottom: 100,
    },
    marginT48: {
        marginTop: 48,
    },
    marginT64: {
        marginTop: 64,
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

    flex: {
        flex:1
    },
    container: {
        // width: SCREEN_WIDTH,
        // height: '100%',
        
        // height: SCREEN_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
        flex:1
    },
    title: { 
        marginTop: 32,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        color: theme.gray10,
        fontStyle: "normal",
        fontWeight: "600",
    },
    subTitle: { 
        marginTop: 12,
        fontFamily: "Pretendard",
        fontSize: 16,
        color: theme.gray30,
        fontStyle: "normal",
        fontWeight: "400",
    },

    viewContainer: {
        flex: 1,
        paddingBottom: 48+16   // 다음으로 버튼 높이(48) + 밑바닥과의 간격(16)
    },
    informContainer: {
        marginTop: 48,
    },
    inputContainer: {
        marginBottom: 40,
    },
    inputTextEssential: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.gray30,
        fontStyle: "normal",
        fontWeight: "600",
        marginBottom: 8,
    },
    inputText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        color: theme.gray40,
        fontStyle: "normal",
        fontWeight: "400",
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
    
    birthTitle: {
        color: theme.gray10,
        fontFamily: "PretendardMedium",
        fontSize: 18,
        fontWeight: "500",
        marginTop: 28,
        marginBottom: 24,
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
    },
    birthSecret: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    birthSecretOn: {
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
    },
    birthSecretOff: {        
        color: theme.gray40,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
    },

    btnContainer: {
        // // position: 'absolute',
        // // bottom: 16,  // contair의 height: '100%',
        // // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        // width: '100%',
        // height: 48,
        // justifyContent: "center",
        // alignItems: "center",
        // // marginHorizontal: 16,
        // // paddingVertical: 8,
        // // paddingHorizontal: 16,

        // marginTop: "auto",
        // marginBottom: 16,
        // backgroundColor:"red",
        // paddingTop: "auto"

        position: 'absolute',
        bottom: 16,  // contair의 height: '100%',
        // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnContainer2: {
        // // position: 'absolute',
        // // bottom: 16,  // contair의 height: '100%',
        // // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        // width: '100%',
        // height: 48,
        // justifyContent: "center",
        // alignItems: "center",
        // // marginHorizontal: 16,
        // // paddingVertical: 8,
        // // paddingHorizontal: 16,

        // marginTop: "auto",
        // marginBottom: 16,
        // backgroundColor:"red",
        // paddingTop: "auto"

        position: 'absolute',
        bottom: 16,  // contair의 height: '100%',
        // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNext: {
        // // position: 'absolute',
        // // bottom: 16,  // contair의 height: '100%',
        // // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        // width: '100%',
        // height: 48,
        // justifyContent: "center",
        // alignItems: "center",
        // // marginHorizontal: 16,
        // // paddingVertical: 8,
        // // paddingHorizontal: 16,
        // backgroundColor: theme.gray10,
        // borderRadius: 8,
        // borderWidth: 1,
        // borderStyle: "solid",

        // marginTop: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',

    },
    btnNext2: {
        position: 'absolute',
        bottom: 16,  // contair의 height: '100%',
        // //bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: theme.white,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontWeight: "600",
    },

    dropDownContainerZIndex: {
        marginRight: "63%",
        zIndex: -1,
    },
    dropDownContainerZIndex1: {
        marginRight: "63%",
        zIndex: 1,
    }, 
    dropDownContainer: {
        marginRight: "63%",
        zIndex: 0,
    }, 
    zIndex2: {
        zIndex: -2
    },
    zIndex3: {
        zIndex: -3,
    },

    btnMores: {
        marginVertical: 32,
    },
    btnMore: {
        alignItems: "center",
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
        borderColor: theme.gray90,
    },
    btnTextOn: {
        fontSize: 16,
        color: theme.skyblue,
    },
    btnTextOff: {
        fontSize: 16,
        color: theme.gray20,
    },

    line: {
        borderBottomColor: theme.gray90,
        borderBottomWidth: 1,
        // marginVertical: 10,
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
        fontFamily: "PretendardMedium",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
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

    // 팬 템플릿
    paddignB0: {
        paddingBottom: 0,
    },
    paddignB24: {
        paddingBottom: 24,
    },
    paddingH16: {
        paddingHorizontal: 16,
    },
    selectViewContainer: {
        flex: 1,
        paddingBottom: 48+16,   // 다음으로 버튼 높이(48) + 밑바닥과의 간격(16)
        marginHorizontal: -16
    }, 
    selectContaienr: {
        paddingTop: 31-8,
        paddingBottom: 33,
    },
    selectBtnContainer: {
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.gray90,
        marginTop: 8,
    },
    selectBtnTitleContainer: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingTop: 24,
    },
    selectBtnTitle: {
        color: theme.gray10,
        fontFamily: 'PretendardMedium',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        textAlign: "center",
    },
    selectBtns: {
        flexDirection:"row",
        flexWrap: 'wrap',
        marginTop: 16,
    },
    spaceContainer: {
        backgroundColor: theme.gray95,
        height: 12,
        marginHorizontal: -16,
    },

    selectInputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    selectTextInputContainer: {
        paddingTop: 32,
        width: "100%",
    }, 
    selectTitle: {
        color: theme.gray50,
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    }
})