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
        backgroundColor: theme.gray10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
    },
    btnNextText: {
        color: theme.white,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        fontWeight: "600",
    },

    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // backgroundColor: "orange",
    },
    avatarContainer: {
        flex: 1,
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
        backgroundColor: theme.gray10,
        borderRadius: 26,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        position: 'absolute',
        left: 16,
        bottom: 12,
    },
    autoAvatarIcon: {
        color: theme.white,
        marginRight: 6,
    },
    avatarAutoText: {
        color: theme.white,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontWeight: "600",
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
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    avatarView: {
        zIndex: -100,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    avatarImg: {
        position: 'absolute',
        width: "100%", 
        height: "100%",
    },
    avatarBg: {
        position: 'static',
        zIndex: -101,
        width: "100%", 
        height: "100%",
    },

    avatarItemContainer: {
        flex: 1.3,
        backgroundColor: theme.white,
    },
    avatarItemCategory: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
    },
    avatarItemCategoryTextOn: {
        color: "black",
        textAlign: "center",
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
    },
    avatarItemCategoryTextOff: {
        color: theme.gray50,
        textAlign: "center",
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
    },

    avatarItemList: {
        width: SCREEN_WIDTH,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 100,
    },
    avatarItems: {
        width: "30%",
        aspectRatio: 1,
        margin: "1.5%",
        borderRadius: 8,
    },
    itemSelectOn: {
        borderWidth: 2,
        borderColor: theme.gray80,
    },
    itemSelectOff: {
        padding: 2, // 이미지와 테두리 사이 여백
    },

    avatarItemText: {
        color: "black",
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        marginTop: 20,
        marginLeft: 16,
    },

    colorChipContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
    },
    colorChip: {
        // (SCREEN_WIDTH/360) * 20
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    colorChipOn: {
        borderWidth: 2,
        borderColor: theme.gray80,
        borderRadius: 30,
        padding: 6,
    },
    colorChipOff: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
        padding: 6,
    },
})
