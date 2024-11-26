import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { textStyles } from '../../textStyles';

const { height:HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    },
	title: {
    fontFamily: 'PretendardMedium',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.32,
    color: theme.gray50, 
    },
    ssop: {
    fontFamily: 'PretendardSemiBold',
    color: theme.gray10,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 39,
    letterSpacing: -0.52,
    marginTop: 2
    },
    cardicon:{
    height: 278,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    },
    socialContainer: {
    flexDirection: 'row',
    gap: 16,
    },
    emailContainer: {
    gap: 8,
    flex: 0,
    width: '100%',
    position: 'absolute',
    bottom: 20
    },
    email: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    },
    emailText: {
    color: 'white',
    ...textStyles.headline16
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
    ...textStyles.headline16
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
    width: 120,
    color: theme.gray60,
    fontFamily: 'PretendardMedium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
    textDecorationLine: 'underline',
    textDecorationColor: theme.gray60,
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
    textholderTest:{
    placeholderTextColor: theme.gray60,
    ...textStyles.body15
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
    color: theme.gray60,
    ...textStyles.headline14
    },
    join:{
    color: theme.gray60,
    ...textStyles.headline14
    },
    lineContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 64,
    gap: 16
    },
    line:{
    flex: 1,
    height: 1,
    backgroundColor: theme.gray90
    },
    text:{
    color: theme.gray60,
    ...textStyles.body15
    }
});