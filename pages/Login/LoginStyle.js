import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    },
	title: {
    fontFamily: 'Pretendard',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 42,
    letterSpacing: -0.56,
    color: theme.gray30, 
    },
    ssop: {
    color: theme.gray10,
    fontWeight: '700',
    },
    socialContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 102,
    },
    emailContainer: {
    marginTop: 32,
    gap: 8,
    flex: 0,
    width: '100%',
    },
    email: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    },
    emailText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
    login: {
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.gray80,
    },
    LoginText: {
    color: theme.gray50,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    }
});