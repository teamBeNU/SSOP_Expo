import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from "../../theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84; 
const SPACING = -18;

export const styles = StyleSheet.create({
    memoContainer: {
        width: CARD_WIDTH,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 20,
        backgroundColor: '#F8F8F8'
    },
    memoText: {
        color: theme.gray30,
        fontFamily: 'PretendardRegular',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 23,
        letterSpacing: -0.3,
        alignSelf: 'stretch'
    },
    moreIcon: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 4,
        top: 6,
        // width: 32,
        // height: 32,
        // color: '#949494'
    },
    hideContainer: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    hideText: {
        color: theme.gray60,
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: -0.14
    },
    // 메모 없을 때 
    container: {
        width: CARD_WIDTH,
        paddingVertical: 18,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 44,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'stretch',
        height: 20
    },
    btnText: {
        color: theme.gray40,
        fontFamily: 'PretendardMedium',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.14
    },
    writeBtn: {
        width: 20,
        height: 20,
        paddingTop: 4.167,
        paddingRight: 1.429,
        paddingBottom: 2.5,
        paddingLeft: 3.333,
        justifyContent: 'center',
        alignItems: 'center'
    }
});