import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { styles } from './LoginStyle.js';
import CardsIcon from "../../assets/Login/ic_cards.svg";
import KakaoIcon from "../../assets/Login/ic_kakao.svg";
import MainIcon from '../../assets/Login/ic_mail.svg';
import MyPageModal from "../../components/MyPage/MyPageModal.js";
import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";

const { height:HEIGHT } = Dimensions.get('window');

function Login({ route }) {
    const navigation = useNavigation();

    
    // 로그아웃: 로그인 페이지로 이동 후 좌측 상단(헤더바)에 X 버튼 -> showCloseBtn 사용
    // 탈퇴: 로그인 페이지로 이동 후 모달 띄우기 -> showModal 사용
    const headerHeight = useHeaderHeight();     // 헤더 높이 구하기 (로그아웃 후 로그인 페이지로 올 경우 헤더가 생겨 컴포넌트들이 아래로 밀리는 것을 막기위해 헤더 높이만큼 marginTop을 빼줌)
    const [modalVisible, setModalVisible] = useState(false);
    const { showCloseBtn, showModal } = route.params || {}; // 파라미터에서 showModal 값 추출

    useEffect(() => {
        if (showModal) {
          setModalVisible(true);
        }
    }, [showModal]);

    // 헤더 바 (로그아웃 후 이동시 좌측 상단에 X 버튼 추가)
    useEffect(() => {
        if(showCloseBtn) {
            navigation.setOptions({
                headerShown: true,
                headerTitle: '',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => { navigation.goBack(); }}
                    >
                        <CloseIcon style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerShown: false,
            });
        }
    }, [navigation, showCloseBtn]);
  
    return(
        <View style={{...styles.container, alignItems: 'center', marginTop: -headerHeight}}>
            <View style={{position: 'absolute', top: (HEIGHT / 7)}}>
                <Text style={styles.title}> <Text style={styles.ssop}>프로필 카드</Text>로{`\n`}쉬워지는 자기소개
                </Text>
            </View>
            
            <View style={{...styles.cardicon, position: 'absolute', top: (HEIGHT / 2) - 140}}>
                <CardsIcon />
            </View>

            <View style={styles.emailContainer}>
                <TouchableOpacity style={styles.kakao} onPress={() => navigation.navigate('카카오 로그인')}>
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

            {modalVisible && (
                <MyPageModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleBtn1={null}
                    handleBtn2={() => setModalVisible(false)}
                    modalTitle={'회원탈퇴가 완료되었어요.'}
                    modalText={'언제든지 다시 돌아오세요!'}
                    btn1={null}
                    btn2={'확인'}
                    btnMargin={123.5}
                />
            )}
        </View>
    )
 }


export default Login;