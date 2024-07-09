import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Clipboard, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';
import CardsIcon from "../../assets/Login/ic_cards.svg";
import GoogleIcon from "../../assets/Login/ic_google.svg";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import NaverIcon from "../../assets/Login/ic_naver.svg";

function Login() {
    const navigation = useNavigation();

    return(
        <View style={{...styles.container, alignItems: 'center'}}>
            <View>
                <Text style={styles.title}> <Text style={styles.ssop}>쏩 카드</Text>로{`\n`}서로에게 스며들다
                </Text>
            </View>
            
            <View style={styles.cardicon}>
                <CardsIcon />
            </View>

            <View style={{...styles.socialContainer, position: 'absolute', bottom: 168}}>
                <TouchableOpacity>
                <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("KaKaoLogin", {screen: "KaKaoLogin"})}>
                <KakaoIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                <NaverIcon />
                </TouchableOpacity>
            </View>
            {/* <View style={{flex: 1}}/> */}
            <View style={styles.emailContainer}>
                <TouchableOpacity style={styles.email} onPress={() => navigation.navigate('회원가입')}>
                    <Text style={styles.emailText}>이메일로 회원가입하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('이메일로그인')}>
                  <Text style={styles.LoginText}>로그인</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
 }


export default Login;