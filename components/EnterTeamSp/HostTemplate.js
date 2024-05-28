import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import { theme } from "../../theme";
import "react-native-gesture-handler";

export default function HostTemplate({navigation}) {
  const [step, setStep] = useState(1);

  const [front, setFront] = useState({
    // 앞면 - step1
    showAge: false,
    showSchool: false,
    showGrade: false,
    cover: "free",

    //뒷면 - step2
    showStudNum: false,
    showClub: false,
    showStatue: false,
    showPart: false,
    showTel: false,
    showSns: false,
    showEmail: false,
    showMbti: false,
    showMusic: false,
    showMovie: false,
  });

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
        setStep(4);
      } else if (step === 4) {
        setStep(5);
      } 
  };

  return (
    <View>
      {/* 카드 앞면 - 기본 정보 */}
      {step === 1 && (
        <View style={{height: 750}}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.title}> 나에 대한 기본 정보를 알려주세요 </Text>
            
          </ScrollView>

          <View style={[styles.btnContainer,{marginTop: 600 }]}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - 직무/동아리/재학여부*/}
      {step === 2 && (
        <View style={{height: 750}}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.title}> 나에 대해 더 알려주세요. </Text>
        </ScrollView>
        
          <View style={[styles.btnContainer, {marginTop: 600}]}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

      {/* 카드 뒷면 - sns/이메일 */}
      {step === 3 && (
        <View style={{height: 750}}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.title}> 추가적인 연락수단을 알려주세요. </Text>
        </ScrollView>
        
          <View style={[styles.btnContainer, {marginTop: 600}]}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}
      
      {/* 카드 뒷면 - MBTI/인생음악/인생영화 */}
      {step === 4 && (
        <View style={{height: 750}}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.title}> 사소한 것까지 더 알려주세요. </Text>
        </ScrollView>
        
          <View style={[styles.btnContainer, {marginTop: 600}]}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </View>
      )}

       {/* 팀스페이스 입장 완료 */}
       {step === 5 && (
        <View style={{height: 720}}>
          <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

          <View style={styles.flexSpacer} />

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={() => navigation.navigate("카드 조회")} style={styles.btnText}> 팀스페이스 확인 </Text>
            </View>
            <View style={styles.btnWhite}>
              <Text onPress={() => navigation.navigate(" ")} style={styles.btnTextBlack}> 홈 화면으로 </Text>
            </View>
          </View>
        </View>
      )}


      
      </View>
  )}