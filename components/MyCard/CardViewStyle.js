import { Dimensions, StyleSheet, Platform } from 'react-native';
import { theme } from "../../theme";
import { textStyles } from "../../textStyles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    // container: {
    //     width: '100%',
    //     marginVertical: 16,
    //     gap: 12,
    //     backgroundColor: 'pink'
    // },

    mainlayout: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white
    },
    title: { // 글씨 
        marginTop: 30,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    namebox: {
    },
    range: { //최신순 정렬
        marginTop: 24,
        marginLeft: 8,
        marginBottom: 12,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
    },
    DownArrowIcon: {
        marginTop: 24,
        marginBottom: 12,
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
        //justifyContent: 'space-between',
        justifyContent: 'flex-start',
    },
    container2: {
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
        width: Dimensions.get('window').width - 32,
        padding: 12,
        marginBottom: 8,
        backgroundColor: theme.white,
        borderColor: theme.gray95,
        borderWidth: 1,
        borderRadius: 16,
        //ios
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 1, 
        shadowRadius: 5,
        // android 
        elevation: 5, 
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    gray: {
        width: 80,
        height: 80,
        backgroundColor: theme.gray80,
        borderRadius: 16,
    },
    infoContainer: {
        marginLeft: 12,
        width: '60%',
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
        fontWeight: '600',
        letterSpacing: -0.32
    },
    Text16gray50: {
        fontFamily: "Pretendard",
        color: theme.gray50,
        fontSize: 16,
    },
    Text16gray60: {
        fontFamily: "Pretendard",
        color: theme.gray60,
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: -0.32
    },
    Text14gray30: {
        marginTop: 8,
        color: theme.gray30,
        ...textStyles.body14
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
    menuContainer: {
        position: 'absolute',
        zIndex: 30,
        top: 16,
        right: 0,
    },
    menuText: {
    color: theme.gray10,
    ...textStyles.body16
    },
    //modal style
        modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
        },
        modalView: {
        //height: 232,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: 24
        },
        modalTitle: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32
        },
        modalContent: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
        justifyContent: 'space-between',
        },
        button: {
        height: 48,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.gray10,
        },
        modalFont: {
        fontFamily: 'PretendardRegular',
        color: theme.gray10,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 19,
        letterSpacing: -0.32,
        flex: 1,
        },

    // 그리드형
    btn1: {
        marginTop: 12,
        height: WIDTH * 0.55,
        width: WIDTH * 0.45,
        borderRadius: 16,
        borderWidth:1,
        borderColor: theme.gray95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,
        position: 'relative',
    },
    cardImgAreaWrapper: {
        position: 'relative', 
      },
    cardImgArea: {
        width: WIDTH * 0.444,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    cardTextArea: {
        width: '100%',
        height: 51,
        borderRadius: 15,
        backgroundColor: theme.white,
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    },
    Info: {
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    name: {
        color: theme.gray10,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.32,
        marginRight: 4,
    },
    age: {
        gap: 2,
        flexDirection: "row",
        fontFamily: 'PretendardRegular',
        fontSize: 14,
    },
    ageText: {
        color: theme.gray60,
        ...textStyles.body14,
        marginRight: 4,
    },

    //삭제모드
    deleteContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    },
    selectIcon: {
        position: 'absolute',
        top: 12,
        left: 11,
        zIndex: 10
    },

    //공유모달
    shareModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    },
    shareModalView: {
    height: 304,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    },
    modalTitle: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: -0.32
    },
    modalFont: {
    fontFamily: 'PretendardRegular',
    color: theme.gray10,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    letterSpacing: -0.32,
    flex: 1,
    },
    modalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 25,
    gap: 8
    },
    btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
    width: 160,
    height: 180,
    elevation: 5,
    position: 'relative',
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
    elevation: 5,
    position: 'relative',
    },
    Text14: {
    marginLeft: 16,
    fontFamily: "PretendardRegular",
    fontSize: 14,
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

    // 삭제 모달 스타일
  deleteModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteModalContent: {
    width: '80%',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  deleteModalTitle: {
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    //gap: 8,
  },
  deleteModalCancelButton: {
    //flex: 1,
    width: 124,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.gray80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  deleteModalCancelText: {
    color: theme.gray50,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    textAlign: 'center',
  },
  deleteModalDeleteButton: {
    //flex: 1,
    width: 124,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.gray10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  deleteModalDeleteText: {
    color: theme.white,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    textAlign: 'center',
  },
})