import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    // CardFront
	card: {
		width: 288,
        height: 436,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray90,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
	},
	cardImgArea: {
        height: 300,
        backgroundColor: '#B6E96C',
    },
    cardTextArea: {
        height: 136,
        backgroundColor: "white",
        paddingTop: 16,
        paddingLeft: 24,
        paddingBottom: 32,
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
        color: theme.gray20,
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
        borderColor: theme.gray90,
    },
    SNScontainer: {
        flexDirection: "row",
        gap: 4,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: '100%',
        justifyContent: 'flex-end',
        fontFamily: 'Pretendard',
        fontSize: 16,
        letterSpacing: -0.32,
        fontWeight: 400,
        lineHeight: 19,
    },
    detailsContainer: {
        width: 212,
        backgroundColor: 'white',
        borderRadius: 4,
        position: 'relative',
        paddingVertical: 16,
        paddingHorizontal: 24,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
        width: 4,
        height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 3,
    },
    
});