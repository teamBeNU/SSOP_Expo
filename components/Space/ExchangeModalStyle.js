import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: theme.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    closeIcon: {
        marginTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'PretendardRegular',
        fontSize: 16,
        letterSpacing: -1
    },
    row: {
        paddingTop: 27,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    btn2: { // 블루투스 송신, 링크 복사, 팀스페이스 입장, 팀스페이스 생성
        paddingVertical: 16,
        paddingHorizontal: 16,
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
        elevation: 10, // Android 전용 그림자 설정
        position: 'relative',
    },
    icon2: { // 블루투스, 링크, 팀스페이스 입장, 생성 아이콘
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    Text14: {
        fontFamily: "PretendardRegular",
        fontSize: 14,
        letterSpacing: -1,
        marginTop: 6,
    },
    Text18: {
        marginTop: 14,
        fontFamily: "PretendardSemiBold",
        fontSize: 18,
        letterSpacing: -1,
    },
    btnIcon: { // 원형 아이콘
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(151, 160, 181, 0.14)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 4.8,
        shadowOpacity: 1,
        borderWidth: 1.3,
        borderColor: "rgba(244, 244, 244, 1.0)",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10, // 안드로이드 그림자
    },
})