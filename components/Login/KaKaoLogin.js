import React from "react";
import { View, StyleSheet } from "react-native";
// import { WebView } from 'react-native-webview';
import {KAKAO_AUTH_URL, KAKAO_INJECTED_JAVASCRIPT} from '../../components/Login/OAuth.jsx';

const KaKaoLogin = () => {
    function KakaoLoginWebView (data) {
        const exp = "code=";
        var condition = data.indexOf(exp);    
        if (condition != -1) {
          var authorize_code = data.substring(condition + exp.length);
          console.log(authorize_code);
        };
      }
    
      return (
        <View style={Styles.container}>      
          {/* <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            scalesPageToFit={false}
            source={{
              uri: KAKAO_AUTH_URL,
            }}
            injectedJavaScript={KAKAO_INJECTED_JAVASCRIPT}
            javaScriptEnabled
            onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
          /> */}
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