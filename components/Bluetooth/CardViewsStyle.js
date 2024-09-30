import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white
    },
    title: { // 글씨 
        marginTop: 30,
        marginBottom: 20,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    range: { //최신순 정렬
        color: theme.gray50,
        fontFamily: "PretendardRegular",
        fontSize: 13,
        letterSpacing: -1,
    },
    DownArrowIcon: {
        marginLeft: 0,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.gray90, 
        borderRadius: 50, 
        paddingVertical: 8,
        paddingRight: 10,
        paddingLeft: 16,
        backgroundColor: theme.white
      },
    iconContainer: {
        borderWidth: 1,
        borderColor: theme.gray90,
        borderRadius: 50,
        padding: 8,
        marginRight: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.white
      },
    Text20: {
        marginTop: 16,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -1,
    },
    Text16: {
        marginBottom: 21,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    },
    container: {
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    rowRange: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
        marginTop: 8,
        marginBottom: 8,
    },

    btn1: {
        marginTop: 12,
        // width: 158,
        width: '44%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        position: 'relative',
    },
    innerView: {
        marginTop: 120,
    },

    // 카드가 없을 때
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    noCard: {
        color: theme.gray60,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.2,
    },
    newContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    newCard: {
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.2,
    },

    // 리스트형 카드 스타일
    ListContainer: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
        backgroundColor: theme.white,
        borderColor: theme.gray95,
        borderRadius: 16,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    },
    gray: {
        width: 64,
        height: 64,
        backgroundColor: theme.gray80,
        borderRadius: 16,
    },
    infoContainer: {
        marginLeft: 12
    },
    rowName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    Text16gray10: {
        fontFamily: "PretendardSemibold",
        color: theme.gray10,
        fontSize: 16,
        letterSpacing: -0.32
    },
    Text16gray50: {
        fontFamily: "Pretendard",
        color: theme.gray50,
        fontSize: 16,
    },
    Text14gray30: {
        marginTop: 8,
        fontFamily: "Pretendard",
        color: theme.gray30,
        fontSize: 14,
    }, 
    Text14gray50: {
        fontFamily: "Pretendard",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -0.14,
    },
    newCardBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },

    // 마이 스페이스 상세
    backgroundColor:{
        flex: 1, 
        backgroundColor: theme.white
    },
    backgroundColor2:{
        paddingTop: 40, 
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: theme.gray95
    },
    detailtitle: {
        letterSpacing: -1,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'PretendardSemiBold',
    },
    leftContainer: {
        alignItems: 'center',
    },
    detailPeople: {
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: -1,
        paddingBottom: 16,
    },
})