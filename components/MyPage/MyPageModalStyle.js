import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
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
    },
    btn1: {
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
        fontWeight: "600",
        color: theme.gray50,
        textAlign: "center",
        letterSpacing: -0.14,
    },
    btn2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 8,
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
  });