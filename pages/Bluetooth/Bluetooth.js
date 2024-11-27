import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from "react";
import { Modal, Text, Button, TouchableWithoutFeedback, View } from "react-native";
import * as Progress from 'react-native-progress';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import CardsView from '../../components/Bluetooth/CardsView.js';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import { theme } from "../../theme";
import { styles } from './BluetoothStyle';

function Bluetooth({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api';
  const route = useRoute();

  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [hasCards, setHasCards] = useState(true); // 카드 보유 여부
  const [cardData, setCardData] = useState([]); // 카드 데이터
  const [isModalVisible, setModalVisible] = useState(false); // QR 모달 상태
  const [selectedCardId, setSelectedCardId] = useState(null); // 선택된 카드 ID
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null); // 카메라 권한 상태

  useEffect(() => {
    if (route.params?.step) {
      setStep(route.params.step);
    }
  }, [route.params?.step]);

  // 카메라 권한 요청
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

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

  // Toast 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000, // 2초간 표시
    });
  };

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
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    const token = await AsyncStorage.getItem('token');

    try {
      const response = await axios.post(`${baseUrl}/card/save?cardId=${data}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log("카드 ID 저장 성공:", response.data.message);
        const successMessage = response.data.message
        showCustomToast(successMessage);
        navigation.navigate("받은 프로필 카드");
      } else {
        // console.log("카드 ID 저장 실패:", response.data.message);
        const failMessage = response.data.message
        showCustomToast(failMessage);
      }
    } catch (error) {
      // console.error('Bluetooth - QR 스캔 CardID API 요청 오류:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message;
      showCustomToast(errorMessage);
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
          {/* 카메라 화면 */}
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{flex: 1}}
          />
          {scanned && (
            <Button title="다시 스캔하기" onPress={() => setScanned(false)} />
          )} 
        </View>
      )}

      {/* 생성된 QR 코드 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
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

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View >
  );
}

export default Bluetooth;