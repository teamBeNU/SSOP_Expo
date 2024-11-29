import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView, Dimensions, Linking, Alert, DeviceEventEmitter, TouchableOpacity } from "react-native";
import { styles } from './HomeStyle';
//import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { SpaceModal } from "../../components/Space/SpaceModal.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import CreateCardIcon from '../../assets/HomeIcon/homeBanner.png';
import ArrowIconWhite from '../../assets/HomeIcon/ic_arrow_white.svg';
import ArrowIcon from '../../assets/HomeIcon/ic_arrow.svg';
import QRIcon from '../../assets/HomeIcon/ic_qr.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/ic_teamspin.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/ic_teamspnew.svg';
import QRBottomSheet from '../../components/Bluetooth/QRBottomSheet.js';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 4) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 125) / 162;
const cardHeight2 = (cardWidth * 102) / 162;

function Home({ navigation }) {

  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const [cardId, setCardId] = useState(null);
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [QRmodalVisible, setQRModalVisible] = useState(false);
  const [cardName, setCardName] = useState("");
  const [step, setStep] = useState(0);
  
  // 카드 생성
  const handleCreate = async () => {
    try {
      const onboarding = await AsyncStorage.getItem('onboarding');      // AsyncStorage에서 onboarding 값을 가져옴
  
      if (onboarding === 'true') {
        navigation.navigate('온보딩');
      } else if (onboarding === 'false') {
        navigation.navigate('카드 만들기');
      } else {        // onboarding 값이 null일 경우의 처리 (예: 기본값으로 카드 만들기로 이동)
        navigation.navigate('카드 만들기');
      }
    } catch (error) {
      console.error('AsyncStorage에서 onboarding 가져오기 실패:', error);
    }
  }

  // Toast 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000, // 2초간 표시
    });
  };

  const saveCard = async (cardId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("오류", "사용자 인증 토큰이 없습니다.");
        return;
      }

      const response = await fetch(
        `http://43.202.52.64:8080/api/card/save?cardId=${cardId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        //Alert.alert("성공", "카드가 성공적으로 저장되었습니다.");
        showCustomToast('카드가 성공적으로 저장되었습니다.');
        setIsSpaceModalVisible(false); // 모달 닫기
        navigation.navigate("받은 프로필 카드"); // 받은 프로필 카드 페이지로 이동
      } else {
        //Alert.alert("실패", result.message || "카드 저장에 실패했습니다.");
      }
    } catch (error) {
      //Alert.alert("오류", "카드 저장 중 문제가 발생했습니다.");
    }
  };

  const handleDeepLink = async (url) => {
    try {
      const extractCardId = (url) => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.searchParams.get("cardId");
        } catch (error) {
          console.error("URL 파싱 중 오류:", error);
          return null;
        }
      };

      const cardId = extractCardId(url);
      if (cardId) {
        console.log("추출된 cardId home.js:", cardId);

        // 카드 정보 가져오기
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("오류", "사용자 인증 토큰이 없습니다.");
          return;
        }

        const response = await fetch(
          `http://43.202.52.64:8080/api/card/view?cardId=${cardId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setCardName(result.cardEssential.card_name);
          setCardId(cardId);
          setIsSpaceModalVisible(true); // 모달 표시
        } else {
          console.error("카드 정보 가져오기 실패:", result.message || "알 수 없는 오류");
        }
      }
    } catch (error) {
      console.error("딥링크 처리 중 오류:", error);
    }
  };

  useEffect(() => {
    // 앱이 처음 실행되었을 때 URL 확인
    const checkInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        console.log("앱이 딥링크로 실행되었습니다 home.js:", initialURL);
        handleDeepLink(initialURL);
      }
    };

    checkInitialURL();

    // 실행 중인 상태에서 딥링크 감지
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <View style={styles.mainlayout}>
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.touchableOpacity}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setParentSize({ width, height });
            }}
            onPress={handleCreate}
          >
            <LinearGradient
              colors={['#C8FF79', '#AEFC3D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.btn1}
            >
              <Text style={styles.Text23}>자신을 보여주는</Text>
              <Text style={styles.Text23}>가장 쉬운 방법</Text>
              <View style={styles.btnCard}>
                <Text style={styles.TextWhite}>카드 만들기</Text>
                <ArrowIconWhite style={{ marginLeft: 4 }} />
              </View>
              <Image
                source={CreateCardIcon}
                style={styles.icon1} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.containerProfileCard}>
          <View style={styles.folderback2}></View>
          <View style={styles.folderback}></View>
          <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('받은 프로필 카드')}>
            <Text style={styles.Text16}>내가 받은 프로필 카드 확인</Text>
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        <View>

          <Text style={styles.title}>
            <Text style={styles.title}>프로필 카드 공유하기</Text>
          </Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => setQRModalVisible(true)}>
                <View style={styles.btnIcon}>
                  <QRIcon />
                </View>
                <Text style={styles.Text18}>QR 공유</Text>
                <Text style={styles.Text14}>주변에 있다면</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('링크 복사')}>
                <View style={styles.btnIcon}>
                  <LinkIcon />
                </View>
                <Text style={styles.Text18}>링크 공유</Text>
                <Text style={styles.Text14}>연락처가 있다면</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>사람이 많을 땐 팀스페이스로</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 입장')}>
                <View style={styles.btnIcon}>
                  <EnterTeamSPIcon />
                </View>
                <Text style={styles.Text18}>팀스페이스 입장</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 생성')}>
                <View style={styles.btnIcon}>
                  <CreatTeamSPIcon />
                </View>
                <Text style={styles.Text18}>팀스페이스 생성</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 80 }}></View>
        </View>
      </View>

      {/* 링크 공유 */}
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => {
          setIsSpaceModalVisible(false); // 모달 닫기
          navigation.navigate("홈"); // 홈 화면으로 이동
        }}
        title={`${cardName} 님의 카드를 받으시겠습니까?`}
        btn1="안 받을래요"
        btn2="네, 받을래요"
        onConfirm={() => {
          saveCard(cardId)
        }} // 연결된 카드 저장 로직
      />

      {/* QR 생성/스캔 선택 모달 */}
      <QRBottomSheet
        modalVisible={QRmodalVisible}
        setModalVisible={setQRModalVisible}
        setCreateStep={setStep}
        setStep={setStep}
      />
    </ScrollView>
  );
}

export default Home;
