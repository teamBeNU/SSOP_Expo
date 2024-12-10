import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginStyle.js';
import DisplayFrame from "../../assets/Login/displayFrame.svg";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import MainIcon from '../../assets/Login/ic_mail.svg';
import { WithdrawModal } from "../../components/MyPage/MyPageModal.js";

const { height:HEIGHT } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

function Login({ route = {} }) {
    const navigation = useNavigation();

    // 탈퇴: 로그인 페이지로 이동 후 모달 띄우기 -> showModal 사용
    const [modalVisible, setModalVisible] = useState(false);
    const {showModal} = route.params || {}; // 파라미터에서 showModal 값 추출

    useEffect(() => {
        if (showModal) {
          setModalVisible(true);        // 탈퇴 모달
        }
    }, [showModal]);
  
    return(
        <View style={{...styles.container, alignItems: 'center'}}>
            <View style={{position: 'absolute', top: STATUS_BAR_HEIGHT + 40}}>
                <Text style={styles.title}>자기소개와 인간관계 보조 플랫폼,</Text>
                <Text style={styles.ssop}>SSOP에 오신 걸 환영해요!</Text>
            </View>
            
            <View style={{...styles.cardicon, flex:1, justifyContent: 'center', alignItems: 'center', zIndex: -10, top:-36}}>
                <DisplayFrame height={400}/>
            </View>

            <View style={styles.emailContainer}>
                <TouchableOpacity style={styles.kakao} onPress={() => navigation.navigate('카카오 로그인')}>
                <KakaoIcon />
                  <Text style={styles.kakaoText}>카카오로 시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.email} onPress={() => navigation.navigate('회원가입')}>
                    <MainIcon style={{margin: 12}}/>
                    <Text style={styles.emailText}>이메일로 시작하기</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('이메일로그인')}>
                    <Text style={styles.loginText}>이미 계정이 있어요</Text>
                </TouchableOpacity>             
            </View>

            {modalVisible && (
                <WithdrawModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleBtn={() => setModalVisible(false)}
                    modalTitle={'회원탈퇴가 완료되었어요.'}
                    modalText={'언제든지 다시 돌아오세요!'}
                    btn={'확인'}
                />
            )}
        </View>
    )
 }


export default Login;