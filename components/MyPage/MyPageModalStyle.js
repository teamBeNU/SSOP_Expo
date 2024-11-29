import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalView: {
        width: windowWidth - 32,
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 32,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: theme.white,
    },
    modalTextContainer: {
        alignItems: 'center',
        marginBottom: 12
    },
    modalTitle: {
        fontFamily: "PretendardMedium",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        color: theme.gray10,
        letterSpacing: -0.32,
        marginBottom: 12
    },
    modalText: {
        fontFamily: "Pretendard",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray50,
        letterSpacing: -0.14,
        textAlign: "center",
        marginBottom: 12
    },

    Btn: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    btn1: {
        width: '49%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.white,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80,
        marginRight: 8,
    },
    btn1Text: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: theme.gray50,
        textAlign: "center",
        letterSpacing: -0.14,
    },
    btn2: {
        width: '49%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    btn2Text: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.white,
        textAlign: "center",
        letterSpacing: -0.14,
    },

    // 탈퇴 완료 모달
    btnWithdraw: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    btnWithdrawText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        color: theme.white,
        textAlign: "center",
        letterSpacing: -0.14,
    },
  });