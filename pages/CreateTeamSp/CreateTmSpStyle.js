import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
	title: {
        marginTop: 32,
		fontSize: 20,
        fontFamily: 'PretendardBold'
	},
    largetitle: {
        marginTop: 70,
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
        fontFamily: 'Pretendard'
    },
    btnNext: {
        // position: 'absolute',
        // top: 635, // iphone13 기준
        // bottom: '-140%',
        // left: 0,
        marginTop: 105,
        // marginBottom: 50,
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'Pretendard',
        backgroundColor: theme.gray10,
    },
    btnWhite: {
        marginTop: 8,
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'Pretendard',
        borderWidth: 1,
        borderColor: theme.gray80, 
    },
    RadioBtn: {
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
        marginTop: 28,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    item: {
        width: 158,
        height: 184,
        borderRadius: 8,
        backgroundColor: theme.gray90,
        margin: 7,
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
    line: {
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
        marginTop: 28,
        marginBottom: 28
    },
    coverContainer:{
        display:'flex',        
        alignItems: 'flex-start', 
        marginTop: 16,
        flexDirection: 'row',
        gap: 16,
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