import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { styles } from "./OnboardingStyle";

const SCREEN_WIDTH = Dimensions.get('window').width;

function Onboarding({navigation}) {
  const [step, setStep] = useState(1);
  const scrollRef = useRef(null); // ScrollView의 ref 생성

  // const stepItems = [
  //     { id: 1,
  //       summary: '프로필 카드란',
  //       title: `프로필 카드의 정보로${"\n"}상대를 알아가기`,
  //       description: `상대의 이미지와 정보를 확인할 수 있어요.${"\n"}`,
  //       source: require('../../assets/images/onboarding1.png'),
  //     },
  //     { id: 2,
  //       summary: '카드 만들기',
  //       title: `네 가지 템플릿으로${"\n"}빠르게 카드 만들기`,
  //       description: `어떤 내용을 써야 할지 고민할 필요 없어요.${"\n"}템플릿을 고르고 쓰기만 하면 돼요.`,
  //       source: require('../../assets/images/onboarding2.png'),
  //     },
  //     { id: 3,
  //       summary: '카드 구성',
  //       title: `템플릿에서 답한 정보는${"\n"}카드 앞뒤로 구성`,
  //       description: `카드 앞면에는 이미지와 필수 정보,${"\n"}뒷면엔 추가적인 정보가 표시될 거예요.`,
  //       source: require('../../assets/images/onboarding3.png'),
  //     },
  //     { id: 4,
  //       summary: '권장 사용법',
  //       title: `다양한 카드를 만들어${"\n"}여러 상황에 대비하기`,
  //       description: `내가 갖고 있는 다양한 모습별로 카드를 만들면${"\n"}자기소개할 때 도움이 될 거예요!`,
  //       source: require('../../assets/images/onboarding4.png'),
  //     },
  // ]

  // AsyncStorage에서 온보딩 여부 정보 가져오기
  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const storedOnboarding = await AsyncStorage.getItem('onboarding');
      } catch (error) {
        console.error('온보딩 여부 정보 가져오기 실패:', error);
      }
    };
    fetchOnboarding();
  }, []);


  const handleNext = async () => {
    if (step === 4) {
      await AsyncStorage.setItem('onboarding', 'false');
      navigation.navigate('카드 만들기');
    } else {
      setStep((prev) => (prev + 1));   // 다음 아이템으로 이동
      scrollRef.current?.scrollTo({
        x: SCREEN_WIDTH * step, // 현재 step에 따라 스크롤 위치 계산
        animated: true, // 부드럽게 이동
      });
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboarding', 'false');
    navigation.navigate('카드 만들기');
  }
  
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH));
    if (currentIndex == 0) {setStep(1);}
    else if (currentIndex == 1) {setStep(2);}
    else if (currentIndex == 2) {setStep(3);}
    else if (currentIndex == 3) {setStep(4);}
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.flex2}></View>
      <View>
        <ScrollView
          ref={scrollRef} // ScrollView에 ref 연결
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate={0}
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment={"center"}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Scroll 이벤트 최적화
        >
          <View style={styles.informContainer}>
            <View style={[styles.summary, styles.marginH16]}>
              <Text style={styles.summaryText}>프로필 카드란</Text>
            </View>
            <Text style={[styles.titleText, styles.marginH16]}>프로필 카드의 정보로{"\n"}상대를 알아가기</Text>
            <Text style={[styles.descriptionText, styles.marginH16]}>상대의 이미지와 정보를 확인할 수 있어요.{"\n"}</Text>
            <Image
              source={require('../../assets/images/onboarding1.png')} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.informContainer}>
            <View style={[styles.summary, styles.marginH16]}>
              <Text style={styles.summaryText}>카드 만들기</Text>
            </View>
            <Text style={[styles.titleText, styles.marginH16]}>네 가지 템플릿으로{"\n"}빠르게 카드 만들</Text>
            <Text style={[styles.descriptionText, styles.marginH16]}>어떤 내용을 써야 할지 고민할 필요 없어요.{"\n"}템플릿을 고르고 쓰기만 하면 돼요.</Text>
            <Image
              source={require('../../assets/images/onboarding2.png')} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.informContainer}>
            <View style={[styles.summary, styles.marginH16]}>
              <Text style={styles.summaryText}>카드 구성</Text>
            </View>
            <Text style={[styles.titleText, styles.marginH16]}>템플릿에서 답한 정보는{"\n"}카드 앞뒤로 구성</Text>
            <Text style={[styles.descriptionText, styles.marginH16]}>카드 앞면에는 이미지와 필수 정보,{"\n"}뒷면엔 추가적인 정보가 표시될 거예요.</Text>
            <Image
              source={require('../../assets/images/onboarding3.png')} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.informContainer}>
            <View style={[styles.summary, styles.marginH16]}>
              <Text style={styles.summaryText}>권장 사용법</Text>
            </View>
            <Text style={[styles.titleText, styles.marginH16]}>다양한 카드를 만들어{"\n"}여러 상황에 대비하기</Text>
            <Text style={[styles.descriptionText, styles.marginH16]}>내가 갖고 있는 다양한 모습별로 카드를 만들면{"\n"}자기소개할 때 도움이 될 거예요!</Text>
            <Image
              source={require('../../assets/images/onboarding4.png')} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>
        </ScrollView>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, step === 1 ? styles.circleOn : styles.circleOff]}></View>
          <View style={[styles.circle, step === 2 ? styles.circleOn : styles.circleOff]}></View>
          <View style={[styles.circle, step === 3 ? styles.circleOn : styles.circleOff]}></View>
          <View style={[styles.circle, step === 4 ? styles.circleOn : styles.circleOff]}></View>
        </View>
      </View>
      <View style={styles.flex1}></View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.nextBtn]}
          onPress={handleNext}
        >
          {step === 4 ? 
          <Text style={[styles.nextBtnText]}>시작하기</Text>
          :
          <Text style={[styles.nextBtnText]}>다음으로</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.skipBtn]}
          onPress={handleSkip}
        >
          <Text style={[styles.skipBtnText]}>건너뛸래요</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Onboarding;