import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{ // 메인 레이아웃   
        flex: 1, 
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
    },
    title: { // 글씨  
        marginTop: 64,
        marginLeft: 8, 
        marginBottom: 17,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },        
    btn1: { // 카드 만들기 버튼 
        flexDirection: 'column',
        height: 120,
        borderRadius: 16,
        backgroundColor: theme.green,
        position: 'relative',
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        elevation: 8, // Android 전용 그림자 설정
    },
    btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
        borderRadius: 16,
        backgroundColor: theme.white,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        elevation: 5, // Android 전용 그림자 설정
        position: 'relative',
    },
    btn3: { // 내가 받은 카드 보기
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: theme.white,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        elevation: 5, // Android 전용 그림자 설정
        flexDirection: 'row',
        alignItems: 'center',
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
        width: '100%',
    },
    btnMarginRight: {
        marginRight: 6, // 두 버튼 사이의 간격을 위해 6으로 설정
    },
    btnMarginLeft: {
        marginLeft: 6, // 두 버튼 사이의 간격을 위해 6으로 설정
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
        marginTop: 20,
        marginLeft: 20,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    icon1: { // 카드 만들기 아이콘
        position: 'absolute',
        bottom: 0,
        right: 49,
    },
    icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
});
