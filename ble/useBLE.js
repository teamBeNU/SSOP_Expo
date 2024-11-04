import React, { useEffect, useState, useRef } from 'react';
import { BleManager } from 'react-native-ble-plx';
import BluetoothRequestPermissions from './BluetoothRequestPermissions';

const useBLE = () => {
  const bleManager = useRef(new BleManager()).current;
  const discoveredDevices = useRef(new Map()); // 장치를 저장할 Map
  const [allDevices, setAllDevices] = useState([]); // 연결 가능한 주변 Bluetooth 장치 목록
  const [connectedDevice, setConnectedDevice] = useState(null); // 연결된 장치
  const [isScanning, setIsScanning] = useState(false); // 스캔 상태

  const scanForPeripherals = async () => {
    if (bleManager.isScanning) {
      console.log("현재 스캔 중입니다.");
      return;
    }

    discoveredDevices.current.clear(); // 새로운 스캔 시작 시 기존 장치 목록 초기화
    setIsScanning(true); // 스캔 시작 표시

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // console.error("Scan error:", error.reason);
        return;
      }

      if (device && device.name) {
        // 장치 이름이 있을 경우에만 처리
        if (!discoveredDevices.current.has(device.id)) {
          discoveredDevices.current.set(device.id, device);

          // 상태 업데이트 (중복 없이)
          setAllDevices((prevDevices) => {
            // 장치가 기존 목록에 없으면 추가
            if (!prevDevices.some(prevDevice => prevDevice.id === device.id)) {
              console.log(`새로운 장치 추가: ${device.name}`);
              return [...prevDevices, device]; // 새로운 배열 반환
            }
            return prevDevices; // 중복된 경우 기존 배열 반환
          });
        } else {
          // 이미 발견된 장치
        }
      } else if (device) {
        // 장치 이름 없음
      }
    });
    // 2초 후 스캔 중지
    const timeoutId = setTimeout(() => {
      bleManager.stopDeviceScan();
      setIsScanning(false); // 스캔 종료 표시
      console.log("스캔 종료 (타임아웃)");
    }, 2000);

    return () => {
      clearTimeout(timeoutId); // 클린업 함수에서 타임아웃 제거
      bleManager.stopDeviceScan(); // 스캔 중지
      setIsScanning(false); // 스캔 종료 표시
    };
  };
  
  useEffect(() => {
    const initializeBLE = async () => {
      const permissionGranted = await BluetoothRequestPermissions();
      console.log("권한 요청 결과:", permissionGranted);

      if (permissionGranted) {
        console.log("Bluetooth 권한이 부여되었습니다.");
        scanForPeripherals(); // 스캔 시작
      } else {
        console.log("Bluetooth 권한이 거부되었습니다.");
      }
    };

    initializeBLE();

    return () => {
      if (isScanning) {
        bleManager.stopDeviceScan();
        setIsScanning(false); // 스캔 종료 표시
        console.log("스캔 종료 (클린업)");
      }
    };
  }, []);

  async function connectToDevice(deviceId) {
    try {
      const deviceConnection = await bleManager.connectToDevice(deviceId);
      console.log("Connected to device:", deviceConnection.name);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
    } catch (error) {
      console.log("디바이스 연결 오류", error.reason);
    }
  }

  async function sendData(serviceUUID, characteristicUUID, data) {
    if (!connectedDevice) {
      console.log("연결된 디바이스 없음");
      return;
    }
    try {
      await connectedDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        data
      );
      console.log("데이터 전송:", data);
    } catch (error) {
      console.log("데이터 전송 오류:", error);
    }
  }

  return {
    allDevices,
    scanForPeripherals,
    connectedDevice,
    connectToDevice,
    sendData,
  };
};

export default useBLE;
