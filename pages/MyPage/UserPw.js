import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ViewComponent } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import VisibilityIcon from "../../assets/Login/ic_visibility.svg";
import VisibilityOffIcon from "../../assets/Login/ic_visibility_off.svg";
import CheckIcon from "../../assets/Login/ic_done_small_line.svg";
import BlueCheckIcon from "../../assets/Login/ic_done_small_line_blue.svg";
import PasswordDone from "../../assets/images/passwordDone.svg";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function UserPw({navigation}) {
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('qwerty12345');    // 사용자 비밀번호
    const [inputPw, setInputPw] = useState('');     // 사용자가 입력한 비밀번호
    const [isPwVisible, setIsPwVisible] = useState(false);
    const [isPwFull, setIsPwFull] = useState(true);
    const [pwIsCorrect, setPwIsCorrect] = useState(true);
    const [hasEnglish, setHasEnglish] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLeng, setHasLeng] = useState(false);

    const passwordCheck = (password) => {
        setHasEnglish(/[a-zA-Z]/.test(password));
        setHasNum(/[0-9]/.test(password));
        setHasLeng(/^.{6,20}$/.test(password));
    };

    const handleInputPW = (password) => {
        setInputPw(password); 
        setPwIsCorrect(true);
    }

    const handleNext = () => {
        if (step === 1) {
            const isFull = inputPw !== '';
            setIsPwFull(isFull);

            const isCorrect = password === inputPw;
            setPwIsCorrect(isCorrect);

            if (isFull && isCorrect) {
                setIsPwFull('');
                setInputPw('');
                setStep(2);
            }
        } else if (step === 2 ) {
            if(hasEnglish && hasNum && hasLeng) {
                setStep(3);
            }
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
                        onPress={() => {setStep(1); setInputPw('');}}
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

    return (
        <View>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.UserChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>현재 비밀번호를 입력하세요.</Text>
                        <View>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View style={[styles.customInput, styles.pwContainer]}>
                                <TextInput
                                    style={{flex: 1, marginRight: 8}}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="default"
                                    value={inputPw}
                                    onChangeText={handleInputPW}
                                    returnKeyType="done"
                                    maxLength={20}
                                    secureTextEntry = {isPwVisible ? false : true}
                                />
                                <Pressable onPress={() => setIsPwVisible(!isPwVisible)}>
                                    {isPwVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Pressable>
                            </View>
                            {!pwIsCorrect && (
                                <Text style={[styles.unCorrect, {marginTop: 16}]}>비밀번호가 일치하지 않습니다.</Text>
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
                        <Text style={[styles.title, styles.titleMarginBottom]}>새 비밀번호를 입력하세요.</Text>
                        <View>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View style={[styles.customInput, styles.pwContainer]}>
                                <TextInput
                                    style={{flex: 1, marginRight: 8}}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="default"
                                    value={inputPw}
                                    onChange={(e) => {setInputPw(e.target.value)}}
                                    onChangeText={passwordCheck}
                                    returnKeyType="done"
                                    maxLength={20}
                                    secureTextEntry = {isPwVisible ? false : true}
                                />
                                <Pressable onPress={() => setIsPwVisible(!isPwVisible)}>
                                    {isPwVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.checkContainer}>
                            <View style={styles.check}>
                                {hasEnglish ? <BlueCheckIcon/> : <CheckIcon />}
                                <Text style={hasEnglish ? styles.checkTextOn : styles.checkTextOff}>영문 포함</Text>  
                            </View>
                            <View style={styles.check}>
                                {hasNum ? <BlueCheckIcon/> : <CheckIcon />}
                                <Text style={hasNum ? styles.checkTextOn : styles.checkTextOff}>숫자 포함</Text>  
                            </View>
                            <View style={styles.check}>
                                {hasLeng ? <BlueCheckIcon/> : <CheckIcon />}
                                <Text style={hasLeng ? styles.checkTextOn : styles.checkTextOff}>6-20자 이내</Text>  
                            </View>
                        </View>
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                            <Text style={styles.btnNextText}>비밀번호 변경하기</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {step === 3 && (
                <View style={styles.UserChangeMain}>
                    <Text style={[styles.title, styles.titleMarginBottom]}>연락처가 변경되었습니다.</Text>
                    <View style={styles.passwordDone}>
                        <PasswordDone />
                    </View>
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

export default UserPw;