import { StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: theme.white,
        flex: 1, // 디바이스 세로 100%
        paddingTop: 44,
    },
    spaceLayout: {
        backgroundColor: theme.white,
        flex: 1, // 디바이스 세로 100%
        paddingTop: 60,
    },
    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
    },
    InputText: {
        width: '91%',
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        fontSize: 15,
        borderRadius: 8,
        borderWidth: 0,
        color: theme.gray60,
        backgroundColor: theme.gray95,
        fontFamily: 'PretendardRegular',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    deleteIcon: {
        position: 'absolute',
        right: 45,
        top: '65%',
        transform: [{ translateY: -12 }]
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        top: '55%',
        transform: [{ translateY: -12 }]
    },

    // 탭 바 디자인
    containerTabBar: {
        // position: 'absolute',
        bottom: 700,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {        
        paddingHorizontal: 64,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.white,
        borderRadius: 12,
        shadowColor: "rgba(73, 81, 100, 0.07)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 12,
        shadowOpacity: 0.5,
        borderWidth: 1,
        borderColor: "rgba(244, 244, 244, 1.0)"
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: theme.white,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    inactiveTab: {
        backgroundColor: theme.white,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    divider: {
        width: 1,
        height: '33%',
        backgroundColor: theme.gray80,
        marginHorizontal: 0,
    },
    ListContainer: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
        backgroundColor: theme.white,
        borderColor: theme.gray95,
        borderRadius: 16,
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,        
    },
    listImage: {
        width: 64,
        height: 64,
        borderRadius: 12
    },

})