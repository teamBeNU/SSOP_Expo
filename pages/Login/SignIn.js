import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../AuthContext.js";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import VerticalLine from "../../assets/Login/ic_vertical_line.svg";
import VisibilityIcon from '../../assets/Login/ic_visibility.svg';
import VisibilityOffIcon from '../../assets/Login/ic_visibility_off.svg';

function SignIn() {
    const navigation = useNavigation();

    const { setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    const ref_input = useRef();

    const togglePwVisibility = () => {
        setShowPw(!showPw);
      };
      
    const handleLogin = async () => {
      try {
        const response = await fetch('http://43.202.52.64:8080/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        console.log('API Response:', data);
  
        if (response.ok) {
          if (data.token) {
            await AsyncStorage.setItem('token', data.token);
            
            const issuedAt = new Date().toISOString(); 
            await AsyncStorage.setItem('tokenIssuedAt', issuedAt);

            setIsLoggedIn(true); 
            navigation.navigate('MyTabs');
          } else {
            if (data.message === '로그인 실패 - 사용자 없음') {
              Alert.alert('로그인 실패', '가입하지 않은 이메일입니다.');
            } else if (data.message === '로그인 실패 - 비밀번호 불일치') {
              Alert.alert('로그인 실패', '비밀번호가 일치하지 않습니다.');
            } else {
              Alert.alert('로그인 실패', 'An unknown error occurred. Please try again.');
            }
          }
        }
      } catch (error) {
        console.error('Error logging in:', error);
        Alert.alert('Login Error', 'Something went wrong. Please try again later.');
      }
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{...styles.container, paddingTop: 4,}}>
           <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>아이디</Text>
            <TextInput
            style={styles.input} 
            placeholder="이메일 주소"
            keyboardType= "email-address"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => ref_input.current.focus()}
            />
           </View>
           <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>비밀번호</Text>
            <View style={{...styles.input, ...styles.pwInput}}>
                <TextInput
                ref={ref_input}
                style={{width:  Dimensions.get('window').width - 96}} 
                placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                maxLength={20}
                secureTextEntry = {showPw ? false : true}
                onChangeText={setPassword}
                value={password}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                />
                {showPw ? <VisibilityIcon onPress={togglePwVisibility} style={styles.visibility}/> : <VisibilityOffIcon onPress={togglePwVisibility} style={styles.visibility}/>}
            </View> 
           </View>

           <View style={{marginTop: 40}}>
                <TouchableOpacity style={styles.email} onPress={handleLogin}>
                  <Text style={styles.emailText}>로그인</Text>
                </TouchableOpacity>
            </View>

           <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.text}>또는</Text>
            <View style={styles.line} />
           </View>

            <View style={{marginTop: 32}}>
                <TouchableOpacity style={styles.kakao} onPress={() => navigation.navigate('카카오 로그인')}>
                <KakaoIcon />
                  <Text style={styles.kakaoText}>카카오로 시작하기</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textContainer}> 
            <TouchableOpacity  onPress={() => navigation.navigate('비밀번호 변경')}> 
                <Text style={styles.pwChange}>비밀번호 변경</Text>
            </TouchableOpacity>
            <VerticalLine />
            <TouchableOpacity>
                <Text style={styles.join} onPress={() => navigation.navigate('회원가입')}>회원가입</Text>
            </TouchableOpacity>
            </View>

        </View>
        </TouchableWithoutFeedback>
    )
 }

export default SignIn;