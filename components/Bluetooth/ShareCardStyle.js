import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../theme";

// 화면 너비 가져오기
const screenWidth = Dimensions.get('window').width;

// 카드 레이아웃 계산
const paddingHorizontal = 16; // 전체적인 좌우 패딩
const cardSpacing = 8; // 카드 간 간격
const cardWidth = (screenWidth - paddingHorizontal * 2 - cardSpacing) / 2; // 카드 너비
const cardAspectRatio = 200 / 160; // 카드 비율 (160x200)
const cardHeight = cardWidth * cardAspectRatio; // 카드 높이 계산

export const styles = StyleSheet.create({
    // CardFront
	card: {
        borderRadius: 16,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: "rgb(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 0.5,
        shadowRadius: 16,
        shadowOpacity: 0.09,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)"
	},
    btn1: { // 새 카드 만들기
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.white,
        position: 'relative',
        borderWidth: 1.5,
        borderColor: theme.gray95,
        marginTop: 12,
        shadowColor: "rgb(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 0.09,
        elevation: 0
    },
    
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
	cardImgArea: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
        borderRadius: 16,
    },
    cardTextArea: {
        borderRadius: 16,
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 14,
        position: 'absolute',
        bottom: -0.5,
        width: '100%',
        justifyContent: 'center',
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
        letterSpacing: -0.14,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray70,
        fontSize: 14,
        letterSpacing: -0.14,
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
        backgroundColor: 'rgba(33, 33, 33, 0.80)',
        paddingVertical: 4,
        paddingHorizontal: 6,
        alignSelf: 'flex-start',
        flexShrink: 1,
        borderRadius: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DetailcardFilterText: {
        fontFamily: "PretendardRegular",
        textAlign: 'center',
        color: theme.white,
        fontSize: 10
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