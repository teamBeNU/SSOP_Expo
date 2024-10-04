import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    // CardFront
	card: {
        borderRadius: 16,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)"
	},
    btn1: { // 새 카드 만들기
        width: 158,
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.white,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: theme.gray95,
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
        borderRadius: 15,
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
        color: theme.gray60,
        letterSpacing: -0.44,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray60,
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
        top: 12,
        left: 12,
    },

    radioContainer: {    
        position: 'relative',
      },
      radio: {
        height: 16,
        width: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: theme.white,
        alignItems: 'center',
        justifyContent: 'center',

      },
      radioSelected: {
        borderColor: '#757575',
        backgroundColor: '#757575',
      },
});