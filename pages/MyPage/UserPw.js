import { View, Text, TextInput, TouchableOpacity, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import VisibilityIcon from "../../assets/Login/ic_visibility.svg";
import VisibilityOffIcon from "../../assets/Login/ic_visibility_off.svg";
import CheckIcon from "../../assets/Login/ic_done_small_line.svg";
import BlueCheckIcon from "../../assets/Login/ic_done_small_line_blue.svg";
import PasswordDone from "../../assets/images/passwordDone.svg";

function UserPw({navigation}) {
    const baseUrl = 'http://43.202.52.64:8080/api';
    const [token, setToken] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);

    const [step, setStep] = useState(1);
    const [userPassword, setuserPassword] = useState('');
    const [isPwVisible, setIsPwVisible] = useState(false);
    const [isPwFull, setIsPwFull] = useState(true);
    const [pwIsCorrect, setPwIsCorrect] = useState(true);
    const [hasEnglish, setHasEnglish] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLeng, setHasLeng] = useState(false);

    
    // AsyncStorage에서 토큰 가져오기
    useEffect(() => {
        const fetchToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        } catch (error) {
            console.error('토큰 가져오기 실패:', error);
        }
        };

        fetchToken();
    }, [isLoggedIn]);

    const passwordCheck = (password) => {
        setuserPassword(password); 
        setHasEnglish(/[a-zA-Z]/.test(password));
        setHasNum(/[0-9]/.test(password));
        setHasLeng(/^.{6,20}$/.test(password));
    };

    const handleUserPassword = (password) => {
        setuserPassword(password); 
        setPwIsCorrect(true);
    }

    const handleNext = async () => {
        if (step === 1) {
            const isFull = userPassword !== '';
            setIsPwFull(isFull);
            console.log('userPassword: ',userPassword );
            try {
                const response = await axios.post(
                    `${baseUrl}/user/validate-password`,
                    {
                        currentPassword: userPassword
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );

                if(response.status === 200) {
                    setPwIsCorrect(true);

                    setIsPwVisible(false);
                    setIsPwFull('');
                    setuserPassword('');
                    setStep(2);
                } else {
                    setPwIsCorrect(false);
                }
            } catch (error) {
                setPwIsCorrect(false);
                // console.error('비밀번호 검증 API 에러 발생: ', error);
            }
        } else if (step === 2 ) {
            if(hasEnglish && hasNum && hasLeng) {
                console.log('userPassword2: ',userPassword );
                try {
                    const response = await axios.patch(
                        `${baseUrl}/user/update-password`,
                        {
                            newPassword: userPassword
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        }
                    );
    
                    if(response.status === 200) {   
                        setStep(3);
                    }
                } catch (error) {
                    console.error('비밀번호 변경 API 에러 발생: ', error);
                }
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
                        onPress={() => {setStep(1); setuserPassword('');}}
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
        <View style={styles.userMain}>
            {step === 1 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.userChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>현재 비밀번호를 입력하세요.</Text>
                        <View>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View style={[styles.customInput, styles.pwContainer]}>
                                <TextInput
                                    style={{flex: 1, marginRight: 8}}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="default"
                                    value={userPassword}
                                    onChangeText={handleUserPassword}
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

                        <View style={styles.btnFlex} />
                        <TouchableOpacity 
                            style={styles.btnNext}
                            onPress={handleNext}
                        >
                            <Text style={styles.btnNextText}>다음으로</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {step === 2 && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.userChangeMain}>
                        <Text style={[styles.title, styles.titleMarginBottom]}>새 비밀번호를 입력하세요.</Text>
                        <View>
                            <Text style={styles.inputText}>비밀번호</Text>
                            <View style={[styles.customInput, styles.pwContainer]}>
                                <TextInput
                                    style={{flex: 1, marginRight: 8}}
                                    placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                                    placeholderTextColor={theme.gray60}
                                    keyboardType="default"
                                    value={userPassword}
                                    onChange={(e) => {setuserPassword(e.target.value)}}
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
                        
                        <View style={styles.btnFlex} />
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
                <View style={styles.userChangeMain}>
                    <Text style={[styles.title, styles.titleMarginBottom]}>비밀번호가 변경되었습니다.</Text>
                    <View style={styles.passwordDone}>
                        <PasswordDone />
                    </View>

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

export default UserPw;