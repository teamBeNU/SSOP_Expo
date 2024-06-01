import { View, Text, TextInput, TouchableOpacity, Pressable, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserPhoneNumber({navigation}) {
    const [step, setStep] = useState(1);
    const [tel, setTel] = useState('');
    const [isTelFull, setIsTelFull] = useState(true);
    const [testPhoneCode, setTestPhoneCode] = useState('123');
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneCodeIsCorrect, setPhoneCodeIsCorrect] = useState(true);
    const [isResend, setIsResend] = useState(false);
    
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
        if(phoneCode === testPhoneCode) setPhoneCodeIsCorrect(true);
    };

    const handlePhoneCode = () => {
        if(phoneCode !== testPhoneCode) {
            setPhoneCodeIsCorrect(false);
            setIsResend(false);
        }
        else if((phoneCode === testPhoneCode)) setPhoneCodeIsCorrect(true);
    };

    const handleRequest = () => {
        setIsResend(true);
        setPhoneCodeIsCorrect(true);
    };

    const handleNext = () => {
        if (step === 1) {
            const isTF = tel !== '';
            setIsTelFull(isTF);

            if (isTF) {
                setStep(2);
            }
        } else if (step === 2 ) {
            setStep(3);
        } else if (step === 3 ) {
            setStep(4);
        }
    };

    return (
        <View>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.UserInfoMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>변경할 연락처를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>연락처</Text>
                            <TextInput 
                                style={[styles.customInput, !isTelFull && styles.inputError]}
                                placeholder="연락처를 입력하세요."
                                placeholderTextColor={theme.gray60}
                                keyboardType="phone-pad"
                                value={tel}
                                onChangeText={handlePhoneNumChange}
                                returnKeyType="done"
                            />
                            {!isTelFull && (
                                <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                            )}
                        </View>
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
                    <View style={styles.UserInfoMain}>
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
                            <Text>{phoneCode}</Text>
                            {!isTelFull && (
                                <Text style={styles.inputErrorText}>연락처를 입력해 주세요.</Text>
                            )}
                            <View style={styles.requestNum}>
                                <View style={[styles.flexDirectionRow, {marginHorizontal: 4}]}>
                                    <Text style={[styles.inputText, {marginRight: 4}]}>잔여시간</Text>
                                    <Text style={styles.remainTime}>03:00</Text>
                                </View>
                                
                                <TouchableOpacity
                                    style={styles.noBtn}
                                    onPress={handleRequest}
                                    >
                                    <Text style={styles.rerequestNum}>인증문자 재요청</Text>
                                </TouchableOpacity>
                            </View>

                            {!phoneCodeIsCorrect && (
                                <Text style={styles.unCorrect}>인증번호가 일치하지 않습니다.</Text>
                            )}
                            {isResend && (
                                <Text style={styles.resend}>인증번호가 재발송되었습니다.{`\n`}재발송이 재차 필요한 경우 15초 후에 시도해 주세요.</Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={(phoneCode === testPhoneCode) ? handleNext : handlePhoneCode}
                        >
                            <Text style={styles.btnNextText}>다음으로</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}

export default UserPhoneNumber;