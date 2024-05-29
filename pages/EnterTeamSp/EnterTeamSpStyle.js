import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{
        backgroundColor: theme.white,
        flex: 1, // 디바이스 세로 100%
        paddingVertical: 8,
        paddingHorizontal: 16,
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
    nameInput:{
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
    nameLeng:{
        fontSize: 14,
        color: theme.gray60,
        alignSelf: 'flex-end',
        fontFamily: 'PretendardRegular',
    },
    // 버튼들
    btnNext: {
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: theme.gray10,
    },
    btnText:{
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
    btnTextBlack:{
        textAlign: 'center',
        color: theme.gray50,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold'
    },
    btnContainer:{
        position:'absolute',
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        bottom: 0,    
        paddingTop: 32,
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
        height: 340,
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
    inputBirthContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputBirth: {
        width: '30%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.gray60,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    inputBirthText: {
        textAlign: "right",
        fontFamily: "PretendardRegular",
        fontSize: 16,
    },
    marginR8: {
        marginRight: 8,
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
        width: '50%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.gray60,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
    },

    
})