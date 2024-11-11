import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothRequestPermissions from './BluetoothRequestPermissions';

const UseBluetoothClassic = () => {
  const discoveredDevices = useRef(new Map()); // 장치를 저장할 Map
  const [allDevices, setAllDevices] = useState([]); // 연결 가능한 주변 Bluetooth 장치 목록
  const [connectedDevice, setConnectedDevice] = useState(null); // 연결된 장치
  const [isScanning, setIsScanning] = useState(false); // 스캔 상태

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  const scanForPeripherals = async () => {
    if (BluetoothClassic.isScanning) {
      return;
    }

    discoveredDevices.current.clear(); // 새로운 스캔 시작 시 기존 장치 목록 초기화
    setIsScanning(true); // 스캔 시작

    try {
      // Bluetooth 활성화 확인
      const isEnabled = await BluetoothClassic.isBluetoothEnabled();
      if (!isEnabled) {
        console.error("블루투스가 활성화 되지 않았습니다.");
        return;
      }

      // Bluetooth 장치 검색 시작
      BluetoothClassic.startDiscovery();

      // 장치 발견 이벤트 처리
      const onDeviceDiscovered = (device) => {
        if (device.name !== device.id) { // 대개 폰이면 id와 name이 같지 않음
          if (!discoveredDevices.current.has(device.id)) {
            discoveredDevices.current.set(device.id, device);

            // 상태 업데이트 (중복 없이)
            setAllDevices((prevDevices) => {
              // 장치가 기존 목록에 없으면 추가
              if (!prevDevices.some((prevDevice) => prevDevice.id === device.id)) {
                console.log(`새로운 장치 추가: ${device.name}`);
                return [...prevDevices, device];
              }
              return prevDevices;
            });
          }
        }
      };

      BluetoothClassic.onDeviceDiscovered(onDeviceDiscovered);

      // 10초 후 스캔 중지
      const timeoutId = setTimeout(() => {
        BluetoothClassic.cancelDiscovery(); // 스캔 중지
        setIsScanning(false); // 스캔 종료 표시
        console.log("스캔 종료 (타임아웃)");
      }, 10000);

      // 타임아웃 및 스캔 종료 처리
      return () => {
        clearTimeout(timeoutId);
        BluetoothClassic.cancelDiscovery();
        setIsScanning(false);
      };
    } catch (error) {
      console.error("스캔 오류:", error.message);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    const initializeBLE = async () => {
      const permissionGranted = await BluetoothRequestPermissions();
      console.log("권한 요청 결과:", permissionGranted);

      if (permissionGranted) {
        console.log("useBluetoothClassic - Bluetooth 권한이 부여되었습니다.");
        scanForPeripherals(); // 스캔 시작
      } else {
        console.log("useBluetoothClassic - Bluetooth 권한이 거부되었습니다.");
      }
    };

    initializeBLE();

    return () => {
      if (isScanning) {
        BluetoothClassic.cancelDiscovery();
        setIsScanning(false); // 스캔 종료 표시
        console.log("스캔 종료 (클린업)");
      }
    };
  }, []);

  async function connectToDevice(deviceId) {
    try {
      // 연결 시도
      const device = await BluetoothClassic.connectToDevice(deviceId);
      if (device) {
        return true;  // 연결 성공
      } else {
        return false; // 연결 실패
      }
    } catch (error) {
      console.log('연결 오류:', error.message);
      return false; // 연결 실패
    }
  }

  async function sendData(deviceId, cardId) {
    try {
      const dataToSend = String(cardId);
      const result = await BluetoothClassic.writeToDevice(deviceId, dataToSend); // 블루투스 연결할 디바이스, 전송할 데이터
      console.log('전송 성공:', result);
      return result;
    } catch (error) {
      console.log('전송 오류:', error.message);
      return false;
    }
  }

  // 데이터 수신
  async function receiveData(deviceId, cardId) {
    try {
      const connectedDevice = await connectToDevice(deviceId); // 데이터를 수신한 디바이스에 연결
      if (connectedDevice) {
        console.log("받은 카드 ID:", cardId);

        // 상대카드 저장 API 요청
        if (cardId) {
          const response = await axios.post(`${baseUrl}/card/save?cardId=${cardId}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            if (response.data.added) {
              console.log("카드 ID 저장 성공:", response.data.message); // "카드가 저장되었습니다" 
            } else {
              console.log("카드 ID 저장 실패:", response.data.message); // "이미 저장된 카드입니다"
            }
          } else {
            console.log("카드 ID 저장 실패:", response.data);
          }
        }
        return cardId;
      } else {
        console.log("receiveData - 연결된 디바이스가 없습니다.");
      }
    } catch (error) {
      console.log("receiveData - 데이터 읽기 오류:", error);
    }
  }

  // 데이터 수신 테스트 -> 상대카드 저장 성공
  // async function receiveData() {
  //   const testCardId = '60'; // 수신할 카드 ID
  //   try {
  //     console.log("token: ", token);
  //     console.log("받은 카드 ID:", testCardId);

  //     // 상대카드 저장 API 요청
  //     if (testCardId) {
  //       const response = await axios.post(`${baseUrl}/card/save?cardId=${testCardId}`, {}, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         if (response.data.added) {
  //           console.log("카드 ID 저장 성공:", response.data.message); // "카드가 저장되었습니다" 메시지 출력
  //         } else {
  //           console.log("카드 ID 저장 실패: 이미 저장된 카드입니다."); // "이미 저장된 카드" 오류 처리
  //         }
  //       } else {
  //         console.log("카드 ID 저장 실패:", response.data); // 서버에서 반환된 실패 데이터 출력
  //       }
  //     } else {
  //       console.log("receiveData - 유효한 카드 ID가 없습니다.");
  //     }
  //     return testCardId;
  //   } catch (error) {
  //     console.log("receiveData - 데이터 읽기 오류:", error);
  //   }
  // }

  return {
    allDevices,
    scanForPeripherals,
    connectedDevice,
    connectToDevice,
    sendData,
    receiveData
  };
};

export default UseBluetoothClassic;
