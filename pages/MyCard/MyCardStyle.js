import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const cardWidth = WIDTH * 0.8;
const cardHeight = WIDTH * 1.2;

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
        height: cardHeight,
        flexDirection: 'row',
        },
        verticalLine:{
        width: 1, 
        height: 20, 
        backgroundColor: theme.gray95,
        },
        btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: WIDTH * 0.84,
        height: 77,
        gap: 20,
        marginHorizontal: 28,
        //marginTop: 32,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.gray95
        },
        btnText: {
        color: theme.gray20,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '500',
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
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        },
        noCard: {
        color: theme.gray60,
        fontFamily: 'PretendardRegular',
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
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: -0.32,
        },
        cardScrollView: {
        height: WIDTH * 1.2,  
        marginTop: 56,
        paddingHorizontal: 42,
        alignItems: 'center',
        marginBottom: 32,
        //ios shadow
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 4,
        shadowRadius: 4,
        //android shadow
        elevation: 4,
        },
        cardWrapper: {
        width: WIDTH * 0.84,
        marginHorizontal: -10
        },
        //modal style
        modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
        },
        modalView: {
        height: 232,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        },
        modalTitle: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
        },
        modalContent: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
        justifyContent: 'space-between',
        },
        button: {
        height: 48,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.gray10,
        },
        modalFont: {
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: -0.32,
        textAlign: 'center',
        flex: 1,
        },
        line: {
        borderBottomWidth: 1,
        borderBottomColor: theme.gray90, 
        marginVertical: 8,
        },
        newCardBtn: {
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.gray95,
        borderRadius: 16,
        marginBottom: 34
        },
        newCardText:{
        color: theme.gray30,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.14
        },

        dropdownMenu: {
        position: 'absolute',
        top: 0,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24
        },
        menuItem: {
        color: theme.gray10,
        fontFamily: 'PretendaredRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
        },
});