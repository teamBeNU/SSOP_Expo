import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainlayout: {
        backgroundColor: theme.white,
        flex: 1, // 디바이스 세로 100%
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    noPaddingMainlayout: {
        backgroundColor: theme.white,
        flex: 1, // 디바이스 세로 100%
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    flexSpacer: {
        flex: 1,
    },
    title: {
        marginTop: 30,
        fontSize: 20,
        lineHeight: 33,
        fontFamily: 'PretendardSemiBold'
    },
    midtitle: {
        fontSize: 18,
        lineHeight: 27,
        fontFamily: 'PretendardSemiBold',
        color: theme.gray10,
    },
    subtitle: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'PretendardRegular',
        color: theme.gray30,
    },
    font14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -1,
    },
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
    font22: {
        marginTop: 30,
        fontSize: 22,
        lineHeight: 33,
        fontFamily: 'PretendardSemiBold'
    },
    nameContainer: {
        marginTop: 32,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    name: {
        fontSize: 14,
        fontFamily: 'PretendardRegular',
        marginLeft: 8
    },
    nameBold: {
        fontSize: 14,
        fontFamily: 'PretendardSemiBold',
        marginLeft: 8
    },
    nameInput: {
        width: '100%',
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 0,
        color: theme.gray10,
        backgroundColor: theme.gray95,
        fontFamily: 'PretendardRegular'
    },
    nameLeng: {
        marginTop: 8,
        fontSize: 14,
        color: theme.gray60,
        fontFamily: 'PretendardRegular',
    },
    // 버튼들
    btnNext: {
        marginTop: 16,
        marginBottom: 8,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: theme.gray10,
    },
    btnText: {
        textAlign: 'center',
        color: theme.white,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold'
    },
    btnWhite: {
        marginTop: -32,
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        borderWidth: 1,
        borderColor: theme.gray80,
        backgroundColor: theme.white
    },
    btnBlue: {
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: theme.skyblue
    },
    btnTextBlack: {
        textAlign: 'center',
        color: theme.gray50,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold'
    },
    btnContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        overflow: 'hidden'
    },
    RadioBtn: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80,
    },
    nonSelect: {
        borderWidth: 0
    },
    // 템플릿 선택 그리드
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4%',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    //modal style
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent: 'flex-end',
        fontFamily: 'Pretendard',
    },
    modalView: {
        height: 320,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    closeIcon: {
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
    people: {
        marginTop: 12,
        fontSize: 12,
        fontFamily: 'Pretendard',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 호스트 지정 템플릿
    // 생년월일
    birthInput: {
        width: (Dimensions.get('window').width - 48) / 2,
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: theme.gray95,
        borderRadius: 8,
        placeholderTextColo: theme.gray60,
    },
    birthInputbox: {
        justifyContent: 'space-between',
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    birthText: {
        color: theme.gray60,
        textAlign: 'right',
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
        position: 'absolute',
        right: 16
    },
    marginR8: {
        marginRight: '4%',
    },
    radioBtnGruopContainer: {
        flexDirection: 'row',
    },
    radioBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    musicInput: {
        width: '49%',
        height: 48,
        borderRadius: 8,
        borderWidth: 0,
        color: theme.gray10,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
    },
    elementContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap', // 줄바꿈
        gap: 8,
    },
    element: {
        display: 'flex',
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontFamily: 'PretendardRegular',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray90,
        color: theme.gray20,
        backgroundColor: theme.white,
    },
    selectedElement: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.skyblue,
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    },
    selectedText: {
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    },

    // 입력 안 한 텍스트 박스
    inputEmpty: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.red,
    },
    inputEmptyText: {
        color: theme.red,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 8,
        marginTop: 8
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90,
        marginTop: 40,
        marginBottom: 40
    },

    // 자유 템플릿
    paddignB0: {
        paddingBottom: 0,
    },
    paddignB24: {
        paddingBottom: 24,
    },
    paddingH16: {
        paddingHorizontal: 16,
    },
    selectContaienr: {
        paddingTop: 31 - 8,
        paddingBottom: 33,
    },
    selectBtnContainer: {
        backgroundColor: theme.white,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.gray90,
        marginTop: 8,
    },
    selectBtnTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 24,
    },
    selectBtnTitle: {
        color: theme.gray10,
        fontFamily: 'PretendardMedium',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        textAlign: "center",
    },
    selectBtns: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginTop: 16,
    },
    spaceContainer: {
        backgroundColor: theme.gray95,
        height: 12,
        marginHorizontal: -16,
    },

    selectInputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60
    },
    selectTextInputContainer: {
        paddingTop: 32,
        width: "100%",
    },
    selectTitle: {
        marginTop: 60,
        color: theme.gray50,
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    },
    // 드롭다운
    dropDownContainerZIndex: {
        marginRight: "63%",
        zIndex: -1,
    },
    dropDownContainerZIndex1: {
        marginRight: "63%",
        zIndex: 1,
    },
    dropDownContainer: {
        marginRight: "63%",
        zIndex: 0
    },
    // 아바타
    coverTitle: {
        fontFamily: "PretendardSemiBold",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "600",
        marginTop: 70,
        textAlign: "center",
    },
    coverSubTitle: {
        fontFamily: "Pretendard",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        marginTop: 12,
        marginBottom: 32,
        textAlign: "center",
    },
    coverScrollView: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    coverImg: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8 * 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        // 그림자가 안보여서 임시 border
        borderWidth: 1,
        borderColor: theme.gray90,
        borderRadius: 10
    },
    circles: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    activeCircle: {
        backgroundColor: theme.skyblue,
    },
    inactiveCircle: {
        backgroundColor: theme.gray90,
    },
})