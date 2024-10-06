import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white
    },
    title: { // 글씨 
        marginTop: 30,
        marginBottom: 20,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    subteamsp: {
        letterSpacing: -1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'PretendardRegular',
    },
    range: { //최신순 정렬
        color: theme.gray50,
        fontFamily: "PretendardRegular",
        fontSize: 13,
        letterSpacing: -1,
    },
    filterButtonText: { //최신순 정렬
        color: theme.gray30,
        fontFamily: "PretendardRegular",
        fontSize: 13,
        letterSpacing: -1,
    },
    rightButtonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    DownArrowIcon: {
        marginLeft: 0,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.gray90, 
        borderRadius: 50, 
        paddingVertical: 8,
        paddingRight: 10,
        paddingLeft: 16,
        backgroundColor: theme.white
      },
      filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.gray90, 
        borderRadius: 50, 
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: theme.white
      },
    iconContainer: {
        borderWidth: 1,
        borderColor: theme.gray90,
        borderRadius: 50,
        padding: 8,
        marginRight: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.white
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
    rowRange: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    rowRange2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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

    btn1: {
        marginTop: 12,
        // width: 158,
        width: '44%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        position: 'relative',
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
        flexDirection: 'row',
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

    // 리스트형 카드 스타일
    ListContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 12,
        backgroundColor: theme.white,
        borderColor: theme.gray95,
        borderWidth: 1,
        borderRadius: 16,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    },
    gray: {
        width: 64,
        height: 64,
        backgroundColor: theme.gray80,
        borderRadius: 16,
    },
    infoContainer: {
        marginLeft: 12
    },
    menuContainer: {
        position: 'absolute',
        zIndex: 10,
        top: 5,
        right: -15
      },
    rowName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    Text16gray10: {
        fontFamily: "PretendardSemibold",
        color: theme.gray10,
        fontSize: 16,
        letterSpacing: -0.32
    },
    Text16gray50: {
        fontFamily: "Pretendard",
        color: theme.gray50,
        fontSize: 16,
    },
    Text14gray30: {
        marginTop: 8,
        fontFamily: "Pretendard",
        color: theme.gray30,
        fontSize: 14,
    }, 
    Text14gray50: {
        fontFamily: "Pretendard",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -0.14,
    },
    newCardBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },

    host: {
        width: 38,
        height: 18,
        borderRadius: 8,
        backgroundColor: '#00C2ED33',
        fontFamily: 'PretendardRegular',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    hostText: {
        color: theme.gray20,
        fontSize: 10,
        fontFamily: 'PretendardRegular',
        textAlign: 'center',
        letterSpacing: -1,
    },

    // 마이 스페이스 상세
    backgroundColor:{
        flex: 1, 
        backgroundColor: theme.gray95
    },
    backgroundColor2:{
        paddingTop: 40, 
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: theme.gray95
    },
    detailtitle: {
        letterSpacing: -1,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'PretendardSemiBold',
    },
    leftContainer: {
        alignItems: 'center',
    },
    detailPeople: {
        fontSize: 12,
        fontFamily: 'PretendardRegular',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: -1,
        paddingBottom: 16,
    },

    // 라디오
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      radio: {
        height: 16,
        width: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: theme.gray80,
        alignItems: 'center',
        justifyContent: 'center',
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

      
      radioButtonContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10, 
    },

    radioContainer2: {    
        position: 'relative',
      },
      radio2: {
        height: 16,
        width: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: theme.white,
        alignItems: 'center',
        justifyContent: 'center',

      },
      radioSelected2: {
        borderColor: '#757575',
        backgroundColor: '#757575',
      },

      btn2: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
    },

    cardWrapper: {
        position: 'relative',
        width: '48%',
        marginTop: 12,
      },

      radioCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      
      radioButtonWrapper: {
        marginRight: 12,
        marginTop: 12,
        justifyContent: 'center'
      },
      
        radioCardWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
      
})