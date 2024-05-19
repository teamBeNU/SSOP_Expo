import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    // CardFront
	card: {
		width: 288,
        height: 432,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.grey90,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
	},
	cardImgArea: {
        height: 296,
        backgroundColor: '#FFDAEF',
    },
    cardTextArea: {
        height: 136,
        backgroundColor: "white",
        paddingTop: 16,
        paddingLeft: 24,
        gap: 12,
    },
    basicInfo: {
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    name: {
        fontFamily: 'Pretendard',
        fontSize: 22,
        fontWeight: "600",
        letterSpacing: -0.44,
        marginRight: 8,
        lineHeight: 26,
    },
    age: {
        gap: 4,
        flexDirection: "row",
        fontFamily: 'Pretendard',
        fontSize: 16, 
        fontWeight: "400",
        letterSpacing: -0.32,
        lineHeight: 19,
    },
    sub: {
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: -0.32,
        lineHeight: 19,
    },
    sub2: {
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
        lineHeight: 19,
    },

    // CardBack
    textArea: {
        height: 368,
        marginVertical: 32,
        marginHorizontal: 24,
        alignItems: 'flex-start',
        gap: 24,
    },
    info: {
        flexDirection: "row",
        gap: 8,
    },
    topic: {
        width: 52,
        color: theme.grey20,
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.14,
    },
    content: {
        color: 'black',
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
    },
    line: {
        height: 0,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderColor: theme.grey90,
    }
    
});