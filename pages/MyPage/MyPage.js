import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import {  useFocusEffect  } from '@react-navigation/native';
import "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthContext";


import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";
import { styles } from "./MyPageStyle";

function MyPage({navigation}) {
    const baseUrl = 'http://43.202.52.64:8080/api';
    const [token, setToken] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const [userName, setUserName] = useState('');

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
    useFocusEffect(
        React.useCallback(() => {
            if(isLoggedIn && token) {
                async function getUser() {
                    try {
                        const response = await axios.get(`${baseUrl}/user`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                            withCredentials: true,
                        });
        
                        setUserName(response.data.user_name);
                    } catch (error) {
                    console.error('에러: ',error);
                    }
                }

                getUser();
            }
        }, [token, isLoggedIn])
    );

    // 로그아웃
    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          setIsLoggedIn(false); // Update login state
          setUserName('');
          // Alert.alert('로그아웃 성공');
          navigation.navigate('로그인');
        } catch (error) {
          console.error('Error during logout:', error);
          // Alert.alert('Error', 'Failed to log out.');
        }
    };

    return (
        <View style={styles.MyPageMain}>
            <View style={[styles.flexDirectionRow, styles.accountManageContainer]}>
                {
                    (userName !== null && userName !== '') ?
                    <>
                    <Text style={styles.userName}>{userName} 님</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MY 계정관리')}
                    >
                        <Text style={styles.accountManageText}>계정관리</Text>
                    </TouchableOpacity>
                    </> :
                    <>
                    <TouchableOpacity 
                        style={styles.loginBtn}
                        onPress={() => navigation.navigate('로그인')}
                    >
                        <View>
                            <Text style={styles.loginText}>로그인 및 회원가입</Text>
                            <Text style={styles.loginSubText}>쉬운 자기소개를 경험하세요.</Text>
                        </View>
                        <RightArrow />
                    </TouchableOpacity>
                    </>
                }
            </View>

            <View style={styles.infoContainer}>
                <TouchableOpacity 
                    style={[styles.flexDirectionRow, styles.infoBtn]}
                    onPress={() => navigation.navigate('MY 자주 묻는 질문')}
                >
                    <Text style={styles.infoText}>자주 묻는 질문</Text>
                    <RightArrow />
                </TouchableOpacity>
                <View style={styles.borderBottom}></View>
                <TouchableOpacity 
                    style={[styles.flexDirectionRow, styles.infoBtn]}
                    onPress={() => navigation.navigate('MY 서비스 방침 이용약관', {id: 'privacyPolicy'})}
                >
                    <Text style={styles.infoText}>개인정보 처리방침</Text>
                    <RightArrow />
                </TouchableOpacity>
                <View style={styles.borderBottom}></View>
                <TouchableOpacity 
                    style={[styles.flexDirectionRow, styles.infoBtn]}
                    onPress={() => navigation.navigate('MY 서비스 방침 이용약관', {id: 'termsOfService'})}
                >
                    <Text style={styles.infoText}>서비스 이용약관</Text>
                    <RightArrow />
                </TouchableOpacity>
            </View>
            {
                (userName !== null && userName !== '')  ?
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.logoutText}>로그아웃</Text>
                        </TouchableOpacity>
                    </View> : 
                    <></>
            }
        </View>
    );
}

export default MyPage;