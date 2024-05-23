import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: "row",
    },

    btnNext: {
        position: 'absolute',
        bottom: 16,
        // marginTop: 180 - 32,
        width: '100%',
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.grey10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: "white",
        fontFamily: "Pretendard",
        fontSize: 16,
        fontWeight: "600",
    },

    avatarContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: "orange",
    },
    avatarView: {
        flex: 1,
        backgroundColor: "pink",
        position: "relative",
    },
    avatarDo: {
        zIndex: 0,
        width: 40,
        height: 104,
        backgroundColor: "rgba(255, 255, 255, 0.80)",
        borderRadius: 26,
        elevation: 4,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 8,
        position: 'absolute',
        top: '50%',
        right: 12,
        transform: [{ translateY: -52 }],  // 요소를 세로 방향으로 부모 요소의 중앙으로 이동. translateY는 y축 방향의 이동(52: avatarDo의 height/2)
    },
    avatarAuto: {
        zIndex: 0,
        width: 100,
        height: 36,
        backgroundColor: theme.grey10,
        borderRadius: 26,
        elevation: 4,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        left: 16,
        bottom: 12,
    },
    avatarAutoText: {
        color: "white",
        fontFamily: "Pretendard",
        fontSize: 14,
    },
    avatarRestart: {
        zIndex: 0,
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.80)",
        borderRadius: 26,
        elevation: 4,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 10,
        //     height: 40,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 12,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    avatarRestartText: {
        
    },
    avatarBg: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: -100,
        backgroundColor: "#B6E96C",
    },
    avatarItemContainer: {
        flex: 1.3,
        backgroundColor: "white",
    },
    avatarItemList: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.grey90,
    },
    avatarItemListTextOn: {
        color: "black",
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "600",
    },
    avatarItemListTextOff: {
        color: theme.grey50,
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "400",
    },
})