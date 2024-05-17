import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
	card: {
		width: 296,
        height: 432,
        borderRadius: 8,
        overflow: 'hidden',
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
        alignItems: 'center',
    },
    name: {
        fontFamily: 'pretendard-semibold',
        fontSize: 22,
        fontWeight: "600",
        letterSpacing: -0.44,
        marginRight: 8,
    },
    age: {
        gap: 4,
        flexDirection: "row",
        fontFamily: 'pretendard-regular',
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
    },
    sub: {
        fontFamily: 'pretendard-semibold',
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: -0.32,
    },
    sub2: {
        fontFamily: 'pretendard-regular',
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
    },
});