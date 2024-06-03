import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import VisibilityIcon from '../../assets/Login/ic_visibility.svg';
import VisibilityOffIcon from '../../assets/Login/ic_visibility_off.svg';
import CheckIcon from '../../assets/Login/ic_done_small_line.svg';
import BlueCheckIcon from '../../assets/Login/ic_done_small_line_blue.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import SignUpDone from '../../assets/Login/graphic_signUpDone.svg';

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function UserPw({navigation}) {
    const [step, setStep] = useState(1);
    const [pw, setPw] = useState(1);
    const [isPwVisible, setIsPwVisible] = useState(false);
    const [isPwFull, setIsPwFull] = useState(true);

    const handleNext = () => {
        if (step === 1) {
            const isPF = pw !== '';
            setIsPwFull(isPF);

            if (isPF) {
                setStep(2);
            }
        } else if (step === 2 ) {
            setStep(3);
        }
    };

    return (
        <View>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.UserChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>현재 비밀번호를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View>
                                <TextInput 
                                    style={[styles.customInput, !isPwFull && styles.inputError]}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="phone-pad"
                                    value={tel}
                                    onChangeText={handlePhoneNumChange}
                                    returnKeyType="done"
                                />
                                <Pressable onPress={() => setIsPwVisible(!isPwVisible)}>
                                    {isPwVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </Pressable>
                            </View>
                            
                            {!isPwFull && (
                                <Text style={styles.inputErrorText}>비밀번호를 입력해 주세요.</Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                            <Text style={styles.btnNextText}>연락처 인증하기</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {step === 2 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.UserChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>현재 비밀번호를 입력하세요.</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View>
                                <TextInput 
                                    style={[styles.customInput, !isPwFull && styles.inputError]}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="phone-pad"
                                    value={tel}
                                    onChangeText={handlePhoneNumChange}
                                    returnKeyType="done"
                                />
                                <Pressable onPress={() => setIsPwVisible(!isPwVisible)}>
                                    {isPwVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </Pressable>
                            </View>
                            
                            {!isPwFull && (
                                <Text style={styles.inputErrorText}>비밀번호를 입력해 주세요.</Text>
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
        </View>
    );
}

export default UserPw;