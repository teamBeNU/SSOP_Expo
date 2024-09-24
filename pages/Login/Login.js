import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';
import CardsIcon from "../../assets/Login/ic_cards.svg";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import MainIcon from '../../assets/Login/ic_mail.svg';

const { height:HEIGHT } = Dimensions.get('window');

function Login() {
    const navigation = useNavigation();

    return(
        <View style={{...styles.container, alignItems: 'center'}}>
            <View style={{position: 'absolute', top: (HEIGHT / 7)}}>
                <Text style={styles.title}> <Text style={styles.ssop}>프로필 카드</Text>로{`\n`}쉬워지는 자기소개
                </Text>
            </View>
            
            <View style={{...styles.cardicon, position: 'absolute', top: (HEIGHT / 2) - 140}}>
                <CardsIcon />
            </View>

            <View style={styles.emailContainer}>
                <TouchableOpacity style={styles.kakao} onPress={() => navigation.navigate('')}>
                <KakaoIcon />
                  <Text style={styles.kakaoText}>카카오로 시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.email} onPress={() => navigation.navigate('회원가입')}>
                    <MainIcon style={{margin: 8}}/>
                    <Text style={styles.emailText}>이메일로 시작하기</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('이메일로그인')}>
                    <Text style={styles.loginText}>이미 계정이 있어요</Text>
                </TouchableOpacity>             
            </View>
        </View>
    )
 }


export default Login;