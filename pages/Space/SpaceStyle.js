import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{      
        flex: 1,  
        paddingVertical: 8,
        paddingHorizontal: 16,
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
    font16: {
        fontSize: 16,
        fontFamily: 'Pretendard',
        marginTop: 8
    },
    font18: {
        fontSize: 18,
        fontFamily: 'PretendardSemiBold',
        marginLeft: 8
    },
    people: {
        marginTop: 12,
        fontSize: 12,
        fontFamily: 'Pretendard',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TeamSPContent: {
        borderRadius: 8,
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.gray90,
        padding: 16,
        width: '100%',
        // display: 'flex',
        // justifyContent:'center',
        // alignItems: 'center',

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
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 16,

        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1
        
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
})