import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    // CardFront
	card: {
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(232, 232, 232, 1.0)",
	},
    btn1: { // 새 카드 만들기
        width: 158,
        height: 200,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.white,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: theme.gray90,
    },
    
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
	cardImgArea: {
        height: 150,
        alignItems: 'center',
        marginRight: 15
    },
    cardTextArea: {
        backgroundColor: "white",
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 14,
    },
    Info: {
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    name: {
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.44,
        marginRight: 8,
    },
    age: {
        gap: 2,
        flexDirection: "row",
        fontFamily: 'PretendardRegular',
        fontSize: 14,
    },
    ageText: {
        fontFamily: "PretendardRegular",
        color: theme.gray20,
        letterSpacing: -0.44,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -1,
    },
    DetailSpaceCard: {
		width: 158,
        height: 235,
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(232, 232, 232, 1.0)",
	},
    DetailcardTextArea: {
        backgroundColor: "white",
        paddingTop: 16,
        paddingLeft: 12,
        gap: 12,
    },
    DetailcardFilter: {
        alignSelf: 'flex-start',
        flexShrink: 1,
        paddingVertical: 4,
        paddingHorizontal: 6,
        height: 22,
        borderRadius: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.gray90,
    },
    DetailcardHost: {
        position: 'absolute',
        top: 11, // Adjust as needed
        left: 11, // Adjust as needed
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 6,
        alignSelf: 'flex-start',
        flexShrink: 1,
        height: 22,
        borderRadius: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.white,
    },
    DetailcardFilterText: {
        fontFamily: "PretendardRegular",
        color: theme.gray10,
        fontSize: 12,
        letterSpacing: -0.5,
    },

    radioButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },

    radioContainer: {    
        position: 'relative',
      },
      radio: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.white,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",

      },
      radioSelected: {
        borderColor: theme.white,
        backgroundColor: theme.white,
      },
});