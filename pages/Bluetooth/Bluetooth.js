import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, Image, ScrollView, Dimensions, Alert, ActivityIndicator } from "react-native";
import { styles } from './BluetoothStyle';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import { theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BluetoothRequestPermissions from "../../ble/BluetoothRequestPermissions.js";
import useBLE from "../../ble/useBLE.js";
import { BleManager } from "react-native-ble-plx";
import { Platform } from 'react-native';

import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';

function Step1Screen() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [hasCards, setHasCards] = useState(true);
  const [cardData, setCardData] = useState([]);

  const fetchCardData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch('http://43.202.52.64:8080/api/card/view/mine', {
        method: 'GET',
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
      console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // 블루투스 권한 요청
  useEffect(() => {
    const checkPermissions = async () => {
      const permissionsGranted = await BluetoothRequestPermissions();
      if (!permissionsGranted) {
        console.log('권한이 거부되었습니다.');
      }
    };

    checkPermissions();
  }, []);

  const handleRequestPermissions = async () => {
    const permissionsGranted = await BluetoothRequestPermissions();
    if (!permissionsGranted) {
      Alert.alert('권한 요청', '권한이 거부되었습니다.');
    } else {
      Alert.alert('권한 요청', '권한이 승인되었습니다.');
    }
  };

  // 컴포넌트가 처음 렌더링될 때 
  useEffect(() => {
    fetchCardData(); // 데이터 가져오기
    // handleBluetoothSearch(); // 블루투스 스캔
  }, []);

  const title = '블루투스로 보낼 프로필을 선택하세요.';
  const sub = '공유할 수 있는 카드가 없어요.';

  const handleNext = () => {
    navigation.navigate('Step2');
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
      <Button title="Bluetooth 권한 요청" onPress={handleRequestPermissions} />

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
    </View>
  );
}

function Step2Screen() {

  // 사람 데이터 유무를 상태로 설정
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleBluetoothSearch = async () => {
    setLoading(true); // 검색 시작 시 로딩 상태 설정

    // 블루투스 검색
    try {
      const searchResults = await bluetoothSearchFunction(); // 블루투스 검색 함수 호출
      setRecipients(searchResults); // 검색 결과를 recipients에 설정
    } catch (error) {
      console.error('블루투스 검색 실패', error);
    } finally {
      setLoading(false); // 검색 완료 후 로딩 상태 해제
    }
  };

  useEffect(() => {
    handleBluetoothSearch(); // 컴포넌트가 마운트될 때 블루투스 검색 시작
  }, []);

  const hasRecipients = recipients.length > 0; 
  
  // 보낼 사람이 없는 경우
  if (!hasRecipients) {
    return (
      <View style={styles.mainlayout}>
        <Text style={styles.title}>보낼 사람을 선택하여 프로필을 공유하세요.</Text>
        <View style={styles.emptyContainer}>
          {loading ? ( // 로딩 중일 때
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text style={styles.noCard}>주변에 공유할 사람이 없어요.</Text>
          )}
        </View>
      </View>
    );
  }

  const [recipientStatuses, setRecipientStatuses] = useState(
    recipients.reduce((acc, recipient) => {
      acc[recipient.userId] = recipient.status;
      return acc;
    }, {})
  );

  const handlePressRecipient = (id) => {
    setRecipientStatuses((prevStatuses) => {
      if (prevStatuses[id] === '공유 완료됨') {
        return prevStatuses;
      }
      return {
        ...prevStatuses,
        [id]: '요청 중...'
      };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Progress.Bar
        progress={1.0}
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.mainlayout}>
        <Text style={[styles.title, { marginBottom: 46 }]}>보낼 사람을 선택하여 프로필을 공유하세요.</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recipients.map((recipient) => (
            <React.Fragment key={recipient.id}>
              <View>
                <TouchableOpacity style={styles.namebox} onPress={() => handlePressRecipient(recipient.id)}>
                  <Text style={styles.name}>{recipient.name}</Text>
                  {recipientStatuses[recipient.id] && (
                    <Text style={recipientStatuses[recipient.id] === '요청 중...' ? styles.stateCall : styles.stateFinish}>
                      {recipientStatuses[recipient.id]}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// Bluetooth 검색 함수
const bluetoothSearchFunction = async () => {
  let discoveredDevices = [];

  return new Promise((resolve, reject) => {
    // BLE 초기화
    BleManager.start({ showAlert: false })
      .then(() => {
        // 블루투스 검색 시작
        BleManager.scan([], 5, true) // 5초 동안 스캔
          .then(() => {
            // 스캔 결과 수신
            const listener = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
              console.log('발견된 디바이스: ', peripheral);

              // 장치 정보를 discoveredDevices 배열에 추가
              const foundDevice = {
                id: peripheral.id,
                userId: peripheral.id,
                name: peripheral.name || 'Unknown Device',
                status: '대기 중',
              };
              discoveredDevices.push(foundDevice);
            });

            // 검색 완료 후 Promise를 resolve하고 이벤트 리스너 제거
            setTimeout(() => {
              listener.remove();
              if (discoveredDevices.length > 0) {
                resolve(discoveredDevices); // 발견된 장치 리스트를 resolve
              } else {
                reject(new Error('주변에 검색된 블루투스 장치가 없습니다.'));
              }
            }, 5000); // 5초 후 검색 종료
          })
          .catch((error) => {
            console.error('스캔 중 오류 발생:', error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error('BLE 초기화 중 오류 발생:', error);
        reject(error);
      });
  });
};


function Bluetooth({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Step1" component={Step1Screen}
        options={{
          title: "카드 보내기",
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
        }} />
      <Stack.Screen name="Step2" component={Step2Screen}
        options={{
          title: "카드 보내기",
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('홈')}>
              <HomeIcon style={{ marginRight: 8 }} />
            </TouchableOpacity>
          ),
        }} />
    </Stack.Navigator>
  );
}

export default Bluetooth;