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
        marginTop: 35,
        marginLeft: 8, 
        marginBottom: 17,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },        
    btn1: { // 카드 만들기 버튼 
        paddingVertical: 29,
        paddingHorizontal: 16,
        flexDirection: 'column',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: theme.green,
        position: 'relative',
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        elevation: 10,
    },
    btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
        paddingVertical: 16,
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
        position: 'relative',
    },
    btn3: { // 내가 받은 카드 보기
        width: '100%',
        paddingVertical: 20,
        paddingLeft: 16,
        paddingRight: 20,
        borderRadius: 16,
        backgroundColor: "#E9FAFE",
        shadowColor: 'rgba(5, 38, 155, 0.05)',
        shadowOffset: { width: -2, height: -2 },
        shadowRadius: 9.8,
        shadowOpacity: 1,
        elevation: 10, // Android 전용 그림자 설정
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    btnCard: { // 카드 만들기 view
        width: '31%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 25,
        backgroundColor: "#FF85CB",
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1
    },
    folderback: {
        position: 'absolute',
        zIndex: 0, 
        width: '100%',
        bottom: 0,
        borderRadius: 16,
        height: 68,
        backgroundColor: "#C3F0FA"
    },
    folderback2: {
        position: 'absolute',
        zIndex: 0, 
        width: '36%',
        bottom: 0,
        borderRadius: 16,
        height: 73,
        backgroundColor: "#C3F0FA"
    },
    containerProfileCard: {
        marginTop: 35,
        flex: 1,
    },
    btnIcon: { // 원형 아이콘
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(151, 160, 181, 0.14)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 4.8,
        shadowOpacity: 1,
        borderWidth: 1.3,
        borderColor: "rgba(244, 244, 244, 1.0)",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // 안드로이드 그림자
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
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        marginTop: 6,
    },
    Text16: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    },
    Text18: {
        marginTop: 14,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
    },
    TextWhite: {
        fontFamily: "PretendardSemiBold",
        fontSize: 14,
        color: "#FFFFFF"
    },
    Text23: {
        fontFamily: "PretendardSemiBold",
        fontSize: 23,
        letterSpacing: -1,
    },
    icon1: { // 카드 만들기 아이콘
        position: 'absolute',
        bottom: 0,
        right: 30,
    },
    icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
});
