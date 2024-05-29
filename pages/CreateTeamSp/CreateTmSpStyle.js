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
    largetitle: {
        marginTop: '15%',
		fontSize: 24,
        lineHeight: 33,
        textAlign: 'center',
        fontFamily: 'PretendardSemiBold',
	},
    subtitle: {
        marginTop: 12,
		fontSize: 14,
        fontFamily: 'PretendardRegular'
	},
    font16: {
        fontSize: 16,
        fontFamily: 'PretendardSemiBold',
        marginLeft: 4
    },
    font18: {
        fontSize: 18,
        fontFamily: 'PretendardSemiBold',
        lineHeight: 24,
        marginLeft: 8
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
    selectedItem: {
        backgroundColor: '#ccc',
        // backgroundColor: '#00C2ED',
    },
    // 카드 정보 선택
    elementContainer:{
        display:'flex',        
        alignItems: 'flex-start', 
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap', // 줄바꿈
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
    plusContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 16, 
        marginBottom: 8
    },
    line: {
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
        marginTop: 28,
        marginBottom: 28
    },
    coverContainer:{
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 200
    },
    coverRadioBtn:{        
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16  
    },
    // 템플릿 예시 확인
    cardShadow:{        
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
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
    // 초대코드
    inviteCodeContainer: {
        width: '100%',
        height: 48,
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inviteCode: {
        fontSize: 16,
        fontFamily: 'PretendardRegular',
    },
    copy:{
        fontSize: 16,
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    }   
})