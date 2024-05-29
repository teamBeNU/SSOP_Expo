import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        paddingVertical: 8,
        paddingHorizontal: 16,
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
        color: theme.gray10,
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
        color: theme.gray10,
        letterSpacing: -1,
    },  
    // 알림이 없을 때
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
     },
    noCard: {
        marginTop: 310,
        color: theme.gray60,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.2,
    },
    newContainer: {
        flexDirection: 'row',
        height: 32,
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
})