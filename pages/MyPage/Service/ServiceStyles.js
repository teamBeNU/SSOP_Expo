import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    FAQContainer: {
        marginVertical: 8,
    },
    questionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center",
    },
    questionTextContainer: {
        flexDirection: "row",
        width: "90%",
    },
    questionText: {
        fontFamily: "Pretendard",
        fontSize: 16,
        color: theme.black,
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: -0.32,
    },
    answerContainer: {
        backgroundColor: theme.gray95,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 16,
        padding: 12,
    },
    answerText: {
        fontFamily: "Pretendard",
        fontSize: 15,
        color: theme.black,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 21,
        letterSpacing: -0.15,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
    }
})