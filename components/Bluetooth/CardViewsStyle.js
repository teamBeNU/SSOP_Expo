import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{      
        flex: 1,  
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: { // 글씨 
        marginTop: 30,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },    
    namebox: { 
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
	Text20: {
        marginTop: 16,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    Text14: {
        marginBottom: 21,
        fontFamily: "PretendardSemiBold",
        color: theme.gray50,
        fontSize: 14,
        letterSpacing: -1,
    },
    Text16: {
        marginBottom: 21,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        letterSpacing: -1,
    },
    container: {
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
    line: {
        borderBottomWidth:1,
        borderBottomColor: theme.gray90,
        marginTop: 8,
        marginBottom: 8,
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
    innerView: {
        marginTop: 120,
    },

    // 카드가 없을 때
    emptyContainer: {
        flex: 1,
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
})