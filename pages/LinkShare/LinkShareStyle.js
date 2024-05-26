import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{    
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: { // 글씨 
        marginTop: 30,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },  
    Text16: { 
        marginTop: 16,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    },  
    Text14: { 
        marginLeft: 8,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        color: theme.gray40,
    },        

    range: { //최신순 정렬
        marginTop: 24,
        marginLeft: 8,
        marginBottom: 12,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
    },
    DownArrowIcon: { 
        marginTop: 24,
        marginBottom: 12,
    },

    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container2: {
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    btn1: { // 새 카드 만들기
        marginTop: 12,
        width: 158,
        height: 201,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.gray95,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.gray90,
    },
    card: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerView: {
        marginTop: 120,
    },

    btnContainer: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        paddingBottom: 16, // 하단 여백
        paddingHorizontal: 16, // 좌우 여백
    },
    container3: {
        flex: 1,
        position: 'relative',
    },
    btnNext: {
        marginTop: 50,
        marginBottom: 16,
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
    // 초대코드
    linkShareContainer: {
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
    linkShare: {
        fontSize: 16,
        fontFamily: 'PretendardSemiBold',
    },
    copy:{
        fontSize: 16,
        color: theme.skyblue,
        fontFamily: 'PretendardSemiBold'
    },
    
    // 카드가 없을 때
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
     },
    noCard: {
        marginTop: 250,
        color: theme.gray60,
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -0.2,
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
        letterSpacing: -0.2,
    },
})