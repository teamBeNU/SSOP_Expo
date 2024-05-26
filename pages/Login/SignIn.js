import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';
// import GoogleIcon from "../../assets/Login/ic_google.svg";
// import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import NaverIcon from "../../assets/Login/ic_naver.svg";
import VerticalLine from "../../assets/Login/ic_vertical_line.svg";

import GoogleIcon from "../../assets/Login/ic_google.png";
import KakaoIcon from "../../assets/Login/ic_kakao.png";

function EmailLogin() {
    const navigation = useNavigation();

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{...styles.container, paddingTop: 24,}}>
           <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>아이디</Text>
            <TextInput
            style={styles.input} 
            placeholder="이메일 주소"
            keyboardType= "email-address"
            />
           </View>
           <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>비밀번호</Text>
            <TextInput 
            secureTextEntry 
            style={styles.input} 
            placeholder="영문과 숫자 포함, 6-20자 이내의 문자"/>
           </View>

           <View style={styles.textContainer}> 
            <TouchableOpacity  onPress={() => navigation.navigate('비밀번호 변경')}> 
                <Text style={styles.pwChange}>비밀번호 변경</Text>
            </TouchableOpacity>
            <VerticalLine />
            <TouchableOpacity>
                <Text style={styles.join}>회원가입</Text>
            </TouchableOpacity>
            </View>

           <View style={{...styles.socialContainer, justifyContent: 'center', marginTop: 24,}}>
                {/* <GoogleIcon />
                <KakaoIcon /> */}
                <TouchableOpacity>
                <Image source={GoogleIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={KakaoIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                <NaverIcon />
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
 }

export default EmailLogin;