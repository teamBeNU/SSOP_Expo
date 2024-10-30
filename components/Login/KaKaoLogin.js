import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from 'react-native-webview';
import { KAKAO_AUTH_URL, KAKAO_INJECTED_JAVASCRIPT } from '../../components/Login/OAuth.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../AuthContext.js";
import { KAKAO_REST_API, KAKAO_REDIRECT_URI } from '@env';
import { useNavigation } from '@react-navigation/native';

const KaKaoLogin = () => {
  const navigation = useNavigation();
  const [authCode, setAuthCode] = useState(null);
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (authCode) {
      getKakaoAccessToken(authCode);
    }
  }, [authCode]);

  const getKakaoAccessToken = async (authCode) => {
    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${authCode}`,
      });
      const json = await response.json();

      if (json.access_token) {
        const accessToken = json.access_token;
        getUserProfile(accessToken);
      } else {
        console.error('Failed to get access token:', json);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const getUserProfile = async (accessToken) => {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profile = await response.json();
      if (profile.kakao_account && profile.kakao_account.email) {
        const email = profile.kakao_account.email;
        const name = profile.kakao_account.name;
        const birthyear = profile.kakao_account.birthyear;
        const birthday = profile.kakao_account.birthday;
        const birth = `${birthyear}-${birthday.slice(0, 2)}-${birthday.slice(2, 4)}`;
        const phoneNumber = profile.kakao_account.phoneNumber;

        sendToSingnUpAPI(email, name, birth, phoneNumber);
      } else {
        console.error('No email found in Kakao profile:', profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const sendToSingnUpAPI = async(email, name, birth, phoneNumber) => {
    try {
      const response = await fetch('http://43.202.52.64:8080/api/user/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          user_name: name,
          user_birth: birth,
          user_phone: phoneNumber,
        }),
      });

      if (response.status === 200) {
        sendToLoginAPI(email);
      }; 
    } catch (error) {
      Alert.alert(error.message);
      return null;
    }
  };

  const sendToLoginAPI = async (email) => {
    try {
      const response = await fetch('http://43.202.52.64:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

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
            Alert.alert('로그인 실패', '다시 시도해주세요.');
          }
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('로그인 에러', '다시 시도해 주세요.');
    }
  };
  

  const KakaoLoginWebView = (data) => {
    const exp = "code=";
    const condition = data.indexOf(exp);
    if (condition !== -1) {
      const authorize_code = data.substring(condition + exp.length);
      setAuthCode(authorize_code);
      navigation.navigate('AppContent');
    }
  };

      return (
        <View style={Styles.container}>      
          <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            scalesPageToFit={false}
            source={{
              uri: KAKAO_AUTH_URL,
            }}
            injectedJavaScript={KAKAO_INJECTED_JAVASCRIPT}
            javaScriptEnabled
            onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
          />
        </View>
    );
};

export default KaKaoLogin;

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },    
  });