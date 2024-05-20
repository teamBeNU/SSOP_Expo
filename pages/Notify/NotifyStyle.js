import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    btn1: { // 보낸 카드
        height: 81,
        backgroundColor: "#8CFF791A",
        position: 'relative',
    },
    btn2: { // 받은 카드
        height: 81,
        position: 'relative',
    },
    title: { // 글씨 
        marginTop: 31,
        marginLeft: 16,
        fontFamily: "Pretendard",
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
        fontFamily: "PretendardBold",
        fontSize: 14,
        color: theme.gray10,
        letterSpacing: -1,
    },  
    refuseCard: { // 카드 거절
        position: 'absolute',
        bottom: 0,
        right: 24,
        fontFamily: "PretendardBold",
        fontSize: 14,
        color: theme.gray50,
        letterSpacing: -1,
    },  
    checkCard: { // 카드 확인하기
        position: 'absolute',
        bottom: 0,
        right: 24,
        fontFamily: "PretendardBold",
        fontSize: 14,
        color: theme.gray10,
        letterSpacing: -1,
    },  
})