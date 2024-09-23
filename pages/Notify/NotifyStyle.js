import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
    },
    btn1: { // 보낸 카드
        height: 81,
        position: 'relative',
    },
    btn2: { // 받은 카드
        height: 81,
        position: 'relative',
    },
    background: {
        backgroundColor: '#8CFF791A',
      },
    title: { // 글씨 
        marginTop: 31,
        marginLeft: 16,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    }, 
    Text14: { 
        marginTop: 8,
        marginBottom: 8,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        color: theme.gray40,
        textAlign: 'center'
    }, 
    line: {
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
    },
    getCard: { // 카드 받기
        position: 'absolute',
        bottom: 0,
        right: 77, 
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.skyblue,
        letterSpacing: -1,
    },  
    refuseCard: { // 카드 거절
        position: 'absolute',
        bottom: 0,
        right: 24,
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.gray50,
        letterSpacing: -1,
    },  
    checkCard: { // 카드 확인하기
        position: 'absolute',
        bottom: 0,
        right: 24,
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: theme.skyblue,
        letterSpacing: -1,
    },  
    // 알림이 없을 때
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        color:theme.skyblue,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.2,
    },
    toastContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.gray30
    },
    toastText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        color: theme.white,
        textAlign: 'center'
    },
})