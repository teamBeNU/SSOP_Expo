import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";

import { styles } from "./UserInfoStyle";
import { theme } from "../../theme";

function UserPhoneNumber({navigation}) {
    const baseUrl = 'http://43.202.52.64:8080/api';
    const [token, setToken] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);
    
    const [user_tel, setTel] = useState('');
    const [isTelFull, setIsTelFull] = useState(true);

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

    // 사용자 정보
    useEffect(() => {
        if(isLoggedIn && token) {
            async function getUser() {
                try {
                    const response = await axios.get(`${baseUrl}/user`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        withCredentials: true,
                    });
    
                    setTel(response.data.user_phone);
                } catch (error) {
                  console.error('에러: ',error);
                }
            }

            getUser();
        }
    }, [token, isLoggedIn]);
    
    const handlePhoneNumChange = (text) => {
        setTel(text);
        if (text !== '') {
            setIsTelFull(true);
        } else {
            setIsTelFull(false);
        }
    }

    // 변경사항 저장
    const handleSave = async () => {
        const isTF = user_tel !== '';
        setIsTelFull(isTF);
        if (isTF) {
            try {
                await axios.patch(
                    `${baseUrl}/user/phone`,
                    {
                        user_phone: user_tel
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                navigation.navigate('MY');
            } catch (error) {
                console.error('이름 및 생년월일 변경 API 에러 발생: ', error);
            }
        }
    };

    return (
        <View style={styles.userMain}>
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
                        onPress={handleSave}
                    >
                        <Text style={styles.btnNextText}>변경사항 저장하기</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default UserPhoneNumber;