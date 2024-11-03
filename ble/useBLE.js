import React, { useEffect, useState, useRef } from 'react';
import { BleManager } from 'react-native-ble-plx';
import BluetoothRequestPermissions from './BluetoothRequestPermissions';

const useBLE = () => {
  // const bleManager = new BleManager();
  const bleManager = useRef(new BleManager()).current;
  const [allDevices, setAllDevices] = useState([]); // 연결 가능한 주변 Bluetooth 장치 목록
  const [connectedDevice, setConnectedDevice] = useState(null); // 연결된 장치
  const isScanning = useRef(false); // 스캔 상태 추적
  
  const scanForPeripherals = () => {
    if (isScanning.current) {
      console.log("이미 스캔 중입니다.");
      return;
    }
  
    isScanning.current = true; // 스캔 시작 상태로 변경
    console.log("스캔 시작");
  
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error.reason);
      }
  
      if (device && device.name && !isDuplicateDevice(allDevices, device)) {
        setAllDevices((prevDevices) => [...prevDevices, device]);
        console.log("Found device:", device.name);
      }
    });
  };
  
  const isDuplicateDevice = (devices, nextDevice) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  useEffect(() => {
    const checkBLESupport = async () => {
      const permissionGranted = await BluetoothRequestPermissions();
      if (permissionGranted) {
        console.log("Bluetooth 권한이 부여되었습니다.");
        scanForPeripherals();
      } else {
        console.log("Bluetooth 권한이 거부되었습니다.");
      }
    };

    checkBLESupport();

    return () => {
      bleManager.destroy();
    };
  }, []);

  useEffect(() => {
    const scanTimeout = setTimeout(() => {
      if (isScanning.current) {
        bleManager.stopDeviceScan();
        isScanning.current = false;
        console.log("스캔 종료 (타임아웃)");
      }
    }, 5000);

    return () => {
      clearTimeout(scanTimeout);
      if (isScanning.current) {
        bleManager.stopDeviceScan();
        isScanning.current = false;
        console.log("스캔 종료 (클린업)");
      }
    };
  }, [allDevices]);

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
    scanForPeripherals,
    allDevices,
    connectedDevice,
    connectToDevice,
    sendData,
  };
};

export default useBLE;
