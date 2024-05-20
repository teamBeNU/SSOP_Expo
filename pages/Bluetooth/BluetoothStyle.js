import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainlayout:{        
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: { // 글씨  
        marginTop: 40,
        marginLeft: 16,
        fontFamily: "PretendardBold",
        fontSize: 20,
        letterSpacing: -1,
    },  
    name: { // 보낼 사람 선택 이름 
        marginTop: 13.5,
        marginLeft: 8, 
        marginBottom: 13.5,
        fontFamily: "PretendardBold",
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
        fontFamily: "Pretendard",
        fontSize: 16,
        color: theme.blue,
        letterSpacing: -1,
    },  
    stateFinish: { // 공유 완료
        position: 'absolute',
        bottom: 14.5,
        right: 8,
        fontFamily: "Pretendard",
        fontSize: 16,
        color: theme.gray50,
        letterSpacing: -1,
    },  
    range: { //최신순 정렬
        marginTop: 24,
        marginLeft: 24,
        marginBottom: 12,
        fontFamily: "Pretendard",
        fontSize: 14,
        letterSpacing: -1,
    },
	Text20: {
        marginTop: 16,
        marginLeft: 16,
        fontFamily: "PretendardBold",
        fontSize: 20,
        letterSpacing: -1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
})