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
    paddingTop: 30,
    justifyContent: 'flex-start',
    },
    scrollContainer:{
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
    submit:{
    marginRight: 12, 
    padding: 8, 
    color: theme.skyblue, 
    fontFamily: 'PretendardRegular', 
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: -0.32
    },
    inputContainer:{
    gap: 8,
    },
    content:{
    paddingBottom: 64
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
    warningInput:{
    backgroundColor: theme.gray95,
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.red,
    color: theme.gray10,
    fontFamily: 'PretendardRegular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: -0.32
    },
    warningText:{
    color: theme.red,
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.14,
    marginLeft: 8
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
    paddingBottom: 100
    },
    memoBtn: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.gray10,
    borderRadius: 8,
    position: 'absolute',
    left: 16,
    bottom: 16,
    },
    memoBtnText:{
    color: 'white',
    fontFamily: 'PretendardRegular',
    fontSize:16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
    dropDown:{
    width: 120,
    height: 48,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: theme.gray90,
    borderWidth: 1,
    },
    dropDownInput: {
    fontFamily: 'PretendardRegular',
    fontSize: 15,
    color: theme.gray10,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.15
    },
    dropDownIconContainer: {
    top: -2,
    left: 70 
    },
})