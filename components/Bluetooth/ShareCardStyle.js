import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    // CardFront
	card: {
		width: 158,
        height: 200,
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
        height: 148,
    },
    cardTextArea: {
        height: 53,
        backgroundColor: "white",
        paddingTop: 16,
        paddingLeft: 12,
        gap: 12,
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
        letterSpacing: -0.32,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -1,
    },
});