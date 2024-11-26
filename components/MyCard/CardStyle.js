import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { textStyles } from '../../textStyles';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const MAX_CARD_HEIGHT = HEIGHT * 0.6;
const cardWidth = WIDTH * 0.84;
//  const cardWidth = Math.min(WIDTH * 0.84, WIDTH * 1.2 * 0.7);
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
        // shadowColor: 'rgba(0, 0, 0, 0.04)',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.4,
        // shadowRadius: 4,
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
        height: 29,
        gap: 8
    },
    name: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: -0.48,
    },
    age: {
        color: 'rgba(0, 0, 0, 0.50)',
        opacity: 0.5,
        fontFamily: 'PretendardRegular',
        fontSize: 24, 
        fontWeight: "300",
        letterSpacing: -0.48,
    },
    sub: {
        color: theme.gray10,
       ...textStyles.headline16
    },
    sub2: {
        color: theme.gray30,
        ...textStyles.body16,
        marginTop: -4
    },

    // CardBack
    textArea: {
        flexGrow: 1,
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
        ...textStyles.body16
    },
    content: {
        maxWidth: '80%',
        color: theme.gray10,
        ...textStyles.body16,
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
        ...textStyles.body16,
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
        // Android - Shadow
        elevation: 3,
        // IOS - Shadow
        shadowColor: 'rgba(73, 81, 100)',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.09,
        shadowRadius: 16,
    },
    coverTitle: {
        ...textStyles.body15,
        color: 'white',
        backgroundColor: 'rgba(33, 33, 33, 0.80)',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        top: 24,
        left: 26
    }
});