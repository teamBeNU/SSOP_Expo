import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const MAX_CARD_HEIGHT = HEIGHT * 0.6;
const cardWidth = WIDTH * 0.84;
//const cardHeight = WIDTH * 1.2;
const cardHeight =  Math.min(WIDTH * 1.2, MAX_CARD_HEIGHT);


export const styles = StyleSheet.create({
    // CardFront
	card: {
        width: cardWidth,
        height: cardHeight,
        borderRadius: 32,
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
        height: WIDTH * 0.86,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTextArea: {
        backgroundColor: "white",
        height: cardHeight * 0.32,
        padding: 24,
        borderRadius: 20,
        gap: 12,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    },
    basicInfo: {
        flexDirection: "row",
        alignItems: 'flex-end',
        gap: 8
    },
    name: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: -0.48,
        lineHeight: 26,
    },
    age: {
        color: 'rgba(0, 0, 0, 0.50)',
        opacity: 0.5,
        fontFamily: 'PretendardRegular',
        fontSize: 24, 
        fontWeight: "300",
        letterSpacing: -0.48,
        lineHeight: 29
    },
    sub: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: -0.32,
        lineHeight: 19,
    },
    sub2: {
        color: theme.gray30,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
        lineHeight: 19,
        marginTop: -4
    },

    // CardBack
    textArea: {
        marginVertical: 40,
        marginHorizontal: 24,
        alignItems: 'flex-start',
        gap: 24,
        paddingBottom: 80,
    },
    info: {
        flexDirection: "row",
        gap: 8,
        alignItems: 'center',
    },
    topic: {
        width: 55,
        color: theme.gray50,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
    },
    content: {
        maxWidth: '80%',
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
        flexWrap: 'wrap',
    },
    grayBox: {  
        maxWidth: '80%',
        flexDirection: "row",
        gap: 4,
        borderRadius: 20,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    grayBoxText: {
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
        flexWrap: 'wrap',
    },
    line: {
        height: 0,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderColor: theme.gray90,
        marginTop: 24
    },
    SNScontainer: {
        width: '80%',
        flexDirection: "row",
        gap: 4,
        flexWrap: 'wrap', 
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: '100%',
        justifyContent: 'flex-end',
        fontFamily: 'PretendardRegular',
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