import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"
import { textStyles } from "../../textStyles";

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32
    },
    title: {
    height: 60,
    color: theme.gray10,
    fontFamily: 'PretendardSemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: -0.4
    },
    inputContainer: {
    gap: 8,
    marginTop: 32,
    },
    inputTitle: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.gray40,
    ...textStyles.body14
    },
    input: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: theme.gray95,
    borderRadius: 8,
    placeholderTextColor: theme.gray60,
    ...textStyles.body15
    },
    nextBtn: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    position: 'absolute',
    left: 16,
    bottom: 16,
    },
    nextText: {
    color: 'white',
    ...textStyles.headline16 
    },
    request: {
    color: theme.skyblue,
    textAlign: 'right',
    fontFamily: 'PretendardSemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    marginTop: 16
    },
    uncorrect: {
    color: theme.gray40,
    fontFamily: 'PretendardSemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    marginTop: 16,
    paddingHorizontal: 8,
    },
    resend: {
    color: theme.gray40,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.14,
    marginTop: 16,
    paddingHorizontal: 8,
    },
    pwInput: {
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    },
    visibility: {
    position: 'absulute'
    },
    checkContainer: {
    marginTop: 16,
    paddingLeft: 8,
    flexDirection: 'row',
    gap: 12,
    },
    check: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    },
    checkText: {
    color: theme.gray60,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.28
    },
    warning: {
    marginTop: 8,
    paddingHorizontal: 8,
    color: theme.red,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    birthContainer: {
    //width: Dimensions.get('window').width -32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    },
    birthInput: {
    width: (Dimensions.get('window').width -48) / 3,
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: theme.gray95,
    borderRadius: 8,
    placeholderTextColo: theme.gray60,
    },
    birthInputbox: {
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    }, 
    birthText: {
    color: theme.gray60,
    textAlign: 'right',
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: -0.32,
    position: 'absolute',
    right: 16
    },
    inputError: {
        borderWidth:1,
        borderStyle: "solid",
        borderColor: theme.red,
    },
    inputErrorText: {
        color: theme.red,
        fontFamily: "PretendardRegular",
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 8,
        marginTop: 8,
    },
    inputBirth: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        backgroundColor: theme.gray95,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    inputBirthText: {
        fontFamily: "PretendardRegular",
        fontSize: 16,
    },
    agreeContainer: {
        marginTop: 32,
    },
    agreeAll: {
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.gray90,
    },
    agreeAllText:{
        color: theme.gray10,
        ...textStyles.headline18
    },
    agreeDetail: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8, 
    },
    agreeDetailText: {
        textAlign: 'left',
        width: SCREEN_WIDTH - 108,
        color: theme.gray10,
        ...textStyles.body14 
    },
    agreeContent: {
        color: 'black',
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21, 
        letterSpacing: -0.14,
        paddingBottom: 100
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 8,
        paddingHorizontal: 16,
    }
})