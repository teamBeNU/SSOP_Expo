import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { theme } from "../../theme";
import { useNavigation } from '@react-navigation/native';

import LetterIcon from '../../assets/Login/ic_letter.svg'

function ChangePw() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const [step, setStep] = useState(1);
     // step 단위 뒤로 가기
     const handleBack = () => {
        // 현재 단계(step)에 따라 이전 단계로 이동
        if (step > 1) {
          setStep(step => step - 1);
        }
      };
      
      // 테스트용 다음 step
      const handleNext = () => {
        if (step === 1 ) {
          if(email !== '')
          setStep(2);
        } 
      };
  
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            {step === 1 && (
            <View style={styles.container}>
                <Text style={styles.title}>이메일 주소를 입력하세요.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>이메일</Text>
                    <TextInput
                    style={styles.input} 
                    placeholder="이메일 주소를 입력하세요."
                    keyboardType= "email-address"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                    onSubmitEditing={handleNext}
                    />
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextText}>다음으로</Text>
                </TouchableOpacity>
            </View>
            )}
             {step === 2 && (
            <View style={styles.container}>
                <Text style={{...styles.title, fostSize: 22, letterSpacing: -0.44}}>이메일 주소로{`\n`}새 비밀번호가 발송되었습니다.</Text>
                <LetterIcon  style={{marginTop: 132, marginHorizontal: 94}}/>
                
                <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('이메일로그인')}>
                    <Text style={styles.nextText}>로그인으로</Text>
                </TouchableOpacity>
            </View>
            )}
            </View>
        </TouchableWithoutFeedback>
    )
 }

export default ChangePw;

export const styles = StyleSheet.create({
    container:{
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32
    },
    title: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: -0.4
    },
    inputContainer: {
    gap: 8,
    marginTop: 62,
    },
    inputTitle: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Pretendard',
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
    nextBtn: {
    width: '100%',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.gray10,
    position: 'absolute',
    left: 16,
    bottom: 16,
    },
    nextText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.32,
    },
})