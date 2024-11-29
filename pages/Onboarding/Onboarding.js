import { View, SafeAreaView, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./OnboardingStyle";

function Onboarding({navigation}) {
  const [step, setStep] = useState(0);

  const stepItems = [
      { id: 1,
        summary: '프로필 카드란',
        title: `프로필 카드의 정보로${"\n"}상대를 알아가기`,
        description: `상대의 이미지와 정보를 확인할 수 있어요.${"\n"}`,
        source: require('../../assets/images/onboarding1.png'),
      },
      { id: 2,
        summary: '카드 만들기',
        title: `네 가지 템플릿으로${"\n"}빠르게 카드 만들기`,
        description: `어떤 내용을 써야 할지 고민할 필요 없어요.${"\n"}템플릿을 고르고 쓰기만 하면 돼요.`,
        source: require('../../assets/images/onboarding2.png'),
      },
      { id: 3,
        summary: '카드 구성',
        title: `템플릿에서 답한 정보는${"\n"}카드 앞뒤로 구성`,
        description: `카드 앞면에는 이미지와 필수 정보,${"\n"}뒷면엔 추가적인 정보가 표시될 거예요.`,
        source: require('../../assets/images/onboarding3.png'),
      },
      { id: 4,
        summary: '권장 사용법',
        title: `다양한 카드를 만들어${"\n"}여러 상황에 대비하기`,
        description: `내가 갖고 있는 다양한 모습별로 카드를 만들면${"\n"}자기소개할 때 도움이 될 거예요!`,
        source: require('../../assets/images/onboarding4.png'),
      },
  ]

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
    if (step === 3) {
      await AsyncStorage.setItem('onboarding', 'false');
      navigation.navigate('카드 만들기');
    } else {
      setStep((prev) => (prev + 1) % stepItems.length);   // 다음 아이템으로 이동
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboarding', 'false');
    navigation.navigate('카드 만들기');
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <View style={styles.informContainer}>
          <View style={[styles.summary, styles.marginH16]}>
            <Text style={styles.summaryText}>{stepItems[step].summary}</Text>
          </View>
          <Text style={[styles.titleText, styles.marginH16]}>{stepItems[step].title}</Text>
          <Text style={[styles.descriptionText, styles.marginH16]}>{stepItems[step].description}</Text>
          <Image
            source={stepItems[step].source} 
            style={styles.image} 
            resizeMode="contain"
          />
          <View style={styles.circleContainer}>
            <View style={[styles.circle, step === 0 ? styles.circleOn : styles.circleOff]}></View>
            <View style={[styles.circle, step === 1 ? styles.circleOn : styles.circleOff]}></View>
            <View style={[styles.circle, step === 2 ? styles.circleOn : styles.circleOff]}></View>
            <View style={[styles.circle, step === 3 ? styles.circleOn : styles.circleOff]}></View>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.nextBtn]}
          onPress={handleNext}
        >
          {step === 3 ? 
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