import { StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { Title } from 'react-native-paper';

export const styles = StyleSheet.create({
    mainlayout:{      
        flex: 1,  
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white
    },
    backgroundColor:{
        backgroundColor: theme.white
    },

    // 정렬
    container2: {
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    range: {
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 12,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
    },
    DownArrowIcon: { 
        marginTop: 8,
        marginBottom: 12,
    },

    // 마이스페이스 카드
    container: {
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    innerView: {
        marginTop: 120,
    },
    card: { // 마이스페이스 카드
        marginBottom: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        elevation: 5,
        position: 'relative',
        borderColor: theme.gray90,
    },

    // 팀스페이스 카드
    host: {
        width: 43,
        height: 22,
        borderRadius: 8,
        marginRight: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: "#00C2ED66",
        justifyContent: 'center',
        alignItems: 'center',
    },
    hostText: {
        color: theme.gray10,
        fontSize: 12,
        fontFamily: 'PretendardSemiBold',
        textAlign: 'center',
        letterSpacing: -1,
    },
    font16: {
        fontSize: 16,
        fontFamily: 'Pretendard',
        marginTop: 8,
        letterSpacing: -1,
    },
    font18: {
        fontSize: 18,
        fontFamily: 'PretendardSemiBold',
        letterSpacing: -1,
    },
    people: {
        marginTop: 12,
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: -1,
    },
    TeamSPContent: {
        borderRadius: 8,
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.gray90,
        padding: 16,
        width: '100%',
        // Android - Shadow
        elevation: 5,
        // IOS - Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        marginBottom: 12,
    },

    // 플로팅 버튼
    floatingButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: theme.gray10,
        width: 100,
        height: 36,
        borderRadius: 25,
        borderRadius: 25,

        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        color: theme.white,
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
    },
    floatingButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    floatingButtonIcon: {
        marginRight: 4.5,
    },
    

    // 상단 탭
    tabLabel: {
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
        letterSpacing: -1,
    },
    tabBar: {
        backgroundColor: theme.white,
    },
    indicatorStyle: {
        backgroundColor: 'transparent',
    },
    tabBarItem: {
        borderRadius: 10,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    tabBarItemStyle: {
        backgroundColor: theme.gray50,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    tabBarSelectedItemStyle: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 5,
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

    // 상세 팀스페이스
    title: {
        marginTop: 32,
        letterSpacing: -1,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'PretendardSemiBold',
    },
    sub: {
        marginTop: 32,
        marginBottom: 32,
        letterSpacing: -1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'PretendardRegular',
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        letterSpacing: -1
    },
    btn: {
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteBtn: {
        width: 40,
        height: 40,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 39,
        //ios shadow
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 4,
        shadowRadius: 4,
        //android shadow
        elevation: 4,
    },
    line: {
        marginTop: 32,
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
    },

    personText: {
        marginLeft: 20,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -1
    },
    personContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 좌우 여백을 최대화하여 요소를 양쪽으로 펼칩니다
        flex: 1, // 부모 컨테이너에 맞춰 전체 너비를 차지합니다
    },
    positionFilter: {
        marginTop: 24,
        marginLeft: 'auto',
        width: 88,
        height: 33,
        borderRadius: 36,
        backgroundColor: theme.gray95,
        marginRight: 16,
        fontFamily: 'PretendardRegular',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionFilterText: {
        color: theme.gray10,
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
        textAlign: 'center',
        letterSpacing: -1,
    },
    people: {
        marginLeft: 8,
        marginTop: 24,
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: -1,
    },
    

})