import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{    
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
    },
    shareContainer:{      
        flex: 1,  
        backgroundColor: theme.white,
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
        paddingHorizontal: 16, // 좌우 여백
    },
    container3: {
        flex: 1,
        position: 'relative',
    },
    btnNext: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: theme.gray10,
    },
    btnNextWhite: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'PretendardRegular',
        backgroundColor: theme.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(202, 202, 202, 1.0)",
        marginTop: 10,
    },
    btnText:{
        textAlign: 'center',
        color: theme.white,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold'
    },
    btnTextWhite:{
        textAlign: 'center',
        color: theme.gray50,
        fontSize: 16,
        fontFamily: 'PretendardSemiBold'
    },
    // 링크 공유하기 버튼, 사진
    linkShareContainer: {
        marginTop: 69,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 카드가 없을 때
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
     },
    noCard: {
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
     // 공유하기 모달
     shareModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    ShareModalView: {
        paddingVertical: 42,
        paddingHorizontal: 24,
        width: 272,
        height: 176,
        backgroundColor: 'white',
        borderRadius: 16,
    },
    ShareModalText: {
        fontFamily: 'PretendardSemiBold',
        fontSize: 16,
        letterSpacing: -1,
        marginBottom: 27,
    },
    line: {
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
        marginBottom: 27,
    },
})