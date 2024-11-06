import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothRequestPermissions from './BluetoothRequestPermissions';

const useBLE = () => {
  const discoveredDevices = useRef(new Map()); // 장치를 저장할 Map
  const [allDevices, setAllDevices] = useState([]); // 연결 가능한 주변 Bluetooth 장치 목록
  const [connectedDevice, setConnectedDevice] = useState(null); // 연결된 장치
  const [isConnected, setIsConnected] = useState(false); // 디바이스 연결 여부
  const [successSend, setSuccessSend] = useState(false); // 데이터 전송 여부
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
      },10000);

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
        console.log("useBle - Bluetooth 권한이 거부되었습니다.");
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
      const deviceConnection = await BluetoothClassic.connectToDevice(deviceId);
      console.log("연결된 디바이스:", deviceConnection.name);
      setConnectedDevice(deviceConnection);
      setIsConnected(true);
    } catch (error) {
      console.log("디바이스 연결 오류", error);
      setIsConnected(false);
    }
  }

  async function sendData(data) {
    try {
      if (connectedDevice) {
        await connectedDevice.write((String(data)));
        console.log("데이터 전송:", data);
        console.log('연결된 디바이스 정보: ', connectedDevice)
        setSuccessSend(true);
      } else {
        console.log("연결된 디바이스가 없습니다.");
        setSuccessSend(false);
      }
    } catch (error) {
      console.log("데이터 전송 오류:", error);
      setSuccessSend(false);
    }
  }

  return {
    allDevices,
    scanForPeripherals,
    connectedDevice,
    connectToDevice,
    isConnected,
    sendData,
    successSend
  };
};

export default useBLE;
