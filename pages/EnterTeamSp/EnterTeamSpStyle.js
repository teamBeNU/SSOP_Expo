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
        marginTop: 65,
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
    item: {
        width: '45%',
        height: '50%',
        borderRadius: 8,
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.gray95,
        margin: 8,
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',

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
    text: {
        fontSize: 12,
        fontFamily: 'Pretendard',
        textAlign: 'center',
        marginTop: 4
    },
})