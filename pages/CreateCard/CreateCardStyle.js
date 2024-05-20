import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    main: {
        // height: SCREEN_HEIGHT,
    },  
    title: {
        color: "black",
        // fontFamily: 'Pretendard-SemiBold',
        fontSize: 24,
        marginTop: 72,
        textAlign: "center",
    },
    subTitle: {
        color: "black",
        // fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        marginTop: 12,
        textAlign: "center",
    },
    templates: {
        marginTop: 40,
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    container: {
        flex: 0,
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        flex: 1,
        justifyContent: "center", // 수직으로 가운데 정렬
        alignItems: "center", // 수평으로 가운데 정렬
        paddingTop: 20,
        paddingBottom: 39,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.grey95,
        backgroundColor: "white",
        elevation: 5
    },
    label: {
        // fontFamily: "Pretendard",
        fontSize: 18,
        textAlign: "center",
        marginTop: 11,
        marginBottom: 4,
    },
    describe: {
        // fontFamily: "Pretendard",
        fontSize: 12,
        textAlign: "center",
    },
})