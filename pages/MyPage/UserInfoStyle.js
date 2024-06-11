import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: "row",
    },
    marginR4: {
        marginRight: 4,
    },
    marginR8: {
        marginRight: 8,
    },

    userMain: {
        flex: 1,
        backgroundColor: "yellow"
    },
    // UserInfo
    userInfoMain: {
        flex: 1,
        // height: SCREEN_HEIGHT,
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        paddingTop: 24,
    },

    // UserPhoneNumber, UserPw
    userChangeMain: {
        flex: 1,
        // height: SCREEN_HEIGHT,
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    title: { 
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
    },
    titleMarginBottom: {
        marginBottom: 68,
    },

    // UserInfo: 헤더바 저장 버튼
    saveBtn: {
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.skyblue,
    },

    // 공통: TextInput
    informContainer: {
        marginTop: 68,
    },
    inputContainer: {
        marginBottom: 40,
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

    // 공통: TextInput 아무것도 입력안했을 때
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

    // USerInfo: 생일
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

    // UserPhoneNumber: 연락처 변경
    unCorrect: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.gray40,
    },
    requestNum: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 16,
    },
    remainTime: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.gray40,
    },
    resendBtn: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.skyblue,
    },
    resendText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray40,
    },

    // UserPw: 비밀번호 변경
    pwContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16,
    },
    checkContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    check: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    checkTextOn: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray30,
    },
    checkTextOff: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray60,
    },
    passwordDone: {
        width: '100%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
    },

    // 공통: Next 버튼
    btnFlex: {
        flex: 1,
    },
    // btnNext: {
    //     position: 'absolute',
    //     // bottom: 16,  // contair의 height: '100%',
    //     bottom: 60+16,  // contair의 height: SCREEN_HEIGHT,
    //     width: '100%',
    //     height: 48,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginHorizontal: 16,
    //     // paddingVertical: 8,
    //     // paddingHorizontal: 16,
    //     backgroundColor: theme.gray10,
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderStyle: "solid",
    // },
    btnNext: {
        marginBottom: 16,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
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
        fontStyle: "normal",
        fontWeight: "600",
    },
})