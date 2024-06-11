import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{ //메인 레이아웃    
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    title: { // 글씨  
        marginTop: 40,
        marginLeft: 24, 
        marginBottom: 20,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
    },        
    btn1: { // 카드 만들기 버튼 
        flexDirection: 'column',
        marginLeft: 16, 
        marginRight: 16,
        height: 104,
        borderRadius: 8,
        backgroundColor: theme.white,
        position: 'relative',
        shadowColor: "rgba(29, 51, 55, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
        width: 158,
        height: 184,
        borderRadius: 8,
        backgroundColor: theme.white,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 10,
        position: 'relative',
    },
    btn3: { // 내가 받은 카드 보기
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginLeft: 16, 
        marginRight: 16,
        marginBottom: 64,
        width: 328,
        borderRadius: 8,
        backgroundColor: theme.white,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Text14: {
        marginLeft: 16,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
    },
    Text16: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    },
    Text18: {
        marginTop: 20,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
        marginBottom: 8,
    },
    
    Text20: {
        marginTop: 16,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    icon1: { // 카드 만들기 아이콘
        position: 'absolute',
        width: 129,
        height: 72,
        bottom: 0,
        right: 40,
    },
    icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 80,
        height: 80,
    }
});