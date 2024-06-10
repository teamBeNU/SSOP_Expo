import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{      
        flex: 1,  
        paddingTop: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white
    },
    backgroundColor:{
        flex: 1, 
        backgroundColor: theme.white
    },

    // 정렬
    container2: {
        alignItems: 'flex-end',
        marginRight: 8,
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
    range2: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        marginTop: 17
    },
    DownArrowIcon2: { 
        marginRight: 24,
        marginTop: 17.5
    },

    // 마이스페이스 그룹
    fontGroup: {
        fontSize: 16,
        fontFamily: 'PretendardSemiBold',
        letterSpacing: -1,
    },
    peopleGroup: {
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        letterSpacing: -1,
        justifyContent: 'center',
        marginLeft: 8,
    },
    groupContent: {
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
        elevation: 5,
        position: 'relative',
    },

    // 팀스페이스 카드
    host: {
        width: 43,
        height: 22,
        borderRadius: 8,
        marginRight: 8,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.gray60,
        fontFamily: 'PretendardRegular',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    hostText: {
        color: theme.gray60,
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

        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1,

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarWrapper: {
        backgroundColor: '#E5EBEA', // 전체 배경 색상
        borderRadius: 20,
        margin: 16, // 외부 여백
        padding: 4, // 내부 여백
    },
    tabBar: {
        backgroundColor: 'transparent',
    },
    indicatorStyle: {
        backgroundColor: 'transparent',
    },
    tabBarItemStyle: {
        borderRadius: 8,
        height: 40,
        margin: 8, // 탭 사이의 간격
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
        alignItems: 'flex-start',
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        letterSpacing: -1
    },
    btn: {
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
        marginBottom: 8,
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
        marginBottom: 12,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        flex: 1, 
    },
    positionFilter: {
        marginTop: 24,
        marginLeft: 'auto',
        paddingHorizontal: 12,
        paddingVertical: 8,
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
    detailPeople: {
        marginLeft: 8,
        marginTop: 24,
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: -1,
    },
    cardLayout:{   
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    // 필터
    filterText: {
        marginLeft: 16,
        marginTop: 32,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -1
    },
    elementContainer:{
        display:'flex',        
        alignItems: 'flex-start', 
        marginTop: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        gap: 8,
    },
    defaultElement:{    
        display:'flex',   
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontFamily: 'PretendardRegular',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80, 
        color: theme.gray50,
        backgroundColor: theme.gray95,
    },
    element:{    
        display:'flex',   
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontFamily: 'PretendardRegular',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray90, 
        color: theme.gray20,
        backgroundColor: theme.white,
    },
    selectedElement:{ 
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.skyblue,
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    },
    selectedText:{
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    },

     buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderColor: theme.gray90,
    },
    resetButton: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.gray80,
    },
    resetButtonText: {
        fontSize: 16,
        fontFamily: 'PretendardSemiBold',
        color: theme.gray50,
    },
    viewCardsButton: {
        flex: 3,
        height: 48,
        backgroundColor: theme.gray10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    viewCardsButtonText: {
        color: theme.white,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold',
    },

    // 모달
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        height: 340,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    closeIcon: {
        marginTop: 19,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    modalContent: {
        borderRadius: 8,
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.gray90,
        marginTop: 24,
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
    },
    modalText: {
        marginTop: 18,
        textAlign: 'center',
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        letterSpacing: -1
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
        shadowRadius: 2,
        shadowOpacity: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        elevation: 5,
        marginHorizontal: 10,
        position: 'relative',
        marginTop: 35,
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
    icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 80,
        height: 80,
    },

    // 공유하기 모달
    shareModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    ShareModalView: {
        paddingVertical: 32,
        paddingHorizontal: 24,
        width: 272,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    ShareModalText: {
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -1
    },
    ShareModalsmallText: {
        marginTop: 12,
        marginBottom: 35,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        letterSpacing: -1,
        color: theme.gray60,
    },

    // 라디오
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      radio: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.gray80,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginLeft: 28,
        marginTop: 20,
      },
      radioSelected: {
        borderColor: '#7F7F7F',
        backgroundColor: '#7F7F7F',
      },
      radioInner: {
        backgroundColor: '#7F7F7F',
      },
      label: {
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
        letterSpacing: -1,
        marginTop: 21.5,
      },

      // 하단
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderTopWidth: 1,
        borderColor: theme.gray90,
        backgroundColor: theme.white
    },
    bottomText: {
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
        color: 'black',
        letterSpacing: -1,
        justifyContent: 'center',
        alignContent: 'center'
    },

    bottomLine: {
        marginLeft: 20,
        marginRight: 20,
    },
})