import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const { height:HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    },
	title: {
    fontFamily: 'PretendardRegular',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 42,
    letterSpacing: -0.56,
    color: theme.gray30, 
    height: 84,
    },
    ssop: {
    fontFamily: 'PretendardSemiBold',
    color: theme.gray10,
    fontWeight: '700',
    },
    cardicon:{
    height: 278,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    },
    socialContainer: {
    flexDirection: 'row',
    gap: 20,
    },
    emailContainer: {
    gap: 8,
    flex: 0,
    width: '100%',
    position: 'absolute',
    bottom: 32
    },
    email: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    },
    emailText: {
    color: 'white',
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
    kakao: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDDC3F',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDDC3F',
    },
    kakaoText: {
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
    login: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    },
    loginText: {
    color: theme.gray60,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    textDecorationLine: 'underline',
    textDecorationColor: theme.gray60,
    //text-decoration: underline solid #888888;
    },

    //Email Login
    inputContainer: {
    gap: 8,
    marginTop: 40,
    },
    inputTitle: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'PretendardRegular',
    color: theme.gray40,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    input: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: theme.gray95,
    borderRadius: 8,
    placeholderTextColo: theme.gray60,
    },
    textContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    },
    pwInput: {
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    },
    pwChange: {
    fontFamily: 'PretendardSemiBold',
    color: theme.gray60,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    join:{
    fontFamily: 'PretendardSemiBold',
    color: theme.gray40,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    },
    lineContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 56
    },
    line:{
    flex: 1,
    height: 1,
    backgroundColor: theme.gray90
    },
    text:{
    fontFamily: 'PretendardRegular',
    color: theme.gray60,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.15,
    marginHorizontal: 16,
    }
});