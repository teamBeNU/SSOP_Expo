import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const cardWidth = WIDTH * 0.8;
const cardHeight = WIDTH * 1.2;

export const styles = StyleSheet.create({
    // CardFront
	card: {
        //width: 304,
        width: WIDTH * 0.84,
        height: WIDTH * 1.2,
        //height: 432,
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
        //height: 311,
        height: WIDTH * 0.86,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTextArea: {
        backgroundColor: "white",
        //height: 139,
        height: WIDTH * 0.38,
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
    },
    name: {
        fontFamily: 'PretendardSemiBold',
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: -0.48,
        marginRight: 8,
        lineHeight: 26,
    },
    age: {
        color: 'black',
        opacity: 0.5,
        fontFamily: 'PretendardRegular',
        fontSize: 24, 
        fontWeight: "300",
        letterSpacing: -0.48,
    },
    sub: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: -0.32,
    },
    sub2: {
        color: theme.gray30,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
    },

    // CardBack
    textArea: {
        height: 352,
        marginVertical: 40,
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
        color: theme.gray50,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
    },
    content: {
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
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
    graybox: {
        backgroundColor: theme.gray95,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});