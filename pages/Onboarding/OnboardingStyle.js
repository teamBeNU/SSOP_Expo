import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../theme"

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  marginH16: {
    marginHorizontal: 16,
  },

  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: theme.white,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 16,
  },
  informContainer: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    borderRadius: 20,
    backgroundColor: '#C8F0F9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  summaryText: {
    fontFamily: "PretendardSemibold",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    color: theme.skyblue,
    letterSpacing: -0.14,
  },
  titleText: {
    fontFamily: "PretendardSemibold",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    color: theme.gray10,
    letterSpacing: -0.48,
    lineHeight: 31.2,
    textAlign: "center",
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    color: theme.gray50,
    letterSpacing: -0.32,
    lineHeight: 20.8,
    textAlign: "center",
  },
  image: {
    width: '100%',
    height: windowWidth - 32,
    paddingLeft: 30
  },
  circleContainer: {
    flexDirection: "row",
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginHorizontal: 4,
  },
  circleOn: {
    backgroundColor: theme.skyblue,
  },
  circleOff: {
    backgroundColor: theme.gray80,
  },

  btnContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  nextBtn: {
    backgroundColor: theme.gray10,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  nextBtnText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    color: theme.white,
    letterSpacing: -0.32,
    textAlign: "center",
  },
  skipBtn: {
    alignSelf: "center",
    marginVertical: 8,
  },
  skipBtnText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    color: theme.gray50,
    letterSpacing: -0.32,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: theme.gray50,
    textDecorationStyle: "solid",
  },
})
