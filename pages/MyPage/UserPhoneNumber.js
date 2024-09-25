import { View, Text, TextInput, TouchableOpacity, Pressable, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";

function UserPhoneNumber({navigation}) {
    const [step, setStep] = useState(1);
    const [user_tel, setTel] = useState('');
    const [isTelFull, setIsTelFull] = useState(true);
    
    const [testPhoneCode, setTestPhoneCode] = useState('123');
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneCodeIsCorrect, setPhoneCodeIsCorrect] = useState(true);

    const [isResend, setIsResend] = useState(false);
    const [seconds, setSeconds] = useState(180);
    const [isRunning, setIsRunning] = useState(false);
    
    const handlePhoneNumChange = (text) => {
        setTel(text);
        if (text !== '') {
            setIsTelFull(true);
        } else {
            setIsTelFull(false);
        }
    }

    const handlePhoneCodeChange = (text) => {
        setPhoneCode(text);
        setPhoneCodeIsCorrect(true);
        // if(phoneCode === testPhoneCode) setPhoneCodeIsCorrect(true);
    };

    const handlePhoneCode = () => {
        if(phoneCode !== testPhoneCode) {
            setPhoneCodeIsCorrect(false);
            setIsResend(false);
        }
        else if((phoneCode === testPhoneCode)) setPhoneCodeIsCorrect(true);
    };

    const handleRequest = () => {
        // 시간 초기화
        setSeconds(180);
        setIsRunning(true);

        setIsResend(true);
        setPhoneCodeIsCorrect(true);
        setPhoneCode('');
    };

    const handleNext = () => {
        if (step === 1) {
            const isTF = user_tel !== '';
            setIsTelFull(isTF);

            if (isTF) {
                setPhoneCode('');
                setStep(2);
                setIsRunning(true);
            }
        } else if (step === 2 ) {
            setStep(3);
            setIsRunning(false);
        }
    };

    useEffect(() => {
        if (step === 1) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {navigation.goBack();}}
                    >
                        <CloseIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
            });
        } else if (step === 2) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {setStep(1); setTel(''); setSeconds(180); setIsRunning(false);}}
                    >
                        <LeftArrowIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
            });
        } else if (step === 3) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('MY')}}
                    >
                        <CloseIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
            });
        }
    }, [step]);

    useEffect(() => {
        if (seconds === 0) {
            setIsResend(false);
            setPhoneCodeIsCorrect(true);
        }
    }, [seconds]);

    
    useEffect(() => {
        let interval = null;
        if (isRunning) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => {
              if (prevSeconds === 0) {
                clearInterval(interval);
                return 0;
              }
              return prevSeconds - 1;
            });
          }, 1000);
        } else if (!isRunning && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const formatTime = (time) => {
      const min = Math.floor(time / 60);
      const sec = time % 60;
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <View style={styles.userMain}>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.userChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>변경할 연락처를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>연락처</Text>
                            <TextInput 
                                style={[styles.customInput, !isTelFull && styles.inputError]}
                                placeholder="연락처를 입력하세요."
                                placeholderTextColor={theme.gray60}
                                keyboardType="phone-pad"
                                value={user_tel}
                                onChangeText={handlePhoneNumChange}
                                returnKeyType="done"
                            />
                            {!isTelFull && (
                                <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                            )}
                        </View>

                        <View style={styles.btnFlex} />
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                            <Text style={styles.btnNextText}>변경한 연락처 인증하기</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {step === 2 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.userChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>문자로 발송된 인증번호를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>인증번호</Text>
                            <TextInput 
                                style={[styles.customInput, !isTelFull && styles.inputError]}
                                placeholder="인증번호를 입력하세요."
                                placeholderTextColor={theme.gray60}
                                keyboardType="numeric"
                                value={phoneCode}
                                onChangeText={handlePhoneCodeChange}
                                returnKeyType="done"
                            />
                            <View style={styles.requestNum}>
                                <View style={[styles.flexDirectionRow, {marginHorizontal: 4}]}>
                                    <Text style={[styles.resendText, {marginRight: 4}]}>잔여시간</Text>
                                    {/* <Text style={styles.remainTime}>03:00</Text> */}
                                    <Text style={styles.remainTime}>{formatTime(seconds)}</Text>
                                </View>
                                
                                <TouchableOpacity
                                    onPress={handleRequest}
                                    >
                                    <Text style={styles.resendBtn}>인증문자 재요청</Text>
                                </TouchableOpacity>
                            </View>

                            {!phoneCodeIsCorrect && (
                                <Text style={styles.unCorrect}>인증번호가 일치하지 않습니다.</Text>
                            )}
                            {isResend && (
                                <Text style={styles.resendText}>인증번호가 재발송되었습니다.{`\n`}재발송이 재차 필요한 경우 15초 후에 시도해 주세요.</Text>
                            )}
                            {seconds === 0 && (
                                <Text style={styles.resendText}>시간이 만료되었습니다.{`\n`}인증문자를 재요청해 주세요.</Text>
                            )}
                        </View>
                        
                        <View style={styles.btnFlex} />
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={(phoneCode === testPhoneCode) ? handleNext : handlePhoneCode}
                        >
                            <Text style={styles.btnNextText}>다음으로</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {step === 3 && (
                <View style={styles.userChangeMain}>
                    <Text style={[styles.title, styles.titleMarginBottom]}>연락처가 변경되었습니다.</Text>
                    
                    <View style={styles.btnFlex} />
                    <TouchableOpacity 
                        style={styles.btnNext}
                        onPress={() => navigation.navigate('MY')}
                    >
                        <Text style={styles.btnNextText}>마이페이지로 돌아가기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default UserPhoneNumber;