import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    // CardFront
	card: {
		width: 158,
        height: 201,
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
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
        paddingTop: 14,
        paddingLeft: 12,
        gap: 12,
    },
    Info: {
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    name: {
        fontFamily: 'PretendardSemiBold',
        fontSize: 18,
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
    
});