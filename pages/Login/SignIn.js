import React, { useState, useRef } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';

import GoogleIcon from "../../assets/Login/ic_google.svg";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import NaverIcon from "../../assets/Login/ic_naver.svg";
import VerticalLine from "../../assets/Login/ic_vertical_line.svg";
import VisibilityIcon from '../../assets/Login/ic_visibility.svg';
import VisibilityOffIcon from '../../assets/Login/ic_visibility_off.svg';

function SignIn() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    const ref_input = useRef();

    const togglePwVisibility = () => {
        setShowPw(!showPw);
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
            onSubmitEditing={() => ref_input.current.focus()}
            />
           </View>
           <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>비밀번호</Text>
            <View style={{...styles.input, ...styles.pwInput}}>
                <TextInput
                style={{width:  Dimensions.get('window').width - 96}} 
                placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
                maxLength={20}
                secureTextEntry = {showPw ? false : true}
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}
                returnKeyType="next"
                // onSubmitEditing={handleNext}
                />
                {showPw ? <VisibilityIcon onPress={togglePwVisibility} style={styles.visibility}/> : <VisibilityOffIcon onPress={togglePwVisibility} style={styles.visibility}/>}
            </View>
            {/* <TextInput 
            secureTextEntry 
            style={styles.input} 
            placeholder="영문과 숫자 포함, 6-20자 이내의 문자"
            value={password}
            onChangeText={setPassword}
            ref={ref_input}
            /> */}
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

           <View style={{...styles.socialContainer, justifyContent: 'center', marginTop: 24,}}>
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
        </View>
        </TouchableWithoutFeedback>
    )
 }

export default SignIn;