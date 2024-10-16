import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    main: {
        // height: SCREEN_HEIGHT,
        flex: 1,
        backgroundColor: theme.white
    },  
    title: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: "600",
        marginTop: 72,
        textAlign: "center",
        letterSpacing: -0.44,
    },
    subTitle: {
        color: theme.gray10,
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        marginTop: 12,
        textAlign: "center",
        letterSpacing: -0.32,
    },
    templates: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '4%',
        // marginTop: 40,
        // marginVertical: 16,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // flexDirection: "row",
        // justifyContent: "center",
    },
    cell: {
        width: '45%',
        height: '50%',
        borderRadius: 8,
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.gray95,
        margin: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        // justifyContent: "center", // 수직으로 가운데 정렬
        // alignItems: "center", // 수평으로 가운데 정렬
        // paddingTop: 20,
        // paddingBottom: 39,
        // borderRadius: 8,
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: theme.gray95,
        // backgroundColor: "white",
        // Android - Shadow
        elevation: 5,
        // IOS - Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    label: {
        color: theme.gray10,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 11,
        marginBottom: 4,
    },
    describe: {
        color: theme.gray30,
        fontFamily: "PretendardRegular",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    },
})