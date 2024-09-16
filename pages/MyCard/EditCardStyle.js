import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const cardWidth = WIDTH * 0.8;
const cardHeight = WIDTH * 1.2;

export const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    },
    title:{
    color: theme.gray10,
    fontFamily: 'PretendardSemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    marginBottom: 48,
    },
    inputContainer:{
    gap: 8,
    },
    subTitle:{
    color: theme.gray30,
    fontFamily: 'PretendardSemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    letterSpacing: -0.14,
    paddingHorizontal: 8
    },
    input:{
    backgroundColor: theme.gray95,
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: -0.32
    },
    line: {
    borderBottomWidth: 1,
    borderBottomColor: theme.gray90, 
    marginBottom: 28,
    },
    birthSecret:{
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    },
})