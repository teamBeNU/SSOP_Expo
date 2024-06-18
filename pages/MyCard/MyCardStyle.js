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
        color: theme.gray50,
        fontFamily: 'PretendardRegular',
        fontSize: 14, 
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.14,    
        marginTop: 24,
        marginBottom: 16,       
	},
        cardContainer: {
        height: 432,
        flexDirection: 'row',
        },
        cardWrapper: {
        marginHorizontal: 8,
        },
        btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
        height: 65,
        gap: 28,
        marginBottom: 44,
        // position: 'absolute',
        // top: 545,
        },
        btnText: {
        color: 'black',
        fontFamily: 'PretendardRegular',
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
        blackBtn: {
        width: 40,
        height: 40,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 39,
        },
        emptyContainer: {
        alignItems: 'center',
        gap: 16,
        },
        noCard: {
        color: theme.gray60,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: -0.32,
        },
        newContainer: {
        flexDirection: 'row',
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        },
        newCard: {
        color:theme.skyblue,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: -0.32,
        },
        cardScrollView: {
        height: 436,  
        //ios shadow
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 4,
        shadowRadius: 4,
        //android shadow
        elevation: 4,
        }
});