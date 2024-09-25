import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from 'react-native-webview';
import { KAKAO_AUTH_URL, KAKAO_INJECTED_JAVASCRIPT } from '../../components/Login/OAuth.jsx';
import { useNavigation } from '@react-navigation/native';

const KaKaoLogin = () => {
  const navigation = useNavigation();
  const [authCode, setAuthCode] = useState(null);

  const KakaoLoginWebView = (data) => {
    const exp = "code=";
    const condition = data.indexOf(exp);
    if (condition !== -1) {
      const authorize_code = data.substring(condition + exp.length);
      console.log("Auth Code from WebView: ", authorize_code);
      setAuthCode(authorize_code);
      navigation.navigate('홈'); // Store the auth code
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