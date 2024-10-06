import { View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../AuthContext";
import RightArrow from "../../assets/icons/ic_RightArrow_small_line.svg";
import { styles } from "./MyPageStyle";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function MyPage({navigation}) {
    const { setIsLoggedIn } = useContext(AuthContext);

    const [name, setName] = useState('김슈니');

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          setIsLoggedIn(false); // Update login state
          Alert.alert('로그아웃 성공');
          navigation.navigate('로그인');
        } catch (error) {
          console.error('Error during logout:', error);
          Alert.alert('Error', 'Failed to log out.');
        }
      };

    return (
        <View style={styles.MyPageMain}>
            <View style={[styles.flexDirectionRow, styles.accountManageContainer]}>
                <Text style={styles.userName}>{name} 님</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MY 계정관리')}
                >
                    <Text style={styles.accountManageText}>계정관리</Text>
                </TouchableOpacity>
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

            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MyPage;