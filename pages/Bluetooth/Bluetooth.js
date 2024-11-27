import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { styles } from './BluetoothStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import { theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
// import { BarCodeScanner } from 'expo-barcode-scanner';

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';

function Bluetooth({ navigation }) {
  const route = useRoute();
  const [step, setStep] = useState(1);

  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [hasCards, setHasCards] = useState(true); // 카드 보유 여부
  const [cardData, setCardData] = useState([]); // 카드 데이터
  const [isModalVisible, setModalVisible] = useState(false); // QR 모달 상태
  const [selectedCardId, setSelectedCardId] = useState(null); // 선택된 카드 ID

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (route.params?.step) {
      setStep(route.params.step);
    }
  }, [route.params?.step]); 

  // 카메라 권한 요청
  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  // 카드 데이터 가져오기
  const fetchCardData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }

      const response = await fetch("http://43.202.52.64:8080/api/card/view/mine", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setCardData(result);

      if (result.length > 0) {
        setHasCards(true);
      } else {
        setHasCards(false);
      }
    } catch (error) {
      console.error("카드 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchCardData();
  }, []);

  const title = 'QR로 공유할 프로필을 선택하세요.';
  const sub = '공유할 수 있는 카드가 없어요.';

  // QR 모달 열기
  const handleNext = (cardId) => {
    setSelectedCardId(cardId); // QR 코드에 사용할 cardId 저장
    setModalVisible(true);
  };

  // QR 모달 닫기
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCardId(null); // 선택된 cardId 초기화
  };

  // QR 코드 스캔 처리
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert('QR 코드 스캔 성공!', `Scanned data: ${data}`);

    const token = await AsyncStorage.getItem('token');

    try {
      const response1 = await axios.post(`${baseUrl}/card/save?cardId=${data}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response1.status === 200) {
        console.log("카드 ID 저장 성공:", response1.data.message);
      } else {
        console.log("카드 ID 저장 실패:", response1.data.message);
      }
    } catch (error) {
      console.error('Notify - 블루투스 CardID API 요청 오류:', error.response?.data || error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Progress.Bar
        progress={0.5}
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />


      {/* QR 코드 생성 */}
      {step === 1 && (
        <View style={styles.shareContainer}>
          {hasCards ? (
            <CardsView
              navigation={navigation}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              viewOption={viewOption}
              setViewOption={setViewOption}
              handleNext={handleNext}
              cardData={cardData}
              title={title}
              showNewCardButton={true}
              showPlusCard={true}
            />
          ) : (
            <NoCardsView
              navigation={navigation}
              title={title}
              sub={sub}
            />
          )}
        </View>
      )}

      {/* QR 코드 인식 */}
      {step === 2 && (
        <View style={styles.shareContainer}>
          <Text>
            스캔하기 화면 개발 전
          </Text>
          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button title="다시 스캔하기" onPress={() => setScanned(false)} />
          )} */}
        </View>
      )}

      {/* 생성된 QR 코드 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>QR코드를 스캔하세요.</Text>
                {selectedCardId && (
                  <View style={styles.qrContainer}>
                    <QRCode
                      value={`${selectedCardId}`} // QR 데이터
                      size={250}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <CloseIcon />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View >
  );
}

export default Bluetooth;