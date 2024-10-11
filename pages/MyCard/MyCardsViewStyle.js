import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    overflow: 'visible',
    paddingTop: 47,
    alignItems: 'center'
    },
    titleContainer: {
    flexDirection: 'row',
    gap: 10
    },
    title: {
    color: theme.gray10,
    fontFamily: 'PretendardSemiBold',
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 31,
    letterSpacing: -0.52,
    marginBottom: 39
    },
    container2: {
    alignSelf: 'flex-end',
    marginBottom: 16
    },
    row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    },
    range: { //최신순 정렬
    fontFamily: "PretendardRegular",
    fontSize: 14,
    letterSpacing: -1,
    },
    viewToggleContainer:{
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.gray90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    },
    optionToggleContainer:{
    flexDirection: 'row',
    gap: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.gray90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    },
    newCardBtn: {
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.skyblue,
    position: 'absolute',
    marginTop: 14,
    bottom: 16
    },
    newCardText: {
    color: theme.skyblue,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    letterSpacing: -0.14
    },
    //라디오 버튼 스타일
    radioButtonContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    },
    totalText: {
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: -0.12
    },
    //삭제 버튼
    delteBtn: {
    width: '100%',
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.gray95,
    shadowColor: 'rgba(73, 81, 100, 0.09)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 5,
    },
    delteBtnText: {
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: -0.32
    },

    // 삭제 모달 스타일
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
      },
      modalTitle: {
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        letterSpacing: -0.32,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      cancelButton: {
        flex: 1,
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
      cancelText: {
        color: theme.gray50,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 17,
        letterSpacing: -0.14,
        textAlign: 'center',
      },
      deleteButton: {
        flex: 1,
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.gray10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      deleteText: {
        color: theme.white,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 17,
        letterSpacing: -0.14,
        textAlign: 'center',
      },
})