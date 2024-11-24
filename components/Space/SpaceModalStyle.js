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
    modalText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        color: "black",
        letterSpacing: -0.32,
    },
    modalSubText: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        color: theme.gray50,
        marginTop: 12,
        letterSpacing: -0.14,
    },
    Btn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        width: '100%'
    },
    yesBtn: {
        width: '49%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.white,
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
        letterSpacing: -0.14,
    },
    noBtn: {
        width: '49%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    noText: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.white,
        textAlign: "center",
        letterSpacing: -0.14,
    },
    textInput: {
        width: windowWidth - 64,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14.5,
        paddingHorizontal: 16,
        backgroundColor: theme.gray95,
        borderRadius: 8,
        letterSpacing: -0.15,
    },

  });