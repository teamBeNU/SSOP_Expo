import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from './BluetoothStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import { theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';

function Bluetooth({ navigation }) {
  const [step, setStep] = useState(1);
  const [hasCards, setHasCards] = useState(true); // 카드 보유 여부
  const [cardData, setCardData] = useState([]); // 카드 데이터
  const [isModalVisible, setModalVisible] = useState(false); // QR 모달 상태
  const [selectedCardId, setSelectedCardId] = useState(null); // 선택된 카드 ID

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('QR 코드 스캔 성공!', `Scanned data: ${data}`);
    // 여기서 data를 기반으로 API 호출 등 추가 작업 수행
  };

  if (hasPermission === null) {
    return <Text>카메라 접근 권한을 확인 중입니다...</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라 접근 권한이 없습니다.</Text>;
  }

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
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QR코드를 스캔하세요.</Text>
            {selectedCardId && (
              <QRCode
                value={`https://your-api.com/cards/${selectedCardId}`} // QR 데이터
                size={200} // QR 코드 크기
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalCardVisible(false)}
            >
              <CloseIcon2 />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
}

export default Bluetooth;