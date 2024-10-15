import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from "../../theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const MAX_CARD_HEIGHT = HEIGHT * 0.6;
const cardWidth = WIDTH * 0.84;
const cardHeight =  Math.min(WIDTH * 1.2, MAX_CARD_HEIGHT);

export const styles = StyleSheet.create({
        container:{
        alignItems: 'center',
        justifyContent: 'space-between',
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
        height: 28, 
        backgroundColor: theme.gray80,
        },
        btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: WIDTH * 0.84,
        height: 79,
        gap: 52,
        bottom: Platform.OS === 'android' ? HEIGHT-StatusBar.currentHeight-cardHeight-220 : HEIGHT-cardHeight-260,
        marginHorizontal: 28,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: theme.gray95
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
        gap: 6,
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
        marginTop: 60,
        paddingHorizontal: 42,
        alignItems: 'center',
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
        marginHorizontal: -10,
        justifyContent: 'center',
        alignItems: 'center'
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
        position: 'relative',
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32
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
        fontFamily: 'PretendardSemiBold',
        color: theme.gray10,
        fontSize: 16,
        fontWeight: 600,
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
        shareModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
        },
        shareModalView: {
        height: 304,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        },
        row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 25,
        gap: 8
        },
        btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
        width: 160,
        height: 180,
        elevation: 5,
        position: 'relative',
        borderRadius: 16,
        backgroundColor: theme.white,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
                width: 0,
                height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)",
        elevation: 5,
        position: 'relative',
        },
        Text14: {
        marginLeft: 16,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        },
        Text16: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
        },
        Text18: {
        marginTop: 20,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
        marginBottom: 8,
        },
        icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 80,
        height: 80,
        },

        dropdownMenu: {
        position: 'absolute',
        top: 0,
        right: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: theme.gray95,
        backgroundColor: 'white',
        zIndex: 1
        },
        dropdownMenuDetail:{
        height: 48,
        justifyContent: 'center',
        alignItems:'center'
        },
        menuItem: {
        color: theme.gray10,
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32,
        },
        updateText: {
        color: theme.gray40,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.14,
        marginTop: 27
        }
});