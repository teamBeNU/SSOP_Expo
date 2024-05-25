import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: { // 글씨 
        marginTop: 30,
        marginLeft: 16,
        fontFamily: "PretendardSemiBold",
        fontSize: 20,
        letterSpacing: -1,
    },  
    name: { // 보낼 사람 선택 이름 
        marginTop: 13.5,
        marginLeft: 8, 
        marginBottom: 13.5,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
        position: 'relative',
    },      
    namebox: { 
        marginLeft: 16, 
        marginRight: 16,
        height: 48,
        width: 328,
    },
    stateCall: { // 요청중
        position: 'absolute',
        bottom: 14.5,
        right: 8, 
        fontFamily: "PretendardSemiBold",
        fontSize: 16,
        color: theme.blue,
        letterSpacing: -1,
    },  
    stateFinish: { // 공유 완료
        position: 'absolute',
        bottom: 14.5,
        right: 8,
        fontFamily: "PretendardRegular",
        fontSize: 16,
        color: theme.gray50,
        letterSpacing: -1,
    },  
    range: { //최신순 정렬
        marginTop: 24,
        marginLeft: 24,
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
        flex: 1,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container2: {
        flex: 1,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        left: 16,
        width: 328,
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
})