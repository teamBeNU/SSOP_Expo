import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";

import { styles } from "./MyPageStyle";
import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";
import MyPageModal from "../../components/MyPage/MyPageModal";

function UserAccount({navigation}) {
    const baseUrl = 'http://43.202.52.64:8080/api';
    const [token, setToken] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);

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

    // 모달 - '취소하기'
    const handleBtn1 = () => {
        setModalVisible(false);
    };

    // 모달 - '탈퇴하기'
    const handleBtn2 = async () => {
        setModalVisible(false);
        try {
            const response = await axios.delete(
                `${baseUrl}/user`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if(response.status === 200) {
                setIsLoggedIn(false); // Update login state
                navigation.reset({routes: [{name: '로그인'}]});
            }
        } catch (error) {
            console.error('이름 및 생년월일 변경 API 에러 발생: ', error);
        }
    };

    return (
        <View style={styles.UserAccountMain}>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 이름 및 생년월일 변경')}
            >
                <Text style={styles.infoText}>이름 및 생년월일 변경</Text>
                <RightArrow />
            </TouchableOpacity>
            <View style={styles.borderBottom}></View>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 연락처 변경')}
            >
                <Text style={styles.infoText}>연락처 변경</Text>
                <RightArrow />
            </TouchableOpacity>
            <View style={styles.borderBottom}></View>
            <TouchableOpacity 
                style={[styles.flexDirectionRow, styles.infoBtn]}
                onPress={() => navigation.navigate('MY 비밀번호 변경')}
            >
                <Text style={styles.infoText}>비밀번호 변경</Text>
                <RightArrow />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.logoutContainer} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.deleteText}>탈퇴하기</Text>
            </TouchableOpacity>

            {modalVisible && (
                <MyPageModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleBtn1={handleBtn1}
                    handleBtn2={handleBtn2}
                    modalTitle={'정말 탈퇴하시겠어요?'}
                    modalText={'탈퇴하면 모든 데이터가 삭제되며\n복구할 수 없습니다.'}
                    btn1={'취소하기'}
                    btn2={'탈퇴하기'}
                    btnMargin={42}
                />
            )}
        </View>
    );
}

export default UserAccount;