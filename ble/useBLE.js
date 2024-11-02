import React, { useEffect, useState } from 'react';
import { BleManager } from 'react-native-ble-plx';

const useBLE = () => {
  const bleManager = new BleManager();
  const [allDevices, setAllDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState([]);

  useEffect(() => {
    // 초기화 및 정리 작업
    return () => {
      bleManager.destroy(); // 메모리 누수를 방지
    };
  }, []);

  // 중복 장치 확인
  const isDuplicateDevice = (devices, nextDevice) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  // 주변 장치 스캔
  useEffect(() => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }

      if (device && device.name && !isDuplicateDevice(allDevices, device)) {
        setAllDevices((prevDevices) => [...prevDevices, device]);
        console.log("Found device:", device.name);
      }

      if (device.name === "TARGET_DEVICE_NAME") {
        bleManager.stopDeviceScan();
        connectToDevice(device.id);
      }
    });

    return () => {
      bleManager.stopDeviceScan();
    };
  }, []);

  // 블루투스 연결
  async function connectToDevice(deviceId) {
    try {
      const deviceConnection = await bleManager.connectToDevice(deviceId);
      console.log("Connected to device:", deviceConnection.name);

      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      // startStreamingData(deviceConnection); // 데이터 스트리밍 시작 코드
    } catch (e) {
      console.log("디바이스 연결 오류", e);
    }
  };

  // 데이터 전송
  async function sendData(serviceUUID, characteristicUUID, data) {
    if (!connectedDevice) {
      console.log("No connected device");
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

  // 필요한 상태 및 함수 반환
  return {
    allDevices,
    connectedDevice,
    connectToDevice,
    sendData,
  };
};

export default useBLE;
