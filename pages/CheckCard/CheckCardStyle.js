import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
        container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        },
	cardPage: {
        color: theme.grey50,
        fontFamily: 'Pretendard',
        fontSize: 14, 
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.14,    
        marginTop: 40,
        marginBottom: 16,       
	},
        cardContainer: {
        height: 368,
        flexDirection: 'row',
        },
        cardWrapper: {
        marginHorizontal: 16,
        },

        btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 140,
        height: 65,
        gap: 28,
        position: 'absolute',
        top: 545,
        },
        btnText: {
        color: 'black',
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.14
        },
        btn: {
        gap: 8,
        justifyContent:'center',
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
        },        

        memoContainer: {
        paddingTop:32,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        flex: 1,
        },
        memoTitle:{
        fontFamily: 'Pretendard',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 30,
        letterSpacing: -0.4,
        textAlign: 'left',
        },
        memoInput: {
        width: '100%',
        height: 93, 
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop:32,
        marginBottom: 8, 
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.grey10,
        fontFamily: 'Pretendard'
        },
        memoLeng: {
        fontSize: 14,
        color: theme.grey60,
        alignSelf: 'flex-end',
        fontFamily: 'Pretendard'
        },
        memoBtn: {
        width: '100%',
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.grey10,
        borderRadius: 8,
        position: 'absolute',
        left: 16,
        bottom: 16,
        },
        memoBtnText:{
        color: 'white',
        fontFamily: 'Pretendard',
        fontSize:16,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: -0.32,
        },

        //modal style
        modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent: 'flex-end',
        fontFamily: 'Pretendard',
        fontSize: 16,
        letterSpacing: -0.32,
        fontWeight: 400,
        lineHeight: 19,
        },
        modalView: {
        height: 268,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        },
        modalTitle: {
        width: '100%',
        height: 48,
        //paddingRight: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        },
        modalContent: {
        padding: 16,
        width: '100%',
        height: 220,
        justifyContent: 'space-between',
        },
        button: {
        height: 48,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.grey10,
        },
        modalFont: {
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: -0.32,
        },
});