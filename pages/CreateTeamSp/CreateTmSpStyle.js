import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{
        backgroundColor: theme.white,
        height: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
	title: {
        marginTop: 32,
		fontSize: 20,
        fontFamily: 'PretendardBold'
	},
    largetitle: {
        marginTop: '15%',
		fontSize: 24,
        textAlign: 'center',
        fontFamily: 'PretendardBold',
	},
    subtitle: {
        marginTop: 12,
		fontSize: 14,
        fontFamily: 'Pretendard'
	},
    font16: {
        fontSize: 16,
        fontFamily: 'PretendardBold',
    },
    font18: {
        fontSize: 18,
        fontFamily: 'PretendardBold',
        marginLeft: 8
    },
    nameContainer: {
        marginTop: 70,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',        
        gap: 8,
    },
    name: {
        fontSize: 14,
        fontFamily: 'Pretendard'
    },
    nameInput:{
        width: '100%',
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray10,
        fontFamily: 'Pretendard'
    },
    nameLeng:{
        fontSize: 14,
        color: theme.gray60,
        alignSelf: 'flex-end',
        fontFamily: 'Pretendard',
    },
    btnNext: {
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'Pretendard',
        backgroundColor: theme.gray10,
    },
    btnText:{
        textAlign: 'center',
        color: theme.white,
        fontSize: 16,
        fontFamily: 'PretendardBold'
    },
    btnWhite: {
        marginTop: -32,
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'Pretendard',
        borderWidth: 1,
        borderColor: theme.gray80, 
        backgroundColor: theme.white
    },
    btnTextBlack:{
        textAlign: 'center',
        color: theme.gray50,
        fontSize: 16,
        fontFamily: 'PretendardBold'
    },
    btnContainer:{    
        marginTop: 100,
    },
    RadioBtn: {
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80,
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
        backgroundColor: theme.gray90,
        margin: 8,
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginTop: 4
    },
    selectedItem: {
        backgroundColor: '#ccc',
        // backgroundColor: '#00C2ED',
    },
    //----
    elementContainer:{
        display:'flex',        
        alignItems: 'flex-start', 
        marginTop: 16,
        flexDirection: 'row',
        gap: 8,
    },
    defaultElement:{    
        display:'flex',   
        alignItems: 'flex-start',  
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontFamily: 'Pretendard',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray80, 
        color: theme.gray50,
        backgroundColor: theme.gray95,
    },
    element:{    
        display:'flex',   
        alignItems: 'flex-start',  
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontFamily: 'Pretendard',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray90, 
        color: theme.gray20,
        backgroundColor: theme.white,
    },
    selectedElement:{
        color: theme.skyblue,
        borderColor: theme.skyblue,
        alignItems: 'center',
        fontFamily: 'PretendardBold'
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
    },
    coverRadioBtn:{        
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16  
    },
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
        fontFamily: 'Pretendard',
    },
    copy:{
        fontSize: 16,
        color: theme.skyblue,
        fontFamily: 'PretendardBold'
    }
})