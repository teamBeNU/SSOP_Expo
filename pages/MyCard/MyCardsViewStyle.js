import { Dimensions, StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 47,
    alignItems: 'center'
    },
    titleContainer: {
    flexDirection: 'row',
    gap: 10
    },
    title: {
    color: theme.gray10,
    fontFamily: 'PretendardSemiBold',
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 31,
    letterSpacing: -0.52
    },
    container2: {
    alignSelf: 'flex-end',
    },
    row2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    },
    range: { //최신순 정렬
    fontFamily: "PretendardRegular",
    fontSize: 14,
    letterSpacing: -1,
    },
    viewToggleContainer:{
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.gray90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    },
    optionToggleContainer:{
    flexDirection: 'row',
    gap: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.gray90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    },
    DownArrowIcon: {
    backgroundColor: 'pink',
    marginTop: 24,
    marginBottom: 12,
    },
})