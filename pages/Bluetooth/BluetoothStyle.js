import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    shareContainer: {
        flex: 1,
        backgroundColor: theme.white,
    },
    title: { // 글씨 
        marginTop: 30,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    name: { // 보낼 사람 선택 이름 
        marginTop: 13.5,
        marginBottom: 13.5,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
        position: 'relative',
    },
    namebox: {
    },
    stateCall: { // 요청중
        position: 'absolute',
        bottom: 14.5,
        right: 0,
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        color: theme.blue,
        letterSpacing: -1,
    },
    stateFinish: { // 공유 완료
        position: 'absolute',
        bottom: 14.5,
        right: 0,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        color: theme.gray50,
        letterSpacing: -1,
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
    container2: {
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

    btn1: { // 새 카드 만들기
        marginTop: 12,
        width: 158,
        height: 201,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.gray95,
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
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.gray90,
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
    // 카드 상세보기 모달
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경에 반투명 검정색
    },
    modalContent: {
        width: '80%',
        height: '50%',
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 1
    },

    // 모달
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        height: 350,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
        borderRadius: 16,
    },
    closeIcon: {
        marginTop: 19,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    modalText: {
        marginTop: 18,
        textAlign: 'center',
        fontFamily: 'PretendardSemibold',
        fontSize: 20,
        letterSpacing: -1
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24
    },
})