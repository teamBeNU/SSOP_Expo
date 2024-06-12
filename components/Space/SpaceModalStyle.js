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
      borderRadius: 8,
      paddingVertical: 32,
      paddingHorizontal: 16,
      alignItems: 'center',
      backgroundColor: theme.white,
    },
    modalText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        color: "black",
        letterSpacing: -1,
    },
    modalSubText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        color: theme.gray50,
        marginTop: 12,
    },
    Btn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
    },
    yesBtn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.white,
        width: 132,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80,
        marginRight: 8,
    },
    yesText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.gray50,
        textAlign: "center",
        letterSpacing: -1,
    },
    noBtn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        width: 132,
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    noText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.white,
        textAlign: "center",
        letterSpacing: -1,
    },
    textInput: {
        justifyContent: "center",
        alignItems: "center",
        width: 276,
        paddingVertical: 14.5,
        paddingHorizontal: 16,
        backgroundColor: theme.gray95,
        borderRadius: 8,
    },
  });