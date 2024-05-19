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

});